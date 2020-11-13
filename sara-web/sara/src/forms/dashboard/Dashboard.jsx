import React from 'react';
import faker from 'faker'
import { URL_BASE } from '../../api/Utils'
import { useStyles } from '../common/CSS'

import AuthenticationService from '../../security/AuthenticationService'
import { Avatar, Box, Button, Divider, Grid } from '@material-ui/core';
// import Chart from './Chart';

export default function Dashboard(props) {
  const classes = useStyles();
  console.log(`process.env.NODE_ENV= ${process.env.NODE_ENV}`)
  console.log(`URL_BASE= ${URL_BASE}`)

  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  return (
    <>
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


      {
        isUserLoggedIn &&
        <>
          {/* <Chart /> */}
        </>
      }
    </ >
  )
}