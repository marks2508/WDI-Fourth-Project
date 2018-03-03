import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
// import BackButton from '../../lib/Auth';
import Auth from '../../lib/Auth';
import _ from 'lodash';

class DogsShow extends React.Component {
  state = {
    dog: {},
    date: ''
  }
  componentDidMount() {
    Axios
      .get(`/api/dogs/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({dog: res.data}))
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
          <div className="profile">
            <h1>{ this.state.dog.name }</h1>
            <Link to={`/dogs/${this.state.dog.id}/walks`}>Add walk for { this.state.dog.name}</Link>

            <h2>{ this.state.dog.name } Walk log</h2>
            <input name="date" value={this.state.date} onChange={this.handleDateChange} type="date" />
            <ul>
              { this.state.dog.name && walks.map(walk =>
                <li key={walk.id}>
                  <p>{ walk.name }</p>
                  <p>Duration: { walk.duration}</p>
                  <p>Distance: { walk.distance}km</p>
                  <p>Date: { walk.date }</p>
                </li>
              )}
            </ul>
          </div>
        </main>
      </section>
    );
  }
}

export default DogsShow;
