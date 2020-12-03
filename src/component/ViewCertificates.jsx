import React from 'react';
import { Component } from 'react';
import { List, ListItem, ListItemText, Container, ListItemIcon } from '@material-ui/core/';
import CertifyService from '../api/CertifyService';
import {CheckCircleOutline as CheckCircleOutlineIcon,
        NotInterested as NotInterestedIcon,
        Star as StarIcon} from '@material-ui/icons';
import { green, red, blue } from '@material-ui/core/colors';

class ViewCertificates extends Component {
    constructor(){
        super();
        this.state = {
            certificates: []
        }
    }

    async componentDidMount(){
        const data = await CertifyService.executeGetCertifications(this.props.userId).then(result => result.data)
        let certObjects = []
        for(let i = 0; i < data.length; i++){
            certObjects.push(<CertItem cert={data[i]} />)
        }
        this.setState({
            certificates: certObjects
        })
    }

    render(){
        const style = {
            Paper : {
                padding:20, 
                marginTop:10, 
                marginBottom:10
            }
        };
        return(
                <List>
                    <ListItem>
                        <ListItemText primary="Certifications" />
                    </ListItem>
                    {this.state.certificates}
                </List>
        )
    }
}

class CertItem extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         passed: false
    //     }
    // }

    // componentDidMount(){
        
    // }

    render(){
        let responseDisplay = null
        let hoverText = ''
        if(this.props.cert.score === 100) {
            responseDisplay = (<StarIcon style={{color: blue[500]}} />)
            hoverText = 'Perfect Score'
        }else if(this.props.cert.score >= 80){
            responseDisplay = (<CheckCircleOutlineIcon style={{color: green[500]}} />)
            hoverText = 'Passed'
        }else{
            responseDisplay = (<NotInterestedIcon style={{color: red[500]}} />)
            hoverText = 'Not Passed'
        }
        return(
            <ListItem>
                <ListItemIcon title={hoverText}>{responseDisplay}</ListItemIcon>
                <ListItemText primary={this.props.cert.certificate} />
            </ListItem>
        )
    }
}

export default ViewCertificates