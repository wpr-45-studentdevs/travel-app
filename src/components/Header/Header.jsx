import React, { Component } from "react"
import "./Header.scss";
import UserMenu from '../UserMenu/UserMenu';
import Logo from '../../images/kanoo_logo3.svg'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserData } from '../../ducks/reducer'
import UserImgPlaceholder from '../../images/userImgPlaceholder.jpg'


class Header extends Component {

  state = {
    profileImg: UserImgPlaceholder
  }

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

  render() {
    const { profileImg } = this.state
    return (
      <div className="Header">
        <div id="mainHead">
          <img src={Logo} alt='logo' className='logo' />
          <h1>Kanoo</h1>
          <div id='headerSpace'></div>
          <div className="userButtons">
            <UserMenu
              profile_pic={profileImg} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUserData })(Header);
