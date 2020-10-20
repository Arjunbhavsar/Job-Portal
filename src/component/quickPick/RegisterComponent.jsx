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
			errorMessage : '',
			errors:{},
			usernameAvailable:false,
			successfulRegistration:false
		};
		
		this.update = this.update.bind(this);
		this.registerClicked = this.registerClicked.bind(this);
		this.handleError = this.handleError.bind(this);
		this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
		this.checkIfUsernameAvailable = this.checkIfUsernameAvailable.bind(this);
		this.checkUsernameSuccess = this.checkUsernameSuccess.bind(this);
		this.validateForm = this.validateForm.bind(this);
    }

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	checkIfUsernameAvailable(username){

		UserService.checkifUsernameAvailable(username)
			.then(response=>this.checkUsernameSuccess(response))
			.catch(error => this.handleError(error))

	}

	checkUsernameSuccess(response) {

		console.log(response)
		debugger;
		if (response.status === 200) {
			if (response.data === "Username not available") {
				this.setState({
					usernameAvailable: false
				})
			}else if(response.data === "Username available"){
				this.setState({
					usernameAvailable: true
				})
			} 
		} else {
			window.alert('Something went wrong. Please try again')
		}
	}


	validateForm() {

		let fields = this.state;
		let errors = {};
		let formIsValid = true;
	
		if (!fields["username"]) {
		  formIsValid = false;
		  errors["username"] = "*Please enter your username.";
		}else{
		if (typeof fields["username"] !== "undefined") {
		  if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
			formIsValid = false;
			errors["username"] = "*Please enter alphabet characters only.";
		  }
		  this.checkIfUsernameAvailable(fields["username"])
		}
		
		// [TODO] This is bugged
		// if(!fields["usernameAvailable"]){
		// 	formIsValid = false;
		// 	errors["username"] = "*username Already in Use.";
		// }
	}
	
	
		if (!fields["emailId"]) {
		  formIsValid = false;
		  errors["emailId"] = "*Please enter your email-ID.";
		}
	
		if (typeof fields["emailId"] !== "undefined") {
		  //regular expression for email validation
		  var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		  if (!pattern.test(fields["emailId"])) {
			formIsValid = false;
			errors["emailId"] = "*Please enter valid email-ID.";
		  }
		}
	
		// if (!fields["mobileno"]) {
		//   formIsValid = false;
		//   errors["mobileno"] = "*Please enter your mobile no.";
		// }
	
		// if (typeof fields["mobileno"] !== "undefined") {
		//   if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
		// 	formIsValid = false;
		// 	errors["mobileno"] = "*Please enter valid mobile no.";
		//   }
		// }
	
		if (!fields["password"]) {
		  formIsValid = false;
		  errors["password"] = "*Please enter your password.";
		}
		
		// [TODO] This is bugged
		// if (typeof fields["password"] !== "undefined") {
		//   if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
		// 	formIsValid = false;
		// 	errors["password"] = "*Please enter secure and strong password.";
		//   }
		// }

		if (fields["password"] !== fields["retype_password"])
		{
			errors["retype_password"] = "*passwords don't match.";
		}	
		this.setState({
		  errors: errors
		});
		return formIsValid;
	
	
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

		//if(this.state.usernameAvailable){
		if(this.validateForm()){
			console.log(`before-${user}`);

			UserService.executePostUserRegisterService(user)
			.then(response=>this.handleSuccessResponse(response))
			.catch(error => this.handleError(error))
	
		}

	}

	handleSuccessResponse(response){
		console.log(response)
		this.setState({
			successfulRegistration: true
		})
		console.log('Register Successful')
		//this.props.history.push('/login')

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

				{this.state.successfulRegistration && <div className="alert alert-success">User successfully registered.</div>}

				{/* {this.state.usernameAvailable && <div className="alert alert-warning">Username is Already in used. please change the Username.</div>} */}
					<div className="register margin" >
						<form className="margin" >
							<h2>Register</h2>
							
							<div className="username margin">
								<input
									type="text"
									placeholder="username"
									name="username"
									value={this.state.username}
									onChange={this.update}
								/>
								{this.state.errors.username && <div className="errorMsg alert alert-warning">{this.state.errors.username}</div>}
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
									name="emailId"
									value={this.state.emailId}
									onChange={this.update}
								/>
								{this.state.errors.emailId && <div className="errorMsg alert alert-warning">{this.state.errors.emailId}</div>}
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
								{this.state.errors.password &&<div className="errorMsg alert alert-warning">{this.state.errors.password}</div>}
							</div>

							<div className="password margin">
								<input 
									type="password" 
									placeholder="Confirm Password" 
									name="retype_password"
									value={this.state.retype_password}
									onChange={this.update}
								/>
								{this.state.errors.password && <div className="errorMsg alert alert-warning">{this.state.errors.retype_password}</div>}
								
							</div>
							<button type="button" className="btn btn-success margin" onClick={this.registerClicked}>Register</button> 
						</form>

						<h5>Already have an Account?	<Link className="nav-link" to="/login">Login</Link></h5>

						{/* <span className="alert alert-warning">{this.state.errorMessage}</span> */}
					</div>
					
				</div>
			</div>
		)
	}
}
export default RegisterComponenet;