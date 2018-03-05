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
      .post('/api/dogs', this.state.dog, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/profile'))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }

  handleImageUpload = result => {
    console.log(result.filesUploaded[0].url);
    const dog = Object.assign({}, this.state.dog, { image: result.filesUploaded[0].url});
    this.setState({ dog });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="dog-new-title">Add your dogs details: </h1>
            <DogsForm
              history={this.props.history}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              dog={this.state.dog}
              errors={this.state.errors}
              uploadImage={this.uploadImage}
            />
          </div>
        </div>
      </div>

    );
  }
}
export default DogsNew;
