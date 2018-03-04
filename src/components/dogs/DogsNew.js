import React from 'react';
import Axios from 'axios';
import DogsForm from './DogsForm';
import Auth from '../../lib/Auth';

class DogsNew extends React.Component {
  state = {
    dogs: {
      name: '',
      breed: '',
      age: '',
      sex: '',
      image: ''
    },
    errors: {}
  }

  handleChange = ({target: {name, value}}) => {
    const dogs = Object.assign({}, this.state.dogs, {[name]: value});
    const errors = Object.assign({}, this.state.errors, {[name]: ''});
    this.setState({dogs, errors});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/dogs', this.state.dogs, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/profile'))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }

  handleImageUpload = result => {
    const dogs = Object.assign({}, this.state.dogs, { image: result.filesUploaded[0].url});
    this.setState({ dogs });
  }

  // uploadImage() {
  //   filepicker.pick(
  //     {
  //       mimetype: 'image/*',
  //       container: 'window',
  //       services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
  //     },
  //     function(Blob){
  //       console.log(JSON.stringify(Blob));
  //     },
  //     function(FPError){
  //       console.log(FPError.toString());
  //     });
  // }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <DogsForm
              history={this.props.history}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              dog={this.state.dogs}
              errors={this.state.errors}
              uploadImage={this.uploadImage}
            />
          </div>
          {/* <div className="col-md-6">
            <img src={this.state.dogs.image} />
          </div> */}
        </div>
      </div>

    );
  }
}
export default DogsNew;
