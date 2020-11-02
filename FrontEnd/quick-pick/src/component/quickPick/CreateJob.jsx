import React from 'react';
import { Component } from 'react';
import './CreateJob.css';
import AuthenticationService from './AuthenticationService';
import JobService from '../../api/JobService';

class CreateJob extends Component {
    constructor(){
        super();
        this.state = {
            jobTitle: '',
            jobDescription: '',
            organization: '',
            country: '',
            hasExpired: '',
            jobBoard: '',
            dateAdded: '',
            location: '',
            pageUrl: '',
            jobSalary: '',
            sector: '',
            isSubmitted: false
        }
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        let user = sessionStorage.getItem('authenticatedUser');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hiddenStyle = {
            display: "none"
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }
    
    handleSubmit() {
        const job = {
            jobTitle : this.state.jobTitle,
            jobDescription : this.state.jobDescription,
            organization : this.state.organization,
            country : this.state.country,
            hasExpired : this.state.hasExpired,
            jobBoard : this.state.jobBoard,
            dateAdded : this.state.dateAdded,
            location : this.state.location,
            pageUrl : this.state.pageUrl,
            jobSalary : this.state.jobSalary,
            sector : this.state.sector
        }
        JobService.executePostJobService(job);

        this.setState({isSubmitted: true});
    }

    render(){
        return(
            <div className='jobContainer'>
                <div className="inner">
                    {this.state.isSubmitted && <div className="confirmation"><p>Job successfully posted</p></div>}
                    <form >
                        <div id='field'>
                            <label for="jobTitle">Job title: </label>
                            <input type="text" id="jobTitle" onChange={this.handleChange} required></input>
                        </div>
                        <div id='field'>
                            <label for="organization">Company: </label>
                            <input type="text" id="organization" autocomplete="on" onChange={this.handleChange} required></input>
                        </div>
                        <div id='field'>
                            <label for="country">Country: </label>
                            <input type="text" id="country" autocomplete="on" onChange={this.handleChange} required></input>
                        </div>
                        <div id='field'>
                            <label for="location">Job location: </label>
                            <input type="text" id="location" onChange={this.handleChange} required></input>
                        </div>
                        <div id='field'>
                            <label for="jobSalary">Salary for job: </label>
                            <input type="text" id="jobSalary" onChange={this.handleChange} required></input>
                        </div>
                        <div id='field'>
                            <label for="pageUrl">Company URL: </label>
                            <input type="url" id="pageUrl" onChange={this.handleChange}></input>
                        </div>
                        <div id="description">
                            <label for="jobDescription">Job descrption: </label>
                            <textarea rows="10" cols="41" id="jobDescription" onChange={this.handleChange} required>Enter descrption here...</textarea>
                        </div>
                        <div id='field'>
                            <button type="button" onClick={this.handleSubmit}>Post Job</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateJob