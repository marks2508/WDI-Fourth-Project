import React from 'react';

import Autocomplete from 'react-google-autocomplete';
import BackButton from '../utility/BackButton';

function WalksForm({ handleSubmit, handleGooglePlace }) {
  return (
    <div className="row">
      <div className="page-banner col-md-12">
        <BackButton />
      </div>
      <form onSubmit={handleSubmit} className="col-md-6">
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
        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
}

export default WalksForm;
