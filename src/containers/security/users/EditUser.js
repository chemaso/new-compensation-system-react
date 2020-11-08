import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { SET_NOTIFICATIONS } from "../../../actionTypes";
import { isNil, isEmpty, uniqBy } from "lodash";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getPermissions } from "../../../actions/permissions";
import { getUserById } from "../../../actions/users";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import CommonModal from "../../../components/common/CommonModal";
import {
  Grid,
  Typography,
  Button,
  Divider,
  Switch,
  InputLabel,
} from "@material-ui/core";
import Helmet from "../../../components/common/Helmet";
import { useAccount } from "../../../hooks/user";
import { getDepartments } from "../../../actions/departments";
import { getUsers, deleteUser, putUser, generatePassword as generate } from "../../../actions/users";
import { getRoles } from "../../../actions/roles";
import { enableUser, disableUser } from "../../../api/user";
import CButton from "../../../components/common/ButtonWithLoading";
import { t } from '../../../i18n'

const EditUser = ({
  children,
  departments,
  roles,
  editUser,
  fetchUser,
  fetchDepartments,
  fetchRoles,
  user,
  account,
  permissions,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ active: false });
  const params = useParams();
  const { decrypt } = useAccount();
  const dispatch = useDispatch();
  const userData = decrypt(account?.user);
  useEffect(() => {
    setLoading(true);
    fetchDepartments(userData?.token, 0, 0, {}, true);
    fetchRoles(userData?.token, 0, 0, {}, true);
    fetchUser(userData?.token, params.id).finally(() => setLoading(false));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const depts =
    isNil(departments) || isEmpty(departments)
      ? []
      : departments?.map((item) => ({
          name: `${item.id} - ${item.name}`,
          id: item.id,
        }));

  const formInputs = [
    {
      label: t("users.editUser.identification", "ID"),
      id: "dni",
      required: true,
      maxLength: 20,
    },
    {
      label: t("users.editUser.login", "Login"),
      onlyLowerCase: true,
      id: "username",
      noSpaces: true,
      required: true,
      maxLength: 50,
    },
    {
      label: t("users.editUser.name", "Name"),
      id: "name",
      required: true,
      maxLength: 100,
    },
    {
      label: t("users.editUser.email", "Email"),
      id: "email",
      noSpaces: true,
      required: true,
      onlyLowerCase: true,
      maxLength: 100,
    },
    {
      label: t("users.editUser.department", "Department"),
      id: "department",
      type: "select",
      required: true,
      options: depts,
    },
    {
      label: t("users.editUser.profile", "Profile"),
      id: "roles",
      required: true,
      type: "multiselect",
      options: roles,
    },
  ];

  useEffect(() => {
    setValues({
      ...values,
      ...user,
      department: user?.department?.id || "",
      roles: uniqBy(user?.roles, "id"),
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
            err = { ...err, [v.id]:  t(
              "users.editUser.error.email",
              "- Incorrect Format"
            )}
            setErrors(err)
          }
      }
      const vals = typeof values[v.id] === 'number' ? values[v.id].toString() : values[v.id]
      if (isNil(values[v.id]) || isEmpty(vals)) {
        err = { ...err, [v.id]: t(
          "users.editUser.required",
          "Is Required"
        )}
        setErrors(err)
      }
      return err
    })
    return err
  }

  const checked = values?.active ? true : false;

  const handleGenerate = () => {
    dispatch(generate(params?.id, userData?.token))
    setGeneratePassword(false)
  }

  const handleActive = (e) => {
    setStatus(true);
    if (!checked) {
      enableUser(userData?.token, params.id)
        .then(() => {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t('users.editUser.activated', "The user was succesfully activated."),
            severity: "success",
          });
          setValues({
            ...values,
            active: true,
          });
        })
        .catch(() => {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t('users.editUser.error', "There  was an error, please try again"),
            severity: "error",
          });
        })
        .finally(() => setStatus(false));
    } else {
      disableUser(userData?.token, params.id)
        .then(() => {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t('users.editUser.suspended', "The user was succesfully deactivated."),
            severity: "success",
          });
          setValues({
            ...values,
            active: false,
          });
        })
        .catch(() => {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications:  t('users.editUser.error', "There  was an error, please try again"),
            severity: "error",
          });
        })
        .finally(() => setStatus(false));
    }
    setUserModal(false);
  };

  const state = checked ?  t('users.editUser.disable', "Disable") :  t('users.editUser.enable', "Enable");

  return (
    <>
      <Helmet title={ t('users.editUser.helmet', "Edit USer")} />
      <CommonModal
        open={userModal}
        cancelText={t('users.editUser.cancel', "Cancel")}
        acceptText={t('users.editUser.continue', "Continue")}
        title={t('common.warning',"Warning")}
        onAccept={handleActive}
        onCancel={() => setUserModal(false)}
        content={`${t("users.editUser.contentStart","You're about to")} ${state} ${t("users.editUser.contentEnd","the user, do you want to continue")}`}
      />
      <CommonModal
        open={generatePassword}
        cancelText={t('users.editUser.cancel', "Cancel")}
        acceptText={t('users.editUser.generate',"Generate")}
        title={t('common.warning',"Warning")}
        onAccept={handleGenerate}
        onCancel={() => setGeneratePassword(false)}
        content={`${t('users.editUser.generateStart',"You're about to generate a password for the user")}: ${values.name} ${t('users.editUser.generateEnd',"do you want to continue")}`}
      />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
            const err = handleErrors(values)
            console.log(err)
            if (isEmpty(err)) {
              setSubmitting(true);
              const payload = {
                ...values,
                department: departments?.find((v) => v.id === values.department),
              };
              editUser(userData?.token, params?.id, payload).then(() => {
                setSubmitting(false);
                history.push("/security/user/index");
              });
              console.log(values, payload);
            }
            else {
              document.getElementById("master-content").scrollTo(0,0)
            }
          };
          return (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">{t("users.editUser.title", "Edit User")} {params.id}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <InputLabel
                  style={{ marginTop: 12, color: "black" }}
                  htmlFor="active-user"
                >
                 {t("users.editUser.activeTitle", "Activate User")}
                </InputLabel>
                <Grid container alignItems="center" justify="flex-start">
                  <Grid item>{t("users.editUser.activeNo", "No")}</Grid>
                  <Switch
                    id="active-user"
                    disabled={status}
                    checked={checked}
                    onClick={() => setUserModal(true)}
                    //onChange={handleActive}
                    name="checkedB"
                    color="secondary"
                  />
                  <Grid item>{t("users.editUser.activeYes", "Yes")}</Grid>
                </Grid>
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  {!loading ? (
                    <UserForm
                      form={values}
                      errors={errors}
                      permissions={permissions}
                      formInputs={formInputs}
                      onChange={handleForm}
                    />
                  ) : (
                    <DataViewSkeleton />
                  )}
                </Grid>
                <InputLabel
                  style={{ marginTop: 12, color: "black" }}
                  htmlFor="active-user"
                >
                  {t("users.editUser.generateTitle", "Generate User Password")}
                </InputLabel>
                <CButton style={{ marginTop: 10, marginBottom: 10 }} onClick={() => setGeneratePassword(true)}>{t("users.editUser.generate", "Generate")}</CButton>
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
                    {t("users.editUser.cancel", "Cancel")}
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
                    {t("users.editUser.continue", "Save Changes")}
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
      editUser: putUser,
      getPermission: getPermissions,
      fetchUsers: getUsers,
      fetchRoles: getRoles,
      deleteUsers: deleteUser,
      fetchDepartments: getDepartments,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
