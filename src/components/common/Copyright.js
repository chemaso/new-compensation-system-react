
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { t } from '../../i18n'

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {t('common.copyright.copy', 'Copyright © ')}
        <Link color="inherit" href="#">
        {t('common.copyright.content', 'SICE - All rights reserved.')}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }