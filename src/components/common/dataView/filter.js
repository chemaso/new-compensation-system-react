import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Grid, Typography, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CButton from "../ButtonWithLoading";
import { t } from '../../../i18n'

const useStyles = makeStyles({
  list: {
    width: 390,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    width: 400,
  },
});

export default function DataViewFilter({
  filterOpen,
  filterValues = {},
  setFilterOpen,
  loading = false,
  filters,
  onFilter = () => {},
}) {
  const classes = useStyles();
  const [form, setForm] = useState(filterValues);
  const handleFormChange = (e, label) => {
    setForm({
      ...form,
      [label]: e.target.value,
    });
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setFilterOpen(open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      style={{ position: "relative", minHeight: "100%" }}
      role="presentation"
    >
      <Grid
        style={{ padding: "20px", paddingRight: "10px" }}
        justify="space-between"
        alignItems="center"
        container
      >
        <Grid item>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {t('common.filter.title','Filters')}
          </Typography>
        </Grid>
        <Grid>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <List
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          maxHeight: "100%",
          marginBottom: 80,
          overflowY: "auto",
        }}
      >
        {filters.map((item, index) => {
          const value = item?.noSpaces ? form[item.id]?.replace(/\s+/g, '') : form[item.id]
          return (
            <Grid
              container
              key={index}
              justify="space-between"
              alignItems="center"
              style={{ marginBottom: 10 }}
            >
              <Grid item xs={3}>
                <InputLabel style={{ fontWeight: "bold" }} htmlFor={item.id}>
                  {item.label}:
                </InputLabel>
              </Grid>
              <Grid item>
                {item.type === "select" && (
                   <TextField
                   size="small"
                   id={item?.id}
                   select
                   fullWidth
                   value={form[item?.id] || ""}
                   onChange={(e) => handleFormChange(e, item?.id)}
                   variant="outlined"
                   style={{ width: "200px" }}
                 >
                   {item?.options?.map((option) => (
                     <MenuItem key={option.id} value={option.id}>
                       {option.name}
                     </MenuItem>
                   ))}
                 </TextField>
                )}
                {item.type === "text" && (
                  <TextField
                    size="small"
                    fullWidth
                    value={value || ""}
                    onChange={(e) => handleFormChange(e, item.id)}
                    inputProps={{
                      maxLength: item.maxLength || 200,
                    }}
                    style={{ width: "100%" }}
                    variant="outlined"
                    id={item.id}
                    type="text"
                    name={item.id}
                    autoComplete={item.id}
                    autoFocus={index === 0}
                  />
                )}
              </Grid>
            </Grid>
          );
        })}
      </List>

      <Grid
        container
        style={{
          position: "fixed",
          width: 380,
          bottom: 0,
          paddingBottom: "15px",
          background: "white",
        }}
      >
        <Grid item xs={12}>
          <Divider />
          <Grid container justify="flex-end" style={{ marginTop: 10 }}>
            <Button
              variant="contained"
              style={{ fontWeight: "bold", marginRight: 14 }}
              color="default"
              onClick={() => onFilter({})}
            >
               {t('common.filter.cancel','Clear')}
            </Button>
            <CButton
              variant="contained"
              onClick={() => onFilter(form)}
              loading={loading}
              style={{
                fontWeight: "bold",
                background:
                  "linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)",
                color: "white",
              }}
            >
               {t('common.filter.continue','Apply')}
            </CButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <React.Fragment>
      <Drawer
        classes={{ paper: classes.paper }}
        anchor="left"
        open={filterOpen}
        onClose={toggleDrawer(false)}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}
