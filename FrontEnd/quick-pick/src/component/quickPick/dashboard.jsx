import React, { Component } from 'react';
import UserService from '../../api/UserService';

class WelcomeComponent extends Component{
    constructor(props){
        super(props)

        this.retrieveUserList = this.retrieveUserList.bind(this);
    }


    render(){
    return (
        <>
            <h1>
                Welcome!!
            </h1>
            <div className="container">
                Hello {this.props.match.params.name}, Welcometo the home Page 
            </div>
            <button className="btn btn-success" onClick={this.retrieveUserList}>get Users</button>
        </>
    )
    }


    retrieveUserList(){
        UserService.executeGetUserListService()
        .then(response => console.log(response))
        //.catch()
    }
}

export default WelcomeComponent