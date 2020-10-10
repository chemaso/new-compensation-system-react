import React, { useState } from "react";

import { Grid, TextField, InputLabel } from "@material-ui/core";
import MultiSelectBox from "./MultiSelectBox";
import CheckboxList from "./CheckboxList";
import TreeView from "./TreeView";

const options = [
  {
    label: "Admin",
    id: "admin",
  },
  {
    label: "PMO",
    id: "pmo",
  },
  {
    label: "Manager",
    id: "manager",
  },
  {
    label: "Editor",
    id: "editor",
  },
  {
    label: "Operator",
    id: "operator",
  },
];

const Form = ({ onChange, form, permissions, formInputs = [] }) => {
  return (
    <>
      {formInputs.map((item) => {
        if (item.type === "treeview") {
          return (
            <Grid xs={12}>
              <InputLabel
                style={{ marginTop: 12, marginBottom: 12, color: "black" }}
                htmlFor={item.id}
              >
                {item.label}
              </InputLabel>
              <TreeView permissions={permissions} onChange={(v) => console.log(v)} />
            </Grid>
          );
        }
        if (item.type === "multiselect") {
          return (
            <Grid xs={12} style={{ marginRight: 20 }}>
              <InputLabel
                style={{ marginTop: 12, marginBottom: 12, color: "black" }}
                htmlFor={item.id}
              >
                {item.label}
              </InputLabel>
              <MultiSelectBox
                options={options}
                onChange={(e) => console.log(e)}
              />
            </Grid>
          );
        }
        if (item.type === "checkbox-list") {
          return (
            <CheckboxList
              options={options}
              item={item}
              onChange={(e) => console.log(e)}
            />
          );
        }
        return (
          <Grid item lg={5} sm={5} xs={12} style={{ marginRight: 30 }}>
            <InputLabel
              style={{ marginTop: 12, color: "black" }}
              htmlFor={item.id}
            >
              {item.label}
            </InputLabel>
            <TextField
              style={{ marginTop: 5, background: "white" }}
              margin="normal"
              required
              fullWidth
              InputLabelProps={{
                shrink: false,
              }}
              inputProps={{
                maxLength: item.maxLength || 200,
              }}
              variant="outlined"
              size="small"
              id={item.id}
              placeholder={item.label}
              name={item.id}
              autoComplete={item.id}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default Form;
