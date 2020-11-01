import React, { Component } from 'react';
import UserService from '../../api/UserService';
import FileUploadComponent from './FileUploadComponent';

import { Paper, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@material-ui/core/';
import { AccountCircle, Email, ContactMail } from '@material-ui/icons';

import './RegisterComponent.css'

class ProfileComponent extends Component {
	state = {  }

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
		UserService.executeGetUserService(sessionStorage.getItem('authenticatedUser')).then(result => console.log(result.data));
		const {userObj, isLoading} = this.state;
		
		const style = {Paper : {padding:20, marginTop:10, marginBottom:10}}

		if(isLoading)
			return (<div>Loading...</div>);
		return (
			<div className="container">
				<Grid container justify="center">
					<Grid item sm={6}>
						<Paper style={style.Paper}>
							<Grid container>
								<Grid item sm>
										<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
												width="200px" height="200px" alt="Blank" style={{'borderRadius':'50px'}}/>
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
						</Paper>
					</Grid>
				</Grid>
				{/* <Grid container justify="center">
					<Grid item sm={6}>
						<FileUploadComponent/>
					</Grid>
				</Grid> */}
			</div>
		);
	}
}
export default ProfileComponent;
