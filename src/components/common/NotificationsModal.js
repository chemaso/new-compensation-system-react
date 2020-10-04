import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function NotificationsModal({
  open,
  handleModal,
  content,
  title,
  buttons = [],
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleModal(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttons.map((item) => (
            <Button
              style={item.style === 'secondary' ? { fontWeight: 'bold'} : { fontWeight: 'bold', color: '#ff600d'}}
              onClick={item.action}
              color="default"
            >
              {item.label}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
}
