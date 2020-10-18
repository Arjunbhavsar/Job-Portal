import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../api/UserService';
import './RegisterComponent.css'

class RegisterComponenet extends Component {
	constructor(props){
		super(props)
		
		this.state = {
			firstName: '',
			username:'',
			lastName:'',
			address: "",
			emailId: '',
			password: '',
			retype_password: '',
			status: '',
			errorMessage : ''
		};
		
		this.update = this.update.bind(this);
		this.registerClicked = this.registerClicked.bind(this);
		this.handleError = this.handleError.bind(this);
		this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	registerClicked(){
		
		const user = {
			username:this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			address: this.state.address,
			emailId: this.state.emailId,
			password:this.state.password
	
		};
		console.log(`before-${user}`);

		UserService.executePostUserRegisterService(user)
		.then(response=>this.handleSuccessResponse(response))
		.catch(error => this.handleError(error))
	}
	handleSuccessResponse(response){
		console.log(response)
		this.setState({
			errorMessage: ''
		})
		console.log('Register Successful')
		this.props.history.push('/login')

	}

	handleError(error){
		let errorM = ''
		console.log(error.response)
		if(error.message){
			errorM += error.message
		}
		if(error.response && error.response.data){
			errorM += error.response.data.message
		}
		this.setState({errorMessage:errorM})
	}


	render(){
		return(
			<div className="bg-img1">
				<div className="container text-center">
					<div className="register margin" >
						<form className="margin"onSubmit={this.displayLogin} >
							<h2>Register</h2>
							
							<div className="username margin">
								<input
									type="text"
									placeholder="username"
									name="username"
									value={this.state.username}
									onChange={this.update}
								/>
							</div>

							<div className="firstName margin">
								<input
									type="text"
									placeholder="first Name"
									name="firstName"
									value={this.state.firstName}
									onChange={this.update}
								/>
							</div>

							<div className="lastName margin">
								<input
									type="text"
									placeholder="Last Name"
									name="lastName"
									value={this.state.lastName}
									onChange={this.update}
								/>
							</div>

							<div className="email margin">
								<input
									type="text"
									placeholder="Enter your email"
									name="emailID"
									value={this.state.email}
									onChange={this.update}
								/>
							</div>
							
							<div className="address margin">
								<input
									type="text"
									placeholder="address"
									name="address"
									value={this.state.address}
									onChange={this.update}
								/>
							</div>
							
							<div className="pasword margin">
								<input
									type="password"
									placeholder="Password"
									name="password"
									value={this.state.password}
									onChange={this.update}
								/>
							</div>

							<div className="password margin">
								<input 
									type="password" 
									placeholder="Confirm Password" 
									name="retype_password"
									value={this.state.retype_password}
									onChange={this.update}
								/>
							</div>

							<button className="btn btn-success margin" onClick={this.registerClicked}>Register</button>
						</form>

						<h5>Already have an Account?	<Link className="nav-link" to="/login">Login</Link></h5>

						<span className="alert">{this.state.errorMessage}</span>
					</div>
					
				</div>
			</div>
		)
	}
}
export default RegisterComponenet;