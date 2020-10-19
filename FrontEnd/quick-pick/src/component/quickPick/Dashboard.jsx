import React from 'react';
import { Component } from 'react';
import './Dashboard.css'

class Dashboard extends Component {
    constructor() {
        super();
    }

    render(){
        return(
            <div class="contianer">
                <div class="left">
                    <JobListItems />
                    <JobListItems />
                    <JobListItems />
                    <JobListItems />
                    <JobListItems />
                    <JobListItems />
                    <JobListItems />
                    <JobListItems />
                    <JobListItems />
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
            <div class="test"><p>*Temperary Item*</p></div>
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
