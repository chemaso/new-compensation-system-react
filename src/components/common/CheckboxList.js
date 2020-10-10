import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CheckboxList = ({ options, item, onChange = () => {} }) => {
  const [selected, setSelected] = useState({})
  const handleChange = (e) => {
    const selectedValues = { ...selected, [e.target.name]: e.target.checked}
    const val = options.filter((v) => selectedValues[v.id])
    setSelected(selectedValues)
    onChange(val)
  }
  return (
    <FormControl
      style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
      component="fieldset"
    >
      <FormLabel
        style={{ color: "black", marginBottom: 20 }}
        component="legend"
      >
        {item.label}
      </FormLabel>
      <FormGroup>
        <Grid container>
          {options.map((val) => {
              const checked = selected[val.id] ? true : false
              return (
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={val.id}
                  />
                }
                label={val.label}
              />
            </Grid>
          )})}
        </Grid>
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxList;
