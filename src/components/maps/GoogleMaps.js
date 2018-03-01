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

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.state.center,
      zoom: 14,
      styles: mapStyles
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      position: this.state.center
    });
  }
  componentWillUnmount() {
    this.map = null;
    this.marker = null;
    this.map = null;
  }

}

export default GoogleMap;
