import React, {Component} from 'react';
import Axios from 'axios';
// import {Link} from 'react-router-dom';

// import BackButton from '../utility/BackButton';

class UsersShow extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    Axios
      .get('/api/users')
      .then(res => this.setState({user: res.data}))
      .catch(err => console.log(err));
  }
  // componentDidMount() {
  //   Axios
  //     .get(`/api/walks/${this.props.match.params.id}`)
  //     .get(`/api/user/`)
  //     .then(res => this.setState({walks: res.data}))
  //     .catch(err => console.log(err));
  // }

  render() {
    return (
      <div>
        <div>
          {/* <BackButton /> */}
          <h3>{this.state.user.name}</h3>
          <h3>{this.state.user.username}</h3>
        </div>
      </div>
    );
  }
}
export default UsersShow;
