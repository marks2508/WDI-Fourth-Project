import React from 'react';

import Autocomplete from 'react-google-autocomplete';
import BackButton from '../utility/BackButton';

function WalksForm({ handleSubmit, handleGooglePlace, handleChange, distance, duration }) {
  return (
    <div className="row">
      <div className="page-banner col-md-12">
        <BackButton />
      </div>
      <form className="col-md-6 dogsForm">
        <div className="form-group dogsForm">
          <label htmlFor="name">Name of walk</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
            placeholder="give your walk a name" />
        </div>
        <div className="form-group dogsForm">
          <label htmlFor="date">When was the walk</label>
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={handleChange}
          />
        </div>
        <div className="form-group dogsForm">
          <label htmlFor="starting">Starting</label>
          <Autocomplete
            className="form-group"
            onPlaceSelected={ place => handleGooglePlace(place, 'start') }
            types={[]}
          />
        </div>
        <div className="form-group dogsForm">
          <label htmlFor="ending">Ending</label>
          <Autocomplete
            className="form-group"
            onPlaceSelected={ place => handleGooglePlace(place, 'end') }
            types={[]}
          />
        </div>
        <div className="form-group">
          <label  className="exampleFormControlInput1"htmlFor="distance">Distance: {distance} </label>
        </div>
        <div>
          <label  className="exampleFormControlInput1"htmlFor="duration">Duration: {duration}</label>
        </div>
        <button className="btn btn-success" onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}

export default WalksForm;
