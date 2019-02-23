import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserData } from '../../ducks/reducer'
import SideNav from '../SideNav/SideNav';
import './Profile.scss'
import { toggle } from '../../Logic/Logic'
import Slider from 'react-slick'
import UserImgPlaceholder from '../../images/userImgPlaceholder.jpg'


class Profile extends Component {
  state = {
    userInfo: {},
    email: '',
    name: '',
    bio: '',
    img: '',
    edit: false,
    friends: [],
    friend: '',
    showAdd: false
  }

  async componentDidMount() {
    const res = await axios.get('/auth/userData')
    if (res.data) {
      // await this.props.getUserData(res.data)
      this.getUserInfo()
      this.getFriends()
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
    const { userInfo } = this.state
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

  getFriends = async () => {
    const { user_id } = this.props.user
    const res = await axios.get(`/api/userFriends/${user_id}`)
    this.setState({
      friends: res.data
    })
  }

  showFriendsToAdd = () => {
    this.setState({
      showAdd: toggle(this.state.showAdd)
    })
  }

  addFriend = async () => {
    const {user_id} = this.props.user
    const {friend: user_email} = this.state
    const res = await axios.post(`/api/friend/${user_id}`, {user_email})
    if(res.data.friendAdded){
      this.getFriends()
      this.showFriendsToAdd()
    } else {
      alert(res.data.message)
    }
  }

  removeFriend = async (friend_id) => {
    const {user_id} = this.props.user
    await axios.delete(`/api/friend/${user_id}/${friend_id}`)
    this.getFriends()
  }


  render() {
    const { userInfo, email, name, bio, img, edit, friends, showAdd } = this.state
    const friendDisplay = friends.map((friend, i) => {
      let backgroundImg;
      if (friend.profile_pic) {
        backgroundImg = friend.profile_pic
      } else {
        backgroundImg = UserImgPlaceholder
      }
      return (
        <div key={i} className='friend-container' style={{ width: 'fit-content' }}>
          <div className='friend-img' style={{ backgroundImage: `url(${backgroundImg})` }}>
          <i onClick={()=>this.removeFriend(friend.friend_id)} class="fas fa-trash-alt"></i>
          </div>
          <label htmlFor="">{friend.user_display_name}</label>
        </div>
      )
    })
    let friendLength = 1;
    if (friendDisplay.length > 1 && friendDisplay.length < 5) {
      friendLength = friendDisplay.length - 1
    } else if (friendDisplay.length >= 5) {
      friendLength = 5
    }
    let scrollAmount = 1;
    if (friendLength > 1) {
      scrollAmount = friendLength - 1
    }

    const settings = {
      dots: false,
      speed: 500,
      infinite: true,
      slidesToShow: friendLength,
      slidesToScroll: scrollAmount
    }

    return (
      <div>
        <Header
          img={userInfo.profile_pic} />
        <div className='body'>
          <div className='side-nav'>
            <SideNav />
          </div>
          <div className='profileBody'>
            <div className='profile-container'>
              <h1>Profile</h1>

              <div className='profile-img-container'>
                <img src={userInfo.profile_pic ? userInfo.profile_pic : UserImgPlaceholder} alt="" />
              </div>


              <div className='profile-info-container'>
                {!edit &&
                  <i className="fas fa-edit"
                    onClick={this.showEdit}></i>
                }

                {
                  edit &&
                  <div className={edit && 'edit'}>
                    <span>Image Url: </span>
                    <input onChange={e => this.handleChange('img', e.target.value)}
                      value={img} type="text" />
                  </div>
                }



                <div className={edit && 'edit'}>
                  <span>Email: </span>
                  {edit ? <input onChange={e => this.handleChange('email', e.target.value)}
                    value={email} type="text" /> : userInfo.user_email}
                </div>

                <div className={edit && 'edit'}>
                  <span>Display Name: </span>
                  {edit ? <input onChange={e => this.handleChange('name', e.target.value)}
                    value={name} type="text" /> : userInfo.user_display_name}
                </div>

                <div className={edit ? 'edit' : 'bio-box'}>
                  <span>Bio: </span>
                  {
                    edit ?
                      <textarea onChange={e => this.handleChange('bio', e.target.value)}
                        value={bio} type="text" cols="35" rows="6"></textarea>
                      :
                      <p>{userInfo.user_bio}</p>
                  }
                </div>

                {edit &&
                  <div className='profile-buttons'>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <button onClick={this.updateUserInfo}>Save</button>
                  </div>
                }


              </div>

              <div>
                <h3>Friends:</h3>

                <Slider {...settings} className='profile-slider'>
                  {friendDisplay}
                </Slider>
                {
                  showAdd ?

                    <div>
                      <input type="text" placeholder="Your friend's email" 
                      onChange={e=>this.handleChange('friend', e.target.value)}/>
                      <button onClick={this.addFriend}><i className="fas fa-plus"></i></button>
                      <button onClick={this.showFriendsToAdd}><i class="fas fa-window-close"></i></button>
                    </div>
                    :
                    <button onClick={this.showFriendsToAdd}>Add Friend</button>
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
