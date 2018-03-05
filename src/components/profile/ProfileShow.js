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
              <img className="card-img-top" src={dog.image} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{dog.name}</h5>
                <p className="card-text">{dog.breed}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Age: </strong>{dog.age}</li>
                <li className="list-group-item">{dog.name} is {dog.sex}</li>
              </ul>
              <div className="card-body">
                <Link to={`/dogs/${dog.id}`} className="card-link">Walk log for {dog.name}</Link>
                <Link to={`dogs/${dog.id}/walks`} className="card-link">Add a walk</Link>
              </div>
            </div>
          ))}

        </div>
      </div>

    );
  }
}

export default ProfileShow;
