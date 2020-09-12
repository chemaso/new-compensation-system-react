import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from '../../dashboard/listItems'
import BannerLogo from '../../../assets/images/sice-logo.png'

const MasterLayoutDrawer = ({ open, onCloseDrawer, classes }) => {
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <img style={{ height: 35, marginTop: 4 }} alt='sice logo' src={BannerLogo} />
                <IconButton onClick={onCloseDrawer}>
                    <ChevronLeftIcon style={{ color: '#f17f2d' }} />
                </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
        </Drawer>
    );
}

export default MasterLayoutDrawer