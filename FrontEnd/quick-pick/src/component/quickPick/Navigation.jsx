import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';
import './Navigation.css';
import logo from './quickpick-logo2-transparent-small.png';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Navigation } from '@material-ui/icons';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    }
  }));

export default function Navgiation() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = "primary-search-account-menu";
    var dash = 'active';
    var other = 'hidden';
	const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
	let user = sessionStorage.getItem('authenticatedUser');
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNavButtonClick = (event) => {
        // accessible
        if (event.target.class == "navButton dash" && event.target.id == "hidden"){
            event.target.id = "active";
        }
     };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuCloseLogout = () => {
		setAnchorEl(null);
		AuthenticationService.logout();
    };
    var renderMenu = (
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
            <Link to="/login" class="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem">Login</MenuItem></Link>
            <Link to="/register" class="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem">Register</MenuItem></Link>
        </Menu>
    );
    function changeActive(path){
        console.log(other);
        if (path == "/"){
            dash = 'active';
            other = 'hidden';
        } else if (path == "/other"){
            dash = 'hidden';
            other = 'active';
        }
    };

    if (isUserLoggedIn == true){
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
                <Link to={"/profile/"+user} class="profileMenuLink"><MenuItem onClick={handleMenuClose} id="accountIconMenuItem">Profile</MenuItem></Link>
                <Link to="/" class="profileMenuLink"><MenuItem onClick={handleMenuCloseLogout} id="accountIconMenuItem">Log Out</MenuItem></Link>
            </Menu>
        );
    }

    //   id={this.index}
    return (
      <div class="navBar"> 
          <img src={logo} alt="logo" class="logo"/>
          <div class="navControls">
              
              <table>
                  <td><Link class="navButton dash" onClick={handleNavButtonClick} id={dash} to={"/"}>Dash</Link></td>
                  <td><Link class="navButton other" onClick={handleNavButtonClick} id={other} to="/other">Other</Link></td>
                  {/* <td><NavButton page={"hidden"} name={"Profile"} to={"/profile"}/></td> */}
              </table>
          </div>
          <div class="rightNav">
            <div className={classes.search} id="searchBar">
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by title..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                id = "searchInput"
              />
            </div>
            <div className={classes.search} id="searchBar">
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by location…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                id = "searchInput"
              />
            </div>
          
          <MenuItem onClick={handleProfileMenuOpen} class="account">
              <IconButton >
                  <AccountCircle id="accountIcon"/>
              </IconButton>
          </MenuItem>
          </div>
          {renderMenu}
      </div>
  )
    
}

Navigation.defaultProps = {
    index: "dash"
}