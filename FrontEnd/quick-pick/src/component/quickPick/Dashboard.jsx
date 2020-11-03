import React from 'react';
import { Component } from 'react';
import './Dashboard.css'
import SearchBar from './SearchBar';
import JobService from '../../api/JobService';


class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            job : null
        }
        this.changeJob = this.changeJob.bind(this);
    }
    
    // async changeJob(id) {
    //     console.log(id)
    //     const data = await	JobService
    //                             .executeGetJob(id)
    //                             .then(result => result.data);
    //                             console.log('loading data ...');
    //     this.setState({job : data, loading: false});
    //     console.log(this.state.job);
    // }
    
    changeJob(id){
        this.setState({job : id});
    }

    render(){
        return(
            <div className="contianer">
                <div className="left">
                    <JobListItems jobSelect={this.changeJob}/>
                </div>
                <div className="right">
                    <SelectedJob job={this.state.job} />
                </div>
            </div>
        )
    }
}

class JobListItems extends Component {
    constructor(){
        super();
        this.state = {
            jobs: [],
            jobsIndex: [],
            activeIndex: 0,
            isLoading: true,
            currentJob: null
        }
        this.total = 0;
        // this.handleSelect = this.handleSelect.bind(this);
        this.loadmore = this.loadmore.bind(this); 
        this.updateInput = this.updateInput.bind(this); 
        this.handleUpdateCurrent = this.handleUpdateCurrent.bind(this); 
        this.leftToLoad = 0; // Math.max(10, {call backend of how many jobs are left in the search list})
        this.allJobs = null;
        this.inactive = {
            border: "gray solid 2px",
            background: "#fffad1"
        };
        this.active = {
            border: "var(--light-blue) solid 2px",
            background: "var(--light-blue)"
        };
    }

    async componentDidMount(){
        const data = await JobService.executeGetJobListService().then(result => result.data);
        this.allJobs = data;
        var tempJob = null;
        const added = [];
        const indexes = [];
        if(this.allJobs.length >= 10){
            this.leftToLoad = 10;
        }else{
            this.leftToLoad = this.allJobs.length;
        }
        this.total = this.leftToLoad;
        while(this.leftToLoad > 0){
            tempJob = this.allJobs[this.total - this.leftToLoad];
            added.push(<BuildJobItem changeJob={this.handleSelect} jobInfo={tempJob}/>);
            indexes.push(tempJob);
            this.leftToLoad = this.leftToLoad - 1;
        }
        this.setState({jobs: added, isLoading: false, jobsIndex: indexes});
        console.log(this.state.jobs);
    }

    handleSelect(id) {
        this.props.jobSelect(id);
    }

    handleUpdateCurrent(index, props){
        this.props.jobSelect(this.state.jobsIndex[index]);
        this.setState({activeIndex: index});
    }
    
    loadmore() {
        this.setState({isLoading: true});
        if((this.allJobs.length - this.total) >= 10){
            this.leftToLoad = 10;
        }else{
            this.leftToLoad = this.allJobs.length - this.total;
        }
        this.total = this.total + this.leftToLoad;
        var tempJob = null;
        const added = this.state.jobs.slice();
        const indexes = this.state.jobsIndex.slice();
        while(this.leftToLoad > 0){
            tempJob = this.allJobs[this.total - this.leftToLoad];
            added.push(<BuildJobItem changeJob={this.handleSelect} jobInfo={tempJob}/>);
            indexes.push(tempJob);
            this.leftToLoad= this.leftToLoad - 1;
        }
        this.setState({isLoading: false, jobs: added, jobsIndex: indexes});
        console.log(this.state.jobs.length);
        // this.forceUpdate();
    }

    updateInput(value){

    }
    
    render(){
        console.log();
        if(this.state.isLoading){
            return(
                <p>Loading...</p>
            )
        }else{
            if(this.state.jobs.length == 0){
                return(
                    <p>No jobs found</p>
                )
            }
            return(
                <div>
                    <SearchBar  holder="Search by title..." search={this.updateInput}/>
                    {
                        this.state.jobs.map(function(JobItem, index) {
                            const style = this.state.activeIndex === index ? this.active : this.inactive;
                            return(
                            <div className="leftItem" onClick={this.handleUpdateCurrent.bind(this, index, this.props)} style={style}>
                                {JobItem}
                            </div>
                            );
                        }, this)
                    }
                    <button type="button" onClick={this.loadmore}>Load more</button>
                </div>
            )
        }
    }
}

class BuildJobItem extends Component{
    constructor(){
        super();
        this.clicked = this.clicked.bind(this);
    }
    
    clicked(){
        this.props.changeJob(this.props.jobInfo);
    }

    render(){
        return(
            <div className="leftInner" onclick={this.clicked}>
                <p className="title">{this.props.jobInfo.jobTitle}</p>
                <p className="company">{this.props.jobInfo.organization}</p>
                <p className="location">{this.props.jobInfo.location}</p>
                <ul className="description">
                    <li>{this.props.jobInfo.jobDescription}</li>
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
                <div className="content" id="selectJob">
                    <p className="NoJob">Select Job</p>
                </div>
            )
        } else {
            if(this.props.loading){
                return(
                    <p>Loading...</p>
                )
            }else{
                return(
                    <div className="content" id="job">
                        <h1>{this.props.job.jobTitle}</h1>
                        <p>{this.props.job.location} {this.props.job.country}</p>
                        <p>{this.props.job.dateAdded}</p>
                        <p>{this.props.job.hasExpired}</p>
                        <p>{this.props.job.jobBoard}</p>
                        <p>{this.props.job.jobDescription}</p>
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