import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import BackButton from '../../lib/Auth';
import Auth from '../../lib/Auth';

class DogsShow extends React.Component {
  state = {
    dog: {}
  }
  componentWillMount() {
    Axios
      .get(`/api/dogs/${this.props.match.params.id}`)
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
  render() {
    return (
      <div>
        <h2>{this.state.dog.name}</h2>
        <BackButton history={this.props.history} />
        {Auth.isAuthenticated() && <Link to={`/dogs/${this.state.dog.id}/edit`} className="btn btn-primary">Edit</Link>}
        {Auth.isAuthenticated() && <button className="btn btn-primary" onClick={this.deleteDog}>Delete</button>}
      </div>
    );
  }
}

export default DogsShow;
