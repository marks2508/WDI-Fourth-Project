import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../lib/Auth';

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
      <div className="container">
        <div className="row">
          {this.state.user.dogs.map((dog) => (
            <div key={dog.id} className="card col-md-6">
              <img className="card-img-top" src="https://vignette.wikia.nocookie.net/dogs-cats/images/6/66/Puggle_puppy.jpg/revision/latest?cb=20091227090011" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{dog.name}</h5>
                <p className="card-text">{dog.breed}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Age: </strong>{dog.age}</li>
                <li className="list-group-item">{dog.name} is {dog.sex}</li>
              </ul>
              <div className="card-body">
                <Link to={`/dogs/${dog.id}`}><a className="card-link">Walk log for {dog.name}</a></Link>
                <Link to={`dogs/${dog.id}/walks`}><a className="card-link">Add a walk</a></Link>
                <Link to="/dogs/new"><button className="btn btn-primary">Add a dog</button></Link>
              </div>
            </div>
          ))}
          
          <h1>Hello</h1>
        </div>
      </div>

    );
  }
}

export default ProfileShow;
