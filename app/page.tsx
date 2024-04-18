'use client'
// old code
{
	/*
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
*/
}

import { useEffect, useRef, useState, useCallback } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

import styles from './styles/Home.module.css'
import './styles/MapControl.css'
import ConfirmationModal from './components/ConfirmationModal'
import LoginModal from './components/LoginModal'

import { createClient } from './utils/supabase/client'

export default function Home() {
	const mapContainer = useRef(null)
	const mapRef = useRef()
	const [showModal, setShowModal] = useState(false)
	const [isUser, setIsUser] = useState(false)
	const [address, setAddress] = useState<any>([])
	const [municipality, setMunicipality] = useState([])
	const [pin, setPin] = useState<mapboxgl.Marker | null>(null)

	mapboxgl.accessToken = process.env.TOKEN

	// sets up the map for load
	const initializeMap = useCallback(() => {
		// sets up the actual map itself
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-73.41023123049351, 40.809516255241356],
			zoom: 10,
			maxBounds: [
				[-74.056, 40.535],
				[-71.85, 41.197],
			],
			maxPitch: 0,
		})

		// loads in the GeoJSON town border data
		map.on('load', () => {
			map.addSource('town-data', {
				type: 'geojson',
				data: './towns-map.json',
			})

			// adds an invisible fill the towns
			map.addLayer({
				id: 'towns-fill',
				type: 'fill',
				source: 'town-data',
				paint: {
					'fill-color': '#2ca060',
					'fill-opacity': 0.0,
				},
			})

			// adds a border to the towns
			map.addLayer({
				id: 'towns-outline',
				type: 'line',
				source: 'town-data',
				paint: {
					'line-color': '#165030',
					'line-width': 0,
				},
			})

			// changes the town fill when the mouse is over it
			map.on('mousemove', 'towns-fill', (e: any) => {
				map.setPaintProperty('towns-outline', 'line-width', 3)
			})

			// changes the town fill when the mouse leaves it
			map.on('mouseleave', 'towns-fill', () => {
				map.setPaintProperty('towns-outline', 'line-width', 0)
			})
		})

		map.doubleClickZoom.disable()
		// adds controls for the zoom and compass buttons
		map.addControl(new mapboxgl.NavigationControl())
		// adds control for locate me button
		map.addControl(
			new mapboxgl.GeolocateControl({
				mapboxgl: mapboxgl,
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true
			})
		)
		// adds search bar
		map.addControl(
			new MapboxGeocoder({
				mapboxgl: mapboxgl,
				accessToken: process.env.TOKEN!,
				bbox: [-73.798552, 40.55391, -71.900128, 41.260419],
			}),
			'top-left'
		)

		// function is ran every time the user clicks on the map
		map.on('click', (e: any) => {
			const coords = e.lngLat    // stores the lat and long of where the mouse clicks
			const features = map.queryRenderedFeatures(e.point)     // stores the list of features of where the user clicks

			// detects whether the user clicks inside town lines and on a road
			if (features.length > 1 && features[1].sourceLayer === 'road') {
				reverseGeocode(coords.lng, coords.lat)    // geocodes the address point, cleans the address, and then stores it in state
				setMunicipality(features[0].properties.name)    // stores the municipality of where the mouse clicks
																// TODO: make it so that pins cannot be placed outside of town boundaries
				setShowModal(true)    // toggles the modal bool to show either modal


				const popup = new mapboxgl.Popup({
					closeButton: true,
					closeOnClick: false,
				})
					.setLngLat([coords.lng, coords.lat])
					.setHTML(
						`<h2>${coords.lat}</h2><h2>${coords.lng}</h2><h2>${address}</h2>`
					)
					// .addTo(map)

				const marker = new mapboxgl.Marker()
					.setLngLat([coords.lng, coords.lat])
					.setPopup(popup)
					.addTo(map)
				setPin(marker)
			}
		})

		return () => {
			map.remove()
		}
	}, [])

	// initalizes the map on first launch
	useEffect(() => {
		if (!mapRef.current && mapContainer.current) initializeMap()
	}, [initializeMap])

	useEffect(() => {
		const fetchData = async () => {
			const supabase = createClient()
			const { data } = await supabase.auth.getUser()
			if (data.user) {
				setIsUser(true)
			}
		}

		const updateMapHeight = () => {
			const mapContainerElement = document.querySelector(
				'.map-container'
			) as HTMLElement
			if (mapContainerElement) {
				mapContainerElement.style.height = `${
					window.innerHeight - 80
				}px`
			}
		}

		fetchData()
		updateMapHeight()
		window.addEventListener('resize', updateMapHeight)
		window.addEventListener('orientationchange', updateMapHeight)

		return () => {
			window.removeEventListener('resize', updateMapHeight)
			window.removeEventListener('orientationchange', updateMapHeight)
		}
	}, [])

	const onClose = () => setShowModal(false)
	const onDeletePin = () => {
		if (pin) {
			pin.remove()
			setPin(null)
		}
	}

	const onSubmit = () => {
		console.log('Submit to database')
		onClose()
	}

	async function reverseGeocode(longitude: string, latitude: string) {
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=address&access_token=${process.env.TOKEN}`
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				if (data.features && data.features.length > 0) {
					const rawAddress = data.features[0].place_name
					setAddress(cleanAddress(rawAddress))
				} else {
					console.log('No address data found.')
				}
			})
			.catch((error) => {
				console.error('Error fetching geocode data:', error)
			})
	}

	function cleanAddress(rawAddress: any) {
		const components = rawAddress.split(', ')
		const street = components[0].replace(/^\d+\s/, '')
		const town = components[1].trim()
		const zipcodeMatch = components[2].match(/\b\d{5}\b/)
		const zipcode = zipcodeMatch ? zipcodeMatch[0] : ''
		return [street, town, zipcode]
	}

	return (
		<>
			<main className={styles.main}>
				<div ref={mapContainer} className='map-container' />
				{showModal && isUser && (
					<ConfirmationModal
						address={address}
						municipality={municipality}
						onClose={onClose}
						onSubmit={onSubmit}
						onDeletePin={onDeletePin}
					/>
				)}
				{showModal && !isUser && <LoginModal onClose={onClose} />}
			</main>
		</>
	)
}
