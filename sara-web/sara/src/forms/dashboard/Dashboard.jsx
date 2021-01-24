import React from 'react';
import faker from 'faker'
import { URL_BASE } from '../../api/Utils'
import { useStyles } from '../common/CSS'

import AuthenticationService from '../../security/AuthenticationService'
import { Avatar, Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import Chart from './Chart';
import StackedBarChart from './StackedBarChart';
import CustomContentOfTooltip from './CustomContentOfTooltip';

export default function Dashboard() {
  const classes = useStyles();
  console.log(`process.env.NODE_ENV= ${process.env.NODE_ENV}`)
  console.log(`URL_BASE= ${URL_BASE}`)

  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  return (
    <>{
      !isUserLoggedIn &&
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Avatar src={faker.image.fashion(140, 140)} className={classes.avatar_40} />
          <h2>{faker.commerce.productName()}</h2>
          <p>{faker.random.words(30)}</p>
          <p><Button variant="contained" color="primary" href="#">View details</Button></p>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Avatar src={faker.image.people(140, 140)} className={classes.avatar_40} />
          <h2>{faker.commerce.productName()}</h2>
          <p>{faker.random.words(30)}</p>
          <p><Button variant="contained" color="primary" href="#">View details</Button></p>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Avatar src={faker.image.food(140, 140)} className={classes.avatar_40} />
          <h2>{faker.commerce.productName()}</h2>
          <p>{faker.random.words(30)}</p>
          <p><Button variant="contained" color="primary" href="#">View details</Button></p>
        </Grid>
      </Grid>
    }

      {
        isUserLoggedIn &&
        <>
          <Box component={Paper} elevation={3} variant="elevation" px={3} py={3} m="auto">
            <Typography variant="h4">Chart samples click <a href="https://recharts.org/en-US/examples">here</a></Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <Chart />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StackedBarChart />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomContentOfTooltip />
              </Grid>
            </Grid>
          </Box>
        </>
      }
    </ >
  )
}