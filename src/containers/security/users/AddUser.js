import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPermissions } from "../../../actions/permissions";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { setLogOut } from "../../../actions/account";
import MasterLayout from "../../../components/layout/MasterLayout";
import UserForm from "../../../components/common/Form";
import { DataViewSkeleton } from "../../../components/common/Skeletons";
import {
  Grid,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { useAccount } from '../../../hooks/user'

import Helmet from '../../../components/common/Helmet'

const formInputs = [
  {
    label: "Identification",
    id: "identification",
    maxLength: 20
  },
  {
    label: "Login",
    id: "login",
    maxLength: 50
  },
  {
    label: "Name",
    id: "name",
    maxLength: 100
  },
  {
    label: "Email",
    id: "email",
    maxLength: 100
  },
  {
    label: "Department",
    id: "department",
    type: "checkbox-list",
  },
  {
    label: "Profile",
    id: "profile",
    type: "multiselect",
  },
];

const AddUser = ({ children, logOut, setPermissions, permissions, account, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const params = useParams();
  const { decrypt } = useAccount()
  const user = decrypt(account?.user)
  const handleForm = (v) => {
    setValues(v)
  }
  return (
    <>
    <Helmet title='Add User' />
    <MasterLayout
      loading={false}
      render={({ user, menuItems, history }) => {
        return loading ? (
          <DataViewSkeleton />
        ) : (
          <Grid justify="space-between" container style={{ marginRight: 20 }}>
            <Grid item xs={12} style={{ marginBottom: 20 }}>
              <Typography variant="h5">Add New User:</Typography>
            </Grid>
            <Grid style={{ minHeight: "85%" }} item xs={12}>
              <Divider />
              <Grid xs={10} container style={{ marginBottom: 20 }}>
                <UserForm permissions={[]} formInputs={formInputs} onChange={handleForm} />
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
                <Button
                  variant="contained"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    background:
                      "linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)",
                  }}
                  onClick={() => console.log('creating', values)}
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


export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
