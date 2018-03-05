/* global google */
import React from 'react';
import Axios from 'axios';
import WalksForm from './WalksForm';
import Auth from '../../lib/Auth';
import GoogleMap from '../maps/GoogleMaps';


class WalksNew extends React.Component {
  state = {
    walk: {
      start: {},
      end: {},
      distance: '',
      duration: '',
      name: '',
      date: '',
      return: ''
    },
    errors: {}
  }

  handleChange = ({ target }) => {
    let walk = {};
    if (target.name === 'return') {
      if (target.checked) {
        walk = Object.assign({}, this.state.walk, { return: true });
      } else {
        walk = Object.assign({}, this.state.walk, { return: false });
      }
      this.calculateDistance();
    } else {
      walk = Object.assign({}, this.state.walk, { [target.name]: target.value });
    }
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
    let distance = null;
    if (this.state.walk.return) {
      distance = parseFloat(response.rows[0].elements[0].distance.text) * 2;
    } else {
      distance = parseFloat(response.rows[0].elements[0].distance.text);
    }
    const walk = Object.assign({}, this.state.walk, {distance});
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
            <GoogleMap
              start={this.state.walk.start}
              end={this.state.walk.end}
            />
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
