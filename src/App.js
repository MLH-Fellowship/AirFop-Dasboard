import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import Dashboard from './components/dashboard/Dashboard';
import NavBar from './components/layout/NavBar';
import NoMatch from './components/layout/NoMatch';
import ProjectDetails from './components/projects/ProjectDetails';
import Login from './components/users/Login';
import CreateProject from './components/projects/CreateProject';
import AdminProjectDetails from './components/projects/AdminProjectDetails';
import AdminOnlyContent from './components/layout/AdminOnlyContent'

function App({user, isAuthenticated, isAdmin}) {
  const ProjectDetailsComponent = isAdmin ?  AdminProjectDetails :  ProjectDetails;
  const CreateProjectComponent = isAdmin ? CreateProject : AdminOnlyContent;
  
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={Dashboard}>
           {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        <Route  path="/project/:id" component={ProjectDetailsComponent}>
          {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        <Route  path="/login" component={Login}>
          {isAuthenticated && <Redirect to={"/"}/>}
        </Route>
        <Route exact path="/newproject" component={CreateProjectComponent}>
          {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    isAdmin: state.user.isAdmin
  }
}
export default connect(mapStateToProps)(App);
