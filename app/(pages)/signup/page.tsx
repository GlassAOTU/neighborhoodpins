'use client'
import Link from 'next/link'
import { signUp } from './actions'
import { useState } from 'react'
import LoginGoogleButton from '@/app/components/buttons/LoginGoogleButton'
import { useFormState } from 'react-dom'

export default function Signup() {
	const [message, submitForm] = useFormState(signUp, { message: '' })

	const [password, setPassword] = useState('')
	const [passwordValid, setPasswordValid] = useState(false)
	const [requirements, setRequirements] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
	})

	// function to validate passsword
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

	// watch password changes for validation
	const handlePasswordChange = (e: any) => {
		const newPassword = e.target.value
		const validationResults = validatePassword(newPassword)
		setPassword(newPassword)
		setRequirements(validationResults.requirements)
		setPasswordValid(validationResults.isValid)
	}

	return (
		<div className='bg-coach-green min-h-screen-80'>
			<div className='flex justify-center'>
				<div className='mx-auto my-12 p-7 bg-white rounded-2xl w-1/5 min-w-[400px] h-1/2 flex flex-col items-center shadow-xl'>
					<span className='text-3xl mt-5 mb-10 font-bold'>
						First time user?
					</span>

					{/* form start */}
					<form className='flex flex-col items-center gap-2.5 w-7/10' action={submitForm}>
						{/* name field and label */}
						<label
							htmlFor='name'
							className='self-start pl-2.5 pb-0'
						>
							Name
						</label>
						<input
							type='text'
							name='name'
							className='w-full box-border border border-neutral-400 rounded-2xl p-2.5 text-lg focus:outline-none focus:ring-1 focus:ring-evergreen'
							autoComplete='off'
							required
						/>

						{/* email field and label */}
						<label
							htmlFor='email'
							className='self-start pl-2.5 pb-0'
						>
							Email
						</label>
						<input
							type='email'
							name='email'
							className='w-full box-border border border-neutral-400 rounded-2xl p-2.5 text-lg focus:outline-none focus:ring-1 focus:ring-evergreen'
							required
						/>

						{/* password field and label */}
						<label
							htmlFor='password'
							className='self-start pl-2.5 pb-0'
						>
							Password
						</label>
						<input
							type='password'
							name='password'
							value={password}
							onChange={handlePasswordChange}
							className='w-full box-border border border-neutral-400 rounded-2xl p-2.5 text-lg focus:outline-none focus:ring-1 focus:ring-evergreen'
							required
						/>

						{/* confirm password field and label */}
						<label
							htmlFor='confirm-password'
							className='self-start pl-2.5 pb-0'
						>
							Confirm Password
						</label>
						<input
							type='password'
							name='confirm-password'
							className='w-full box-border border border-neutral-400 rounded-2xl p-2.5 text-lg focus:outline-none focus:ring-1 focus:ring-evergreen'
							required
						/>

						{/* password requirement section */}
						<div>
							<p className='self-start pl-2.5 pt-2.5'>
								Password must be:
							</p>
							<ul className='list-disc list-inside'>
								<li
									style={{
										color: requirements.length
											? 'green'
											: 'red',
									}}
								>
									At least 6 characters
								</li>
								<li
									style={{
										color: requirements.uppercase
											? 'green'
											: 'red',
									}}
								>
									At least one uppercase letter
								</li>
								<li
									style={{
										color: requirements.lowercase
											? 'green'
											: 'red',
									}}
								>
									At least one lowercase letter
								</li>
								<li
									style={{
										color: requirements.number
											? 'green'
											: 'red',
									}}
								>
									At least one number
								</li>
							</ul>
						</div>

						<button
							type='submit'
							disabled={!passwordValid}
							className='w-full p-2 font-bold text-emerald-900 rounded-2xl bg-emerald-300 border ring-1 ring-inset ring-emerald-700 hover:text-white hover:bg-emerald-500 transition ease-in-out'
						>
							<strong>Sign up</strong>
						</button>

						<Link
							href='/login'
							className='text-blue-900 hover:text-purple-900'
						>
							Already have an account? Log in!
						</Link>
					</form>

					{message.message && (
						<div className='bg-green-300 ring-2 ring-green-600 mt-5 p-3 rounded-xl text-center'>
							{message.message}
						</div>
					)}

					{/* <div className={styles.otherOptions}>
						<hr className={styles.divider} />
						<button className={`${styles.button} ${styles.apple}`}>
							Sign up with Apple
						</button>
						<LoginGoogleButton />
					</div> */}
				</div>
			</div>
		</div>
	)
}
