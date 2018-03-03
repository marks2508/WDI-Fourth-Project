import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
// import BackButton from '../../lib/Auth';
import Auth from '../../lib/Auth';
import GoogleMap from '../maps/GoogleMaps';

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
      .then(res => this.setState({user: res.data}, () => console.log(this.state.user.dogs[0].id)))
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div>
        <h2>User: {this.state.user.name}</h2>
        {/* <BackButton /> */}
        <Link to="/dogs/new"><button className="btn btn-primary">Add a dog</button></Link>

        {/* <Link to={`/dogs/${this.state.user.dogs.id}/walks`}><button className="btn btn-primary">Add a walk</button></Link> */}
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {this.state.user.dogs.map((dog) => (
                <div key={dog.id}>
                  <h1>Dog: {dog.name}</h1>
                  <h2>Breed: {dog.breed}</h2>
                  <h2>Age: {dog.age}</h2>
                  <h2>Sex: {dog.sex}</h2>
                  <img scr={dog.image} />
                  <Link to={`/dogs/${dog.id}`}><button>Walk log for {dog.name}</button></Link>
                  <Link to={`dogs/${dog.id}/walks`}><button>Add walk</button></Link>
                </div>
              ))}
              {/* <p>Date:
                <input id="txtDate" type="text" onClick="getDate()"></input>
              </p> */}
              <GoogleMap />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileShow;
