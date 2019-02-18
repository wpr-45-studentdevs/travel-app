import React, { Component } from "react"
import "./Header.scss";
import UserMenu from '../Header/UserButton/UserButton';
import Logo from '../../images/kanoo_logo3.svg'
import axios from 'axios'
import {connect} from 'react-redux'
import { getUserData } from '../../ducks/reducer'


class Header extends Component {

  state = {
    profileImg: 'https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'
  }

  async componentDidMount() {
    const res = await axios.get('/auth/userData')
    if (res.data) {
      await this.props.getUserData(res.data)
     await this.getprofileImg()
    }
  }

  componentDidUpdate (prevProps) {
    // console.log(prevProps)
    console.log(prevProps.img !== this.props.img)
    if(prevProps.img !== this.props.img) {
      if(this.props.img){
        this.getprofileImg()
      } else {
        this.setState({
          profileImg: 'https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'
        })
      }
    }
  }

  getprofileImg = async () => {
    const {user_id} = this.props.user
    let res = await axios.get(`/api/userInfo/${user_id}`)
    if(res.data[0].profile_pic) {
      await this.setState({
        profileImg: res.data[0].profile_pic
      })
    }
  }

  render() {
    const {profileImg} = this.state
    return (
      <div className="Header">
        <div id="mainHead">
          <img src={Logo} alt='logo' className='logo' />
          <h1>Kanoo</h1>
          <div id='headerSpace'></div>
          <div className="userButtons">
            <UserMenu 
            profile_pic={profileImg}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUserData})(Header);
