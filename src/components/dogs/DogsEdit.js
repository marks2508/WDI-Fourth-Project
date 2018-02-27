import React from 'react';
import Axios from 'axios';
import DogsForm from './DogsForm';

class DogsEdit extends React.Component {
  state = {
    dog: {
      name: '',
      breed: '',
      age: '',
      sex: '',
      image: ''
    }
  }
  handleChange = ({target: {name, value}}) => {
    const dog = Object.assign({}, this.state.dog, {[name]: value });
    this.setState({dog});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .put(`/api/dogs/${this.props.match.params.id}`, this.state.dog)
      .then(() => this.props.history.push(`/dogs/${this.props.match.params.id}`))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    Axios
      .get(`/api/dogs/${this.props.match.params.id}`)
      .then(res => this.setState({dog: res.data}))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <DogsForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        dog={this.state.dog}
      />
    );
  }
}

export default DogsEdit;
