import React from 'react';
import Axios from 'axios';
import DogsForm from './DogsForm';
import Auth from '../../lib/Auth';

class DogsNew extends React.Component {
  state = {
    dog: {
      name: '',
      breed: '',
      age: '',
      sex: '',
      image: ''
    },
    errors: {}
  }
  handleChange = ({target: {name, value}}) => {
    const dog = Object.assign({}, this.state.dog, {[name]: value});
    const errors = Object.assign({}, this.state.errors, {[name]: ''});
    this.setState({dog, errors});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/dogs', this.state.orchid, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }
  render() {
    return (
      <DogsForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        dog={this.state.dog}
        errors={this.state.errors}
      />
    );
  }
}
export default DogsNew;
