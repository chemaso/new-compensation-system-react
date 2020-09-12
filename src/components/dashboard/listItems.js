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

export const ListItems = ({ items, selected, onChange }) => {
  return (
  <div>
    {items.map((item) => {
        const isSelected = selected === item
      return (
  <ListItem onClick={() => onChange(item)} button style={{ background: isSelected ? 'linear-gradient(45deg, #f7aa37 30%, #ff600d 90%)' : 'transparent' }} >
  <ListItemIcon>
    <DashboardIcon style={{ color: 'white' }} />
  </ListItemIcon>
  <ListItemText primary={item} style={{ color: 'white' }} />
</ListItem>
    )})}
  </div>
)};