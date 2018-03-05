import React from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';
import GoogleMap from '../maps/GoogleMaps';
import WalksForm from './WalksForm';


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
          <div className="col-md-6">
            {this.state.walk.name}
            {/* <WalksForm
              handleSubmit={this.handleSubmit}
              handleGooglePlace={this.handleGooglePlace}
              handleChange={this.handleChange}
              errors={this.state.errors}
              distance={this.state.walk.distance}
              duration={this.state.walk.duration}
              name={this.state.walk.name}
            /> */}
            <BackButton history={history} />
          </div>
        </div>
      </div>
    );
  }
}

export default WalksShow;

{/* <h2>Name of walk: {this.state.walk.name}</h2>
<h2>Distance: {this.state.walk.distance}</h2>
<h2>Duration: {this.state.walk.time}</h2> */}
