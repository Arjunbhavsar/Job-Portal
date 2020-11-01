import React from 'react';
import { Component } from 'react';
import './Dashboard.css'
import SearchBar from './SearchBar';
import JobService from '../../api/JobService';


class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            job : null,
            loading: true
        }
        this.changeJob = this.changeJob.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }
    
    updateInput(value){
		
	}

    async changeJob(id) {
        console.log(id)
        const data = await	JobService
                                .executeGetJob(id)
                                .then(result => result.data);
                                console.log('loading data ...');
        this.setState({job : data, loading: false});
        console.log(this.state.job);
    }
    
    render(){
        return(
            <div class="contianer">
                <div class="left">
                    <SearchBar  holder="Search by title..." search={this.updateInput}/>
                    <JobListItems jobSelect={this.changeJob} />
                </div>
                <div class="right">
                    <SelectedJob job={this.state.job} loading={this.state.loading} />
                </div>
            </div>
        )
    }
}

class JobListItems extends Component {
    constructor(){
        super();
        this.state = {
            total: 0
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.loadmore = this.loadmore.bind(this); 
        this.leftToLoad = 10; // Math.max(10, {call backend of how many jobs are left in the search list})
        this.allIDs = []; //getIDs(this.leftToLoad)
        this.jobs = [];
        this.tempJob = [1024,'360 Photographer', 'Threshold 360', 'Indianapolis, IN', 'Those who are active freelance photographers are preferred.'];
        while(this.leftToLoad > 0){
            console.log(this.leftToLoad);
            this.jobs.push(<BuildJobItem changeJob={this.handleSelect} jobInfo={this.tempJob} />)// title={this.tempJob[1]} company={this.tempJob[2]} location={this.tempJob[3]} desc={this.tempJob[4]} 
            this.leftToLoad = this.leftToLoad - 1;
            console.log(this.leftToLoad);
            this.setState({total: this.state.total + 1});
            // Above is temperary information the information will be called from backend
        }
    }

    handleSelect(id) {
        this.props.jobSelect(id);
    }
    
    loadmore() {
        console.log('load more');
        this.leftToLoad = this.leftToLoad + 1; // Math.max(10, this.state.total - {call backend of how many jobs are left in the search list})
        while(this.leftToLoad > 0){

            // this.jobs.push(* More BuildJobItem calls here *)
            this.leftToLoad= this.leftToLoad - 1;
        }
    }
    
    render(){
        return(
            <div>
                {this.jobs}
                <button type="button" onClick={this.loadmore}>Load more</button>
            </div>
        )
    }
}

class BuildJobItem extends Component{
    constructor(){
        super();
        this.clicked = this.clicked.bind(this);
    }
    
    clicked(event){
        this.props.changeJob(this.props.jobInfo[0]);
    }

    render(){
        return(
            <div class="leftItem" onClick={this.clicked}>
                <p class="title">{this.props.jobInfo[1]}</p>
                <p class="company">{this.props.jobInfo[2]}</p>
                <p class="location">{this.props.jobInfo[3]}</p>
                <ul class="description">
                    <li>{this.props.jobInfo[4]}</li>
                </ul>
            </div>
        )
    }
}


class SelectedJob extends Component {
    constructor(){
        super();
    }
    

    render(){
        if (this.props.job == null){
            return(
                <div class="content" id="job">
                    <p class="NoJob">Select Job</p>
                </div>
            )
        } else {
            if(this.props.loading){
                return(
                    <p>Loading...</p>
                )
            }else{
                return(
                    <div class="content" id="job">
                        <p>{this.props.job.jobTitle}</p>
                        <p>{this.props.job.country}</p>
                        <p>{this.props.job.dateAdded}</p>
                        <p>{this.props.job.hasExpired}</p>
                        <p>{this.props.job.jobBoard}</p>
                        <p>{this.props.job.jobDescription}</p>
                        <p>{this.props.job.location}</p>
                        <p>{this.props.job.organization}</p>
                        <p>{this.props.job.pageUrl}</p>
                        <p>{this.props.job.jobSalary}</p>
                        <p>{this.props.job.sector}</p>
                    </div>
                )
            }
        }
    }
}

SelectedJob.defaultProps = {
    status: null
}


export default Dashboard