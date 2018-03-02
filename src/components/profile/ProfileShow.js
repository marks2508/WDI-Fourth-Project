import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
// import BackButton from '../../lib/Auth';
import Auth from '../../lib/Auth';
import GoogleMap from '../maps/GoogleMaps';
import ExerciseTarget from '../utility/ExerciseTarget';

class ProfileShow extends React.Component {
  state = {
    user: {
      walks: [],
      dogs: []
    }
  }
  componentDidMount() {
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`)
      .then(res => this.setState({user: res.data}, () => console.log(this.state)))
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div>
        <h2>User: {this.state.user.name}</h2>

        <Link to="/dogs/new"><button className="btn btn-primary">Add a dog</button></Link>

        <Link to="/walks/new"><button className="btn btn-primary">Add a walk</button></Link>

        {this.state.user.dogs.map((dog) => (
          <div key={dog.id}>
            <h1>Dog: {dog.name}</h1>
            <h2>Breed: {dog.breed}</h2>
            <h2>Age: {dog.age}</h2>
            <h2>Sex: {dog.sex}</h2>
            <img scr={dog.image} />
            <Link to={`/dogs/${dog.id}`}>View {dog.name}`s profile</Link>
          </div>
        ))}
        <p>Date:
          <input id="txtDate" type="text" onClick="getDate()"></input>
        </p>
        <GoogleMap />
        <ExerciseTarget />
      </div>
    );
  }
}

export default ProfileShow;
