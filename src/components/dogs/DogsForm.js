import React from 'react';
import BackButton from '../utility/BackButton';

function DogsForm({history, handleSubmit, handleChange, dog, uploadImage}) {
  return (
    <div className="row">
      <div className="page-banner col-md-12">
        <BackButton history={history} />
      </div>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={dog.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            className="form-control"
            id="breed"
            name="breed"
            value={dog.breed}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={dog.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex">Sex</label>
          <input
            type="text"
            className="form-control"
            id="sex"
            name="sex"
            value={dog.sex}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={dog.image}
            onChange={handleChange}
            onClick={uploadImage}
          />
        </div>
        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
}

export default DogsForm;
