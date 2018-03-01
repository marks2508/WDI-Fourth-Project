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
      .then(res => this.setState({user: res.data}, () => console.log(this.state)))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h2>User: {this.state.user.name}</h2>

        <Link to="/dogs/new"><button className="btn btn-primary">Add a dog</button></Link>

        <Link to="/walks/new"><button className="btn btn-primary">Add a walk</button></Link>

        {this.state.user.walks.map((walk) => (
          <div key={walk.id}>
            <Link to={'/walks/' + walk.id}>View Walk</Link>
          </div>
        ))}

        {this.state.user.dogs.map((dog) => (
          <div key={dog.id}>
            <h1>Dog: {dog.name}</h1>
            <h2>Breed: {dog.breed}</h2>
            <h2>Age: {dog.age}</h2>
            <h2>Sex: {dog.sex}</h2>
            <img scr={dog.image} />
          </div>
        ))}
        {/* <h2>My dog: {this.state.user.dogs && this.state.user.dogs[0].name}</h2> */}
        {/* <h2>Breed:{this.state.user.dogs && this.state.user.dogs[0].breed}</h2>
        <h2>Age:{this.state.user.dogs && this.state.user.dogs[0].age}</h2>
        <h2>Sex: {this.state.user.dogs && this.state.user.dogs[0].sex}</h2>
        <img src={this.state.user.dogs && this.state.user.dogs[0].image}/> */}


        {/* { this.state.user.dogs && <Link to={`/dogs/${this.state.user.dogs[0].id}/walks/new`}>Add walk</Link> } */}


        {/* { this.state.user.map(user =>
          <div key={user.id}>
            <h2>{user.name}</h2>
          </div>
        )} */}
        {/* <BackButton history={this.props.history} /> */}
        {/* {Auth.isAuthenticated() && <Link to={`/profile/${this.state.user.id}`} className="btn btn-primary">Edit</Link>} */}
        {/* <GoogleMap /> */}
      </div>
    );
  }
}

export default ProfileShow;
