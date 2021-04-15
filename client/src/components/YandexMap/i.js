// function TripMap({ trip }) {
//   const key = '51ad9d93-9100-4ffa-8ebf-138a17d2a225'
//   const dispatch = useDispatch()
//   return (
//     <YMaps query={{ lang: 'ru_RU', ns: "use-load-option", apikey: key }}>
//       <div>
//         <Map defaultState={{
//           center: trip.coordinates,
//           zoom: 6,
//           controls: ['zoomControl', 'fullscreenControl'],
//         }}
//           modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
//           className='map'>
//           <RouteButton instanceRef={ref => {
//             if (ref) {
//               ref.routePanel.state.set({
//                 from: "Москва",
//                 to: trip.coordinates,
//                 type: "auto"
//               });
//               const obj = ref.routePanel.getRouteAsync()
//               obj.then(function (multiRoute) {
//                 multiRoute.model.events.add('requestsuccess', function () {
//                   const activeRoute = multiRoute.getActiveRoute()
//                   if (activeRoute) {
//                     let distance = activeRoute.properties.get('distance')
//                     dispatch(addDistance(trip.id, distance))
//                   }
//                 })
//               })
//             }
//           }} options={{ float: 'right' }} />
//           <GeolocationControl options={{ float: 'left' }} />
//           <Clusterer options={{ groupByCoordinates: false }}>
//             <Placemark
//               geometry={trip.coordinates}
//             />
//           </Clusterer>
//         </Map>
//       </div>
//     </YMaps>
//   )
// }
// export default TripMap
















