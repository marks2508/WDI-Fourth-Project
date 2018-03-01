import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import UsersShow from './components/users/UsersShow';
import Navbar from './components/utility/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/ProfileShow';

import WalksNew from './components/walks/WalksNew';
import WalksShow from './components/walks/WalksShow';
import DogsNew from './components/dogs/DogsNew';
import Homepage from './components/utility/Homepage';

import './scss/style.scss';
import 'bootstrap-css-only';

class App extends React.Component {


  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <main>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/dogs/new" component={DogsNew} />
              <Route path="/walks/new" component={WalksNew} />
              <Route path="/walks/:id" component={WalksShow} />
              <Route exact path="/" component={Homepage} />
            </Switch>
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
