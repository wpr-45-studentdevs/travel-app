import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './UserButton.scss'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';



class UserMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = async () => {
    this.handleClose();
    const res = await axios.get('/auth/logout');
    console.log(res.data.message)
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          id='menuButton'
        >
        User
        </Button>
        <div id='menu'>
            <Menu id='Menu'  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
              <MenuItem id='menuItem' onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem id='menuItem' onClick={this.handleClose}>Change Profile Picture</MenuItem>
              <Link to='/' style={{textDecoration: 'none'}}>
                <MenuItem id='menuItem' onClick={this.logout} >Logout</MenuItem>
              </Link>
            </Menu>
        </div>
    </div>
    );
  }
}

export default withRouter(UserMenu)