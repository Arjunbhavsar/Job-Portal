import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {Toolbar,
		DateNavigator,
		Appointments,
		TodayButton,
		Scheduler,
		WeekView,
		AppointmentForm,
		AppointmentTooltip,
		ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import ReactDOM from 'react-dom';

import { appointments } from './ShiftData';

const messages = {
	moreInformationLabel: '',
};

const TextEditor = (props) => {
	// eslint-disable-next-line react/destructuring-assignment
	if (props.type === 'multilineTextEditor') {
	return null;
	} return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
	const onCustomFieldChange = (nextValue) => {
	onFieldChange({ customField: nextValue });
	};

	return (
	<AppointmentForm.BasicLayout
		appointmentData={appointmentData}
		onFieldChange={onFieldChange}
		{...restProps}
	>
	</AppointmentForm.BasicLayout>
	);
};

export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
		data: appointments,
		currentDate: '2020-06-27',
		hidden: false
		};
		this.commitChanges = this.commitChanges.bind(this);
		this.hideElements = this.hideElements.bind(this);
		this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
		this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
	}

	// onAppointmentFormOpening(e) {
	// 	console.log("FORM " + e.form);
	// 	form.itemOption("Contacts.phone", "visible", false);
	// }
	onAppointmentFormOpening(e) {
        e.popup.option('showTitle', true);
        e.popup.option('title', e.appointmentData.text ? 
            "e.appointmentData.text" : 
            'Create a new appointment');
 
        const form = e.form;
        let mainGroupItems = form.itemOption('mainGroup').items;
        if (!mainGroupItems.find(function(i) { return i.dataField === "phone" })) {
            mainGroupItems.push({
                colSpan: 2, 
                label: { text: "Phone Number" },
                editorType: "dxTextBox",
                dataField: "phone"
            });
            form.itemOption('mainGroup', 'items', mainGroupItems);
        }
 
        let formItems = form.option("items"); 
        if (!formItems.find(function(i) { return i.dataField === "location" })) {
            formItems.push({
                colSpan: 2,
                label: { text: "Location" },
                editorType: "dxTextBox",
                dataField: "location"
            });
            form.option("items", formItems);
        }
    }

	commitChanges({ added, changed, deleted }) {
		this.setState((state) => {
		let { data } = state;
		if (added) {
			const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
			data = [...data, { id: startingAddedId, ...added }];
		}
		if (changed) {
			data = data.map(appointment => (
			changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
		}
		if (deleted !== undefined) {
			data = data.filter(appointment => appointment.id !== deleted);
		}
		return { data };
		});
	}

	hideElements() {
		// async.retry(3, apiMethod, () => {
			console.log(document.getElementsByClassName("MuiFormControlLabel-root"));
			for(let i = 0; i < document.getElementsByClassName("MuiFormControlLabel-root").length; i++) {
				console.log(document.getElementsByClassName("MuiFormControlLabel-root")[i].style.display)
				document.getElementsByClassName("MuiFormControlLabel-root")[i].style.display = 'none';
			}
			for(let i = 0; i < document.getElementsByClassName("MuiTypography-root memo-label-436 memo-titleLabel-437 LayoutBase-labelWithMargins-430 MuiTypography-body1").length; i++) {
				console.log(document.getElementsByClassName("MuiTypography-root memo-label-436 memo-titleLabel-437 LayoutBase-labelWithMargins-430 MuiTypography-body1")[i].style.display)
				document.getElementsByClassName("MuiTypography-root memo-label-436 memo-titleLabel-437 LayoutBase-labelWithMargins-430 MuiTypography-body1")[i].style.display = 'none';
			}
		// })
	}

	render() {
		return (
		<Paper>
			<Scheduler
			data={this.state.data}
			height="100%"
			// appointmentTooltipComponent={AppointmentTooltip}
			onAppointmentFormOpening={this.onAppointmentFormOpening}
			>
			<ViewState
				currentDate={this.state.currentDate}
				onCurrentDateChange={this.currentDateChange}
			/>
			<EditingState
				onCommitChanges={this.commitChanges}
			/>
			<IntegratedEditing />
			<WeekView
				startDayHour={9}
				endDayHour={19}
			/>
			<Toolbar />
			<DateNavigator />
			<TodayButton />
			<Appointments />
			<AppointmentTooltip
				showOpenButton
				showDeleteButton
			/>
			<ConfirmationDialog />
			<AppointmentForm
				basicLayoutComponent={BasicLayout}
				textEditorComponent={TextEditor}
				messages={messages}
			/>
			</Scheduler>
		</Paper>
		);
	}
}
