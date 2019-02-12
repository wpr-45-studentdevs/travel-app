import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './UserButton.scss'
import { Link } from 'react-router-dom';



function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }


  return (
    <div>
      <Button
        aria-owns={anchorEl ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        id='menuButton'
      >
      User
      </Button>
      <div id='menu'>
          <Menu id='Menu'  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem id='menuItem' onClick={handleClose}>Profile</MenuItem>
            <MenuItem id='menuItem' onClick={handleClose}>Change Profile Picture</MenuItem>
            <MenuItem id='menuItem' onClick={handleClose}><Link to='/'>Logout</Link></MenuItem>
          </Menu>
      </div>
    </div>
  );
}

export default SimpleMenu;