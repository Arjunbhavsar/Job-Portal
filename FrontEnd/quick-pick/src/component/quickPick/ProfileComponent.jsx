import React, { Component } from 'react';
import { Table } from 'reactstrap';
import UserService from '../../api/UserService';

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
	}

	render() {
		// const {userObj, isLoading, userName} = this.state;
		UserService.executeGetUserService(sessionStorage.getItem('authenticatedUser')).then(result => console.log(result.data));
		const {userObj, isLoading} = this.state;
		userObj && console.log("YEAH : " + userObj.emailId);

		if(isLoading)
			return (<div>Loading...</div>);
		return (
			<div>
				<Table className="mt-4">
					<thead>
						<tr>
							<th>
								<div style={{'display':'inline'},{'align':'left'}}>
									<img	src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
											width="7.5%" height="7.5%" alt="Blank" style={{'borderRadius':'50px'}}/>
								</div>
								<div style={{'display':'inline'},{'whiteSpace':'nowrap'}}>
									<h2>
										{userObj.username}
									</h2>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
							<tr>{userObj.username}</tr>
							<tr>{userObj.firstName} {userObj.lastName}</tr>
							<tr>{userObj.emailId}</tr>
							<tr>{userObj.address}</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}
export default ProfileComponent;