import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './CSS';
import MenuComponent from './MenuComponent';
import { Link } from 'react-router-dom';
import AuthenticationService from '../../security/AuthenticationService'


import faker from 'faker'// const useStyles = makeStyles((theme) => ({
import { Avatar } from '@material-ui/core';

export default function AppBarComponent() {
 const classes = useStyles();
 const userName = AuthenticationService.getLoginUserName();
 const isLogin = AuthenticationService.isUserLoggedIn()
 return (
  <div className={classes.appbar_root}>
   <AppBar position="static">
    <Toolbar>
     <IconButton
      edge="start"
      className={classes.appbar_menuButton}
      color="inherit"
      aria-label="open drawer"
     >
      <MenuComponent />
     </IconButton>
     <Avatar src={faker.image.business(60, 60)} />
     <Typography className={classes.appbar_title} variant="h6" noWrap>
      <Link to="/">
       <b>{faker.company.companyName()}</b>
      </Link>
     </Typography>
     {isLogin && <div>Welcome <b>{userName}</b></div>}

     <div className={classes.appbar_search}>
      <div className={classes.appbar_searchIcon}>
       <SearchIcon />
      </div>
      <InputBase
       placeholder="Search…"
       classes={{
        root: classes.appbar_inputRoot,
        input: classes.appbar_inputInput,
       }}
       inputProps={{ 'aria-label': 'search' }}
      />
     </div>
    </Toolbar>
   </AppBar>
  </div>
 );
}
