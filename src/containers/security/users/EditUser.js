import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
  Switch,
  InputLabel
} from "@material-ui/core";
import Helmet from "../../../components/common/Helmet";

const formInputs = [
  {
    label: "Identification",
    id: "identification",
    maxLength: 20,
  },
  {
    label: "Login",
    id: "login",
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
    type: "checkbox-list",
  },
  {
    label: "Profile",
    id: "profile",
    type: "multiselect",
  },
];

const EditUser = ({ children, logOut, ...rest }) => {

  const [values, setValues] = useState({ active: false });
  const params = useParams();
  const handleForm = (v) => {
    setValues({
      ...values,
      ...v
    })
  }
  const handleActive = (e) => {
    setValues({
      ...values,
      active: e.target.checked
    })
  }

  const checked = values?.active ? true : false
  return (
    <>
      <Helmet title="Edit User" />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          return (
            <Grid justify="space-between" container style={{ marginRight: 20 }}>
              <Grid item xs={12} style={{ marginBottom: 20 }}>
                <Typography variant="h5">Edit User: #{params.id}</Typography>
              </Grid>
              <Grid style={{ minHeight: "85%" }} item xs={12}>
                <Divider />
                <InputLabel
                  style={{ marginTop: 12, color: "black" }}
                  htmlFor='active-user'
                >
                  Active User
                </InputLabel>
                <Grid container alignItems="center" justify="flex-start">
                  <Grid item>No</Grid>
                  <Switch
                    id='active-user'
                    checked={checked}
                    onChange={handleActive}
                    name="checkedB"
                    color="secondary"
                  />
                  <Grid item>Yes</Grid>
                </Grid>
                <Grid xs={10} container style={{ marginBottom: 20 }}>
                  <UserForm formInputs={formInputs} onChange={handleForm} />
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
                    onClick={() => console.log('saving', values)}
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
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logOut: setLogOut,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
