import React from 'react';
import Axios from 'axios';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';
import GoogleMap from '../maps/GoogleMaps';

class WalksShow extends React.Component {
  state = {
    walk: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/dogs/${this.props.match.params.dogId}/walks/${this.props.match.params.walkId}`, { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        console.log(res);
        this.setState({walk: res.data});
      })
      .then(console.log(this.props.match.params.id))
      .catch(err => console.log(err));
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
          <div className="walks-show col-md-6">
            <h2>{this.state.walk.name}</h2>
            <h2><span className="distance-walkshow">Date of walk: </span>{this.state.walk.date}</h2>
            <h2><span className="distance-walkshow">Distance: </span>{this.state.walk.distance}km</h2>
            <BackButton history={history} />
          </div>
        </div>
      </div>
    );
  }
}

export default WalksShow;
