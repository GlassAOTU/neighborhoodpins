'use client'
import LogoutButton from '@/app/components/buttons/LogoutButton'
import { createClient } from '@/app/utils/supabase/client'
import { redirect } from 'next/navigation'
import styles from '@/app/styles/Account.module.css'
import buttonStyles from '@/app/styles/AccountButtons.module.css'
import { useEffect, useState } from 'react'
import router from 'next/router'

export default function PrivatePage() {

	const [userData, setUserData] = useState<any>({
		user: {
			user_metadata: { name: '' },
			email: '',
		},
	})
	const [editToggle, setEditToggle] = useState(false)

	useEffect(() => {
		async function fetchUserData() {
			const supabase = createClient()
			const { data } = await supabase.auth.getUser()
			if (!data.user) {
				router.push('/')
			}
			setUserData(data)
		}

		fetchUserData()
	}, [])

	const handleToggle = () => {
		setEditToggle(!editToggle)
		console.log('Checkbox toggled, current state:', !editToggle)
	}

	return (
		<div className={styles.fullpage}>
			<div className={styles.center}>
				<div className={styles.background}>
					<div className={styles.modal}>
						<div className={styles.container}>
							<h1>My Account</h1>

							<form>
								<fieldset
									className={styles.editSection}
									style={{ position: 'relative' }}
								>
									<legend className={styles.legend}>
										{!editToggle && (
											<div
												style={{
													position: 'absolute',
													top: '-18px',
													left: 0,
													right: 0,
													bottom: 0,
													paddingTop: '10px',
													borderRadius: '15px',
													backgroundColor:
														'rgba(181, 181, 181, 0.5)',
													zIndex: 1,
												}}
											></div>
										)}

										<label className={styles.switch}>
											<input
												type='checkbox'
												checked={editToggle}
												onChange={handleToggle}
											/>
											<span
												className={styles.slider}
											></span>
										</label>
									</legend>

									<h3>Change Name</h3>
									<div>
										<div className={styles.formAlign}>
											<div className={styles.labelCenter}>
												<label htmlFor='name'>
													New name
												</label>
											</div>
											<input
												type='text'
												name='name'
												placeholder={
													userData?.user
														?.user_metadata?.name
												}
												className={styles.form}
												
												// disabled={!editToggle}
											/>
										</div>
									</div>

									<h3>Change Email</h3>
									<div>
										<div className={styles.formAlign}>
											<div className={styles.labelCenter}>
												<label htmlFor='email'>
													New email
												</label>
											</div>
											<input
												type='text'
												name='email'
												placeholder={userData?.user?.email}
												className={styles.form}
												// disabled={!editToggle}
											/>
										</div>
									</div>

									<h3>Change Password</h3>
									<div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											<div className={styles.formAlign}>
												<div
													className={
														styles.labelCenter
													}
												>
													<label htmlFor='password'>
														New password
													</label>
												</div>
												<input
													type='text'
													name='password'
													className={styles.form}
													// disabled={!editToggle}
												/>
											</div>
											<div className={styles.formAlign}>
												<div
													className={
														styles.labelCenter
													}
												>
													<label htmlFor='password'>
														Confirm new password
													</label>
												</div>
												<input
													type='text'
													name='password'
													className={styles.form}
													// disabled={!editToggle}
												/>
											</div>
										</div>
									</div>

									<button className={styles.saveButton}>
										<div
											className={buttonStyles.buttonFlex}
										>
											<span className={buttonStyles.icon}>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='currentColor'
													className={
														buttonStyles.svgIcon +
														' ' +
														buttonStyles.icon
													}
												>
													<path d='M4 3H18L20.7071 5.70711C20.8946 5.89464 21 6.149 21 6.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM7 4V9H16V4H7ZM6 12V19H18V12H6ZM13 5H15V8H13V5Z'></path>
												</svg>
											</span>
											<span className={styles.text}>
												Save
											</span>
										</div>
									</button>
								</fieldset>
							</form>

							<LogoutButton />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
