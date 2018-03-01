// /* global google */
import mapStyles from '../config/mapStyles';
import React from 'react';

class GoogleMap extends React.Component {
  state = {
    center: { lat: 51.5085300, lng: -0.1257400 }
  };

  render() {
    return (
      <main>
        <div className="google-map" ref={element => this.mapCanvas = element}></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form className="form-inline">
                <div className="row">
                  <div className="col-xs-8 col-sm-10">
                    <div className="form-group">
                      <label className="sr-only" htmlFor="address">Address</label>
                      <input type="text"
                        className="form-control input-lg"
                        id="autocomplete"
                        // onFocus="geolocate()"
                        placeholder="enter address"
                      />
                    </div>
                  </div>
                  <div className="col-xs-4 col-sm-2">
                    <button type="submit" className="btn btn-default btn-lg">
                      <span className="search" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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
