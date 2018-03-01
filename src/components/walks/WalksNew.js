/* global google */

import React from 'react';
import Axios from 'axios';
import WalksForm from './WalksForm';
import Auth from '../../lib/Auth';

class WalksNew extends React.Component {
  state = {
    walk: {
      start: {},
      end: {},
      distance: '',
      time: ''
    },
    errors: {}
  }

  handleGooglePlace = (place, origin) => {
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    const walk = Object.assign({}, this.state.walk, { [origin]: location });
    this.setState({ walk }, () => {
      if(Object.keys(this.state.walk.start).length !== 0 && Object.keys(this.state.walk.end).length !== 0) {
        this.calculateDistance();
      }
    });
  }

  callback = (response) => {
    const walk = Object.assign({}, this.state.walk, {distance: response.rows[0].elements[0].distance.text, time: response.rows[0].elements[0].duration.text});
    this.setState({walk});
    console.log(this.state.walk);
  }

  calculateDistance() {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [this.state.walk.start],
      destinations: [this.state.walk.end],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC
    }, this.callback);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.walk);
    Axios
      .post('/api/walks', this.state.walk, { headers: {'Authorization': `Bearer ${Auth.getToken()}` }})
      .then(() => this.props.history.push('/profile'))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }

  render() {
    return (
      <WalksForm
        handleSubmit={this.handleSubmit}
        handleGooglePlace={this.handleGooglePlace}
        errors={this.state.errors}
        distance={this.state.walk.distance}
        duration={this.state.walk.time}
        name={this.state.walk.name}
      />
    );
  }
}

export default WalksNew;
