import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import ListItem from "@material-ui/core/ListItem";
import { isNil } from "lodash";
import { useLocation } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Collapse from "@material-ui/core/Collapse";
import LayersIcon from "@material-ui/icons/Layers";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: "white,",
  },
  nested: {
    height: 35,
    paddingLeft: theme.spacing(4),
  },
}));

export const ListItems = ({ items, history }) => {
  const [selected, setSelected] = useState("Dashboard");
  const [subSelected, setSubSelected] = useState("");
  const { pathname } = useLocation();
  
  const [levels] = items
    ?.map((val) => {
      const current = val.route === pathname;
      if (!current) {
        const subRoute = val.subcontent.find(
          (item) => pathname.indexOf(item.route) !== -1
        );
        if (isNil(subRoute)) {
          return false;
        }
        return [val, subRoute];
      }
      return [val];
    })
    .filter((item) => item);

  const titleVal = levels?.map((val) => val.title) || [];

  useEffect(() => {
    if (titleVal?.length > 1) {
      setSelected("");
      setSubSelected(titleVal[1]);
      return;
    }
    setSelected(titleVal[0]);
    setSubSelected("");
  }, [items, pathname]);
  const onChange = (value, { section, route }) => {
    const path = route.charAt(0) === "/" ? route : `/${route}`;
    if (section === "title") {
      setSubSelected("");
      setSelected(value);
      history.replace(path);
    }
    if (section === "subcontent") {
      setSubSelected(value);
      history.replace(path);
    }
  };
  return (
    <div>
      {items?.map((item) => {
        const isSelected = selected === item.title;
        return (
          <>
            <ListItem
              key={item.title}
              button
              onClick={() =>
                onChange(item.title, { section: "title", route: item.route })
              }
              style={{
                height: 35,
                background:
                  isSelected && isEmpty(subSelected)
                    ? "linear-gradient(45deg, #f7aa37 30%, #ff600d 90%)"
                    : "transparent",
              }}
            >
              <ListItemIcon>
                <DashboardIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={item.title} style={{ color: "white" }} />
              {!isEmpty(item.subcontent) && (
                <IconButton>
                  {isSelected ? (
                    <ExpandLess style={{ color: "white" }} />
                  ) : (
                    <ExpandMore style={{ color: "white" }} />
                  )}
                </IconButton>
              )}
            </ListItem>
            {!isEmpty(item.subcontent) &&
              item.subcontent.map((val) => {
                const isSubSelected = !isEmpty(
                  item.subcontent.filter((v) => v.title === subSelected)
                );
                const subSelectionValue = val.title === subSelected;

                return (
                  <Collapse
                    key={val.title}
                    in={isSelected || isSubSelected}
                    timeout="auto"
                  >
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        style={{
                          paddingLeft: 30,
                          height: 35,
                          background: subSelectionValue
                            ? "linear-gradient(45deg, #f7aa37 30%, #ff600d 90%)"
                            : "transparent",
                        }}
                        onClick={() =>
                          onChange(val.title, {
                            section: "subcontent",
                            route: val.route,
                          })
                        }
                      >
                        <ListItemIcon>
                          <LayersIcon style={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={val.title}
                          style={{ color: "white" }}
                        />
                      </ListItem>
                    </List>
                  </Collapse>
                );
              })}
          </>
        );
      })}
    </div>
  );
};
