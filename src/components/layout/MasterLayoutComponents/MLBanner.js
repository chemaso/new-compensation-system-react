import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import NotificationsIcon from '@material-ui/icons/Notifications';

const MasterLayoutBanner = ({ title = 'Lorem Integrations - Order #129882' }) => {
  const [open, setOpen] = useState(true)
  return (
        <Grid container alignItems='center' justify='space-between' style={{ color: 'white', paddingLeft: open ? 30 : 10, height: open ? 80 : 40, background: 'linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)'}}>
         <Grid item>
          <Grid container alignItems='center'>  
            {open && <NotificationsIcon fontSize="large" />}
            <div>
              <Typography variant={open ? "h6" : 'subtle1'} style={{ paddingLeft: 20, fontWeight: 'bold'}}>
                {title}
                </Typography>
                {open && <Typography variant="caption" style={{ paddingLeft: 20 }}>
                lorem ipsu dolor sitem is at em
              </Typography>}
            </div>
          </Grid>
         </Grid>
         <Grid item>
         <IconButton onClick={() => setOpen(!open)}>
           {open ? <ExpandLessIcon style={{ color: 'white'}} fontSize='large' /> : <ExpandMoreIcon style={{ color: 'white'}} fontSize='small' /> }
         </IconButton>
         </Grid>
        </Grid>
  );
}

export default MasterLayoutBanner