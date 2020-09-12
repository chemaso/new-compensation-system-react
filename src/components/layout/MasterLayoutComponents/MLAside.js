import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Avatar from '@material-ui/core/Avatar';
import { Typography } from "@material-ui/core";
import CButton from '../../common/ButtonWithLoading'

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
        {["User Profile", "Settings"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider style={{ marginBottom: 20}} />
    </div>
  );
  const [firstName, lastName] = user.name.split(" ")
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
                    {firstName.substring(0, 1).toUpperCase()}
                    {lastName.substring(0, 1).toUpperCase()}
                </Typography>
            </Avatar>
            </div>
            <Typography style={{ fontWeight: 'bold', textAlign: 'center',  marginTop: 10 }}>Welcome, {user.name}.</Typography>
            {list('right')}
            <CButton
                onClick={onLogOut}
                loading={false}
                fullWidth
                variant="contained"
                color="myBtn"
            >
            Log Out
            </CButton>
          </Drawer>
        </React.Fragment>
  );
}

export default MasterLayoutAside