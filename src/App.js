import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './components/pages/Dashboard';
import NavBar from './components/layout/NavBar';
import NoMatch from './components/pages/NoMatch';
import ProjectDetails from './components/projects/ProjectDetails';
import Login from './components/pages/Login';

function App() {
  return (
    <Router>
      <NavBar/>
      <div className='App'>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route  path="/project/:id" component={ProjectDetails} />
        <Route  path="/login" component={Login} />
        <Route>
          <NoMatch />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
