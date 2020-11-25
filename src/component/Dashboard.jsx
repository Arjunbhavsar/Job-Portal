import React from 'react';
import { Component } from 'react';
import '../css/Dashboard.css'
import JobService from '../api/JobService';
import ApplicationService from '../api/ApplicationService';
import AuthenticationService from '../api/AuthenticationService';
import { Paper, Grid, Container, Button} from '@material-ui/core/';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            job : null,
            appResponse: '',
            appStatus: false
        }
        this.changeJob = this.changeJob.bind(this);
    }
    
    async componentWillReceiveProps(newProps){
        console.log(newProps)
    }
    
    changeJob(id){
        this.setState({job : id});
        if(id !== undefined){
        const application = {
            jobID : id.uniqueId,
            username : sessionStorage.getItem('authenticatedUser')
        }
        ApplicationService.checkApplied(application)
            .then((response) => {
                if (response.data !== "") {
                    this.setState({
                        appResponse: 'Application ' + response.data,
                        appStatus: true
                    });
                }else {
                    this.setState({
                        appResponse: '',
                        appStatus: false
                    });
                }
            })
        }
    }

    render(){
        return(
            <div className="dash-contianer">
                <div className="background-container"/>
                <div className="dash-inner">
                    <div className="content-sections">
                        <JobListItems jobSelect={this.changeJob}/>
                    </div>
                    <div className="content-container">
                        <SelectedJob job={this.state.job} appResponse={this.state.appResponse} appStatus={this.state.appStatus}/>
                    </div>
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
            currentJob: null,
            moreToLoad: true
        }
        this.total = 0;
        this.loadmore = this.loadmore.bind(this);
        this.handleUpdateCurrent = this.handleUpdateCurrent.bind(this); 
        this.leftToLoad = 0;
        this.allJobs = null;
        this.inactive = {
            border: "gray solid 1px",
            background: "var(--yellow-color-transparent)"
        };
        this.active = {
            border: "var(--light-blue) solid 1px",
            background: "var(--light-blue-transparent)"
        };
    }

    async componentDidMount(){
        await JobService.executeGetJobListService()
        .then(result => {
            const data = result.data
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
                added.push(<BuildJobItem jobInfo={tempJob}/>);
                indexes.push(tempJob);
                this.leftToLoad = this.leftToLoad - 1;
            }
            if(this.allJobs.length - this.total === 0){
                this.setState({moreToLoad: false});
                
            }
            this.setState({jobs: added, isLoading: false, jobsIndex: indexes});
            this.props.jobSelect(this.state.jobsIndex[0]);
        });
    }

    handleSelect(id) {
        this.props.jobSelect(id);
    }

    handleUpdateCurrent(index){
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
            added.push(<BuildJobItem jobInfo={tempJob}/>);
            indexes.push(tempJob);
            this.leftToLoad= this.leftToLoad - 1;
        }
        if(this.allJobs.length - this.total === 0){
            this.setState({moreToLoad: false});
        }
        this.setState({isLoading: false, jobs: added, jobsIndex: indexes});
        console.log(this.state.jobs.length);
    }
    
    render(){
        console.log();
        if(this.state.isLoading){
            return(
                <p>Loading...</p>
            )
        }else{
            if(this.state.jobs.length === 0){
                return(
                    <div className="search-list-container">
                        <div className="job-list">
                            <div className="leftItem" style={this.inactive}>
                                <p style={{'margin': '16px auto'}}>No jobs found</p>
                            </div>
                        </div>
                    </div>
                )
            }
            return(
                <div className="search-list-container">
                    <div className="job-list">
                        {
                            this.state.jobs.map(function(JobItem, index) {
                                const style = this.state.activeIndex === index ? this.active : this.inactive;
                                return(
                                <div className="leftItem" onClick={this.handleUpdateCurrent.bind(this, index)} style={style} key={index}>
                                    {JobItem}
                                </div>
                                );
                            }, this)
                        }
                        {this.state.moreToLoad && <Button variant="contained" size="small" onClick={this.loadmore}>Load more</Button>}
                    </div>
                </div>
            )
        }
    }
}

class BuildJobItem extends Component{
    render(){
        return(
            <div className="leftInner" >
                <p className="title">{this.props.jobInfo.jobTitle}</p>
                <p className="company">{this.props.jobInfo.organization}</p>
                <p className="location">{this.props.jobInfo.location}</p>
                <p className="salary">{this.props.jobInfo.jobSalary}</p>
            </div>
        )
    }
}


class SelectedJob extends Component {
    constructor(props){
        super(props);
        this.state = {
            appiedResponse: '',
            appiedStatus: false
        }
        this.apply = this.apply.bind(this);
    }

    // async componentDidUpdate(){
    //     this.setState({
    //         appResponse: '',
    //         appStatus: false
    //     })
    // }

    async apply(){
        const application = {
            jobID : this.props.job.uniqueId,
            username : sessionStorage.getItem('authenticatedUser')
        }
        await ApplicationService.executeApplication(application)
        .then((response) => {
			this.setState({
				appiedResponse: response.data,
				appiedStatus: true
			});
		})
		.catch(() => {});
    }

    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if (this.props.job == null){
            return(
                <div className="content" id="selectJob">
                    <p style={{'margin': '20px auto', 'width' : 'fit-content'}}>No jobs available</p>
                </div>
            )
        } else {
            if(this.props.loading){
                return(
                    <p>Loading...</p>
                )
            }else{
                // console.log(this.state.appStatus)
                return(
                    <div className="content" id="job">
                        <h2>{this.props.job.jobTitle}</h2>
                        <p>{this.props.job.organization}</p>
                        <p>{this.props.job.location} {this.props.job.country}</p>
                        <div className="description" dangerouslySetInnerHTML={{__html: this.props.job.jobDescription}} />
                        <p>{this.props.job.jobSalary}</p>
                        <p>{this.props.job.pageUrl}</p>
                        {!this.props.appStatus && !this.state.appiedStatus && isUserLoggedIn && <Button variant="contained" size="small" onClick={this.apply}>Apply</Button>}
                        {this.state.appiedStatus && this.props.appResponse === '' && isUserLoggedIn && <div>{this.state.appiedResponse}</div>}
                        {this.props.appStatus && isUserLoggedIn && <div>{this.props.appResponse}</div>}
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