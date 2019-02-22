import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../SideNav/SideNav.scss";
import UserMenu from '../UserMenu/UserMenu';
import { connect } from 'react-redux';
import { getUserData } from '../../ducks/reducer';
import UserImgPlaceholder from '../../images/userImgPlaceholder.jpg';
import axios from 'axios';
import kanooLogo from '../../images/kanoo_logo3.svg';

class SideNav extends Component {
  state = {
    toggle: false,
    profileImg: UserImgPlaceholder
  };

  async componentDidMount() {
    const res = await axios.get('/auth/userData')
    if (res.data) {
      await this.props.getUserData(res.data)
      await this.getProfileImg()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.img !== this.props.img) {
      if (this.props.img) {
        this.getprofileImg()
      } else {
        this.setState({
          profileImg: UserImgPlaceholder
        })
      }
    }
  }

  getProfileImg = async () => {
    const { user_id } = this.props.user
    let res = await axios.get(`/api/userInfo/${user_id}`)
    if (res.data[0].profile_pic) {
      await this.setState({
        profileImg: res.data[0].profile_pic
      })
    }
  }

  handleToggle() {
    this.setState({ toggle: true });
  }

  render() {
    const { profileImg } = this.state;

    return (
      <div className="side-navbar">
        <Link to='/dashboard'>
          <div>
            <img src={kanooLogo} alt="" />
            <h2
              style={{ margin: '5px' }}
              className='kanoo-text'
            >KANOO</h2>
          </div>
        </Link>
        <div>
          <Link onClick={() => this.handleToggle()} to="/dashboard">
            <div className='side-nav-icon-container'>
              <i class="fas fa-home side-nav-icon"></i>
              <p>Dashboard</p>
            </div>
          </Link>
          <Link onClick={() => this.handleToggle()} to="my-trips">
            <div className='side-nav-icon-container'>
              <i class="fas fa-suitcase side-nav-icon"></i>
              <p>My Trips</p>
            </div>
          </Link>
          <Link onClick={() => this.handleToggle()} to="/bucket-list">
            <div className='side-nav-icon-container'>
              <i class="fas fa-list-ul side-nav-icon"></i>
              <p>Bucket List</p>
            </div>
          </Link>
        </div>
        <div>
          < UserMenu
            profile_pic={profileImg}
          />
          <p style={{ marginTop: '25px' }}>Profile</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUserData })(SideNav);