import React, { Component } from 'react';
import output from '../../api/connections';
import PDFViewer from 'pdf-viewer-reactjs';
import UserService from '../../api/UserService';
import PropTypes from 'prop-types';

export default class ResumeViewer extends Component {
	constructor(props) {
		super(props);
		
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
		PropTypes.shape({
			text: 'yep', // Watermark text
		 
			diagonal: true, // Watermark placement true for Diagonal, false for Horizontal
		 
			opacity: PropTypes.string, // Watermark opacity, ranges from 0 to 1
		 
			font: PropTypes.string, // custom font name default is 'Comic Sans MS'
		 
			size: PropTypes.string, // Fontsize of Watermark
		 
			color: PropTypes.string, // Color(hexcode) of the watermark
		})

		if(this.state.isLoading)
			return (<div>Loading...</div>);
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