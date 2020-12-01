import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard';
import Navgiation from './Navigation';
import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';
import ErrorComponent from './ErrorComponent';
import ProfileComponent from './profile/ProfileComponent';
import CreateJob from './CreateJob';
import LandingComponent from './LandingComponent';
import ManagementComponent from './ManagementComponent';
import ForgotPasswordComponent from './ForgotPassword';
import ResetPasswordComponent from './ResetPassword';
import ResumeViewer from './profile/ResumeViewer';

class AppRouting extends Component {
    render() {
        return (
            <div className="applicationHome">
                <Router>
                    <>
                        <Navgiation/>
                        <Switch >
                            <Route path="/"               exact component = {LandingComponent}/>
                            <Route path="/dash"                 component = {Dashboard}/>
                            <Route path="/dash/:search"         component = {Dashboard}/>
                            <Route path="/login"                component = {LoginComponent}/>
                            <Route path="/register"             component = {RegisterComponent}/>
                            <Route path="/postjob"              component = {CreateJob}/>
                            <Route path="/manage"               component = {ManagementComponent}/>
                            <Route path="/profile/:name"        component = {ProfileComponent}/>
                            <Route path="/resume/:name"         component = {ResumeViewer}/>
                            <Route path="/ForgotPassword"       component = {ForgotPasswordComponent}/>
                            <Route path="/resetpassword/:token" component = {ResetPasswordComponent}/>
                            {/* <AuthenticatedRoute path="/dashboard" component= {Dashboard}/> */}
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