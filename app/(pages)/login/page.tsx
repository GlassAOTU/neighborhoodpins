'use client'

import Link from 'next/link'
import styles from '../../styles/Login.module.css'
import { login, loginWithGoogle } from './actions'
import LoginGoogleButton from '@/app/components/buttons/LoginGoogleButton'

export default function Login() {
	return (
		<div className={styles.fullpage}>
			<div className={styles.center}>
				<div className={styles.container}>
					<h1>Welcome back!</h1>

					{/* form start */}
					<form className={styles.form}>
						<label htmlFor="email" className={styles.leftLabel}>Email</label>
						<input
							type='email'
							name='email'
							className={styles.input}
							required
						/>
						<label htmlFor="password" className={styles.leftLabel}>Password</label>
						<input
							type='password'
							name='password'
							className={styles.input}
							required
						/>
						<Link href='/forgot-password' className={styles.subtext} style={{ paddingBottom: '10px' }}>Forgot your password?</Link>
						<button
							type='submit'
							formAction={login}
							className={`${styles.button} ${styles.submit}`}
						>
							<strong>Sign in</strong>
						</button>
						<Link href='/signup' className={styles.subtext}>
							New user? Sign up!
						</Link>
					</form>
					{/* form end */}

					<div className={styles.otherOptions}>
						<hr className={styles.divider} />
						<button className={`${styles.button} ${styles.apple}`}>
							Sign in with Apple
						</button>
						<LoginGoogleButton />
					</div>
				</div>
			</div>
		</div>
	)
}
