import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/utility/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/ProfileShow';
import WalksNew from './components/walks/WalksNew';
import WalksShow from './components/walks/WalksShow';
import DogsNew from './components/dogs/DogsNew';
import DogsShow from './components/dogs/DogsShow';
import Homepage from './components/utility/Homepage';
import 'bootstrap-css-only';
import './scss/style.scss';
import 'font-awesome/css/font-awesome.css';


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
              <Route path="/dogs/:dogId/walks/:walkId" component={WalksShow} />
              <Route path="/dogs/:id/walks" component={WalksNew} />
              <Route path="/dogs/:id" component={DogsShow} />
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
