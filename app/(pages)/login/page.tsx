'use client'

import Link from 'next/link'
import { login } from './actions'
import LoginGoogleButton from '@/app/components/buttons/LoginGoogleButton'
import { useFormState } from 'react-dom'

export default function LoginPage() {
	const [message, submitForm] = useFormState(login, { message: '' })

	return (
		<div className='bg-coach-green min-h-screen-80'>
			<div className='flex justify-center'>
				<div className='mx-auto my-12 p-7 bg-white rounded-2xl w-1/5 min-w-[400px] h-1/2 flex flex-col items-center shadow-xl'>
					<span className='text-3xl mt-5 mb-10 font-bold'>
						Welcome back!
					</span>

					{/* form start */}
					<form className='flex flex-col items-center gap-2.5 w-7/10' action={submitForm}>
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
						<label
							htmlFor='password'
							className='self-start pl-2.5 pt-2.5'
						>
							Password
						</label>
						<input
							type='password'
							name='password'
							className='w-full box-border border border-neutral-400 rounded-2xl p-2.5 text-lg focus:outline-none focus:ring-1 focus:ring-evergreen'
							required
						/>
						<Link
							href='/forgot-password'
							className='text-sm text-blue-900 hover:text-purple-900'
						>
							Forgot your password?
						</Link>
						<button
							type='submit'
							className='w-full p-2 font-bold text-emerald-900 rounded-2xl bg-emerald-300 border ring-1 ring-inset ring-emerald-700 hover:text-white hover:bg-emerald-500 transition ease-in-out'
						>
							Log in
						</button>
						<Link
							href='/signup'
							className='text-blue-900 hover:text-purple-900'
						>
							{`Don't have an account? Sign up!`}
						</Link>
					</form>
					{message?.message && (
						<div className='bg-red-300 ring-2 ring-red-600 mt-5 p-3 rounded-xl text-center'>
							{message.message}
						</div>
					)}

					{/* form end */}

					{/* <hr className='w-3/4' />
					<button className={`${styles.button} ${styles.apple}`}>
						Sign in with Apple
					</button>
					<LoginGoogleButton /> */}
				</div>
			</div>
		</div>
	)
}
