

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { YMaps, Map, Placemark, GeolocationControl, ZoomControl, RouteButton } from 'react-yandex-maps';

// const mapData = {
// 	center: [55.751574, 37.573856],
// 	zoom: 10,

// };

// const mycoordinates = [
// 	[55.684758, 37.738521],
// 	[57.684758, 39.738521]
// ];
console.log(Map);

function YandexMap() {
	const key = '72b60f11-6765-48bf-b7c7-25faaf7b1414'
	const dispatch = useDispatch()
	const coordinates = useSelector((state) => state.allOrders)
	const addressFromForm = useSelector((state) => state.user.district)
	const myAddress = addressFromForm[0].split(',').map(el => Number(el))
	// console.log('coordinates --->  ', coordinates);
	// console.log('myAddress ---> ', myAddress);

function routeToHint() {
		return route => {
			route.routePanel.state.set({
				fromEnabled: true,
				from: myAddress,
				to: [55.710897, 37.602985],
				type: "auto"
			});
		}
	}

	return (
		<YMaps query={{ lang: 'ru_RU', ns: "use-load-option", apikey: key }}>
			<Map width='100%' height='300px' defaultState={{
				center: myAddress,
				zoom: 13,
			}} >
				{coordinates.map((coordinate, indx) => <Placemark key={indx}
					geometry={coordinate.address.coordinates}
					properties={{
						hintContent: coordinate.address.name,
						balloonContentHeader: coordinate.description,
						balloonContent: coordinate.address.name
					}}
					modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}

				/>)}
				<GeolocationControl options={{ float: 'left' }} />
				<RouteButton options={{ float: 'right' }} />
				<ZoomControl options={{ float: 'right' }} />
			</Map>
		</YMaps>
	)
};

export default YandexMap
