import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';

export default class ErrorMessage extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const style = {
			Paper : {marginTop:20, marginBottom:20},
		}
		let text = "Error";
		if(this.props.text !== null)
		text = this.props.text;
		
		let severity = 'error';
		if(this.props.severity !== null && this.props.severity !== undefined) {
			switch(this.props.severity.toLowerCase()) {
			case 'success' : severity = 'success'; break;
			case 'warning' : severity = 'warning'; break;
			case 'info' : severity = 'info'; break;
			default : severity = 'error'; break;
			}
		}

		return (
			<Grid container direction="row">
				<Grid container justify="center">
					<Grid item sm={3}></Grid>
					<Grid item sm={6}>
						<Paper style={style.Paper}>
							<Grid container>
								<Alert style={{'width' : '100%'}}severity={severity}>{text}</Alert>
							</Grid>
						</Paper>
					</Grid>
					<Grid item sm={3}></Grid>
				</Grid>
			</Grid>
		)
	}
}