import React, { Component , useState } from 'react';
import AutheticationService from './AuthenticationService.js'
import UserService from '../../api/UserService';
import './LoginComponent.css'
import Image from '../../img/Login3.png'; // Import using relative path

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";

import { GoogleLogin } from 'react-google-login';
import Facebook from './Facebook'
const styles = theme => ({
    // '@global': {
        body: {
          backgroundColor: theme.palette.common.red,
          backgroundImage: `url(${Image})`,
        // },
      },
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        alignItems: 'center',
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor:theme.palette.common.blue,
      },
    });

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
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event){
        this.setState({     
            [event.target.name] : event.target.value 
        })
    }

    registerClicked(){
      this.props.history.push(`/register`)
    }
    loginClicked(){

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
           
            if (response.data === "Login Successful"){
                console.log('Successful Login registered')
                AutheticationService.registerSuccessfulLogin(this.state.username,this.state.password)
				this.props.history.push(`/`)
				// window.location.reload() // temp solution to user API call bug
				console.log(this.state.username)
                
            }else if (response.data === "Login Failed"){
                this.setState({hasLoginFailed: true})
            }else if (response.data === "User Not Found"){
                this.setState({noUserFound : true})
            }
        } else {
            window.alert(response)
        }

    }
    onSubmit (event) {
      event.preventDefault();
    
      // custom form handling here
    }
    handleError(error){
        this.setState({showSuccessMessage : false   })
        this.setState({hasLoginFailed: true})
    }

    render(){
        const { classes } = this.props;
        return(

            <Container component="main" maxWidth="xs">
              <div className="registerBack"></div>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Facebook > </Facebook>
              <Typography component="h5" variant="h5">
                or
              </Typography>
              <form className={classes.form} noValidate  onSubmit={this.onSubmit} >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              

              
               {/*  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="emailId"
                  autoComplete="email"
                  value={this.state.emailId}
                  autoFocus
                  inputProps={{
                    type: "text",
                    onChange: this.handleChange,
                    autoComplete: "off"
                  }}
                  
                /> */}
                		<TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={this.state.username}
                        autoFocus
                        inputProps={{
                          type: "text",
                          onChange: this.handleChange,
                          autoComplete: "off"
                        }}
				          	/>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  autoComplete="current-password"
                  inputProps={{
                    type: "password",
                    onChange: this.handleChange,
                    autoComplete: "off"
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="Button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.loginClicked}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
            </Box>
          </Container>
   
        );
    }
}


export default withStyles(styles, { withTheme: true })(LoginComponenet);



