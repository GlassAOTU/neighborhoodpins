'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './styles/Home.module.css'
import './styles/MapControl.css'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Modal from './components/ConfirmationModal'
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

export default function Home() {
	const boundLimit = [
		[-74.056, 40.535], // southwest coordinates
		[-71.85, 41.197], // northeast coordinates
	]

	const mapContainer = useRef(null)
	const mapRef = useRef<mapboxgl.Map>()
	const [showModal, setShowModal] = useState(false)
	const [address, setAddress] = useState<String[]>([])
	const [municipality, setMunicipality] = useState([])
	const [pin, setPin] = useState<any>(null)

	mapboxgl.accessToken = process.env.TOKEN
	useEffect(() => {
		const updateMapHeight = () => {
			const mapContainerElement: any = document.querySelector('.map-container')
			if (mapContainerElement) {
				mapContainerElement.style.height = `${
					window.innerHeight - 80
				}px`
			}
		}

		updateMapHeight()

		window.addEventListener('resize', updateMapHeight)
		window.addEventListener('orientationchange', updateMapHeight)

		// ensures map initializes only once
		if (mapContainer.current && !mapRef.current) {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [-73.41023123049351, 40.809516255241356],
				zoom: 10,
				maxBounds: boundLimit,
				maxPitch: 0,
			})
			mapRef.current = map

			// loads the JSON data for the town outlines
			map.on('load', function () {
				// load the JSON source
				map.addSource('town-data', {
					type: 'geojson',
					data: './towns-map.json',
				})

				// Add a layer for the fill of the towns
				map.addLayer({
					id: 'towns-fill',
					type: 'fill',
					source: 'town-data',
					layout: {},
					paint: {
						'fill-color': '#2ca060', // Fill color of the towns, change as needed
						'fill-opacity': 0.0, // Fill opacity, change as needed
					},
				})

				// Add a layer for the outline of the towns
				map.addLayer({
					id: 'towns-outline',
					type: 'line',
					source: 'town-data',
					layout: {},
					paint: {
						'line-color': '#165030', // Line color for the outline, change as needed
						'line-width': 0, // Line width for the outline, change as needed
					},
				})

				// Change the fill color when hovering over a town
				map.on('mousemove', 'towns-fill', function (e: any) {
					map.setPaintProperty('towns-outline', 'line-width', 3)
				})

				// Reset the fill color when no longer hovering over a town
				map.on('mouseleave', 'towns-fill', function () {
					map.setPaintProperty('towns-outline', 'line-width', 0)
				})
			})

			// disable double click to zoom
			map.doubleClickZoom.disable()
			// adds zoom zontrols
			map.addControl(new mapboxgl.NavigationControl())
			// add locate button
			map.addControl(
				new mapboxgl.GeolocateControl({
					mapboxgl: mapboxgl,
					positionOptions: {
						enableHighAccuracy: true,
					},
				})
			)
			// add search bar limiting results to long island
			map.addControl(
				new MapboxGeocoder({
					mapboxgl: mapboxgl,
					accessToken: process.env.TOKEN!,
					bbox: [-73.798552, 40.55391, -71.900128, 41.260419],
				}),
				'top-left'
			)

			// handle pin placement logic
			map.on('click', (e: { lngLat: any; point: any }) => {
				var coords = e.lngLat // stores the lat and long of where the mouse clicks
				var features = map.queryRenderedFeatures(e.point) // stores the map features of where the user clicks
				console.log(coords['lng'], coords['lat'])
				// console.log(features) // ! remove later, debugging purposes

				// check to see if the click took place on a road
				if (features.length > 1) {
					// detect whether the user clicks on the road source layer
					if (features[1].sourceLayer == 'road') {
						// TODO: create popup modal for confirming pin placement
						setShowModal(true)

						// TODO: delay this to right before data is submitted to database
						reverseGeocode(coords['lng'], coords['lat'])
						setMunicipality(features[0].properties['name'])

						// create a popup for the marker
						const popup = new mapboxgl.Popup({
							offset: 0,
							closeButton: true,
							closeOnClick: false,
						})
							.setLngLat(coords)
							.setHTML(
								`<h2>${coords['lat']}</h2><h2>${coords['lng']}</h2><h2>${address}</h2>`
							)
							.addTo(map)

						// make a marker and add it to the map at the clicked location
						// const el = document.createElement("div")
						// el.id = "marker"
						// new mapboxgl.Marker()
						// 	.setLngLat(coords)
						// 	.setPopup(popup)
						// 	.addTo(map)
						const marker = new mapboxgl.Marker()
							.setLngLat(coords)
							.setPopup(popup)
							.addTo(map)
						setPin(marker)

						setShowModal(true)
					}
				}
			})
		}
		return () => {
			window.removeEventListener('resize', updateMapHeight)
			window.removeEventListener('orientationchange', updateMapHeight)
		}
	}, [])

	const onClose = () => {
		setShowModal(false)
	}

	const onDeletePin = () => {
		if (pin) {
			pin.remove()
			setPin(null)
		}
	}

	const onSubmit = () => {
		// Logic to push information to the database
		console.log('Submit to database')

		// // Create a popup at the pin location after submission
		// if (pin && mapContainer.current) {
		// 	const popup = new mapboxgl.Popup({ offset: 25 })
		// 		.setLngLat(pin.getLngLat())
		// 		.setHTML(`<h3>${address}</h3>`)
		// 		.addTo(mapRef.current)
		// }

		onClose() // Close the modal
	}

	async function reverseGeocode(longitude: any, latitude: any) {
		fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=address&access_token=${process.env.TOKEN}`
		)
			.then((response) => response.json())
			.then((data) => {
				// Check if features and context exist in the response
				if (
					data.features &&
					data.features.length > 0 &&
					data.features[0].context
				) {
					// TODO: Remove this printing
					// console.log(data.features[0]['place_name'])
					var rawAddress = data.features[0]['place_name']
					setAddress(cleanAddress(rawAddress))
				} else {
					console.log('No context data found in the response')
				}
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}

	function cleanAddress(address: String) {
		// Split the address into components
		const components = address.split(', ')

		// Extract the street name by removing a leading numeric part only if it's followed by a space
		const street = components[0].replace(/^\d+\s/, '').trim()

		// The town name is assumed to be the second component
		const town = components[1].trim()

		// Extract the zipcode using a regular expression that looks for 5 consecutive digits
		const zipcodeMatch = components[2].match(/\b\d{5}\b/)
		const zipcode = zipcodeMatch ? zipcodeMatch[0] : ''

		return [street, town, zipcode]
	}

	return (
		<main className={styles.main}>
			<div
				ref={mapContainer}
				className='map-container'
				// style={{ height: `${mapHeight}px`, width: '100%' }}
			/>
			{showModal && (
				<Modal
					address={address}
					municipality={municipality}
					onClose={onClose}
					onSubmit={onSubmit}
					onDeletePin={onDeletePin}
				/>
			)}
		</main>
	)
}
