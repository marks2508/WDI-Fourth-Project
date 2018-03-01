import React from 'react';

import Autocomplete from 'react-google-autocomplete';
import BackButton from '../utility/BackButton';

function WalksForm({ handleSubmit, handleGooglePlace, distance, duration }) {
  return (
    <div className="row">
      <div className="page-banner col-md-12">
        <BackButton />
      </div>
      <form className="col-md-6">
        <div classNam="form-group">
          <label>Name of walk</label>
          <input placeholder="give your walk a name"></input>
        </div>
        <div className="form-group">
          <label htmlFor="name">Starting</label>
          <Autocomplete
            style={{width: '90%'}}
            onPlaceSelected={ place => handleGooglePlace(place, 'start') }
            types={[]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Ending</label>
          <Autocomplete
            style={{width: '90%'}}
            onPlaceSelected={ place => handleGooglePlace(place, 'end') }
            types={[]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance: {distance} </label>
        </div>
        <div>
          <label htmlFor="duration">Duration: {duration}</label>
        </div>
        <button className="btn btn-success" onClick={handleSubmit} >Save</button>
      </form>
    </div>
  );
}

export default WalksForm;
