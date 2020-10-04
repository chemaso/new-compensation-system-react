import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppsIcon from "@material-ui/icons/Apps";
import DnsIcon from "@material-ui/icons/Dns";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LaptopIcon from '@material-ui/icons/Laptop';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles({
  root: {
    marginRight: 30,
    marginLeft: 10,
    overflow: "visible",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CommonCard({ item, index, history }) {
  const Icons = [
    <AppsIcon
      style={{
        fontSize: "77px",
        color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
      }}
    />,
    <DnsIcon
      style={{
        fontSize: "77px",
        color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
      }}
    />,
    <EqualizerIcon
      style={{
        fontSize: "77px",
        color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
      }}
    />,
    <LaptopIcon
      style={{
        fontSize: "77px",
        color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
      }}
    />,
    <AppsIcon
    style={{
      fontSize: "77px",
      color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
    }}
  />,
  <DnsIcon
    style={{
      fontSize: "77px",
      color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
    }}
  />,
  <EqualizerIcon
    style={{
      fontSize: "77px",
      color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
    }}
  />,
  <LaptopIcon
    style={{
      fontSize: "77px",
      color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
    }}
  />,
  ];
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card
      className={classes.root}
      style={{
        background:
          index === 0
            ? "linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)"
            : "#cccccc",
      }}
    >
      <Grid container>
        <Grid style={{ position: "relative" }} item xs={3}>
          <Card
            style={{
              position: "absolute",
              left: "-25px",
              minHeight: "50%",
              minWidth: "50%",
              marginTop: "15%",
              boxShadow: "none",
            }}
          >
            {Icons[index]}
          </Card>
        </Grid>
        <Grid item>
          <CardContent>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                color: index === 0 ? "white" : "#2b2b2b",
              }}
              component="h2"
            >
              {item.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => history.replace(item.route)}
              style={{
                fontWeight: "bold",
                color: index === 0 ? "white" : "#2b2b2b",
              }}
              size="small"
              endIcon={<ArrowRightAltIcon />}
            >
              View
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
