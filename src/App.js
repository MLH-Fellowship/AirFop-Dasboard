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
import EditProject from './components/projects/EditProject';
import CreateUser from './components/users/CreateUser';
import AdminOnlyContent from './components/layout/AdminOnlyContent';
import Report from './components/report/Report'
import ResetPassword from './components/users/ResetPassword'
import { ToastProvider} from 'react-toast-notifications'
import Cookies from 'js-cookie';
import { getUserFromCookies } from "./store/helpers/jwt";

const _ = require('lodash/core');


function App({user, isAuthenticated, isAdmin}) {
  const CreateProjectComponent = !isAdmin || isAdmin === "false" ? AdminOnlyContent : CreateProject;
  const CreateUserComponent = !isAdmin || isAdmin === "false" ? AdminOnlyContent : CreateUser;
  const EditProjectComponent = !isAdmin || isAdmin === "false" ? AdminOnlyContent : EditProject;
  
  console.log('wtf? i hate him', isAuthenticated, user)
  return (
    <Router>
      <NavBar/>
      <Switch>
      <ToastProvider>
        <Route path="/" exact component={Dashboard}>
           {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        <Route  path="/project/:projectName" component={ProjectDetails}>
          {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        <Route  path="/edit/:projectName" component={EditProjectComponent}>
          {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        <Route  path="/login" component={Login}>
          {isAuthenticated && <Redirect to={"/"}/>}
        </Route>
        <Route  path="/reset/:email" component={ResetPassword}/>
          {/* {!isAuthenticated && <Redirect to={"/"}/>} */}
        {/* </Route> */}
        <Route path="/newproject" component={CreateProjectComponent}>
          {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        <Route path="/newuser" component={CreateUserComponent}>
          {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        <Route path="/print" component={Report}>
          {!isAuthenticated && <Redirect to={"/login"}/>}
        </Route>
        </ToastProvider>
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {

  // Checks to see if the user is logged.
  // Sets the state based on previous log in of the user is logged in
  if (!_.isEmpty(Cookies.get())) {
    const user = getUserFromCookies();
    return {
      user: user,
      isAuthenticated: true,
      isAdmin: user.isAdmin
    }
  }

  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    isAdmin: state.user.isAdmin
  }
}
export default connect(mapStateToProps)(App);
