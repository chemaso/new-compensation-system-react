import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export const DashboardSkeleton = ({ items = 5 }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const array = [...Array(items).keys()]
    return (
        <Grid container style={{ margin: '5px 20px' }}>
            {array.map((item) => (
                <Grid key={item} item lg={4} sm={6} xs={12} className='ml-2'>
                    <Skeleton variant="text" style={{ marginBottom: 5, width: isMobile ? '100%' : '90%' }} />
                    <Skeleton variant="rect" style={{ width: isMobile ? '100%' : '90%', marginBottom: 10 }} height={150} />
                </Grid>
            ))}
        </Grid>
    )
}

export const MenuSkeleton = ({  items = 5 }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const array = [...Array(items).keys()]
    return (
        <Grid container style={{ margin: '15px 20px' }}>
            {array.map((item) => (
                <Grid key={item} item xs={12} className='ml-2' style={{ marginBottom: 10 }}>
                    <Skeleton variant="text" style={{ background: '#e6e6e636', marginBottom: 5, width: isMobile ? '90%' : '80%' }} />
                    <Skeleton variant="text" style={{ background: '#e6e6e636', marginBottom: 5, width: isMobile ? '70%' : '60%' }} />
                </Grid>
            ))}
        </Grid>
    )
}
