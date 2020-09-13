import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from '@material-ui/core/Box';
import { get } from 'lodash'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchInput from '../common/SearchInput'
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
import MasterLayoutAside from './MasterLayoutComponents/MLAside'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAccount } from '../../hooks/user'

const MasterLayout = ({ children, render, logOut, account, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState('Reports');
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [isMobile])

  const MenuItems = () => {
    return (
      <>
        <Divider />
        <List>
          <ListItems onChange={setSelected} selected={selected} history={history} items={['Dashboard', 'Cheqs', 'Conciliation', 'Lorem']} />
        </List>
        <Divider />
        <List>
          <ListItems onChange={setSelected} selected={selected} items={['Reports']} />
        </List>
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
              <Grid item>
                {!isMobile && <SearchInput open={open} />}
              </Grid>
            </Grid>
            <Grid container justify='flex-end'>
              <Grid item>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon style={{ color: 'grey' }} />
                  </Badge>
                </IconButton>
              </Grid>
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
          <MenuItems />
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
        <MenuItems />
       </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <MasterLayoutBanner classes={classes} isMobile={isMobile} />
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
