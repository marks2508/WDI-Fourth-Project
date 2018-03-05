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
    overOrUnder: '',
    back: '',
    filteredWalks: []
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

  handleDateChange = (e) => {
    this.setState({ date: e.target.value }, this.filterDates);
  }

  filterDates = () => {
    if (!this.state.dog) return false;
    const regex = new RegExp(this.state.date, 'i');
    const filteredArray = _.filter(this.state.dog.walks, (walk) => regex.test(walk.date));
    if( this.state.date ){
      const total = Object.values(filteredArray).reduce((t, n) => t + n.distance, 0);
      const totalDistance = (total).toFixed(1);
      this.setState({distance: totalDistance});
      if (this.state.target > this.state.distance) {
        this.setState({overOrUnder: 'got enough exercise 😀'});
      } else {
        this.setState({overOrUnder: 'did not get enough exercise 😟'});
      }
      this.setState({ filteredWalks: filteredArray});
    } else {
      this.setState({ filteredWalks: this.state.dog.walks});
    }
  }

  render() {
    return (
      <section>
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
                <p className="text-white m-0"></p>
              </div>
            </div>
            {this.state.filteredWalks.length > 0 && <div className="row">
              <h2 className="col-md-8">{this.state.dog.name} walked {this.state.distance} kilometers in total<br />{this.state.dog.name}  {this.state.overOrUnder}</h2>
              { this.state.dog.name && this.state.filteredWalks.map((walk) => (
                <div key={walk.id} className="col-md-8 mb-8">
                  <ul className="list-group">
                    <Link to={`/dogs/${this.state.dog.id}/walks/${walk.id}`}><li className="list-group-item d-flex justify-content-between align-items-center">{walk.date}<br />{walk.name}  <span className="badge badge-primary badge-pill">Distance: {walk.distance} Kms</span></li></Link>
                  </ul>
                </div>
              ))}
            </div>}
            {this.state.filteredWalks.length === 0 && this.state.date && <div className="row">
              <h2 className="col-md-8">{this.state.dog.name} did not get walked 🙁</h2>
            </div>
            }
          </div>
        </main>
      </section>
    );
  }
}

export default DogsShow;
