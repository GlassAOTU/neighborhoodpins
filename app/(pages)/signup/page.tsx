'use client'
import Link from 'next/link'
import styles from '../../styles/Login.module.css'
import { signup } from './actions'
import { useState } from 'react'

export default function Signup() {
	const validatePassword = (password: string) => {
		const requirements = {
			length: password.length >= 6,
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			number: /[0-9]/.test(password),
		}
		const isValid = Object.values(requirements).every(Boolean) // Check if all requirements are true
		return { requirements, isValid }
	}

	const [requirements, setRequirements] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
	})

	const [password, setPassword] = useState('')
	const [passwordValid, setPasswordValid] = useState(false);

	const handlePasswordChange = (e: any) => {
		const newPassword = e.target.value
		const validationResults = validatePassword(newPassword)
		setPassword(newPassword)
		setRequirements(validationResults.requirements)
		setPasswordValid(validationResults.isValid)
	}

	return (
		<div className={styles.fullpage}>
			<div className={styles.center}>
				<div className={styles.container}>
					<h1>First time user?</h1>

					{/* form start */}
					<form className={styles.form}>
						<label htmlFor='name' className={styles.leftLabel}>
							Name
						</label>
						<input
							type='text'
							name='name'
							className={styles.input}
							autoComplete='off'
							required
						/>
						<label htmlFor='email' className={styles.leftLabel}>
							Email
						</label>
						<input
							type='email'
							name='email'
							className={styles.input}
							required
						/>
						<label htmlFor='password' className={styles.leftLabel}>
							Password
						</label>
						<input
							type='password'
							name='password'
							value={password}
							onChange={handlePasswordChange}
							className={styles.input}
							required
						/>
						<label
							htmlFor='retry-password'
							className={styles.leftLabel}
						>
							Confirm Password
						</label>
						<input
							type='password'
							name='retry-password'
							className={styles.input}
							required
						/>

						<div className={styles.leftLabel}>
							<p>Password must contain:</p>
							<ul style={{ listStyle: 'none' }}>
								<li
									style={{
										fontWeight: requirements.length ? 'bold' : 'normal',
										color: requirements.length
											? 'green'
											: 'red',
									}}
								>
									{requirements.length ? '✓\u2003' : '✗\u2003'}
									At least 6 characters
								</li>
								<li
									style={{
										fontWeight: requirements.uppercase ? 'bold' : 'normal',
										color: requirements.uppercase
											? 'green'
											: 'red',
									}}
								>
									{requirements.uppercase ? '✓\u2003' : '✗\u2003'}
									At least one uppercase letter
								</li>
								<li
									style={{
										fontWeight: requirements.lowercase ? 'bold' : 'normal',
										color: requirements.lowercase
											? 'green'
											: 'red',
									}}
								>
									{requirements.lowercase ? '✓\u2003' : '✗\u2003'}
									At least one lowercase letter
								</li>
								<li
									style={{
										fontWeight: requirements.number ? 'bold' : 'normal',
										color: requirements.number
											? 'green'
											: 'red',
										
									}}
								>
									{requirements.number ? '✓\u2003' : '✗\u2003'}
									At least one number
								</li>
							</ul>
						</div>

						<button
							type='submit'
							disabled={!passwordValid}
							formAction={signup}
							className={`${styles.button} ${styles.submit}`}
						>
							<strong>Sign up</strong>
						</button>
					</form>

					<Link href='/login' className={styles.subtext}>
						Already have an account? Log in!
					</Link>

					<div className={styles.otherOptions}>
						<hr className={styles.divider} />
						<button className={`${styles.button} ${styles.apple}`}>
							Sign up with Apple
						</button>
						<button className={`${styles.button} ${styles.google}`}>
							Sign up with Google
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
