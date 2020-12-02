import React from "react";
import PlacesAutocomplete,
	 { geocodeByAddress,
	   getLatLng } from "react-places-autocomplete";
import TextField from '@material-ui/core/TextField';

export default function LocationAutofill(props) {
	const [prevAddress, setPrevAddress] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [coordinates, setCoordinates] = React.useState({
		lat: null,
		lng: null
	});
	const [current, setCurrent] = React.useState('');

	const handleSelect = async value => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		setPrevAddress(address);
		setAddress(value);
		setCoordinates(latLng);
	};

	const handleChange = event => {
		props.update(event);
	}

	if(prevAddress != address) {
		setPrevAddress(address)
		props.update(address);
	}
	
	return (
		<PlacesAutocomplete
			value={address}
			onChange={setAddress}
			onSelect={handleSelect}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
			<div onChange={(event) => props.update(event.target.value)} onClick={(event) => props.update(address)}>
				<TextField inputProps={{autocomplete: 'new-password', form: {autocomplete: 'off',},}} label={props.text} {...getInputProps({ placeholder: "address" })}/>

				<div>
					{loading ? <div>...loading</div> : null}

					{suggestions.map(suggestion => {
						const style = {
						backgroundColor: suggestion.active ? "#E0E0E0" : "#fff"
						};

						return (
						<div {...getSuggestionItemProps(suggestion, { style })}>
							{suggestion.description}
						</div>
						);
					})}
				</div>
			</div>
			)}
		</PlacesAutocomplete>
	);
}