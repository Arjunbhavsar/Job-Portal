import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import UserService from '../../api/UserService';
import './homePage.css'

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { withStyles } from "@material-ui/core/styles";
import GridContainer from "../../../Design/Grid/GridContainer.js";
import GridItem from "../../../Design/Grid/GridItem.js";
import Button from "../../../Design/CustomButtons/Button.js";
import ProductSection from "./ProductSection"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FindInPageIcon from '@material-ui/icons/FindInPage';

const styles = theme => ({

    body: {
		"z-index": "-1",
		backgroundColor: theme.palette.common.red
    },
    
	paper: {
        zIndex: "12",
		marginTop: theme.spacing(8),
		display: 'flex',
        flexDirection: 'row',
        "flex-wrap": 'nowrap',
        alignItems: 'center',
        width: '100%', // Fix IE 11 issue.
        
	},
	textField: {
        height: '60%',
		margin:"10px",// Fix IE 11 issue.
		marginTop: theme.spacing(3),
    },
    inputField:{
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        // marginRight: theme.spacing(3),
        // marginBottom: theme.spacing(3)
    },
    inputButton:{
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
        // marginRight: theme.spacing(3),
        // marginBottom: theme.spacing(3)
    },
    container: {
         'display': 'inline',
        //height: calc(100% - '94px'),
        'position': 'absolute',
        right: 0,
        bottom: '0px',
        'overflow-y': 'auto',
    },
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: theme.palette.info.light,
    },
    spacing:{
        height:'700px',
    }
    
});

class LandingComponent extends Component {
	constructor(props){
		super(props)
		
		this.state = {
			Keyword: '',
			location:'',
			errorMessage : ''
		};
		
		this.update = this.update.bind(this);
		
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}


	render(){
        const { classes } = this.props;
        const style = {
            paper: {
                zIndex: "12",
                display: 'flex',
                flexDirection: 'row',
                "flex-wrap": 'nowrap',
                alignItems: 'center',
                width: '100%', // Fix IE 11 issue.
                marginTop: "-20px",
            },
            feat: {
              marginTop: '-20px'
            },
            name: {
              color: '#37474f',
              fontWeight: 'bold'
            },
            spec: {
              color: '#37474f'
            },
            space: {
              marginTop: '20px'
            },
            body: {
              fontSize: '14px',
              lineHeight: '175%'
            }
          };
		return(
            <div  style={{"z-index":-1}}>
			{/* <Container component="main" style={{"z-index":-1}}> */}
				<div className="LandingBack"></div>
				<CssBaseline /> 
				<div  style={{"z-index":5}}>
				
                    <GridContainer container  justify="center">
                        <GridItem item xs={12} sm={12} md={3} >
                            
                        <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                className={classes.textField}
                                id="searchKey"
                                label="KeyWord"
                                name="Keyword"
                                autoComplete="Keyword"
                                value={this.state.Keyword}
                                autoFocus
                                inputProps={{
                                    type: "text",
                                    onChange: this.update,
                                    autoComplete: "off"
                                }}
                            />
                        </GridItem>
                        <GridItem item xs={12} sm={12} md={3} style={{position: 'relative', display: 'inline-block'}}>
                            {/* <LocationOnIcon></LocationOnIcon> */}
                            <TextField
                                    variant="outlined"
                                    margin="normal"
                                    leftIcon= {LocationOnIcon}
                                    fullWidth
                                    className={classes.textField}
                                    id="location"
                                    label="Location"
                                    name="location"
                                    autoComplete="location"
                                    value={this.state.location}
                                    autoFocus
                                    inputProps={{
                                        type: "text",
                                        onChange: this.update,
                                        autoComplete: "off"
                                    }}
                                />
                        </GridItem>
                        <GridItem item xs={12} sm={12} md={2} className= {classes.inputButton} >
                            <Button
                                    type="button"
                                    fullWidth
                                    fullHeight
                                    className={classes.textField}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.registerClicked}
                                >
                                Search 
                                </Button>
                        </GridItem>
                    </GridContainer>
				</div>
				
		        <div className={classes.spacing}></div>
                
                <div>
                    <ProductSection />
                </div>
                            
                  
        </div>
		)
	}
}
export default withStyles(styles, { withTheme: true })(LandingComponent);
