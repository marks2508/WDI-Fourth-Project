import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import UsersShow from './components/users/UsersShow';
import Navbar from './components/utility/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/ProfileShow';

import WalksNew from './components/walks/WalksNew';

import './scss/style.scss';
import 'bootstrap-css-only';

class App extends React.Component {


  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <main>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/dogs/:id/walks/new" component={WalksNew} />
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
