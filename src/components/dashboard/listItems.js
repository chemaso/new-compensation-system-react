import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button >
      <ListItemIcon>
        <DashboardIcon style={{ color: 'white', }} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" style={{ color: 'white' }} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Orders" style={{ color: 'white' }} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Customers" style={{ color: 'white' }} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Reports" style={{ color: 'white' }} />
    </ListItem>
    <ListItem button style={{ background: 'linear-gradient(45deg, #f7aa37 30%, #ff600d 90%)' }}>
      <ListItemIcon>
        <LayersIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Integrations" style={{ color: 'white' }} />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader style={{ color: 'white' }} inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Current month" style={{ color: 'white' }} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Last quarter" style={{ color: 'white' }} />
    </ListItem>
  </div>
);