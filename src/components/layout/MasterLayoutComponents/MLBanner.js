import React, { useState, useEffect } from 'react';

import { isNil } from 'lodash'

import {
  useLocation
} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { MenuSkeleton } from '../../common/Skeletons'
import { MasterLayoutBreadcrumbs as Breadcrumbs } from '../../common/Breadcrumbs'
import Icon from '../../common/Icon'

const MasterLayoutBanner = ({ items = [], isMobile, loading }) => {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [isMobile])
  const { pathname } = useLocation()
  const [levels] = items?.map((val) => {
      const current = val.route === pathname
      if (!current) {
        const subRoute = val.subcontent.find(item => pathname.indexOf(item.route) !== -1)
        if (isNil(subRoute)) {
          return false
        }
        return [val, subRoute]
      }
      return [val]
    })
    .filter((item) => item)
  const titleVal = levels?.map((val) => val.title).toString().replace(',', ' - ')
  const styles = { fontSize: 40 }
  return (
        <Grid container alignItems='center' justify='space-between' style={{ color: 'white', paddingLeft: open ? 30 : 10, height: open ? 80 : 40, background: 'linear-gradient(45deg, rgb(255, 96, 13) 30%, rgb(247, 170, 55) 90%)'}}>
         {!loading ? <Grid item>
          <Grid container alignItems='center'>  
            {open && Icon(pathname, styles)}
            <div>
              {open && <Typography variant={open ? "h6" : 'subtitle2'} style={{ paddingLeft: 20, fontWeight: 'bold'}}>
                {titleVal}
                </Typography>}
                <Breadcrumbs levels={levels} />
            </div>
          </Grid>
         </Grid>: <MenuSkeleton items={1} />}
         <Grid item>
         {!isMobile && <IconButton onClick={() => setOpen(!open)} style={{ padding: 9 }}>
           {open ? <ExpandLessIcon style={{ color: 'white'}} fontSize='large' /> : <ExpandMoreIcon style={{ color: 'white'}} fontSize='small' /> }
         </IconButton>}
         </Grid>
        </Grid>
  );
}

export default MasterLayoutBanner