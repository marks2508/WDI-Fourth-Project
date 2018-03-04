import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';
import _ from 'lodash';

class DogsShow extends React.Component {
  state = {
    dog: {},
    date: '',
    distance: '',
    target: 10,
    overOrUnder: ''
  }
  componentDidMount() {
    Axios
      .get(`/api/dogs/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({dog: res.data}))
      .then(console.log(this.props.match.params.id))
      .catch(err => console.log(err));
  }

  deleteDog = () => {
    Axios
      .delete(`/api/dogs/${this.props.match.params.id}`, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  handleDateChange = ({ target: { value } }) => {
    this.setState(prevState => {
      const newState = prevState;
      newState.date = value;
      return newState;
    }, () => this.filterDates());
  }

  filterDates = () => {
    const regex = new RegExp(this.state.date, 'i');
    const filteredArray = _.filter(this.state.dog.walks, (walk) => regex.test(walk.date));
    if( this.state.date ){
      const total = Object.values(filteredArray).reduce((t, n) => t + n.distance, 0);
      const totalDistance = (total * 2).toFixed(1);
      this.setState({distance: totalDistance});
      console.log(filteredArray.length);
      if (this.state.target > this.state.distance) {
        this.setState({overOrUnder: 'got enough exercise'});
      } else {
        this.setState({overOrUnder: 'did not get enough exercise'});
      }
      return filteredArray;
    } else {
      return this.state.dog.walks;
    }
  }


  render() {
    const walks = this.filterDates();
    return (
      <section>
        {/* <BackButton /> */}
        <main>
          <div className="container">

            <div className="row my-4">
              <div className="col-lg-8">
                <img className="img-fluid rounded" src="https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/The-stages-of-puppy-growth.jpg?itok=9ptPJwY8" alt="" />
              </div>
              <div className="col-lg-4">
                <h1>Exercise is vital</h1>
                <p>All dogs need exercise to keep them happy and healthy. How much exercise they need is down to their breed, age and personality</p>
                <Link to={`/dogs/${this.state.dog.id}/walks`}>Add a walk</Link>
                <br />
                <br />
                <h1>Pick a day to see log</h1>
                <input placeholder="Date" className="form-control" name="date" value={this.state.date} onChange={this.handleDateChange} type="date" />

                <br />
                <br />
                <BackButton />

              </div>
            </div>

            <div className="card text-white bg-secondary my-4 text-center">
              <div className="card-body">
                <p className="text-white m-0">  </p>
              </div>
            </div>

            <div className="row">
              <h1 className="col-md-8">{this.state.dog.name} walked {this.state.distance} kilometers in total<br />{this.state.dog.name}  {this.state.overOrUnder}</h1>

              { this.state.dog.name && walks.map((walk) => (
                <div key={walk.id} className="col-md-8 mb-8">
                  <ul className="list-group">
                    <Link to={`/dogs/${this.state.dog.id}/walks/${walk.id}`}><li className="list-group-item d-flex justify-content-between align-items-center">{walk.date}<br />{walk.name}  <span className="badge badge-primary badge-pill">Distance: {walk.distance} Kms</span></li></Link>
                  </ul>



            </div>
          ))}
          </div>

          {/* // <div className="profile">
          //   <h1>{ this.state.dog.name }</h1>
          //   <h1>{this.state.distance}</h1>
          //   <h2>{this.state.overOrUnder}</h2>
          //   <Link to={`/dogs/${this.state.dog.id}/walks`}>Add walk for { this.state.dog.name}</Link>
          //   <h2>{ this.state.dog.name } Walk log</h2>
          //   <input name="date" value={this.state.date} onChange={this.handleDateChange} type="date" />
          //   <ul>
          //     { this.state.dog.name && walks.map(walk => */}
          {/* //       <li key={walk.id}>
          //         <p>{ walk.name }</p>
          //         <p>Duration: { walk.duration}</p>
          //         <p>Distance: { walk.distance}km</p>
          //         <p>Date: { walk.date }</p>
          //       </li>
          //     )}
          //   </ul>
          // </div> */}
        </div>
        </main>
      </section>
    );
  }
}

export default DogsShow;
