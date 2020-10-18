import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard';
import Navgiation from './Navigation';
// import AuthenticatedRoute from './AuthenticatedRoute';
import RegisterComponent from './RegisterComponent';
// import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
// import Profile from './Profile';
import ErrorComponent from './ErrorComponent';
// import FooterComponent from './FooterComponent';

class AppRouting extends Component {
    render() {
      return (
        <div className="applicationHome">
            <Router>
                <>
                    <Navgiation/>
                    <Switch>
                        <Route path="/" exact component= {Dashboard}/>
                        {/* <Route path="/profile" component= {Profile}/> */}
                        <Route path="/login" component= {LoginComponent}/>
                        <Route path="/register" component= {RegisterComponent}/>
                        {/* <AuthenticatedRoute path="/dashboard/:name" component= {WelcomeComponent}/> */}
                        <Route component = {ErrorComponent}/>
                    </Switch>
                    {/* <FooterComponent/> */}
                </>
            </Router>
        </div>
      );
    }
  }


export default AppRouting