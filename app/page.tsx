'use client'

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
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
	const mapContainer = useRef(null)
	const mapRef = useRef()
	const [showModal, setShowModal] = useState(false)
	const [isUser, setIsUser] = useState(false)
	const [point, setPoint] = useState<any>()
	const [userEmail, setUserEmail] = useState('')
	const [address, setAddress] = useState<any>([])
	const [municipality, setMunicipality] = useState([])
	const [pin, setPin] = useState<mapboxgl.Marker | null>(null)

	const pinErrorToast = () => toast.error("Can't place a pin here.")

	mapboxgl.accessToken = process.env.TOKEN

	// sets up the map for load
	const initializeMap = useCallback(() => {
		// sets up the actual map itself
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/dark-v11',
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

		// function is ran every time the user clicks on the map
		map.on('click', (e: any) => {
			const coords = e.lngLat // stores the lat and long of where the mouse clicks
			setPoint(coords)
			const features = map.queryRenderedFeatures(e.point) // stores the list of features of where the user clicks

			// detects whether the user clicks inside town lines and on a road
			if (features.length > 1 && features[1].sourceLayer === 'road') {
				reverseGeocode(coords.lng, coords.lat) // geocodes the address point, cleans the address, and then stores it in state
				setMunicipality(features[0].properties.name) // stores the municipality of where the mouse clicks
				// TODO: make it so that pins cannot be placed outside of town boundaries
				setShowModal(true) // toggles the modal bool to show either modal


				const popup = new mapboxgl.Popup({
					closeButton: true,
					closeOnClick: false,
				})
					.setLngLat([coords.lng, coords.lat])
					.setHTML(`<h2>${address}</h2>`)

				const marker = new mapboxgl.Marker()
					.setLngLat([coords.lng, coords.lat])
					.setPopup(popup)
					.addTo(map)

				setPin(marker)
				
			} else {
				pinErrorToast()
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
				setUserEmail(data.user.email!)
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

	// TODO: potentially get rid of
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
						point={point}
						address={address}
						municipality={municipality}
						email={userEmail}
						onClose={onClose}
						onDeletePin={onDeletePin}
					/>
				)}
				{showModal && !isUser && <LoginModal onClose={onClose} onDeletePin={onDeletePin} />}
				<Toaster />
			</main>
		</>
	)
}
