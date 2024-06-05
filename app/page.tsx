'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

import styles from './styles/Home.module.css'
import './styles/MapControl.css'
import ConfirmationModal from './components/MapPinModal'
import LoginModal from './components/MapLoginModal'

import { createClient } from './utils/supabase/client'
import toast, { Toaster } from 'react-hot-toast'
import MapLegend from './components/MapLegend'

export default function Home() {
	const mapContainer = useRef(null)
	const mapRef = useRef()
	const [showModal, setShowModal] = useState(false)
	const [isUser, setIsUser] = useState(false)
	const [point, setPoint] = useState<any>()
	const [userUUID, setUserUUID] = useState('')
	const [address, setAddress] = useState<any>([])
	const [municipality, setMunicipality] = useState([])
	const [pin, setPin] = useState<mapboxgl.Marker | null>(null)

	const pinErrorToast = () => toast.error('Can only place pins on roads.')
	const boundsErrorToast = () =>
		toast.error("Can't place a pin outside of bounds.")

	mapboxgl.accessToken = process.env.TOKEN

	const initializeMap = useCallback(() => {
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/dark-v11',
			center: [-73.41023123049351, 40.809516255241356],
			zoom: 10,
			minZoom: 5,
			maxZoom: 20,
			maxPitch: 0,
			maxBounds: [
				[-74.056, 40.535],
				[-71.85, 41.197],
			],
		})

		// loads in the GeoJSON town border data
		map.on('load', () => {
			// loads the town data source layer
			map.addSource('town-data', {
				type: 'geojson',
				data: './towns-map.json',
			})

			// creates empty pin-data source layer
			map.addSource('pin-data', {
				type: 'geojson',
				data: { type: 'FeatureCollection', features: [] },
			})

			// adds an invisible fill the towns
			map.addLayer({
				id: 'towns-fill',
				type: 'fill',
				source: 'town-data',
				paint: {
					'fill-color': '#2ca060',
					'fill-opacity': 0.1,
				},
			})

			// adds a border to the towns
			map.addLayer({
				id: 'towns-outline',
				type: 'line',
				source: 'town-data',
				paint: {
					'line-color': '#165030',
					'line-width': 2,
				},
			})

			// adds pins and their colors
			map.addLayer({
				id: 'pin-points',
				type: 'circle',
				source: 'pin-data',
				paint: {
					'circle-radius': {
						base: 1.75,
						stops: [
							[5, 1],
							[10, 5],
							[20, 30],
						],
					},
					'circle-color': [
						'match',
						['get', 'type_num'],
						1,
						'#ff7400', // orange for pothole (1)
						2,
						'#0cb720', // green for tree (2)
						3,
						'#ece624', // yellow for broken streetlight (3)
						4,
						'#0c62b7', // blue for flood (4)
						'#ccc', // gray for default color
					],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#ffffff',
				},
			})

			const lastPin = localStorage.getItem('lastPin')
			if (lastPin) {
				const { longitude, latitude } = JSON.parse(lastPin)
				map.flyTo({
					center: [longitude, latitude],
					zoom: 15,
					duration: 2000
				})

				// Remove the lastPin from localStorage after flying to it
				map.once('moveend', () => {
					localStorage.removeItem('lastPin')
				})
			}

			// fetches the pins from the database and populates the pin-data source
			fetchDataAndAddToMap(map)
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
				trackUserLocation: true,
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

		// changes the cursor to a pointer when the mouse is over the pins
		map.on('mouseenter', 'pin-points', (e: any) => {
			map.getCanvas().style.cursor = 'pointer'
		})

		// changes the cursor back to the default when the mouse leaves the pins
		map.on('mouseleave', 'pin-points', () => {
			map.getCanvas().style.cursor = ''
		})

		// creates empty popup that will be used on click on each pin
		const popup = new mapboxgl.Popup({
			closeButton: true,
			closeOnClick: true,
		})

		// ran every time the user clicks on a pin
		map.on('click', 'pin-points', (e: any) => {
			// Copy coordinates array.
			const coordinates = e.features[0].geometry.coordinates.slice()
			const type_name = e.features[0].properties.type_name
			const street = e.features[0].properties.street_name
			const town = e.features[0].properties.town_name
			const zipcode = e.features[0].properties.zipcode
			const mmunicipality = e.features[0].properties.municipality_name
			const department = e.features[0].properties.department_name
			const phone_number = e.features[0].properties.phone_number

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
			}

			// Populate the popup and set its coordinates
			// based on the feature found.
			popup
				.setLngLat(coordinates)
				.setHTML(
					`<h2 style="text-align: center; font-weight: bold; font-size: 20px; padding: 5px; background-color: #125b49; border-radius: 10px; margin: 5px 10px 10px 10px; color: white">${type_name}</h2>
					<h3 style="font-size: 16px; text-align: center; padding-bottom: 10px">${street}, ${town}, ${zipcode}</h3>
					<h2 style="text-align: center; font-weight: bold; font-size: 20px; padding: 5px; background-color: #125b49; border-radius: 10px; margin: 5px 10px 10px 10px; color: white"">Contact</h2>
					<h3 style="font-size: 16px; text-align: center; padding-bottom: 10px">${mmunicipality} ${department}</h3>
					<h3 style="font-size: 16px; text-align: center; font-weight: bold"><u>${phone_number}</u></h3>`
				)
				.addTo(map)

			// center the pin clicked on
			map.flyTo({
				center: e.features[0].geometry.coordinates,
				duration: 1000,
			})
		})

		map.once

		// function is ran every time the user clicks on the map
		map.on('click', (e: any) => {
			const coords = e.lngLat // stores the lat and long of where the mouse clicks
			setPoint(coords)
			const features = map.queryRenderedFeatures(e.point) // stores the list of features of where the user clicks
			console.log(features)

			// detects whether the user clicks inside town lines and on a road
			if (features.length > 0 && features[0].source === 'pin-data') {
				// console.log('clicked pin')
				// TODO: remove console output
			} else if (
				// TODO: refine error messages for pins
				features.length > 1 &&
				features[0].source === 'town-data' &&
				features[1].sourceLayer === 'road'
			) {
				reverseGeocode(coords.lng, coords.lat) // geocodes the address point, cleans the address, and then stores it in state
				setMunicipality(features[0].properties.name) // stores the municipality of where the mouse clicks
				setShowModal(true) // toggles the modal bool to show either modal
			} else {
				if (
					features.length === 0 ||
					features[0].source !== 'town-data'
				) {
					boundsErrorToast()
				} else if (
					features.length > 1 &&
					features[1].sourceLayer !== 'road'
				) {
					pinErrorToast()
				}
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

	// fetches the data from the database and adds it to the map
	const fetchDataAndAddToMap = async (map: any) => {
		const supabase = createClient()
		const { data, error } = await supabase
			.from('pins')
			.select(
				'id, latitude, longitude, issue_type_id, street_name, town_name, zipcode, municipality_name, government (municipality_name, department_name, phone_number), issues (*)'
			)

		// console.log(data)

		if (error) {
			console.error('Error fetching data:', error)
			return
		}

		// for every row in the database, create a point in the point features
		const features = data.map((item) => ({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [
					parseFloat(item.longitude),
					parseFloat(item.latitude),
				],
			},
			properties: {
				id: item.id,
				type_num: item.issue_type_id,
				// @ts-ignore -- code works completely fine, TS is throwing errors
				type_name: item.issues.issue_name,
				street_name: item.street_name,
				town_name: item.town_name,
				zipcode: item.zipcode,
				municipality_name: item.municipality_name,
				// @ts-ignore -- code works completely fine, TS is throwing errors
				department_name: item.government.department_name,
				// @ts-ignore -- code works completely fine, TS is throwing errors
				phone_number: item.government.phone_number,
			},
		}))

		// creates an empty geojson feature collection
		const geojsonData = {
			type: 'FeatureCollection',
			features: features,
		}

		// adds the pins from the point features to the geojson
		if (map.getSource('pin-data')) {
			map.getSource('pin-data').setData(geojsonData)
		}
	}

	// runs once on page load
	useEffect(() => {
		const fetchData = async () => {
			const supabase = createClient()
			const { data } = await supabase.auth.getUser()
			// checkks whether a user is logged in
			if (data.user) {
				setIsUser(true) // sets the user bool to true
				setUserUUID(data.user.id!) // sets the user uuid for the database
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
		<main className={styles.main}>
			<MapLegend />
			<div
				ref={mapContainer}
				className='fixed top-0 right-0 bottom-0 left-0 h-[calc(100vh-50px)] z-1'
			/>
			{showModal && isUser && (
				<ConfirmationModal
					point={point}
					address={address}
					municipality={municipality}
					uuid={userUUID}
					onClose={onClose}
					onDeletePin={onDeletePin}
				/>
			)}
			{showModal && !isUser && (
				<LoginModal onClose={onClose} onDeletePin={onDeletePin} />
			)}
			<Toaster />
		</main>
	)
}
