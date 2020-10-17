import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isNil, isEmpty, groupBy, uniq, uniqBy } from 'lodash'
import { useParams } from "react-router-dom";
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
  Switch,
  InputLabel,
} from "@material-ui/core";
import Helmet from "../../../components/common/Helmet";
import { useAccount } from "../../../hooks/user";
import { getDepartments } from "../../../actions/departments";
import { getUsers, deleteUser, postUser } from "../../../actions/users";
import { getRoles } from "../../../actions/roles";
import { enableUser, disableUser } from "../../../api/user";
import CButton from "../../../components/common/ButtonWithLoading";

const AddUser = ({ children, departments, roles, addUser, fetchUser, fetchDepartments, fetchRoles, user, account, permissions, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({ active: true });
  const params = useParams();
  const { decrypt } = useAccount();

  const userData = decrypt(account?.user);
  useEffect(() => {
    fetchDepartments(userData?.token, 0, 0, {}, true);
    fetchRoles(userData?.token, 0, 0, {}, true);
  }, []);

  const depts  = (isNil(departments) || isEmpty(departments)) ? [] : departments?.map((item) => ({
    name: `${item.id} - ${item.name}`,
    id: item.id,
  }))

  const formInputs = [
    {
      label: "Identification",
      id: "dni",
      maxLength: 20,
    },
    {
      label: "Login",
      id: "username",
      maxLength: 50,
    },
    {
      label: "Name",
      id: "name",
      maxLength: 100,
    },
    {
      label: "Email",
      id: "email",
      maxLength: 100,
    },
    {
      label: "Department",
      id: "department",
      type: "select",
      options: depts
    },
    {
      label: "Profile",
      id: "roles",
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

  const checked = values?.active ? true : false;

  return (
    <>
      <Helmet title="Add User" />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
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
            console.log(values, payload)
          }
          return (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">Add New User:{params.id}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  {!loading ? <UserForm
                    form={values}
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
                    Cancel
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
                    Save Changes
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
