// import './styles/globals.css'
import type { Metadata } from 'next'
import styles from './styles/Home.module.css'
import Navbar from './components/Navbar'

import { Inter } from 'next/font/google'
import LoginButton from './components/LoginButton'

const overpass = Inter({
	weight: '400',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'NeighborhoodPins',
	description: 'For a safer neighborhood.',
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/favicon.ico' type='image/x-icon' />
				<link
					rel='shortcut icon'
					href='/favicon.ico'
					type='image/x-icon'
				/>
				<link
					href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css'
					rel='stylesheet'
				/>
			</head>
			<body className={`${styles.html} ${overpass.className}`}>
				<Navbar><LoginButton /></Navbar>
				{children}
			</body>
		</html>
	)
}
