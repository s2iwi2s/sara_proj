import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import NestedMenuComponent from './NestedMenuComponent';

export default function MenuComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NestedMenuComponent />
        {/* {
          isUserLoggedIn && <>
            
            <MenuItem >
              <Link to="/end-user-list">Users</Link>
            </MenuItem>
            <MenuItem ><Link to="/address-list">Address</Link></MenuItem>
            <MenuItem ><Link to="/code-groups-list">Code Groups</Link></MenuItem>
            <Divider light />
          </>
        }
        {!isUserLoggedIn && <MenuItem key="loginId" ><Link to="/login" >Login</Link></MenuItem>}
        {isUserLoggedIn && <MenuItem key="logoutId" ><Link to="/logout" onClick={AuthenticationService.logout} >Logout</Link></MenuItem>} */}
      </Menu>
    </div>
  );
}
