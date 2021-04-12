
import React from 'react';
import { useSelector } from 'react-redux';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const mapData = {
	center: [55.751574, 37.573856],
	zoom: 10,
};

// const mycoordinates = [
// 	[55.684758, 37.738521],
// 	[57.684758, 39.738521]
// ];

export default function YandexMap() {

	const coordinates = useSelector((state) => state.user.orders)
	console.log(coordinates);

	return (
		<YMaps>
			<Map width='100%' height='300px' defaultState={mapData}>
				{coordinates.map(coordinate => <Placemark geometry={coordinate.address.coordinates} />)}
			</Map>
		</YMaps>
	)
};



// <Placemark geometry={coordinates} />



// export default function YandexMap(coordinate) {
//   return (
//     <YMaps>
//       <Map state={{ center: coordinate.coordinate, zoom: 10 }}>
//         <Placemark geometry={coordinate.coordinate} />
//       </Map>
//     </YMaps>
//   );
// }
