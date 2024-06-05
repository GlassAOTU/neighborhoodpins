'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Turn as Hamburger } from 'hamburger-react'
import styles from '../styles/Navbar.module.css'
import { usePathname } from 'next/navigation'

export default function Navbar({ children }: any) {
	const [showNavbar, setShowNavbar] = useState(false)

	const pathname = usePathname()
	const isActive = (href: string) => pathname === href

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar)
	}

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.container}>
					<div className='flex'>
						<Link href='/' className='flex flex-row mr-3 gap-2'>
							<Image
								src='../icon.svg'
								alt='NeighborhoodPins icon'
								width={40}
								height={40}
								className='shrink-1'
								priority
							/>
							<Image
								src='../logo.svg'
								alt='NeighborhoodPins logo'
								width={300}
								height={80}
								className='mt-2 shrink-1 min-w-0'
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
						{/* TODO: reposition icons for buttons, maybe even redo the links to be buttons */}
						<ul>
							<li>
								<Link
									href='/'
									className={`${
										isActive('/') ? `${styles.active}` : ''
									} ${styles.centerNavButton}`}
								>
									<span className={styles.icon}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											fill='currentColor'
											className={styles.svgIcon}
										>
											<path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z'></path>
										</svg>
									</span>
									<span className={styles.text}>Map</span>
								</Link>
							</li>
							<li>
								<Link
									href='/issues'
									className={`${
										isActive('/issues')
											? `${styles.active}`
											: ''
									} ${styles.centerNavButton}`}
								>
									<span className={styles.icon}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											fill='currentColor'
											className={styles.svgIcon}
										>
											<path d='M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z'></path>
										</svg>
									</span>

									<span className={styles.text}>
										Issue Tracker
									</span>
								</Link>
							</li>
							<li>
								<Link
									href='/resources'
									className={`${
										isActive('/resources')
											? `${styles.active}`
											: ''
									} ${styles.centerNavButton}`}
								>
									<span className={styles.icon}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											fill='currentColor'
											className={styles.svgIcon}
										>
											<path d='M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z'></path>
										</svg>
									</span>
									<span className={styles.text}>
										Resources
									</span>
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className={`${
										isActive('/about')
											? `${styles.active}`
											: ''
									} ${styles.centerNavButton}`}
								>
									<span className={styles.icon}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											fill='currentColor'
											className={styles.svgIcon}
										>
											<path d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z'></path>
										</svg>
									</span>
									<span className={styles.text}>About</span>
								</Link>
							</li>
							<li>
								{/* children --> the login button that becomes the account button when signed in */}
								{children}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
