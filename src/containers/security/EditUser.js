import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { setLogOut } from "../../actions/account";
import MasterLayout from "../../components/layout/MasterLayout";
import UserForm from "../../components/security/userForm";
import { DataViewSkeleton } from "../../components/common/Skeletons";
import {
  Grid,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";

const EditUser = ({ children, logOut, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  return (
    <MasterLayout
      loading={false}
      render={({ user, menuItems, history }) => {
        return loading ? (
          <DataViewSkeleton />
        ) : (
          <Grid justify="space-between" container style={{ marginRight: 20 }}>
            <Grid item xs={12} style={{ marginBottom: 20 }}>
              <Typography variant="h5">Edit User: #{params.id}</Typography>
            </Grid>
            <Grid style={{ minHeight: '100%'}} item xs={12}>
              <Divider />
              <Grid container style={{ marginBottom: 20}}>
                <UserForm />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Grid container justify="flex-end" style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  style={{ fontWeight: "bold", marginRight: 15 }}
                  onClick={() =>
                    history.replace('/security/user/index')
                  }
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
                  //onClick={item.action}
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
