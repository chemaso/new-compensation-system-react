import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import { omit } from "lodash";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {
  Checkbox,
  Paper,
  InputLabel,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import AllInboxIcon from "@material-ui/icons/AllInbox";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "25px",
    "&:focus > $content $label, &:hover > $content $label": {
      backgroundColor: "#f9f2db",
    },
  },
  paper: {
    height: "auto",
    width: "90%",
    padding: "10px",
    paddingLeft: 0,
  },
  content: {
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
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
          <Typography variant="body1">{labelText}</Typography>
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
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function TreeViewComponent({
  permissions,
  values = [],
  item,
  onChange,
}) {
  let all = [];
  const map = (v) =>
    v?.map((item) => {
      if (item.leafList.length === 0) {
        all = [...all, item.code];
        return item.code;
      }
      all = [...all, item.code];
      return {
        [item.code]: map(item.leafList),
      };
    });
  map(permissions?.leafList);
  const classes = useStyles();
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState({});
  useEffect(() => {
    let sel = {};
    values.map((v) => (sel = { ...sel, [v.code]: true }));
    setExpanded(values.map((v) => v.code));
    setSelected(sel);
  }, [values]);
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleCheck = (e) => {
    let value = {
      ...selected,
      [e.target.name]: e.target.checked,
    };
    if (!e.target.checked) {
      value = omit(value, [e.target.name]);
    }
    onChange(value);
    setSelected(value);
  };
  const handleSelectAll = () => {
    setExpanded(all);
    const selection = all.reduce((acc, curr) => {
      return { ...acc, [curr]: true };
    }, {});
    onChange(selection);
    setSelected(selection);
  };
  const handleClearAll = () => {
    setExpanded([]);
    setSelected({});
    onChange({});
  };
  const builder = (v) =>
    v?.map((item) => {
      const checked = selected[item.code] ? true : false;
      if (item.leafList.length === 0) {
        return (
          <StyledTreeItem
            key={item.code}
            checked={checked}
            handleCheckbox={handleCheck}
            name={item.code}
            nodeId={item.code}
            labelText={item.description}
          />
        );
      }
      return (
        <StyledTreeItem
          key={item.code}
          checked={checked}
          handleCheckbox={handleCheck}
          name={item.code}
          nodeId={item.code}
          labelText={item.description}
        >
          {builder(item.leafList)}
        </StyledTreeItem>
      );
    });
  return (
    <>
      <InputLabel
        style={{ marginTop: 12, marginBottom: 12, color: "black" }}
        htmlFor={item.id}
      >
        {item.label}
      </InputLabel>
      <Paper
        variant="outlined"
        style={{
          height: "auto",
          padding: 10,
          width: "90%",
          position: "relative",
        }}
      >
        <Tooltip title="Clear All">
          <IconButton
            size="small"
            onClick={handleClearAll}
            style={{
              position: "absolute",
              right: "30px",
              top: "-35px",
              zIndex: 1000,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            aria-label="delete"
          >
            <ClearAllIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Select All">
          <IconButton
            size="small"
            color="secondary"
            onClick={handleSelectAll}
            style={{
              position: "absolute",
              right: "0",
              top: "-35px",
              zIndex: 1000,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            aria-label="delete"
          >
            <AllInboxIcon />
          </IconButton>
        </Tooltip>
        <TreeView
          className={classes.root}
          style={{ marginTop: 10 }}
          defaultExpanded={[]}
          defaultCollapseIcon={<ArrowDropDownIcon fontSize="large" />}
          defaultExpandIcon={<ArrowRightIcon fontSize="large" />}
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
