import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import { omit } from 'lodash'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Checkbox, Paper } from '@material-ui/core';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '25px',
    '&:focus > $content $label, &:hover > $content $label': {
      backgroundColor: '#f9f2db',
    },
  },
  paper: {
    height: 'auto',
    width: '90%',
    padding: '10px',
    paddingLeft: 0
  },
  content: {
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, name, handleCheckbox, checked, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <Checkbox name={name} onChange={handleCheckbox} checked={checked} />
          <Typography variant="body1">
            {labelText}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function TreeViewComponent({ permissions, onChange }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState({});

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleCheck = (e) => {
    let value = {
      ...selected, [e.target.name]: e.target.checked
    }
    if (!e.target.checked) {
      value = omit(value, [e.target.name])
    }
    onChange(value)
    setSelected(value)
  }
  const builder = (v) => v?.map((item) => {
    const checked = selected[item.code] ? true : false
    if (item.leafList.length === 0) {
      return (
        <StyledTreeItem checked={checked} handleCheckbox={handleCheck} name={item.code} nodeId={item.code} labelText={item.description} />
      )
    }
    return (
      <StyledTreeItem checked={checked} handleCheckbox={handleCheck} name={item.code} nodeId={item.code} labelText={item.description}>
        {builder(item.leafList)}
      </StyledTreeItem>
    )
  })

  return (
    <>
    <Paper variant="outlined" style={{ height: 'auto', padding: 10, width: '90%' }}>
    <TreeView
      className={classes.root}
      defaultExpanded={[]}
      defaultCollapseIcon={<ArrowDropDownIcon fontSize='large' />}
      defaultExpandIcon={<ArrowRightIcon fontSize='large' />}
      defaultEndIcon={<div style={{ width: 44 }} />}
      onNodeToggle={handleToggle}
      onNodeSelect={() => {}}
      expanded={expanded}
    >
      {builder(permissions?.leafList)}
    </TreeView>
    </Paper>
    </>
  );
}