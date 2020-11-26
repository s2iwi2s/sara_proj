import React from 'react';
// import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AuthenticationService from '../../security/AuthenticationService';
import { PAGE_URL } from '../../api/Utils'
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MenuListItems() {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

  const history = useHistory();
  const classes = useStyles();

  const [store, setStore] = React.useState({});

  const doHandleClick = (sourceName) => {
    console.log(`[NestedMenuComponent.doHandleClick] sourceName=${sourceName}, store=>`, store)

    let isopen = store[sourceName] ? false : true;
    setStore({
      ...store,
      [sourceName]: isopen
    })
    //setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    // subheader={
    //  <ListSubheader component="div" id="nested-list-subheader">
    //   Menu
    //  </ListSubheader>
    // }
    >
      {
        isUserLoggedIn && <>
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceWalletIcon onClick={() => history.push(PAGE_URL.BILLING)} />
            </ListItemIcon>
            <ListItemText primary="Billing" onClick={() => history.push(PAGE_URL.BILLING)} />
          </ListItem>

          <ListItem button onClick={() => doHandleClick("accountPayablesSettings")}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Account Payables Settings" />
            {store.accountPayablesSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.accountPayablesSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_DETAIL_URL + '/-1')} >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_LIST)}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => doHandleClick("gradeLevelPayables")}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Grade Level Payables" />
            {store.gradeLevelPayables ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.gradeLevelPayables} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.GRADE_LEVEL_PAYABLES_DETAIL_URL + '/-1')} >

                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.GRADE_LEVEL_PAYABLES_LIST)}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => doHandleClick("students")}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Student" />
            {store.students ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.students} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.STUDENT_DETAIL_URL + '/-1')} >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.STUDENT_LIST)}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => doHandleClick("school")} >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="School" />
            {store.school ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.school} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.SCHOOL_DETAIL_URL + '/-1')} >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.SCHOOL_LIST)}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => doHandleClick("users")} >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {store.users ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.users} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.USER_DETAIL_URL + '/-1')} >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.USER_LIST)} >
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => doHandleClick("codeGroups")}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="Code Groups" />
            {store.codeGroups ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.codeGroups} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.CODE_GROUPS_DETAIL_URL + '/-1')}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.CODE_GROUPS_LIST)}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" />
              </ListItem>
            </List>
          </Collapse>

        </>
      }

      {isUserLoggedIn &&
        <>
          <Divider />
          <ListItem button onClick={() => history.push(PAGE_URL.LOGOUT)} >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      }

      {!isUserLoggedIn &&
        <ListItem button onClick={() => history.push(PAGE_URL.LOGIN)} >
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>}

    </List>
  );
}
