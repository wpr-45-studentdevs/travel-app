import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './UserMenu.scss'
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
    const {profile_pic} = this.props

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          id='menuButton'
          style={{
            backgroundImage: `url(${profile_pic})`
          }}
        />
        <div id='menu'>
            <Menu id='Menu'  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
            <Link to='/profile'><MenuItem id='menuItem' onClick={this.handleClose}>Profile</MenuItem> </Link>
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