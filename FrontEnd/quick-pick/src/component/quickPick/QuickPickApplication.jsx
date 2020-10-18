import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import WelcomeComponent from './dashboard'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LoginComponenet from './LoginComponent';
import ErrorComponent from './ErrorComponent'
import RegisterComponenet from './RegisterComponent'
import ProfileComponent from './ProfileComponent'
import AuthenticatedRoute from './AutheticatedRoute';
  
class QuickPickApplication extends Component {
	render() {
    	return (
			<div className="applicationHome">
				<Router>
					<>
						<HeaderComponent/>
						<Switch>
							<Route path="/" exact component= {LoginComponenet}/>
							<Route path="/login" component= {LoginComponenet}/>
							<Route path="/register" component= {RegisterComponenet}/>
							<Route path="/profile/:name" component= {ProfileComponent}/>
							<AuthenticatedRoute path="/dashboard/:name" component= {WelcomeComponent}/>
							<Route component = {ErrorComponent}/>
						</Switch>
						<FooterComponent/>
					</>
				</Router>

				{/* <LoginComponenet/>
				<WelcomeComponent></WelcomeComponent> */}
			</div>
		);
	}
}
export default QuickPickApplication