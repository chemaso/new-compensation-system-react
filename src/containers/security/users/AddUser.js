import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isNil, isEmpty } from 'lodash'
import { bindActionCreators } from "redux";
import { getPermissions } from "../../../actions/permissions";
import { getUserById } from "../../../actions/users";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import {
  Grid,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Helmet from "../../../components/common/Helmet";
import { useAccount } from "../../../hooks/user";
import { getDepartments } from "../../../actions/departments";
import { getUsers, deleteUser, postUser } from "../../../actions/users";
import { getRoles } from "../../../actions/roles";
import CButton from "../../../components/common/ButtonWithLoading";
import { t } from '../../../i18n'

const AddUser = ({ children, departments, roles, addUser, fetchUser, fetchDepartments, fetchRoles, user, account, permissions, ...rest }) => {
  const [loading, ] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({ active: true });
  const [errors, setErrors] = useState({});
  const { decrypt } = useAccount();

  const userData = decrypt(account?.user);
  useEffect(() => {
    fetchDepartments(userData?.token, 0, 0, {}, true);
    fetchRoles(userData?.token, 0, 0, {}, true);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const depts  = (isNil(departments) || isEmpty(departments)) ? [] : departments?.map((item) => ({
    name: `${item.id} - ${item.name}`,
    id: item.id,
  }))

  const formInputs = [
    {
      label: t("users.addUser.identification", "ID"),
      id: "dni",
      required: true,
      maxLength: 20,
    },
    {
      label: t("users.addUser.login", "Login"),
      onlyLowerCase: true,
      id: "username",
      noSpaces: true,
      required: true,
      maxLength: 50,
    },
    {
      label: t("users.addUser.name", "Name"),
      id: "name",
      required: true,
      maxLength: 100,
    },
    {
      label: t("users.addUser.email", "Email"),
      id: "email",
      noSpaces: true,
      required: true,
      onlyLowerCase: true,
      maxLength: 100,
    },
    {
      label: t("users.addUser.department", "Department"),
      id: "department",
      type: "select",
      required: true,
      options: depts
    },
    {
      label: t("users.addUser.profile", "Profile"),
      id: "roles",
      required: true,
      type: "multiselect",
      options: roles
    },
  ];

  const handleForm = (v) => {
    setValues({
      ...values,
      ...v,
    });
  };

  const handleErrors = (values) => {
    const requiredFields = formInputs.filter((item) => item.required)
    let err = {}
    requiredFields.map((v) => {
      if (v.id === 'email') {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const val  = values[v.id]
          if (!regex.test(val)) {
            err = { ...err, [v.id]: t(
              "users.addUser.error.email",
              "- Incorrect Format"
            )}
            setErrors(err)
          }
      }
      const vals = typeof values[v.id] === 'number' ? values[v.id].toString() : values[v.id]
      if (isNil(values[v.id]) || isEmpty(vals)) {
        err = { ...err, [v.id]: t(
          "users.addUser.required",
          "Is Required"
        )}
        setErrors(err)
      }
      return err
    })
    return err
  }

  return (
    <>
      <Helmet title={t("users.addUser.helmet", "Add User")} />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
            const err = handleErrors(values)
            if (isEmpty(err)) {
              setSubmitting(true)
              const payload = {
                ...values,
                department: departments?.find((v) => v.id === values.department)
              }
              addUser(userData?.token, payload)
              .then(() => {
                setSubmitting(false)
                history.push('/security/user/index')
              })
            }
            else {
              document.getElementById("master-content").scrollTo(0,0)
            }
          }
          return (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">{t("users.addUser.title", "Add User")}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  {!loading ? <UserForm
                    form={values}
                    errors={errors}
                    permissions={permissions}
                    formInputs={formInputs}
                    onChange={handleForm}
                  /> : <DataViewSkeleton />}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
                <Grid
                  container
                  justify="flex-end"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <Button
                    variant="contained"
                    style={{ fontWeight: "bold", marginRight: 15 }}
                    onClick={() => history.replace("/security/user/index")}
                    color="default"
                  >
                    {t('users.addUser.cancel', 'Cancel')}
                  </Button>
                  <CButton
                    variant="contained"
                    loading={submitting}
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      background:
                        "linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)",
                    }}
                    onClick={handleSubmit}
                    color="default"
                  >
                    {t('users.addUser.continue', 'Save Changes')}
                  </CButton>
                </Grid>
              </Grid>
            </Grid>
          );
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  departments: state?.departments?.departments,
  roles: state?.roles?.roles,
  user: state?.users?.user,
  permissions: state?.permissions?.data,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser: getUserById,
      addUser: postUser,
      getPermission: getPermissions,
      fetchUsers: getUsers,
      fetchRoles: getRoles,
      deleteUsers: deleteUser,
      fetchDepartments: getDepartments,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
