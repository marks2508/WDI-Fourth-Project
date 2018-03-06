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
      .then(res => this.setState({user: res.data}, () => console.log(this.state.user.dogs[0].name)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.user.dogs.map((dog) => ([
            //

            <div key={`${dog.id}-1`} className="card card-outline-primary col-md-4">
              <img className="card-img-top" src={dog.image} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{dog.name}</h5>
                <p className="card-text">Breed info: </p>
                <p className="card-subtitle mb-2 text-muted">The Puggle is a fun-loving little clown. He’ll run around and play like he was a puppy, even after he is well grownup! His perky attitude and spark of enthusiasm will keep the family laughing day after day.</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Age: </strong>{dog.age}</li>
                <li className="list-group-item">{dog.name} is {dog.sex}</li>
              </ul>
              <div className="card-body">
                <Link to={`/dogs/${dog.id}`} className="card-link">Walk log for {dog.name}</Link>
                <Link to={`dogs/${dog.id}/walks`} className="card-link">Add a walk</Link>
              </div>
            </div>,
            <div key={`${dog.id}-2`} className="card col-md-6">
              <div className="card-body">
                <h1>{this.state.user.dogs[0].name} is a {this.state.user.dogs[0].breed}</h1>
                <hr />
                <h5 className="card-title">Activity info:</h5>
                <h6 className="card-subtitle mb-2 text-muted">Energy levels: ✮✮✮</h6>
                <h6 className="card-subtitle mb-2 text-muted">Exercise needs: ✮✮✮✮</h6>
                <h6 className="card-subtitle mb-2 text-muted">Playfulness: ✮✮✮✮✮</h6>
                <hr />
                <h6 className="card-subtitle mb-2 text-muted">Target daily walks: 7km</h6>
                <p className="card-text">
                  <br />
                  <br />Puggles are active. Not content to laze around the house, they play energetically indoors and out, racing around the dining room table and down the hall. Some enjoy digging outdoors. <br /><br />Expect to give them at least 30 minutes of exercise per day. Puggles are good walking companions, but they are not the best choice if you want a jogging partner.<br /><br /> Agility training is a good way to direct your fun-loving Puggle. Puggles are smart, but they may or may not be eager to please. Neither the Pug nor the Beagle is especially known for ease of training, and both breeds can be stubborn. </p>
                <a href="https://en.wikipedia.org/wiki/Puggle" className="card-link">Wikipedia</a>
                <a href="https://www.thekennelclub.org.uk/getting-a-dog-or-puppy/finding-the-right-dog/" className="card-link">Find a {this.state.user.dogs[0].breed}</a>
              </div>
            </div>]
          ))}
        </div>
      </div>


    );
  }
}

export default ProfileShow;
