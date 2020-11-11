import React, { Component } from "react";
import FileService from "../../api/FileService";
import UserService from '../../api/UserService';
import ProgressBar from '../../UI/ProgressBar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AuthenticationService from './AuthenticationService';

// import PDFViewer from 'pdf-viewer-reactjs'

export default class FileComponent extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			selectedFiles: undefined,
			currentFile: undefined,
			progress: 0,
			message: "",
			isLoading: true,
			userObj: null
		};

		this.selectFile = this.selectFile.bind(this);
		this.uploadResume = this.uploadResume.bind(this);
		this.uploadProfile = this.uploadProfile.bind(this);
	}

	async componentDidMount() {
		const data = await	UserService
							.executeGetUserService(sessionStorage
							.getItem('authenticatedUser'))
							.then(result => result.data);
							console.log('loading data ...');
		this.setState({userObj : data, isLoading : false});
		var evt = document.createEvent('Event');
        evt.initEvent('load', false, false);
        window.dispatchEvent(evt);
	}

	selectFile(event) {
		this.setState({
			selectedFiles: event.target.files,
			progress: 0
		});
	}

	uploadProfile() {
		let currentFile = this.state.selectedFiles[0];
		this.setState({ progress: 0, currentFile: currentFile});

		FileService.uploadProfile(currentFile, (event) => {
			this.setState({
				progress: Math.round((100 * event.loaded) / event.total),
			});
		})
		.then((response) => {
			this.setState({
			message: response.data.message,
			});
			window.location.reload();	// hackerman
			return FileService.getFiles();
		})
		.catch(() => {
			this.setState({
			progress: 0,
			message: "Could not upload the file!",
			currentFile: undefined,
			});
		});

		this.setState({
		selectedFiles: undefined,
		});
	}

	uploadResume() {
		let currentFile = this.state.selectedFiles[0];
		this.setState({ progress: 0, currentFile: currentFile});

		FileService.uploadResume(currentFile, (event) => {
			this.setState({
				progress: Math.round((100 * event.loaded) / event.total),
			});
		})
		.then((response) => {
			this.setState({
			message: response.data.message,
			});
			// window.location.reload();
			return FileService.getFiles();
		})
		.catch(() => {
			this.setState({
			progress: 0,
			message: "Could not upload the file!",
			currentFile: undefined,
			});
		});

		this.setState({
		selectedFiles: undefined,
		});
	}

	render() {
		const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
		const { selectedFiles, currentFile, progress, message, userObj, isLoading } = this.state;
		const classes = makeStyles({ table: { minWidth: 650 } });
		let resume_loaded = false;
		let profile_loaded = false;
		try {
			if(Object.values(userObj.resume).length > 0)
				resume_loaded = true
		} catch(error) {}
		try {
			if(Object.values(userObj.profile).length > 0)
				profile_loaded = true
		} catch(error) {}
		if(isLoading)
			return (<div>Loading...</div>);
		if(!isUserLoggedIn)
			return <></>
		return (
			<div>
				{currentFile && ( <ProgressBar value={progress} /> )}

				<label className="btn btn-default">
				<input type="file" onChange={this.selectFile} />
				</label>

				<button
				className="btn btn-success"
				disabled={!selectedFiles}
				onClick={this.uploadProfile}
				>
				Upload Profile
				</button>
				
				<button
				className="btn btn-success"
				disabled={!selectedFiles}
				onClick={this.uploadResume}
				>
				Upload Resume
				</button>

				<div className="alert alert-light" role="alert">
				{message}
				</div>

				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>List of Files</TableCell>
							</TableRow>
						</TableHead>
					</Table>
					{profile_loaded && (
						<TableRow>
							<TableCell component="th" scope="row">Profile</TableCell>
							<TableCell align="right"> <a href={"https://quick-pick1.herokuapp.com/files/"+userObj.profile.id}>{userObj.profile.name}</a> {userObj.profile.type} </TableCell>
							{/* {userObj.profile.type.includes("image") && ( <TableCell align="right"><img style={{width:"100%"}} src={"http://localhost:9090/files/"+userObj.profile.id} alt={userObj.profile.name}/ ></TableCell> )} */}
						</TableRow>
					)}
					{resume_loaded && (
						<TableRow>
							<TableCell component="th" scope="row">Resume</TableCell>
							<TableCell align="right"> <a href={"https://quick-pick1.herokuapp.com/files/"+userObj.resume.id}>{userObj.resume.name}</a> {userObj.resume.type} </TableCell>
							{/* {userObj.resume.type.includes("image") && ( <TableCell align="right"><img style={{width:"100%"}} src={"http://localhost:9090/files/"+userObj.resume.id} alt={userObj.resume.name}/ ></TableCell> )} */}
						</TableRow>
					)}
				</TableContainer>
			</div>
		);
	}
}