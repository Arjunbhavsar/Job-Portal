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
    }

    updateInput(value) {
        console.log(value)
    }
    
    changeJob(id){
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
                    <JobListItems />
                </div>
                <div class="right">
                    <SelectedJob />
                </div>
            </div>
        )
    }
}

class JobListItems extends Component {
    constructor(){
        super();
        this.i = 0
    }
    render(){
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
}


class SelectedJob extends Component {
    constructor(){
        super();
    }
    render(){
        if (this.props.status == null){
            return(
                <div class="content" id="job">
                    <p class="NoJob">Select Job</p>
                </div>
            )
        } else {
            return(
                <div class="content" id="job">
                    {/* Call specific job information here */}
                </div>
            )
        }
    }
}

SelectedJob.defaultProps = {
    status: null
}

export default Dashboard