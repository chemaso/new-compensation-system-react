import React from "react";

import { Grid, TextField, InputLabel, MenuItem } from "@material-ui/core";
import { isNil } from "lodash";
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

const Form = ({
  onChange,
  form = {},
  permissions = [],
  formInputs = [],
  errors = {},
}) => {
  const handleForm = (value, name) => {
    onChange({
      ...form,
      [name]: value,
    });
  };
  return (
    <>
      {formInputs.map((item) => {
        const error = errors[item.id];
        if (item.type === "treeview") {
          return (
            <Grid xs={12}>
              <TreeView
                permissions={permissions}
                error={!isNil(error)}
                helperText={!isNil(error) ? `${item.label} ${error}.` : ""}
                isEdit={item.isEdit}
                required={item.required}
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
                required={item.required}
              >
                {item.label}
              </InputLabel>
             {!isNil(error) && <span style={{ color: '#f44336'}}>{item.label} {error}.</span>}
              <MultiSelectBox
                required={item.required}
                values={form[item.id] || []}
                options={item?.options}
              
                onChange={(v) => handleForm(v, item.id)}
              />
            </Grid>
          );
        }
        if (item.type === "checkbox-list") {
          return (
            <CheckboxList
              required={item.required}
              options={options}
              item={item}
              onChange={(v) => handleForm(v, item.id)}
            />
          );
        }
        let value = form[item.id]
        if (item.noSpaces) {
          value = value?.replace(/\s+/g, "")
        }
        if (item.onlyLowerCase) {
          value = value?.toLowerCase()
        }
        if (item.type === "select") {
          return (
            <Grid item lg={5} sm={5} xs={12} style={{ marginRight: 30 }}>
              <InputLabel
                style={{ marginTop: 12, color: "black" }}
                htmlFor={item.id}
                required={item.required}
              >
                {item.label}
              </InputLabel>
              <TextField
                size="small"
                error={!isNil(error)}
                required={item.required}
                style={{
                  marginTop: 5,
                  background: item.disabled ? "#ececec" : "white",
                }}
                id={item.id}
                select
                placeholder={item.label}
                fullWidth
                value={form[item.id] || ""}
                InputLabelProps={{
                  shrink: false,
                }}
                helperText={!isNil(error) ? `${item.label} ${error}.` : ""}
                onChange={(e) => handleForm(e.target.value, item.id)}
                variant="outlined"
              >
                {item?.options?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          );
        }
        return (
          <Grid item lg={5} sm={5} xs={12} style={{ marginRight: 30 }}>
            <InputLabel
              style={{ marginTop: 12, color: "black" }}
              htmlFor={item.id}
              required={item.required}
            >
              {item.label}
            </InputLabel>
            <TextField
              style={{
                marginTop: 5,
                background: item.disabled ? "#ececec" : "white",
              }}
              margin="normal"
              required={item.required}
              error={!isNil(error)}
              helperText={!isNil(error) ? `${item.label} ${error}.` : ""}
              disabled={item.disabled}
              value={value}
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
