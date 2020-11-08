import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { t } from "../../i18n";

const useStyles = makeStyles(() => ({
    action: {
        fontWeight: 'bold',
        background: 'transparent',
        boxShadow: 'none',
        color: 'white !important'
      },
      root: {
        width: '100vw',
        borderRadius: 0,
      },
      message: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 0,
        width: '100%;'
      },
      snack: {
        bottom: '0 !important',
        right: '0 !important'
      },
      icon: {
        paddingTop: 11,
      }
}))

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notifications = ({ open, onClose, message, severity = 'success' }) => {
    const classes = useStyles();
    return (
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        classes={{ root: classes.snack }}
        open={open}
        autoHideDuration={60000}
        onClose={onClose}
      >
        <Alert classes={{ icon: classes.icon, root: classes.root, message: classes.message }}  severity={severity}>
            <span style={{ paddingRight: 45, paddingLeft: 5 }}>{message}</span>
            <div style={{ display: 'flex' }}>
            <Button color="secondary" size="small" onClick={onClose} className={classes.action}>
              {t('common.notifications.button','Continue')}
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
            </div>
          </Alert>
      </Snackbar>
    )
}

export default Notifications