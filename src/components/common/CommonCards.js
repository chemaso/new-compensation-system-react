import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Icon from './Icon'
import { t } from '../../i18n'

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
  const classes = useStyles();
  const styles = {
    fontSize: "70px",
    padding: '4px',
    color: index === 0 ? "rgb(255, 96, 13)" : "#cccccc",
  }
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
              background: '#FAFAFA',
              left: "-25px",
              minHeight: "50%",
              minWidth: "50%",
              marginTop: "15%",
              boxShadow: "none",
            }}
          >
            {Icon(item.route, styles)}
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
              {t(`common.${item.title.toLowerCase()}`, item.title)}
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
              {t('common.cards.button', 'View')}
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
