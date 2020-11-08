import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CommonModal({ open, cancelText, acceptText, onCancel, onAccept, title, content }) {

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ fontWeight: 'bold'}} onClick={onCancel} color="default">
            {cancelText}
          </Button>
          <Button style={{ fontWeight: 'bold', color: '#ff600d'}} onClick={onAccept}>
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}