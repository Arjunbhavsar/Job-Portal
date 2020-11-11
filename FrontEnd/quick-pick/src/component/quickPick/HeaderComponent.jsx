import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';
import { withRouter } from 'react-router';

class HeaderComponent extends Component {
	render() {
	const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
	let user = sessionStorage.getItem('authenticatedUser');
	return (
		<header>
			<nav color="#ffffff" className="navbar navbar-expand-md navbar-dark bg-dark">
				{!isUserLoggedIn && <div><Link className="nav-link navbar-brand" to="/login" >Quick-Pick</Link></div>}
				{isUserLoggedIn && <div><Link className="nav-link navbar-brand" to={"/dashboard/"+user} >Quick-Pick</Link></div>}
				<ul className="navbar-nav">
					{isUserLoggedIn && <li><Link className="nav-link" to={"/profile/"+user}>Profile</Link></li>}
					{isUserLoggedIn && <li><Link className="nav-link" to={"/dashboard/"+user}>Home</Link></li>}
				</ul>
				<ul className="navbar-nav navbar-collapse justify-content-end">
					{!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
					{isUserLoggedIn && <li><Link className="nav-link" to="/login" onClick={AuthenticationService.logout} >Logout</Link></li>}
				</ul>
			</nav>
		</header>
	);
	}
}
export default withRouter(HeaderComponent);