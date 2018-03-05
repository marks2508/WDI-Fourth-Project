import React from 'react';

const LoginForm = ({handleChange, handleSubmit, user}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 login">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="email address"
                onChange={handleChange}
                value={user.email}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={user.password}
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
