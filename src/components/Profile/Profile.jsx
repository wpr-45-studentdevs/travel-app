import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserData } from '../../ducks/reducer'
import SideNav from '../SideNav/SideNav';
import './Profile.scss'
import { toggle } from '../../Logic/Logic'


class Profile extends Component {
  state = {
    userInfo: {},
    email: '',
    name: '',
    bio: '',
    img: '',
    edit: false
  }

  async componentDidMount() {
    const res = await axios.get('/auth/userData')
    if (res.data) {
      // await this.props.getUserData(res.data)
      this.getUserInfo()
    }
  }

  getUserInfo = async () => {
    const { user_id } = this.props.user
    let res = await axios.get(`/api/userInfo/${user_id}`)
    // console.log(res)
    await this.setState({
      userInfo: res.data[0],
      email: res.data[0].user_email,
      name: res.data[0].user_display_name,
      bio: res.data[0].user_bio,
      img: res.data[0].profile_pic
    })
  }

  showEdit = () => {
    this.setState({
      edit: toggle(this.state.edit)
    })
  }

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }

  updateUserInfo = async () => {
    const { user_id } = this.props.user
    const { email: user_email, name: user_display_name, bio: user_bio, img: profile_pic } = this.state
    await axios.put(`/api/userInfo/${user_id}`, { user_email, user_display_name, user_bio, profile_pic })
    this.getUserInfo()
    this.showEdit()
  }

  resetInputs = () => {
    const {userInfo} = this.state
    this.setState({
      email: userInfo.user_email,
      name: userInfo.user_display_name,
      bio: userInfo.user_bio,
      img: userInfo.profile_pic
    })
  }

  handleCancel = () => {
    this.showEdit()
    this.resetInputs()
  }

  render() {
    const { userInfo, email, name, bio, img, edit } = this.state
    return (
      <div>
        <Header 
        img={userInfo.profile_pic}/>
        <div className='body'>
          <div className='side-nav'>
            <SideNav />
          </div>
          <div className='profileBody'>
            <div className='profile-container'>
              <h1>Profile</h1>

              <div className='profile-img-container'>
                <img src={userInfo.profile_pic ? userInfo.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} alt="" />
              </div>


              <div className='profile-info-container'>
                {!edit &&
                  <i className="fas fa-edit"
                    onClick={this.showEdit}></i>
                }

                {
                  edit &&
                  <div>
                    <span>Image Url:</span>
                    <input onChange={e => this.handleChange('img', e.target.value)}
                      value={img} type="text" />
                  </div>
                }



                <div>
                  <span>Email: </span>
                  {edit ? <input onChange={e => this.handleChange('email', e.target.value)}
                    value={email} type="text" /> : userInfo.user_email}
                </div>

                <div>
                  <span>Display Name: </span>
                  {edit ? <input onChange={e => this.handleChange('name', e.target.value)}
                    value={name} type="text" /> : userInfo.user_display_name}
                </div>

                <div>
                  <span>Bio: </span>
                  {
                    edit ?
                      <div>
                        <textarea onChange={e => this.handleChange('bio', e.target.value)}
                          value={bio} type="text" cols="30" rows="10"></textarea>
                      </div>
                      :
                      userInfo.user_bio}
                </div>

                {edit &&
                  <div>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <button onClick={this.updateUserInfo}>Save</button>
                  </div>
                }


              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUserData })(Profile)
