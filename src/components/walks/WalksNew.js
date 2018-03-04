/* global google */

import React from 'react';
import Axios from 'axios';
import WalksForm from './WalksForm';
import Auth from '../../lib/Auth';
import mapStyles from '../config/mapStyles';
import GoogleMap from '../maps/GoogleMaps';


class WalksNew extends React.Component {
  state = {
    walk: {
      start: {},
      end: {},
      distance: '',
      duration: '',
      name: '',
      date: ''
    },
    errors: {}
  }

  // componentDidMount() {
  //   this.map = new google.maps.Map(this.mapCanvas, {
  //     center: { lat: 51.5085300, lng: -0.1257400 },
  //     zoom: 14,
  //     styles: mapStyles
  //   });
  //   this.marker = new google.maps.Marker({
  //     map: this.map,
  //     position: this.state.center
  //   });
  // }
  // componentWillUnmount() {
  //   this.map = null;
  //   this.marker = null;
  //   this.map = null;
  // }

  handleChange = ({ target: { name, value } }) => {
    const walk = Object.assign({}, this.state.walk, { [name]: value });
    this.setState({ walk });
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

  calculateDistance() {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [this.state.walk.start],
      destinations: [this.state.walk.end],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC
    }, this.callback);
  }

  callback = (response) => {
    const walk = Object.assign({}, this.state.walk, {distance: response.rows[0].elements[0].distance.text , duration: response.rows[0].elements[0].duration.text});
    this.setState({walk});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/dogs/${this.props.match.params.id}/walks`, this.state.walk, { headers: {'Authorization': `Bearer ${Auth.getToken()}` }})
      .then(() => this.props.history.push(`/dogs/${this.props.match.params.id}`))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <GoogleMap />
          </div>
          <div className="col-md-6">
            <WalksForm
              handleSubmit={this.handleSubmit}
              handleGooglePlace={this.handleGooglePlace}
              handleChange={this.handleChange}
              errors={this.state.errors}
              distance={this.state.walk.distance}
              duration={this.state.walk.duration}
              name={this.state.walk.name}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WalksNew;
