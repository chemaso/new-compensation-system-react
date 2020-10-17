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
        if (item.type === "treeview") {
          return (
            <Grid xs={12}>
              <TreeView
                permissions={permissions}
                isEdit={item.isEdit}
                values={form[item.id] || []}
                item={item}
                onChange={(v) => handleForm(v, item.id)}
              />
            </Grid>
          );
        }
        if (item.type === "multiselect") {
          console.log()
          return (
            <Grid xs={12} style={{ marginRight: 20 }}>
              <InputLabel
                style={{ marginTop: 12, marginBottom: 12, color: "black" }}
                htmlFor={item.id}
              >
                {item.label}
              </InputLabel>
              <MultiSelectBox
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
              options={options}
              item={item}
              onChange={(v) => handleForm(v, item.id)}
            />
          );
        }

        const value = item.noSpaces
          ? form[item.id]?.replace(/\s+/g, "")
          : form[item.id];
        const error = errors[item.id];
        if (item.type === "select") {
          console.log(form)
          return (
            <Grid item lg={5} sm={5} xs={12} style={{ marginRight: 30 }}>
              <InputLabel
                style={{ marginTop: 12, color: "black" }}
                htmlFor={item.id}
              >
                {item.label}
              </InputLabel>
              <TextField
                size="small"
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
              error={error}
              helperText={!isNil(error) ? `${item.label} is required.` : ""}
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
