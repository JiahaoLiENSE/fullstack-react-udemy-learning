import React from 'react';
//import './App.css';

// Export and define path components
import { BrowserRouter as Router, Route, Redirect, Switch, } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
// read all router dom url contents set up: npm install --save react-router-dom


const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        {/* Switch component is to handle redirect action. If '/' has following path, it will not redirect back. Otherwise. */}
        <Switch>
          {/* The Route path will depend on '/'. Here we use 'exact' to only slash will work */}
          <Route path="/" exact={true}>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          {/* If the route path is not '/', then redirect to '/' */}
          <Redirect to="/"></Redirect>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
