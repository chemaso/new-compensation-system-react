import React, { useState, useEffect } from "react";

import { Grid, TextField, InputLabel } from "@material-ui/core";
import MultiSelectBox from "./MultiSelectBox";
import CheckboxList from "./CheckboxList";
import TreeView from "./TreeView";
import { isEmpty } from "lodash";

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

const Form = ({ onChange, form = {}, permissions = [], formInputs = [] }) => {
  const [proccesed, setProccesed] = useState({});

  useEffect(() => {
    if (!isEmpty(form)) {
      setProccesed(form)
    }
  }, [form])

  const handleForm = (value, name) => {
    setProccesed({
      ...proccesed,
      [name]: value,
    });
    onChange({
      ...proccesed,
      [name]: value,
    })
  };
  return (
    <>
      {formInputs.map((item) => {
        if (item.type === "treeview") {
          return (
            <Grid xs={12}>
              <TreeView
                permissions={permissions}
                values={form[item.id] || []}
                item={item}
                onChange={(v) => handleForm(v, item.id)}
              />
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
                onChange={(v) => handleForm(v, item.id)}
              />
            </Grid>
          );
        }
        if (item.type === "checkbox-list") {
          return (
            <CheckboxList
              options={options}
              item={item}
              onChange={(v) => handleForm(v, item.id)}
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
              style={{
                marginTop: 5,
                background: item.disabled ? "#ececec" : "white",
              }}
              margin="normal"
              required
              disabled={item.disabled}
              value={form[item.id]}
              fullWidth
              onChange={(v) => handleForm(v.target.value, item.id)}
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
