'use client'

import { useRouter } from 'next/navigation'
import styles from '../styles/Modals.module.css'

export default function LoginModal({ onClose }: any) {

	const handleCancel = () => {
		onClose()
	}

	const router = useRouter()

	const handleRedirect = () => {
		// Navigate to the 'signup' page
		router.push('/signup')
	}

	return (
		<>
			<div className={styles.background} onClick={handleCancel}>
				<div
					className={styles.container}
					onClick={(e) => e.stopPropagation()}
				>
					<h1>You must be logged in to create a pin.</h1>
					<button className={styles.submitButton} onClick={handleRedirect}>
						Create an account!
					</button>
				</div>
			</div>
		</>
	)
}
