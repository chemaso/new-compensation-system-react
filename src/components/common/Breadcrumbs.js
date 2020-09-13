import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import {
  useHistory,
} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff3b',
    height: theme.spacing(3),
    color: 'white',
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
        backgroundColor: '#f7f7f78f',
      },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: '#ffffff3b',
    },
  },
}))(Chip);

export const MasterLayoutBreadcrumbs = ({ levels = [] }) => {
  const history = useHistory()
  const handleClick = (value) => {
    history.replace(value)
  }
  return (
    <Breadcrumbs separator={<span style={{ color: 'white'}}>/</span>} aria-label="breadcrumb" style={{ marginLeft: 20 }}>
      <StyledBreadcrumb
        label="Home"
        icon={<HomeIcon fontSize="small" style={{ color: 'white' }} />}
        onClick={() =>handleClick('')}
      />
      {levels.map((item) => (
        <StyledBreadcrumb
          label={item.title}
          onClick={() => handleClick(item.route)}
        />
      ))}
    </Breadcrumbs>
  );
}
