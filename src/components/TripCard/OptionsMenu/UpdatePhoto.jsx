import React, { Component } from "react";
import "./updatePhotoModal.scss";
import Axios from "axios";

export class UpdatePhoto extends Component {
  state = { image: "" };

  handleChange = image => {
    this.setState({ image });
    console.log(this.state.image);
    console.log(this.props.trip);
  };

  UpdatePhoto = async () => {
    const { trip_id } = this.props.trip;
    
    await Axios.put(`/api/updatePhoto/${trip_id}`, {
      photo_url: this.state.image
    });
  };

  render() {
    return (
      <div>
        {this.props.toggle === true ? (
          <>
            <input
              placeholder="New Photo URL"
              onChange={e => this.handleChange(e.target.value)}
              type="url"
            />
            <button onClick={() => this.UpdatePhoto()}>Save</button>
          </>
        ) : 'Change main photo'}
      </div>
    );
  }
}

export default UpdatePhoto;
