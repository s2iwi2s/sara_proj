import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuListItems from './MenuListItems';


const drawerWidth = 240;
const useStylesDrawer = makeStyles((theme) => ({
 drawer: {
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
 },
 drawerOpen: {
  width: drawerWidth,
  transition: theme.transitions.create('width', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.enteringScreen,
  }),
 },
 drawerClose: {
  transition: theme.transitions.create('width', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(7) + 1,
  [theme.breakpoints.up('sm')]: {
   width: theme.spacing(9) + 1,
  },
 },
 toolbar: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
}));

export default function MiniDrawer(props) {
 const classes = useStylesDrawer();
 const theme = useTheme();

 return (
  <Drawer
   variant="permanent"
   className={clsx(classes.drawer, {
    [classes.drawerOpen]: props.drawerOpen,
    [classes.drawerClose]: !props.drawerOpen,
   })}
   classes={{
    paper: clsx({
     [classes.drawerOpen]: props.drawerOpen,
     [classes.drawerClose]: !props.drawerOpen,
    }),
   }}
  >
   <div className={classes.toolbar}>
    <IconButton onClick={props.doHandleDrawerClose}>
     {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
   </div>
   <Divider />
   <MenuListItems />
  </Drawer>
 );
}
