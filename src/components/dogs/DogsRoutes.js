import React from 'react';
import {Switch, Route} from 'react-router-dom';
import DogsShow from './DogsShow';
import DogsNew from './DogsNew';
import DogsEdit from './DogsEdit';

const DogsRoutes = () => {
  return (
    <Switch>
      <Route path="/dogs/new" component={DogsNew} />
      <Route path="/dogs/:id/edit" component={DogsEdit} />
      <Route path="/dogs/:id" component={DogsShow} />
    </Switch>
  );
};

export default DogsRoutes;
