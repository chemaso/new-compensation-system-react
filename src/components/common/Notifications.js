import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    action: {
        fontWeight: 'bold',
        background: 'transparent',
        boxShadow: 'none',
        color: '#ed5e2a !important'
      },
}))

const Notifications = ({ open, onClose, message }) => {
    const classes = useStyles();
    return (
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={onClose} className={classes.action}>
              Continue
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    )
}

export default Notifications