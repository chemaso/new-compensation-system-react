import React from "react";
import AppsIcon from "@material-ui/icons/Apps";
import LockIcon from "@material-ui/icons/Lock";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import GroupIcon from '@material-ui/icons/Group';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AllOutIcon from '@material-ui/icons/AllOut';
import StorageIcon from '@material-ui/icons/Storage';
import BurstModeIcon from '@material-ui/icons/BurstMode';

const Icon = (item, styles) => {
    switch (true) {
      case (item.indexOf("user") !== -1):
        return <GroupIcon style={{ color: "white", ...styles }} />;
      case (item.indexOf("role") !== -1):
        return <AccountTreeIcon style={{ color: "white", ...styles }} />;
      case (item.indexOf("department") !== -1):
        return <AllOutIcon style={{ color: "white", ...styles }} />;
      case (item.indexOf("data") !== -1):
        return <StorageIcon style={{ color: "white", ...styles }} />;
      case (item.indexOf("image") !== -1):
        return <BurstModeIcon style={{ color: "white", ...styles }} />;
      case (item.indexOf("security") !== -1):
        return <LockIcon style={{ color: "white", ...styles }} />;
      case (item.indexOf("maintanence") !== -1):
        return <SettingsApplicationsIcon style={{ color: "white", ...styles }} />;
      case (item.indexOf("query") !== -1):
        return <ImageSearchIcon style={{ color: "white", ...styles }} />;
      default:
        return <AppsIcon style={{ color: "white", ...styles }} />;
    }
  };

  export default Icon