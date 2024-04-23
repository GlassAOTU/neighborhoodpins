'use client'

import { useRouter } from 'next/navigation'
import styles from '../styles/Modals.module.css'

export default function LoginModal({ onClose, onDeletePin }: any) {
	const handleCancel = () => {
		onDeletePin()
		onClose()
	}

	const router = useRouter()

	const handleSignupRedirect = () => {
		// Navigate to the 'signup' page
		router.push('/signup')
	}

	const handleLoginRedirect = () => {
		// Navigate to the 'signup' page
		router.push('/login')
	}

	return (
		<>
			<div className={styles.background} onClick={handleCancel}>
				<div
					className={styles.container}
					onClick={(e) => e.stopPropagation()}
				>
					<h1>You must be logged in to create a pin.</h1>
					<div className={styles.redirectButtons}>
						<button
							className={styles.submitButton}
							onClick={handleSignupRedirect}
						>
							Create an account!
						</button>
						<button
							className={styles.submitButton}
							onClick={handleLoginRedirect}
						>
							Sign in!
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
