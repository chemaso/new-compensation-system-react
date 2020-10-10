import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setLogOut } from "../../actions/account";
import MasterLayout from "../../components/layout/MasterLayout";
import { DashboardSkeleton } from "../../components/common/Skeletons";
import CommonCard from "../../components/common/CommonCards";
import { Grid, Typography } from "@material-ui/core";
import Helmet from '../../components/common/Helmet'

const Security = ({ children, logOut, ...rest }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Helmet title="Security" />
      <MasterLayout
        loading={false}
        render={({ user, menuItems, history }) => {
          const items =
            menuItems.find((item) => item.route === "/security")?.subcontent ||
            [];

          return loading ? (
            <DashboardSkeleton items={5} />
          ) : (
            <Grid container style={{ marginRight: 40 }}>
              {items.map((item, index) => (
                <Grid key={index} item xs={6} style={{ marginBottom: 20 }}>
                  <CommonCard item={item} index={index} history={history} />
                </Grid>
              ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Security);
