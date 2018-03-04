import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';
import GoogleMap from '../maps/GoogleMaps';


class WalksShow extends React.Component {
  state = {
    user: {
      dog: {
        walks: {}
      }
    }
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`, { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({dog: res.data}))
      .then(console.log(this.state))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <main>
        <div>
          {/* <h2>Name of walk: {this.state.walk.name}</h2>
          <h2>Distance: {this.state.walk.distance}</h2>
          <h2>Duration: {this.state.walk.time}</h2> */}
        </div>
        <div>
          <BackButton />
          <GoogleMap />
        </div>
      </main>
    );
  }
}

export default WalksShow;
