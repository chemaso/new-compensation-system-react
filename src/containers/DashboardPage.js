import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setLogOut } from "../actions/account";
import MasterLayout from "../components/layout/MasterLayout";
import { DashboardSkeleton } from "../components/common/Skeletons";
import CommonCard from "../components/common/CommonCards";
import { Grid } from "@material-ui/core";
import Helmet from "../components/common/Helmet";
import { t } from '../i18n'
const DashboardPage = ({ children, logOut, ...rest }) => {
  const [loading, ] = useState(false);

  return (
    <>
      <Helmet title={t('dashboard.title', 'Dashboard')} />
      <MasterLayout
        loading={loading}
        render={({ user, menuItems, history }) => {
          const items = menuItems?.filter((item) => item.route !== "/");
          
          return loading ? (
            <DashboardSkeleton items={5} />
          ) : (
            <Grid container style={{ marginRight: 40 }}>
              {items.map((item, index) => (
                <Grid key={index} item xs={12} md={6} style={{ marginBottom: 20 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
