import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
      buttonSuccess: {
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
        },
      },
      fabProgress: {
        color: 'white',
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
      buttonProgress: {
        color: 'white',
        position: 'absolute',
        top: '55%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
}))

export default function CButton({ children, buttonClassname, onClick, loading = false, ...rest }) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Button
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={loading}
                onClick={onClick}
                {...rest}
            >
                {loading ? '' : children}
        </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}