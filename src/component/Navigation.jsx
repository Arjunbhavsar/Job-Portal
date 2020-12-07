import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import {AccountCircle as ProfileIcon,
		Message as MessageIcon,
		VerifiedUser as VerifiedIcon,
		Today as ShiftIcon,
		ExitToApp as LogoutIcon,
} from '@material-ui/icons';
import { withRouter } from "react-router";

import JobService from '../api/JobService';
import logo from '../img/logoName.png';
import AuthenticationService from '../api/AuthenticationService';
import SearchBar from './SearchBar';
import '../css/Navigation.css';

class Navgiation extends Component {
    constructor(){
        super();
        this.state = {
            path: false,
            isUserLoggedIn: false,
            checkByAuthor: false
        }
        this.search = this.search.bind(this)
    }

    async componentWillReceiveProps(newProps){
        let logged = AuthenticationService.isUserLoggedIn();
        let check = false
        if(logged){
            check = await JobService.executeCheckByAuthor().then(result => result.data);
        }
        this.setState({
            path: newProps.location.pathname.includes('dash'),
            isUserLoggedIn: logged,
            checkByAuthor: check
        });
    }

    async componentDidMount() {
        let logged = AuthenticationService.isUserLoggedIn();
        let check = false
        if(logged){
            check = await JobService.executeCheckByAuthor().then(result => result.data);
        }
        let path = this.props.location.pathname.split('/');
        this.setState({
            path: (path.length > 1 && path[1] === 'dash'),
            isUserLoggedIn: logged,
            checkByAuthor: check
        });
    }

    search(paramString){
        if(paramString !== ''){
            this.props.history.push('/dash/' + paramString)
        }else{
            this.props.history.push('/dash')
        }
    }

    render(){
        return(
            <div className="navBar">
            <div className="nav-search-logo">
                <Link to="/"><img src={logo} alt="logo" className="logo"/></Link>
                {this.state.path && <SearchBar submit={this.search}/>}
            </div>
            <div className="leftNav">
                <nav className="navControls">
                    { this.state.isUserLoggedIn && this.state.checkByAuthor && <Link className="navButton" to="/manage">Manage Posts</Link>}
                    { this.state.isUserLoggedIn && <Link className="navButton" to="/postjob">Post Job</Link>}
                    <Link className="navButton" to="/dash" >Dashboard</Link>
                    <Nav/>
                </nav>
            </div>
        </div>
        )
    }
} 


function Nav() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = "primary-search-account-menu";
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    let user = sessionStorage.getItem('authenticatedUser');
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuCloseLogout = () => {
        setAnchorEl(null);
        AuthenticationService.logout();
    };

    var spanStyles = {};
    var renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}

        onClose={handleMenuClose}
        >
            <Link to="/login" className="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem">Login</MenuItem></Link>
            <Link to="/register" className="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem">Register</MenuItem></Link>
        </Menu>
    );

    if (isUserLoggedIn === true){
        spanStyles = {
            color: "var(--light-blue)"
        };
        renderMenu = (
            // Add information here to check if already logged in and have a seperate menu with if conditionals
            <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            >
                <Link to={"/profile/"+user} className="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem"><ProfileIcon style={{marginRight:'10px'}}/>{user}</MenuItem></Link>
                <Link to={"/chatHome"} className="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem"><MessageIcon style={{marginRight:'10px'}}/>Messages</MenuItem></Link>
                <Link to="/certify" className="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem"><VerifiedIcon style={{marginRight:'10px'}}/>Certifications</MenuItem></Link>
                <Link to="/shift" className="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem"><ShiftIcon style={{marginRight:'10px'}}/>Shift Selection</MenuItem></Link>
                <div className='logOut' >
					<Link to="/" className="profileMenuLink">
						<MenuItem onClick={handleMenuCloseLogout} id="accountIconMenuItem">
							<Grid container direction="row" alignItems="center" className='logOutText'>
								<LogoutIcon style={{marginRight:'10px'}}/>Log Out
							</Grid>
						</MenuItem>
					</Link>
				</div>
            </Menu>
        );
    }
    
    return (
        <>
        <MenuItem onClick={handleProfileMenuOpen} className="account">
            <IconButton >
                <ProfileIcon id="accountIcon" style={spanStyles}/>
            </IconButton>
        </MenuItem>
        {renderMenu}
        </>
    )
}

export default withRouter(Navgiation)