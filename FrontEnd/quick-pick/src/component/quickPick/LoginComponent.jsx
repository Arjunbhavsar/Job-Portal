import React, { Component } from 'react';
import AutheticationService from './AuthenticationService.js'
import UserService from '../../api/UserService';
import './LoginComponent.css'

class LoginComponenet extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
			username:'',
            lastName:'',
			address: "",
			emailId: '',
			password: '',
			status: '',
            hasLoginFailed: false,
            showSuccessMessage:false,
            noUserFound:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
        this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleChange(event){
        this.setState({     
            [event.target.name] : event.target.value 
        })
    }

    loginClicked(){

        // if(this.state.username === 'arjun' && this.state.password ==='one'){
        //     // this.setState({showSuccessMessage : true   })
        //     // this.setState({hasLoginFailed: false})
        //     console.log('Successful Login registered')
        //     AutheticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/dashboard/${this.state.username}`)
        // }
        // else{
        //     this.setState({showSuccessMessage : false   })
        //     this.setState({hasLoginFailed: true})
        // }

        const user = {
            password: this.state.password,
            username:this.state.username,
            firstName: null,
            lastName: null,
            address: null,
            emailId: null          
        }
        console.log('Inside the login function')
        //let loginSccess = false;
        UserService.registerLogin(user)
        .then( response => this.handleSuccessResponse(response))
		.catch(function (error) {
            console.log("ALLAL", error);
            console.log("data", { user });
        })

        
    }

    handleSuccessResponse(response){
        console.log(response)
        if (response.status === 200) {
            // if (response.data.status == "incorrect password.Try logging in again") {
            //     window.alert('Incorrect password.Try logging in again')
            // } else if (response.data.status == "No user found.") {
            //     window.alert('No user found with given email ID.')
            // } else if (response.data.status == "Logged In") {
                // console.log("response", response)
                // localStorage.setItem('user', response.data.id)
                // console.log("User ID", localStorage.getItem(user))
                // history.push('/dashboard')
            // } else {
            //     window.alert('Something went wrong. Please try again')
            // }
            debugger
            if (response.data === "Login Successful"){
                console.log(response)
                console.log('Successful Login registered')
                AutheticationService.registerSuccessfulLogin(this.state.username,this.state.password)
				this.props.history.push(`/`)
				//this.props.history.push(`/profile/${this.state.username}`)
				window.location.reload() // temp solution to user API call bug
				console.log(this.state.username)
                // this.props.history.push(`/dashboard/${this.state.username}`)
            }else if (response.data === "Login Failed"){
               // this.setState({showSuccessMessage : false   })
                this.setState({hasLoginFailed: true})
            }else if (response.data === "User Not Found"){
               // this.setState({showSuccessMessage : false   })
                this.setState({noUserFound : true})
            }

           

        } else {
            window.alert(response)
        }

    }

    handleError(error){
        this.setState({showSuccessMessage : false   })
        this.setState({hasLoginFailed: true})
    }

    render(){
        return(

            <>
            <div className="LoginFeature align-items-center" >
                

                <div className="container text-center" >
                    {/* <ShowInvalidCredentials hasLoginFailed= {this.state.hasLoginFailed}/> */}
                    {/* <ShowLoginSuccessMessage showSuccessMessage = {this.state.showSuccessMessage}/> */}
                    {this.state.noUserFound && <div className="alert alert-warning"> User is not Registered</div>}
                    {this.state.hasLoginFailed && <div className="alert alert-warning"> Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div> Login Succussful</div>}
                    <h1 class='row'>Login...</h1>
                    <div className='row' style={{ padding: "5px 5px 5px 5px" }}>
                        Username : <input type="text" 
                                        placeholder="Username..." 
                                        name="username"
                                        value = {this.state.username} 
                                        onChange = {this.handleChange}/>
                    </div>
                    <div className='row' style={{ padding: "5px 5px 5px 5px" }}>
                        Password : <input type="password" 
                                        placeholder="Password..." 
                                        name="password" 
                                        value = {this.state.password}
                                        onChange = {this.handleChange}/>
                    </div>
                    <div className='row' style={{ padding: "5px 5px 5px 5px" }}>
                        <button className="btn btn-success" onClick={this.loginClicked}>Login</button>

                    </div>
                    <button className="btn btn-success" onClick={this.registerClicked}>Register</button>
                </div>
                
                
            </div>
            
            </>
        );
    }
    
    registerClicked(){
        this.props.history.push(`/register`)
    }
}
export default LoginComponenet;
