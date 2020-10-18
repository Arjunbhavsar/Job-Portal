import React from 'react'
import clsx from 'clsx'
import {
	Typography, Paper, Divider, Grid, RootRef,
	CircularProgress, Fab, LinearProgress
} from '@material-ui/core'
import {useDropzone} from 'react-dropzone'
import {makeStyles} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

import CheckIcon from '@material-ui/icons/Check'
import CloudUpload from '@material-ui/icons/CloudUpload'

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
	dropzoneContainer: {
		height: 300,
		background: "#efefef",
		display: 'flex',
		alignItems: 'center',
		justifyContent:"center",
		borderStyle: 'dashed',
		borderColor: '#aaa'
	},
	preview: {
		width: 250,
		height: 250,
		margin: "auto",
		display: "block",
		marginBottom: theme.spacing(2),
		objectFit: "contain"
	},
	wrapper: {
		margin: theme.spacing(1),
		position: "relative"
	},
	buttonSuccess: {
		backgroundColor: green[500],
		"&:hover": {
			backgroundColor: green[700]
		}
	},
	fabProgress: {
		color: green[500],
		position: "absolute",
		top: -6,
		left: -6,
		zIndex: 1
	},
	buttonProgress: {
		color: green[500],
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12
	}
}))

function FileUploader() {
	const classes = useStyles()
	const [loading, setLoading] = React.useState(false)	// same thing as defining in constructor and doing this.setState({loading : bool})
	const [success, setSuccess] = React.useState(false)
	const [file, setFile] = React.useState()
	const [preview, setPreview] = React.useState()
	const [percent, setPercent] = React.useState(0)
	const [downloadUri, setDownloadUri] = React.useState()

	const buttonClassname = clsx({
		[classes.buttonSuccess]: success	// only set buttonClassname as classes.buttonSuccess when success === true
	});

	const uploadFile = async () => {
		try {
			setSuccess(false);
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			const API_URL = "http://localhost:9090/files";
			const response = await axios.put(API_URL, formData, {
				onUploadProgress: (progressEvent) => {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
					setPercent(percentCompleted);
				}
			})

			setDownloadUri(response.data.fileDownloadUri);
			setSuccess(true);
			setLoading(false);
		} catch (err) {
			alert(err.message);
		}
	}

	const onDrop = React.useCallback((acceptedFiles) => {
		console.log(acceptedFiles)
		setFile(acceptedFiles[0])
		const previewUrl = URL.createObjectURL(acceptedFiles[0])
		setPercent(0)
		setPreview(previewUrl)
	})

	const {getRootProps, getInputProps} = useDropzone({multiple:false, onDrop})
	const {ref, ...rootProps} = getRootProps()
	
	return (
		<Paper>
			<Grid container>
				<Grid item xs={12}>
					<Typography align="center" style={{padding:16}}>
						Resume
					</Typography>
					<Divider/>
				</Grid>

			</Grid>

			{!file &&
				<Grid container justify="center">
					<Grid item xs>
						<RootRef rootRef={ref}>
							<Paper {...rootProps} elevation={0} className={classes.dropzoneContainer}>
								<input {...getInputProps()}/>
								<p>Drag and drop file here | Click to select file</p>
							</Paper>
						</RootRef>
					</Grid>
				</Grid>
			}

			{file &&
				<Grid container justify="center">
					<Grid item xs={6} style={{padding:16}}>
						<Grid container style={{marginTop:16}} alignItems="center">
							<Grid item xs={2}>
								<div className={classes.wrapper}>
									<Fab
									aria-label="save"
									color="primary"
									className={buttonClassname}
									onClick={uploadFile}
									>
									{success ? <CheckIcon /> : <CloudUpload />}
									</Fab>
									{loading && <CircularProgress size={68} className={classes.fabProgress} />}
								</div>
							</Grid>

							<Grid item xs={10}>
								<Typography varient="body">{file.name}</Typography>
								{loading && (
									<div>
										<LinearProgress varient="determinate" value={percent}/>
										<div>
											<Typography varient="body">{percent}%</Typography>
										</div>
									</div>
								)}
								{success && (
									<Typography>
										File Upload Success{" "}
										<a href={downloadUri} target="_blank" rel="noopener noreferrer">
											File Url
										</a>
									</Typography>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			}
		</Paper>
	);
}
export default FileUploader;