
import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Avatar, Box, FormControlLabel, Switch } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SchoolIcon from '@material-ui/icons/School';

import { useStyles } from './CSS';
import { PAGE_URL, URL_BASE } from '../../api/Utils'
import { useAuth } from '../../security/AuthenticationProvider';
import MenuComponent from './MenuComponent';

export default function AppBarComponent(props) {
 const [userObj, setUserObj] = useAuth();

 // const [userObj, setUserObj] = useState({
 //  userName: '',
 //  userFullName: 'Guest',
 //  schoolName: '',
 //  schoolLogo: ''
 // });

 const classes = useStyles();
 // const userName = AuthenticationService.getLoginUserName();
 // const isLogin = AuthenticationService.isUserLoggedIn();

 // printme(userObj);

 return (
  < div className={classes.appbar_root} >
   {console.log('[AppBarComponent.return] userObj=>', userObj)}
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

     {userObj && userObj.schoolLogo && <Avatar src={(URL_BASE + PAGE_URL.LOGO_URL + userObj.schoolLogo)} />}
     {(!userObj || !userObj.schoolLogo) && <SchoolIcon />}

     <Typography className={classes.appbar_title} variant="h6" noWrap>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
       {userObj && <b>{userObj.schoolName}</b>}
      </Link>
     </Typography>
     {userObj && <div>Welcome <b>{userObj.userFullName}</b></div>}

     {/* <div className={classes.appbar_search}>
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
     </div> */}

     <Box pl={5}>
      <FormControlLabel control={<Switch checked={props.darkMode} onChange={props.toggleDarkMode} />} />
     </Box>
    </Toolbar>
   </AppBar>
  </div >
 );
}
