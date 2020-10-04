import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { TextField } from "@material-ui/core";

const InputPassword = ({ id, value, onChange, ...rest }) => {
  const [showP, showPassword] = useState(false);
  console.log(showP)
  return (
    <TextField
      id={id}
      type={showP ? "text" : "password"}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => showPassword(!showP)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showP ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...rest}
    />
  );
};

export default InputPassword;
