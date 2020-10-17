import React, { useEffect, useState } from "react";
import { isNil } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid, IconButton, TextField, InputAdornment } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  text: {
    border: "none",
    borderRadius: "4px",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function MultiSelectBox({ options = [], onChange, values }) {
  const classes = useStyles();
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState([]);
  const [go, setGo] = useState({});
  const [back, setBack] = useState({});
  const [filter, setFilter] = useState({ go: "", back: "" });
  useEffect(() => {
    const selValues = values?.map((v) => v.id)
    setAvailable(options?.filter((item) => selValues?.indexOf(item.id) === -1));
    setSelected(values)
  }, [options]);

  const handleChange = (event, type) => {
    if (type === "go") {
      setGo({ ...go, [event.target.name]: event.target.checked });
    }
    if (type === "back") {
      setBack({ ...back, [event.target.name]: event.target.checked });
    }
  };

  const handleSelected = (op) => {
    if (op === "go") {
      const sel = [...selected, ...available.filter((item) => go[item.id])];
      setSelected(sel);
      setAvailable(available.filter((item) => !go[item.id]));
      setGo({});
      onChange(sel);
    }
    if (op === "back") {
      const sele = selected.filter((item) => !back[item.id]);
      setSelected(sele);
      setAvailable([...available, ...selected.filter((item) => back[item.id])]);
      setBack({});
      onChange(sele);
    }
  };

  const filtered = (values, pos) =>
    values.filter(
      (item) =>
        item?.name?.toLowerCase().indexOf(filter[pos]?.toLowerCase().trim()) !==
        -1
    );
  return (
    <Grid container className={classes.root}>
      <Grid item xs={5}>
        <TextField
          style={{ marginTop: 5, background: "white" }}
          margin="normal"
          required
          fullWidth
          value={filter.go}
          onChange={(e) => setFilter({ ...filter, go: e.target.value })}
          InputLabelProps={{
            shrink: false,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="filter"
                  onClick={() => setFilter({ ...filter, go: "" })}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <CloseIcon fontSize="small" size="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          id="available"
          placeholder="Filter Available"
          name="available"
          // autoComplete={item.id}
        />
        <Paper variant="outlined" style={{ minHeight: 200 }}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Available</FormLabel>
            <FormGroup>
              {filtered(available, "go").map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!isNil(go[item.id])}
                      onChange={(e) => handleChange(e, "go")}
                      name={item.id}
                    />
                  }
                  label={item.name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Paper>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "45px",
        }}
        item
        xs={1}
      >
        <div>
          {" "}
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => handleSelected("go")}
          >
            <ArrowForwardIcon style={{ color: "#EF793C" }} fontSize="large" />
          </IconButton>
        </div>
        <div>
          {" "}
          <IconButton
            onClick={() => handleSelected("back")}
            aria-label="delete"
            color="primary"
          >
            <ArrowBackIcon style={{ color: "#EF793C" }} fontSize="large" />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={5}>
        <TextField
          style={{ marginTop: 5, background: "white" }}
          margin="normal"
          required
          fullWidth
          onChange={(e) => setFilter({ ...filter, back: e.target.value })}
          InputLabelProps={{
            shrink: false,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="filter"
                  onClick={() => setFilter({ ...filter, back: "" })}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <CloseIcon fontSize="small" size="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={filter.back}
          variant="outlined"
          size="small"
          id="available"
          placeholder="Filter Selected"
          name="available"
          // autoComplete={item.id}
        />
        <Paper variant="outlined" style={{ minHeight: 200 }}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Selected</FormLabel>
            <FormGroup>
              {filtered(selected, "back").map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!isNil(back[item.id])}
                      onChange={(e) => handleChange(e, "back")}
                      name={item.id}
                    />
                  }
                  label={item.name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}
