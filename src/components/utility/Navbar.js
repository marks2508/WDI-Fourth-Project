import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Navbar = ({history}) => {
  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          { Auth.isAuthenticated() && <Link to="/dogs/new" className="nav-item nav-link"><button className="btn btn-success">Add a dog</button></Link>}
          <Link to="/" className="nav-item nav-link active"><button className="btn btn-info">Home</button></Link>
        </div>
        <div className="navbar-nav ml-md-auto">
          { !Auth.isAuthenticated() && <Link to="/login" className="nav-item nav-link ml-auto"><button className="btn btn-primary">Login</button></Link>}
          { !Auth.isAuthenticated() && <Link to="/register" className="nav-item nav-link"><button className="btn btn-warning">Register</button></Link>}
          { Auth.isAuthenticated() && <Link to="#" className="nav-item nav-link" onClick={logout}><button className="btn btn-danger">Logout</button></Link>}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
