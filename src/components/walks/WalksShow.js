import React from 'react';
// import { Link } from 'react-router-dom';
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
      .get(`/api/walks/${this.props.match.params.id}`, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({walk: res.data}, () => console.log(this.state)))
      .catch(err => console.log(err));
    console.log(this.state);
  }
  render() {
    return (
      <main>
        <div>
          <h2>Name of walk: {this.state.walk.name}</h2>
          <h2>Distance: {this.state.walk.distance}</h2>
          <h2>Duration: {this.state.walk.time}</h2>
        </div>
        <BackButton />
        {/* <GoogleMap */}

        />
      </main>
    );
  }
}

export default WalksShow;
