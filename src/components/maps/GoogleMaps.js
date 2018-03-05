/* global google */
import mapStyles from '../config/mapStyles';
import React from 'react';

class GoogleMap extends React.Component {
  state = {
    center: { lat: 51.5085300, lng: -0.1257400 }
  };

  render() {
    return (
      <main>
        <div className="google-map" ref={element => this.mapCanvas = element}>
        </div>
      </main>
    );
  }

  resetBounds = () => {
    this.bounds = new google.maps.LatLngBounds();
    this.bounds.extend(this.props.start);
    this.bounds.extend(this.props.end);
  }

  componentDidUpdate() {
    this.bounds = new google.maps.LatLngBounds();

    if (this.props.start.lat && this.props.start.lng) {
      this.start.setPosition(this.props.start);
      this.bounds.extend(this.props.start);
    }

    if(this.props.end.lat && this.props.end.lng) {
      this.end.setPosition(this.props.end);
      this.bounds.extend(this.props.end);
    }

    if (this.props.start.lat && this.props.start.lng && this.props.end.lat && this.props.end.lng) {
      this.map.fitBounds(this.bounds);
      // generate the route between
    } else if (this.props.start.lat && this.props.start.lng) {
      this.map.setCenter(this.props.start);
    } else if (this.props.end.lat && this.props.end.lng) {
      this.map.setCenter(this.props.end);
    }
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.state.center,
      zoom: 14,
      styles: mapStyles
    });

    this.start = new google.maps.Marker({
      map: this.map
    });

    this.end = new google.maps.Marker({
      map: this.map
    });
  }

  componentWillUnmount() {
    this.map = null;
    this.marker = null;
    this.map = null;
  }

}

export default GoogleMap;
