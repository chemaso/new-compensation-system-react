import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchInput from '../../common/SearchInput'
import CssBaseline from '@material-ui/core/CssBaseline';
import MasterLayoutDrawer from './MLDrawer'

const MasterLayoutToolbar = ({ open, onOpenDrawer, onCloseDrawer, classes, onAsideOpen }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems='center'>
            <Grid item xs={open ? false : 1}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={onOpenDrawer}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon style={{ color: '#f17f2d' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <SearchInput open={open} />
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
              <IconButton onClick={onAsideOpen} color="inherit">
                <AccountCircleIcon style={{ color: 'grey' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <MasterLayoutDrawer classes={classes} open={open} onCloseDrawer={onCloseDrawer} />
    </>
  );
}

export default MasterLayoutToolbar