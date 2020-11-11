import React, { Component } from 'react';
import UserService from '../../api/UserService';
import FileComponent from './FileComponent';
import blank_profile from './blank-profile.png';
import { Paper, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@material-ui/core/';
import { AccountCircle, Email, ContactMail } from '@material-ui/icons';

import './RegisterComponent.css'

import AuthenticationService from './AuthenticationService';

class ProfileComponent extends Component {
	state = {  }

	// User should be able to view every users page
	// User should be able to hide information
	// User should be able to update profile image linked to their account
	// User should be able to upload resume linked to their account
	// User should be able to edit information

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			userObj: null
		}
	}

	async componentDidMount() {
		const data = await	UserService
							.executeGetUserService(sessionStorage
							.getItem('authenticatedUser'))
							.then(result => result.data);
							console.log('loading data ...');
		this.setState({userObj : data, isLoading : false});
		var evt = document.createEvent('Event');
        evt.initEvent('load', false, false);
        window.dispatchEvent(evt);
	}

	render() {
		// UserService.executeGetUserService(sessionStorage.getItem('authenticatedUser')).then(result => console.log("--- " +result.data));
		const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
		const {userObj, isLoading} = this.state;
		const style = {Paper : {padding:20, marginTop:10, marginBottom:10}}
		let resume_loaded = false;
		let profile_loaded = false;
		try {
			if(Object.values(userObj.resume).length > 0)
				resume_loaded = true
		} catch(error) {}
		try {
			if(Object.values(userObj.profile).length > 0)
				profile_loaded = true
		} catch(error) {}

		// if(!isUserLoggedIn)
		// 	return 
		if(isLoading)
			return (<div>Loading...</div>);
		return (
			<div className="container">
				<Grid container justify="center">
					<Grid item sm={6}>
						<Paper style={style.Paper}>
							{!isUserLoggedIn &&
								<Grid container>
									<Grid item sm>
										Not Logged In
									</Grid>
								</Grid>
							}
							{isUserLoggedIn &&
								<Grid container>
									<Grid item sm>
											{profile_loaded && (
												<img src={"https://quick-pick1.herokuapp.com/files/"+userObj.profile.id} alt={userObj.profile.name} style={{'borderRadius':'50px', width:"200px", height:"200px", "object-fit":"cover"}}/>
											)}
											{!profile_loaded && (
												<img src={blank_profile} alt="profile-image" style={{'borderRadius':'50px', width:"200px", height:"200px", "object-fit":"cover"}}/>
											)}
											<h2>{userObj.username}</h2>
									</Grid>
									<Grid item sm>
										<List>
											<ListItem>
												<ListItemAvatar>
												<Avatar>
													<AccountCircle />
												</Avatar>
												</ListItemAvatar>
												<ListItemText primary={userObj.firstName+" "+userObj.lastName}/>
											</ListItem>
											<Divider variant="inset" component="li" />
											<ListItem>
												<ListItemAvatar>
												<Avatar>
													<Email />
												</Avatar>
												</ListItemAvatar>
												<ListItemText primary={userObj.emailId}/>
											</ListItem>
											<Divider variant="inset" component="li" />
											<ListItem>
												<ListItemAvatar>
												<Avatar>
													<ContactMail />
												</Avatar>
												</ListItemAvatar>
												<ListItemText primary={userObj.address}/>
											</ListItem>
										</List>
									</Grid>
								</Grid>
							}
						</Paper>
					</Grid>
				</Grid>
				<Grid container justify="center">
					<Grid item sm={3}>
						<FileComponent/>
					</Grid>
				</Grid>
			</div>
		);
	}
}
export default ProfileComponent;
