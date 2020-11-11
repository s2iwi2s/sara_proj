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

export default function NestedMenuComponent() {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

  const history = useHistory();
  const classes = useStyles();

  const [store, setStore] = React.useState({});
  const [open, setOpen] = React.useState(true);

  const handleClick = (sourceName) => {
    console.log(`[NestedMenuComponent.handleClick] sourceName=${sourceName}, store=>`, store)

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
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Billing" onClick={() => history.push(PAGE_URL.BILLING)} />
          </ListItem>

          <ListItem button onClick={() => handleClick("students")}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Student" />
            {store.students ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.students} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" onClick={() => history.push(PAGE_URL.STUDENT_DETAIL_URL + '/-1')} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" onClick={() => history.push(PAGE_URL.STUDENT_LIST)} />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="School" onClick={() => handleClick("school")} />
            {store.school ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.school} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" onClick={() => history.push(PAGE_URL.SCHOOL_DETAIL_URL + '/-1')} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" onClick={() => history.push(PAGE_URL.SCHOOL_LIST)} />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" onClick={() => handleClick("users")} />
            {store.users ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.users} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" onClick={() => history.push(PAGE_URL.USER_DETAIL_URL + '/-1')} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" onClick={() => history.push(PAGE_URL.USER_LIST)} />
              </ListItem>
            </List>
          </Collapse>
          {/* <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Address" onClick={() => history.push(PAGE_URL.ADDRESS_LIST)} />
          </ListItem> */}

          <ListItem button onClick={() => handleClick("codeGroups")}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="Code Groups" />
            {store.codeGroups ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={store.codeGroups} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" onClick={() => history.push(PAGE_URL.CODE_GROUPS_DETAIL_URL + '/-1')} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" onClick={() => history.push(PAGE_URL.CODE_GROUPS_LIST)} />
              </ListItem>
            </List>
          </Collapse>

        </>
      }

      {isUserLoggedIn && <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" onClick={() => history.push(PAGE_URL.LOGOUT)} />
      </ListItem>}

      {!isUserLoggedIn && <ListItem button>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary="Login" onClick={() => history.push(PAGE_URL.LOGIN)} />
      </ListItem>}

    </List>
  );
}
