import React from 'react';
// import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import { useHistory } from 'react-router-dom';
import { PAGE_URL } from '../../api/Utils'
import { Divider } from '@material-ui/core';

import { useAuthServices } from '../../security/useAuthServices'

export default function MenuListItems() {
  const useAuths = useAuthServices()
  const isLoggedIn = useAuths.isUserLoggedIn();

  const history = useHistory();
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
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceWalletIcon onClick={() => history.push(PAGE_URL.BILLING)} />
            </ListItemIcon>
            <ListItemText primary="Billing" onClick={() => history.push(PAGE_URL.BILLING)} />
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
