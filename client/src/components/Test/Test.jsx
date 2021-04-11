import { useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css'

function Test() {

	const [value, setValue] = useState();
	// console.log(value.data.geo_lat);
	// console.log(value.data.geo_lon);
	// console.log(value.value);
	
	return (
		<AddressSuggestions token="8536f85322589081ac698e1b9d9f1979cbd98e52" value={value} onChange={setValue} />
	)
}


export default Test




