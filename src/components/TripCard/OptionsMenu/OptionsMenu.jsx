import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
   colorSwitchBase: {
      color: 'teal',
      '&$colorChecked': {
         color: 'teal',
         '& + $colorBar': {
         backgroundColor: 'teal',
         },
      },
   },
   colorBar: {},
   colorChecked: {},
   });

class OptionsMenu extends React.Component {
   state = {
      anchorEl: null,
      completed: false,
      isPublic: false,
   };

   componentDidMount = async () => {
      await this.setState({
         completed: this.props.trip.completed,
         public: this.props.trip.completed,
      })
      console.log(this.state)
   }

   handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
   };

   handleClose = () => {
      this.setState({ anchorEl: null });
   };

   deleteTrip = async () => {
      const { getTrips } = this.props;
      const { trip_id } = this.props.trip;
      let res = await axios.delete(`/api/trip/${trip_id}`);
      alert(res.data.message)
      await this.props.closeModal();
      await getTrips();
   }

   handleCompletedToggle = async () => {
      this.setState({completed: !this.state.completed}, () => this.updateCompleted())
   }

   updateCompleted = async () => {
      const { trip_id } = this.props.trip;
      const { completed } = this.state;
      let res = await axios.put(`/api/trip/completed`, { trip_id, completed });
   }

   handlePublicToggle = async () => {
      this.setState({isPublic: !this.state.isPublic}, () => this.updatePublic())
   }

   updatePublic = async () => {
      const { trip_id } = this.props.trip;
      const { isPublic } = this.state;
      let res = await axios.put('/api/trip/public', { trip_id, public: isPublic })
   }


   render() {
      const { anchorEl } = this.state;
      const { classes } = this.props;
      return (
         <div>
            <Button
               aria-owns={anchorEl ? 'simple-menu' : undefined}
               aria-haspopup="true"
               onClick={this.handleClick}
               style={{
                  color: 'white',
                  fontSize: '12px',
                  border: '1px solid white',
               }}
            >
               Trip Options
            </Button>
            <Menu
               id="simple-menu"
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={this.handleClose}
            >
               <MenuItem > 
                  Private 
                  < Switch
                     checked={this.state.isPublic}
                     onChange={this.handlePublicToggle}
                     classes={{
                        switchBase: classes.colorSwitchBase,
                        checked: classes.colorChecked,
                        bar: classes.colorBar,
                     }}
                  />
                  Public 
               </MenuItem>
               <MenuItem >
                  Trip Completed
                  <Switch
                     checked={this.state.completed}
                     onChange={this.handleCompletedToggle}
                     classes={{
                        switchBase: classes.colorSwitchBase,
                        checked: classes.colorChecked,
                        bar: classes.colorBar,
                     }}
                  />
               </MenuItem>
               <MenuItem onClick={() => this.deleteTrip()}> Delete Trip </MenuItem>
            </Menu>
         </div>
      );
   }
}

export default withStyles(styles)(OptionsMenu);