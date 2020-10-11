import React, { useState } from "react";
import { connect } from "react-redux";
import { getDepartmentById, postDepartment } from "../../../actions/departments";
import { bindActionCreators } from "redux";
import { getPermissions } from "../../../actions/permissions";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import CButton from "../../../components/common/ButtonWithLoading";

import Helmet from "../../../components/common/Helmet";

const formInputs = [
  {
    label: "Code",
    id: "code",
    noSpaces: true,
    maxLength: 25,
  },
  {
    label: "Name",
    id: "name",
    maxLength: 100,
  },
];

const AddDepartment = ({
  children,
  logOut,
  getDepartment,
  getPermission,
  createDepartment,
  permissions,
  department,
  account,
  ...rest
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({});

  const handleForm = (v) => {
    setValues(v);
  };

  return (
    <>
      <Helmet title="Add Department" />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
            setSubmitting(true);
            createDepartment(user?.token, values).then(() => {
              setSubmitting(false);
              history.push("/maintanence/department/index");
            });
          };
          return (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">Add New Department:</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  <UserForm
                    form={values}
                    permissions={permissions}
                    formInputs={formInputs}
                    onChange={handleForm}
                  />
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
                    onClick={() =>
                      history.replace("/maintanence/department/index")
                    }
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
  permissions: state?.permissions?.data,
  department: state?.departments?.department,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createDepartment: postDepartment,
      getDepartment: getDepartmentById,
      getPermission: getPermissions,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDepartment);
