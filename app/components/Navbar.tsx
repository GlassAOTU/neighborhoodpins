'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Turn as Hamburger } from 'hamburger-react'
import styles from '../styles/Navbar.module.css'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
	const [showNavbar, setShowNavbar] = useState(false)

	const pathname = usePathname()
	const isActive = (href: string) => pathname === href

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar)
	}

	return (
		<>
			<nav className={`${styles.navbar} ${styles.desktopMenu}`}>
				<div className={styles.container}>
					<div className={styles.logo}>
						<Link href='/'>
							<Image
								className={styles.logo}
								src='../logo.svg'
								alt='NeighborhoodPins logo'
								width={400}
								height={80}
								priority
							/>
						</Link>
					</div>
					<div
						className={styles.menuIcon}
						onClick={() => handleShowNavbar()}
					>
						<Hamburger
							rounded
							size={40}
							direction='right'
							color='#FFFFFF'
						/>
					</div>
					<div
						className={`${styles.navElements} ${
							showNavbar && `${styles.active}`
						}`}
					>
						<ul>
							<li>
								<Link
									href='/'
									className={
										isActive('/') ? `${styles.active}` : ''
									}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href='/tracker'
									className={
										isActive('/tracker')
											? `${styles.active}`
											: ''
									}
								>
									Issue Tracker
								</Link>
							</li>
							<li>
								<Link
									href='/resources'
									className={
										isActive('/resources')
											? `${styles.active}`
											: ''
									}
								>
									Resources
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className={
										isActive('/about')
											? `${styles.active}`
											: ''
									}
								>
									About
								</Link>
							</li>
							<li id={styles.accountButton}>
								<Link href='/login'>Login/Signup</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
