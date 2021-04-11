import { useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css'
import {
	AppBar,
	Typography,
	Toolbar,
	IconButton,
	Button,
 } from "@material-ui/core";

function Test() {

	const [value, setValue] = useState();
	// console.log(value.data.geo_lat);
	// console.log(value.data.geo_lon);
	// console.log(value.value);

	return (
		<>
			<AddressSuggestions token="8536f85322589081ac698e1b9d9f1979cbd98e52" value={value} onChange={setValue} />
			<input type="file" />
			<Button
				variant="contained"
				component="label"
			>
				Upload File
  <input
					type="file"
					hidden
				/>
			</Button>
		</>
	)
}


export default Test




