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
      distance: ''
    },
    errors: {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleGooglePlace = (place, origin) => {
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lat()
    };

    const walk = Object.assign({}, this.state.walk, { [origin]: location });
    this.setState({ walk }, () => {
      if(Object.keys(this.state.walk.start).length !== 0 && Object.keys(this.state.walk.end).length !== 0) {
        this.calculateDistance();
      }
    });
  }

  calculateDistance() {
    console.log('use google distance matrix to calculate distance between both start and end locations');
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [this.state.walk.start],
      destinations: [this.state.walk.end],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC
    });
  }

  render() {
    return (
      <WalksForm
        handleSubmit={this.handleSubmit}
        handleGooglePlace={this.handleGooglePlace}
        errors={this.state.errors}
      />
    );
  }
}

export default WalksNew;
