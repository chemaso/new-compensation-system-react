import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from '@material-ui/core/Box';
import { get, groupBy, isEmpty, uniqBy } from 'lodash'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ListItems } from '../dashboard/listItems'
import BannerLogo from '../../assets/images/sice-logo.png'
import { useTheme } from '@material-ui/core/styles';
import Copyright from '../common/Copyright'
import { setLogOut } from '../../actions/account'
import { PersistorContext } from '../../context/persistorContext'
import { useHistory } from "react-router-dom";
import { useStyles } from './masterLayoutStyles'
import MasterLayoutBanner from './MasterLayoutComponents/MLBanner'
import { MenuSkeleton } from '../common/Skeletons'
import MasterLayoutAside from './MasterLayoutComponents/MLAside'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAccount } from '../../hooks/user'
import { useMenuItems } from '../../hooks/menu'

const MasterLayout = ({ children, render, logOut, account, loading, menuItems: menut, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState('Reports');
  const [aside, setAside] = React.useState(false);

  const { decrypt } = useAccount()
  const { generate } = useMenuItems()
  const user = decrypt(account)
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
  const history = useHistory()
  const { purge } = useContext(PersistorContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [isMobile])

  const menuItems = generate(user) || []

  const MenuItems = () => {
    return (
      <>
        <Divider />
        <List>
          <ListItems onChange={setSelected} selected={selected} history={history}  items={menuItems} />
        </List>
        <Divider />
      </>
    )
  }

  return (
    <div className={classes.root}>
      <>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, (open && !isMobile) && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <Grid container alignItems='center'>
              <Grid item xs={(open && !isMobile) ? false : 1}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton, (open && !isMobile) && classes.menuButtonHidden)}
                >
                  <MenuIcon style={{ color: '#f17f2d' }} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container justify='flex-end'>
              <Grid item>
                <IconButton onClick={handleAsideOpen} color="inherit">
                  <AccountCircleIcon style={{ color: 'grey' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </>
      {!isMobile && (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <img style={{ height: 35, marginTop: 4 }} alt='sice logo' src={BannerLogo} />
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon style={{ color: '#f17f2d' }} />
            </IconButton>
          </div>
         {!loading ? <MenuItems /> : <MenuSkeleton items={6} />}
        </Drawer>)}
      {isMobile && (
         <Drawer
         anchor='left'
         classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
         onClose={() => setOpen(false)}
         open={open}
       >
       {!loading ? <MenuItems /> : <MenuSkeleton items={6} />}
       </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <MasterLayoutBanner classes={classes} items={menuItems} isMobile={isMobile} loading={loading} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container style={{ margin: '5px 15px' }}>
            {render({ user })}
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
