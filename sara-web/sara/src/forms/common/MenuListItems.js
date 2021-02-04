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
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import ArchiveIcon from '@material-ui/icons/Archive';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { PAGE_URL } from '../../api/Utils'
import { Divider } from '@material-ui/core';
import useSecurityServices from '../../security/useSecurityServices';

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
  const { isUserLoggedIn } = useSecurityServices()
  const isLoggedIn = isUserLoggedIn();

  const history = useHistory();
  const classes = useStyles();
  const [store, setStore] = React.useState({});

  const doHandleClick = (sourceName) => {
    console.log(`[MenuListItems.doHandleClick] sourceName=${sourceName}, store=>`, store)

    let isopen = store[sourceName] ? false : true;
    setStore({
      ...store,
      [sourceName]: isopen
    })
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
        isLoggedIn && <>
          <ListItem button onClick={() => history.push(PAGE_URL.BILLING)}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Billing" />
          </ListItem>

          <ListItem button onClick={() => history.push(PAGE_URL.ACCOUNT_PAYABLES_SETTINGS_LIST)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Payables Settings" />
          </ListItem>
          <ListItem button onClick={() => history.push(PAGE_URL.GRADE_LEVEL_PAYABLES_LIST)}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Level Payables" />
          </ListItem>
          <ListItem button onClick={() => history.push(PAGE_URL.STUDENT_LIST)}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Student" />
          </ListItem>

          <ListItem button onClick={() => history.push(PAGE_URL.SCHOOL_LIST)} >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="School" />
          </ListItem>

          <ListItem button onClick={() => history.push(PAGE_URL.USER_LIST)} >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>

          <ListItem button onClick={() => history.push(PAGE_URL.CODE_GROUPS_LIST)}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="Code Groups" />
          </ListItem>

          <ListItem button onClick={() => doHandleClick("processing")}>
            <ListItemIcon>
              <AllInclusiveIcon />
            </ListItemIcon>
            <ListItemText primary="Processing" />
            {store.processing ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.processing} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => history.push(PAGE_URL.CLOSE_PERIOD_DETAIL_URL)} >
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary="Close Period" />
              </ListItem>
              <ListItem button className={classes.nested} >
                <ListItemIcon>
                  <SystemUpdateAltIcon />
                </ListItemIcon>
                <ListItemText primary="Generate Billing" />
              </ListItem>
            </List>
          </Collapse>
        </>
      }

      {isLoggedIn &&
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

      {!isLoggedIn &&
        <ListItem button onClick={() => history.push(PAGE_URL.LOGIN)} >
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>}

    </List>
  );
}
