import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ExpirationModal({ open, handleModal, time }) {

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Session Expire Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your session will expire in {time} seconds. Do you want to extend the session?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={time <= 0} style={{ fontWeight: 'bold'}} onClick={() => handleModal('out')} color="default">
            Log Out
          </Button>
          <Button disabled={time <= 0} style={{ fontWeight: 'bold', color: '#ff600d'}} onClick={() => handleModal('continue')}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}