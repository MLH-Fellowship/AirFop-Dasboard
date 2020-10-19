import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import NavBar from './pages/NavBar';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <Router>
      <NavBar/>
      <div className='App'>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
