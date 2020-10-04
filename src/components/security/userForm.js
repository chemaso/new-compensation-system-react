import React from 'react';

import {
    Grid,
    Typography,
    Button,
    Divider,
    TextField,
    InputLabel,
  } from "@material-ui/core";
  
const UserForm = () => {
    return (
        <>
        <Grid item lg={5} sm={5} xs={12}>
        <InputLabel
          style={{ marginTop: 12, color: "black" }}
          htmlFor="userName"
        >
          Username:
        </InputLabel>
        <TextField
          style={{ marginTop: 5 }}
          margin="normal"
          required
          fullWidth
          InputLabelProps={{
            shrink: false,
          }}
          variant="outlined"
          size="small"
          id="userName"
          placeholder="Username"
          name="userName"
          autoComplete="userName"
        />
        <InputLabel
          style={{ marginTop: 12, color: "black" }}
          htmlFor="name"
        >
          First Name:
        </InputLabel>
        <TextField
          style={{ marginTop: 5 }}
          margin="normal"
          required
          fullWidth
          InputLabelProps={{
            shrink: false,
          }}
          variant="outlined"
          size="small"
          id="userName"
          placeholder="Username"
          name="name"
          autoComplete="userName"
        />
        <InputLabel
          style={{ marginTop: 12, color: "black" }}
          htmlFor="lastName"
        >
          Last Name:
        </InputLabel>
        <TextField
          style={{ marginTop: 5 }}
          margin="normal"
          required
          fullWidth
          InputLabelProps={{
            shrink: false,
          }}
          variant="outlined"
          size="small"
          id="lastName"
          placeholder="Username"
          name="userName"
          autoComplete="userName"
        />
      </Grid>
      <Grid style={{ marginLeft: 20 }} item lg={6} sm={6} xs={12}>
        <InputLabel
          style={{ marginTop: 12, color: "black" }}
          htmlFor="userName"
        >
          Email:
        </InputLabel>
        <TextField
          style={{ marginTop: 5 }}
          margin="normal"
          required
          fullWidth
          InputLabelProps={{
            shrink: false,
          }}
          variant="outlined"
          size="small"
          id="email"
          placeholder="Username"
          name="userName"
          autoComplete="userName"
        />
        <InputLabel
          style={{ marginTop: 12, color: "black" }}
          htmlFor="name"
        >
          Login:
        </InputLabel>
        <TextField
          style={{ marginTop: 5 }}
          margin="normal"
          required
          fullWidth
          InputLabelProps={{
            shrink: false,
          }}
          variant="outlined"
          size="small"
          id="login"
          placeholder="Username"
          name="name"
          autoComplete="userName"
        />

      </Grid>
      </>
    )
}

export default UserForm