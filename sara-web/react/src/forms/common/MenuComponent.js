import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import AuthenticationService from '../../security/AuthenticationService'

export default function MenuComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <DehazeIcon className="text-light" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          isUserLoggedIn && <>
            <MenuItem className="bg-dark"><Link className="text-light" to="/end-user-list">Users</Link></MenuItem>
            <MenuItem className="bg-dark"><Link className="text-light" to="/address-list">Address</Link></MenuItem>
            <MenuItem className="bg-dark"><Link className="text-light" to="/code-groups-list">Code Groups</Link></MenuItem>
            <Divider light />
          </>
        }
        {!isUserLoggedIn && <MenuItem key="loginId" className="bg-dark"><Link to="/login" className="text-light">Login</Link></MenuItem>}
        {isUserLoggedIn && <MenuItem key="logoutId" className="bg-dark "><Link to="/logout" className="text-light" onClick={AuthenticationService.logout} >Logout</Link></MenuItem>}
      </Menu>
    </div>
  );
}
