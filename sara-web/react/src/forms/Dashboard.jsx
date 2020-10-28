import React from 'react';
import faker from 'faker'
import { URL_BASE } from '../api/Utils'
import { useStyles } from '../forms/common/CSS'

import AuthenticationService from '../security/AuthenticationService'
import { Avatar, Box, Button, Divider, Grid } from '@material-ui/core';

const Dashboard = props => {
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
          <Box mx="auto" py={5}><Divider /></Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It’ll blow your mind.</span></h2>
              <p className="lead">{faker.random.words(50)}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Avatar src={faker.image.business(500, 500)} className={classes.avatar_70} />
            </Grid>
          </Grid>

          <Box mx="auto" py={5}><Divider /></Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Avatar src={faker.image.transport(500, 500)} className={classes.avatar_70} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h2 className="featurette-heading">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span></h2>
              <p className="lead">{faker.random.words(20)}</p>
            </Grid>
          </Grid>

          <Box mx="auto" py={5}><Divider /></Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
              <p className="lead">{faker.random.words(30)}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Avatar src={faker.image.sports(500, 500)} className={classes.avatar_70} />
            </Grid>
          </Grid>

        </>
      }
    </ >
  )
}
export default Dashboard;