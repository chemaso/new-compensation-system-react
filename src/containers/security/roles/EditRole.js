import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPermissions } from "../../../actions/permissions";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { setLogOut } from "../../../actions/account";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
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
    label: "Name",
    id: "name",
    maxLength: 100,
  },
  {
    label: "Description",
    id: "Description",
    maxLength: 100,
  },
  {
    label: "Permissions",
    id: "permissions",
    type: "treeview",
  },
];

const EditRole = ({
  children,
  logOut,
  setPermissions,
  permissions,
  account,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const params = useParams();
  const { decrypt } = useAccount();
  
  const user = decrypt(account?.user);

  useEffect(() => {
    setLoading(true)
    setPermissions(user?.token)
        .finally(()=> setLoading(false));
  }, []);

  const handleForm = (v) => {
    setValues(v)
  }
  return (
    <>
      <Helmet title="Add Role" />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          return loading ? (
            <DataViewSkeleton />
          ) : (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">Edit Role: #{params.id}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  <UserForm permissions={permissions} formInputs={formInputs} onChange={handleForm} />
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
                    onClick={() => history.replace("/security/role/index")}
                    color="default"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      background:
                        "linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)",
                    }}
                    onClick={() => console.log('editing', values)}
                    color="default"
                  >
                    Save Changes
                  </Button>
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
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setPermissions: getPermissions,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRole);
