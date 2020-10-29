import React from 'react';
import { Component } from 'react';
import './Dashboard.css'
import SearchBar from './SearchBar';


class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            jobID : 0
        }
        this.changeJob = this.changeJob.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(value) {
        console.log(value)
    }
    
    changeJob(id) {
        this.setState(
            ()=>{
                return {jobID: id}
            }
        )
    }
    
    render(){
        return(
            <div class="contianer">
                <div class="left">
                    <SearchBar  holder="Search by title..." search={this.updateInput}/>
                    <JobListItems jobSelect={this.changeJob} />
                </div>
                <div class="right">
                    <SelectedJob jobID={this.state.jobID}/>
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
        this.tempJob = [1023,'360 Photographer', 'Threshold 360', 'Indianapolis, IN', 'Those who are active freelance photographers are preferred.'];
        while(this.leftToLoad > 0){
            console.log(this.leftToLoad);
            this.jobs.push(<BuildJobItem changeJob={this.handleSelect} jobInfo={this.tempJob} />)// title={this.tempJob[1]} company={this.tempJob[2]} location={this.tempJob[3]} desc={this.tempJob[4]} 
            this.tempJob[0] = this.tempJob[0] + 1;
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
        if (this.props.status == 0){
            return(
                <div class="content" id="job">
                    <p class="NoJob">Select Job</p>
                </div>
            )
        } else {
            return(
                <div class="content" id="job">
                    <p>{this.props.jobID}</p>
                </div>
            )
        }
    }
}

SelectedJob.defaultProps = {
    status: null
}

function temp(){
    return(
            <div>
                <div class="leftItem">
                    <p class="title">360 Photographer</p>
                    <p class="company">Threshold 360</p>
                    <p class="location">Indianapolis, IN</p>
                    {/* <p class="description">Those who are active freelance photographers are preferred.</p> */}
                    <ul class="description">
                        <li>Those who are active freelance photographers are preferred.</li>
                    </ul>
                </div>
                <div class="leftItem">
                    <p class="title">Graphic Designer</p>
                    <p class="company">MetroNet</p>
                    <p class="location">Evansville, IN</p>
                    <ul class="description">
                        <li>We’re looking for tech-savvy, innovative thinkers to join our team and help us create what's next!</li>
                    </ul>
                </div>
                <div class="leftItem">
                    <p class="title">Art Director</p>
                    <p class="company">Pure Vanity</p>
                    <p class="location">Remote</p>
                    <ul class="description">
                        <li>Help create, evolve and enforce our brand guidelines and visual style guides</li>
                    </ul>
                </div>
                <div class="leftItem">
                    <p class="title">Presentation Graphic Designer</p>
                    <p class="company">Simple Science Inc.</p>
                    <p class="location">Costa Mesa, CA</p>
                    <ul class="description">
                        <li>Simple Science is seeking an experienced presentation graphic designer to create corporate leadership presentation.</li>
                    </ul>
                </div>
                <div class="leftItem">
                    <p class="title">Graphic Designer</p>
                    <p class="company">Media Components - Digital Marketing Agency</p>
                    <p class="location">Huntingdon Valley, PA</p>
                    <ul class="description">
                        <li>Update and create web content for client’s website</li>
                    </ul>
                </div>
                <div class="leftItem">
                    <p class="title">Freelancer Web Developer/Designer</p>
                    <p class="company">WSEC,LLC</p>
                    <p class="location">Columbia, SC</p>
                    <ul class="description">
                        <li>We are in need of a well skilled and fairly experienced Web Developer.</li>
                    </ul>
                </div>
                <div class="leftItem">
                    <p class="title">Wordpress Web Developer</p>
                    <p class="company">Brand3</p>
                    <p class="location">Remote</p>
                    <ul class="description">
                        <li>Integrate new web products with existing web applications in order to improve the functionality or design of the organization’s website.</li>
                    </ul>
                </div>
                <div class="leftItem">
                    <p class="title">Web Designer/Content Creator</p>
                    <p class="company">Phillip Anthony Signature Gallery</p>
                    <p class="location">Saint Augustine, FL</p>
                    <ul class="description">
                        <li>Conduct simple keyword research and use SEO guidelines to increase web traffic.</li>
                    </ul>
                </div>
                <div class="leftItem">
                    <p class="title">Web Developer</p>
                    <p class="company">Megaputer</p>
                    <p class="location">Bloomington, IN</p>
                    <ul class="description">
                        <li>We are looking for an experienced web developer who manages website operations, bug fixes and site optimization.</li>
                    </ul>
                </div>
            </div>
    )
}

export default Dashboard