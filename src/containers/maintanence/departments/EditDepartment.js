import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDepartmentById, putDepartment } from "../../../actions/departments";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getPermissions } from "../../../actions/permissions";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import CButton from '../../../components/common/ButtonWithLoading'
import { useAccount } from "../../../hooks/user";

import Helmet from "../../../components/common/Helmet";

const formInputs = [
  {
    label: "ID",
    id: "id",
    disabled: true,
    maxLength: 100,
  },
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

const EditDepartment = ({
  children,
  logOut,
  getDepartment,
  getPermission,
  editDepartment,
  permissions,
  department,
  account,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({});
  const params = useParams();
  const { decrypt } = useAccount();
  
  const user = decrypt(account?.user);
  useEffect(() => {
    setLoading(true)
    getPermission(user?.token)
    getDepartment(user?.token, params.id)
        .finally(()=> setLoading(false));
  }, []);

  useEffect(() => {
    setValues(department)
  }, [department])

  const handleForm = (v) => {
    setValues(v)
  }

  return (
    <>
      <Helmet title="Edit Department" />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const handleSubmit = () => {
            setSubmitting(true)
            editDepartment(user?.token, params?.id, values)
              .then(() => {
                setSubmitting(false)
                history.push('/maintanence/department/index')
              })
          }
          return loading ? (
            <DataViewSkeleton />
          ) : (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">Edit Department: #{params.id}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  <UserForm form={values} permissions={permissions} formInputs={formInputs} onChange={handleForm} />
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
                    onClick={() => history.replace("/maintanence/department/index")}
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
  department: state?.departments?.department
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      editDepartment: putDepartment,
      getDepartment: getDepartmentById,
      getPermission: getPermissions,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDepartment);
