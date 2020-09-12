import React, { useContext } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from '@material-ui/core/Box';
import { get } from 'lodash'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Copyright from '../common/Copyright'
import { setLogOut } from '../../actions/account'
import { PersistorContext } from '../../context/persistorContext'
import { useHistory } from "react-router-dom";
import { useStyles } from './masterLayoutStyles'
import MasterLayoutToolbar from './MasterLayoutComponents/MLToolbar'
import MasterLayoutBanner from './MasterLayoutComponents/MLBanner'
import MasterLayoutAside from './MasterLayoutComponents/MLAside'

import { useAccount } from '../../hooks/user'

const MasterLayout = ({ children, render, logOut, account, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [aside, setAside] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAsideOpen = () => {
      setAside(!aside)
      if (!aside) {
        setOpen(aside)
      }
  }
  const { decrypt } = useAccount()
  const user = decrypt(account)
  const history = useHistory()
  const { purge } = useContext(PersistorContext)

  return (
    <div className={classes.root}>
      <MasterLayoutToolbar open={open} classes={classes} onCloseDrawer={handleDrawerClose} onOpenDrawer={handleDrawerOpen} onAsideOpen={handleAsideOpen} aside={aside} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <MasterLayoutBanner classes={classes} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {render({
                user
            })}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      <MasterLayoutAside user={user} open={aside} onAsideOpen={handleAsideOpen} onLogOut={() => logOut(purge, history)} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  account: get(state, 'account.user', ''),
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logOut: setLogOut
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterLayout)
