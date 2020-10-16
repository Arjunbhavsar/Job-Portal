import React from 'react';
import { Component } from 'react';
import './Navigation.css'
import logo from '../quickpick-logo2-transparent-small.png'

class Navgiation extends Component {

    constructor(props) {
        super(props)
        this.index = this.props.index;
        this.status = this.props.status;
        this.dash = "hidden";
        this.profile = "hidden";
        this.other = "hidden";
        if (this.index == "dash"){
            this.dash = "active";
        } else if (this.index == "profile") {
            this.profile = "active";
        } else if (this.index == "other") {
            this.other = "active";
        }
    }

    render(){
        return (
            <div class="navBar" id={this.index}>
                <img src={logo} alt="logo" class="logo"/>
                <div class="navControls">
                    <table>
                        <td><NavButton page={this.dash} name={"Dash"} /></td>
                        <td><NavButton page={this.profile} name={"Profile"} /></td>
                        <td><NavButton page={this.other} name={"Other"} /></td>
                    </table>
                </div>
                <SmallLogin status={this.status}/>
            </div>
        )
    }
}

class NavButton extends Component {
    constructor() {
        super();
    }
    render(){
        return(
            <a class="navButton" id={this.props.page} href="">{this.props.name}</a>
        )
    }
}

class SmallLogin extends Component {
    constructor() {
        super();
    }
    render(){
        if (this.props.status == "Login"){
            return(
                <div class="smallLog">
                    <a class="loginButton" href="">{this.props.status}</a>
                </div>
            )
        } else {
            return(
                <div class="smallLog">
                    <p class="loginButton" href="">{this.props.status}</p>
                </div>
            )
        }
    }
}

SmallLogin.defaultProps = {
    status: "Login"
}

export default Navgiation