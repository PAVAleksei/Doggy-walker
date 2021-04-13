
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { YMaps, Map, Placemark, GeolocationControl, ZoomControl, RouteButton } from 'react-yandex-maps';

const location = YMaps.geolocation
console.log(location, ' <------- location')

const mapData = {
	center: [55.751574, 37.573856],
	zoom: 10,

};

// const mycoordinates = [
// 	[55.684758, 37.738521],
// 	[57.684758, 39.738521]
// ];

export default function YandexMap() {
	const dispatch = useDispatch()
	const coordinates = useSelector((state) => state.allOrders)
	console.log(coordinates);

	return (
		<YMaps >
			<Map width='100%' height='300px' defaultState={mapData}>

				<RouteButton instanceRef={ref => {
					if (ref) {
						ref.routePanel.state.set({
							from: [55.751574, 37.573856],
							to: [59.9386300, 30.3141300],
							type: "auto"
						});
						// const obj = ref.routePanel.getRouteAsync()
						// obj.then(function (multiRoute) {
						// 	multiRoute.model.events.add('requestsuccess', function () {
						// 		const activeRoute = multiRoute.getActiveRoute()
						// 		if (activeRoute) {
						// 			let distance = activeRoute.properties.get('distance')
						// 			// dispatch(addDistance(trip.id, distance))
						// 		}
						// 	})
						// })
					}
				}} options={{ float: 'right' }} />

				{coordinates.map(coordinate => <Placemark
					geometry={coordinate.address.coordinates}
					properties={{
						hintContent: coordinate.address.name,
						balloonContent: coordinate.description,
					}}
					modules={['geoObject.addon.balloon', 'geoObject.addon.hint', 'geocode']}

				/>)}
				<GeolocationControl options={{ float: 'left' }} />
				<ZoomControl options={{ float: 'right' }} />
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
