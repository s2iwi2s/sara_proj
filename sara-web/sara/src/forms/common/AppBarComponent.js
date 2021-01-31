
import React from 'react';
import clsx from 'clsx';
import { AppBar, IconButton, Toolbar, Typography, Avatar, Box, FormControlLabel, Switch, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import SchoolIcon from '@material-ui/icons/School';

import { PAGE_URL, URL_BASE } from '../../api/Utils'
import MiniDrawer from './MiniDrawer';
import { useTheme } from '../../api/useTheme';
import { useGlobalVariable } from '../../providers/GlobalVariableProvider'

export default function AppBarComponent() {
 const { userLogin } = useGlobalVariable();

 const useAppTheme = useTheme()

 const drawerWidth = 240;
 const useStylesAppBar = makeStyles((theme) => ({
  root: {
   display: 'flex',
  },
  appBar: {
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
   }),
  },
  appBarShift: {
   marginLeft: drawerWidth,
   width: `calc(100% - ${drawerWidth}px)`,
   transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
   }),
  },
  menuButton: {
   marginRight: 36,
  },
  hide: {
   display: 'none',
  },
  title: {
   flexGrow: 1,
   display: 'none',
   [theme.breakpoints.up('sm')]: {
    display: 'block',
    paddingLeft: theme.spacing(1)
   },
   //backgroundColor: fade(theme.palette.common.white, 0.25),
  },
 }));
 // const [userObj, setUserObj] = useState({
 //  userName: '',
 //  userFullName: 'Guest',
 //  schoolName: '',
 //  schoolLogo: ''
 // });

 const classes = useStylesAppBar();
 // const userName = AuthenticationService.getLoginUserName();
 // const isLogin = AuthenticationService.isUserLoggedIn();

 // printme(userObj);

 const [drawerOpen, setDrawerOpen] = React.useState(false);

 const doHandleDrawerOpen = () => {
  setDrawerOpen(true);
  console.log(`[AppBarComponent.doHandleDrawerOpen] drawerOpen=>${drawerOpen}`)
 }
 const doHandleDrawerClose = () => {
  setDrawerOpen(false);
  console.log(`[AppBarComponent.doHandleDrawerClose] doHandleDrawerClose=>${drawerOpen}`)
 }
 return (
  < div className={classes.root} >
   {console.log('[AppBarComponent.return] userLogin=>', userLogin)}
   <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
     [classes.appBarShift]: drawerOpen,
    })}>
    <Toolbar>
     <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={doHandleDrawerOpen}
      edge="start"
      className={clsx(classes.menuButton, {
       [classes.hide]: drawerOpen,
      })}
     >
      <MenuIcon />
     </IconButton>

     {userLogin && userLogin.schoolLogo && <Avatar src={(URL_BASE + PAGE_URL.LOGO_URL + userLogin.schoolLogo)} />}
     {(!userLogin || !userLogin.schoolLogo) && <SchoolIcon />}

     <Typography className={classes.title} variant="h6" noWrap>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
       {userLogin && <b>{userLogin.schoolName}</b>}
      </Link>
     </Typography>
     {userLogin && <div>Welcome <b>{userLogin.userFullName}</b></div>}

     <Box pl={5}>
      <FormControlLabel control={<Switch checked={useAppTheme.props.darkMode} onChange={() => useAppTheme.toggleDarkMode()} />} />
     </Box>
    </Toolbar>
   </AppBar>
   <MiniDrawer drawerOpen={drawerOpen} doHandleDrawerClose={doHandleDrawerClose} />
  </div >
 );
}
