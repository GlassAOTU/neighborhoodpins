'use client'

import { createClient } from '@/app/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { changePassword } from './actions'

export default function Password() {
	const router = useRouter()
	const [message, submitForm] = useFormState(changePassword, { message: '' })
	const [userData, setUserData] = useState<any>({
		password: '',
	})
	const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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
            matching: password === confirmPassword
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

	useEffect(() => {
		async function fetchUserData() {
			const supabase = createClient()
			const { data } = await supabase.auth.getUser()
			if (!data.user) {
				router.push('/login')
			}
			setUserData(data)
		}

		fetchUserData()
	}, [])

	return (
		<div className='bg-coach-green min-h-screen-80'>
			<div className='flex justify-center'>
				<div className='mx-auto my-12 p-7 bg-white rounded-2xl w-1/5 min-w-[400px] h-1/2 flex flex-col items-center shadow-xl'>
					<span className='text-3xl mt-5 mb-10 font-bold'>
						Change Password
					</span>

					<form
						className='flex flex-col items-center gap-2.5 w-7/10'
						action={submitForm}
					>
						<label
							htmlFor='password'
							className='self-start pl-2.5 pb-0'
						>
							New Password
						</label>
						<input
							type='password'
							name='password'
							value={password}
							onChange={handlePasswordChange}
							className='w-full box-border border border-neutral-400 rounded-2xl p-2.5 text-lg focus:outline-none focus:ring-1 focus:ring-evergreen'
							required
						/>
						{/* <label
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
						/> */}

						<div>
							<p className='self-start pl-2.5 pt-2.5'>
								Password must:
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
							className='bg-last-of-lettuce border-0 px-5 py-2 text-coach-green rounded-lg hover:bg-evergreen hover:text-white-asparagus transition ease-in-out'
							type='submit'
						>
							<div className='flex flex-row'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='currentColor'
									className='flex w-5 mr-1'
								>
									<path d='M4 3H18L20.7071 5.70711C20.8946 5.89464 21 6.149 21 6.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM7 4V9H16V4H7ZM6 12V19H18V12H6ZM13 5H15V8H13V5Z'></path>
								</svg>
								<span className='flex'>Save</span>
							</div>
						</button>
					</form>
					{message.message && (
						<div className='bg-green-300 mt-5 p-3 rounded-xl'>
							{message.message}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
