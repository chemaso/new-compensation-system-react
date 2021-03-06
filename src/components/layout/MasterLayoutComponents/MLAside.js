import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Avatar from '@material-ui/core/Avatar';
import { Typography } from "@material-ui/core";
import CButton from '../../common/ButtonWithLoading'
import { t } from '../../../i18n'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const MasterLayoutAside = ({ user, open, onAsideOpen, onLogOut }) => {
  const classes = useStyles();

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onAsideOpen(!open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {/* ["User Profile", "Settings"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))*/}
      </List>
      <Divider style={{ marginBottom: 20}} />
    </div>
  );
  
  return (
        <React.Fragment>
          <Drawer
            anchor='right'
            open={open}
            onClose={toggleDrawer()}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Avatar style={{ width: 80, height: 80, background: 'linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)' }} >
                <Typography style={{ fontSize: 30 }}>
                    {user.username.substring(0, 1).toUpperCase()}
                    {user.username.substring(1, 2).toUpperCase()}
                </Typography>
            </Avatar>
            </div>
            <Typography style={{ fontWeight: 'bold', textAlign: 'center',  marginTop: 10 }}>{t('master.aside.welcome','Welcome')}, {user.username}.</Typography>
            {list('right')}
            <CButton
                onClick={onLogOut}
                loading={false}
                fullWidth
                variant="contained"
                color="myBtn"
            >
            {t('master.aside.logout','Log Out')}
            </CButton>
          </Drawer>
        </React.Fragment>
  );
}

export default MasterLayoutAside