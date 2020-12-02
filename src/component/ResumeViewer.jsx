import React, { Component } from 'react';
import PDFViewer from 'pdf-viewer-reactjs';

import ErrorMessage from './ErrorMessage';
import LoadingComponent from './LoadingComponent';

import output from '../api/connections';
import UserService from '../api/UserService';

export default class ResumeViewer extends Component {
	constructor() {
		super();
		
		this.state = {
			isLoading: true,
			userObj: null,
			urlTag: output + '/load/',
		};
	}

	async componentDidMount() {
		const location = window.location.href.split('/');
		console.log(location);
		if(location.length >= 5) {
			const pathUser = window.location.href.split('/')[4];
			const data = await	UserService
								.executeGetUserService(pathUser)
								.then(result => result.data);
								console.log('loading data ...');
			this.setState({userObj : data, isLoading : false});
			var evt = document.createEvent('Event');
			evt.initEvent('load', false, false);
			window.dispatchEvent(evt);
		}
	}

	render() {
		if(this.state.userObj !== null)
		console.log(this.state.userObj.length)
		// console.log(Object.values(this.state.userObj))
		if(this.state.isLoading)
			return (<LoadingComponent/>);
		if(this.state.userObj.length <= 0)
			return (
				<ErrorMessage text="Resume Not Found" severity='error'/>
			)
		return (
			<PDFViewer
				// navbarOnTop='true'
				// hideRotation='true'
				canvasCss='div'
				hideNavbar='true'
				showThumbnail={{
					scale: 1,
					rotationAngle: 0,
				}}
				document={{url: (this.state.urlTag + this.state.userObj.resumeFileId)}}
			/>
		)
	}
}