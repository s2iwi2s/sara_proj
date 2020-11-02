import React from 'react';
// import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AuthenticationService from '../../security/AuthenticationService';

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
  const [open, setOpen] = React.useState(true);

  const handleClick = (e) => {
    setOpen(!open);
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
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Users" onClick={() => history.push('/end-user-list')} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Address" onClick={() => history.push('/address-list')} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Code Groups" onClick={() => history.push('/code-groups-list')} />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Student" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New" onClick={() => history.push('/student-detail/-1')} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="List" onClick={() => history.push('/student-list')} />
              </ListItem>
            </List>
          </Collapse>
        </>
      }

      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        {isUserLoggedIn && <ListItemText primary="Logout" onClick={() => history.push('/logout')} />}
        {!isUserLoggedIn && <ListItemText primary="Login" onClick={() => history.push('/login')} />}
      </ListItem>
    </List>
  );
}
