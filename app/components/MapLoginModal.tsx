'use client'

import { useRouter } from 'next/navigation'
import styles from '../styles/Modals.module.css'

export default function MapLoginModal({ onClose, onDeletePin }: any) {
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
			<div className={styles.background}>
				<div
					className='fixed top-0 left-0 w-full h-full flex items-center justify-center'
					onClick={handleCancel}
				>
					<div
						className='bg-white rounded-xl p-10 flex flex-col gap-10 shadow-xl'
						onClick={(e) => e.stopPropagation()}
					>
						<div className='text-2xl font-bold text-center'>
							You must be logged in to create a pin.
						</div>
						<div className='flex gap-3'>
							<button
								className='w-full p-2 font-bold text-emerald-900 rounded-2xl bg-emerald-300 border ring-1 ring-inset ring-emerald-700 hover:text-white hover:bg-emerald-500'
								onClick={handleSignupRedirect}
							>
								Create an account!
							</button>
							<button
								className='w-full p-2 font-bold text-emerald-900 rounded-2xl bg-emerald-300 border ring-1 ring-inset ring-emerald-700 hover:text-white hover:bg-emerald-500'
								onClick={handleLoginRedirect}
							>
								Log in!
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
