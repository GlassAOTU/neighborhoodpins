import Link from 'next/link'
import styles from '../../styles/Login.module.css'

export default function Login() {
	const signIn = async () => {
		'use server'
		console.log('Sign in with email')
	}

	return (
		<div className={styles.fullpage}>
			<div className={styles.center}>
				<div className={styles.container}>
					<h1>Welcome back!</h1>
					<form action={signIn} className={styles.form}>
						<input
							type='email'
							className={styles.input}
							placeholder='Email'
						/>
						<input
							type='password'
							className={styles.input}
							placeholder='Password'
						/>
						<button
							type='submit'
							className={`${styles.button} ${styles.submit}`}
						>
							<strong>Sign in with email</strong>
						</button>
						<p className={styles.subtext}>Forgot your password?</p>
						<Link href='/signup' className={styles.subtext}>
							Don't have an account? Sign up!
						</Link>
					</form>

					<div className={styles.otherOptions}>
						<hr className={styles.divider} />
						<button className={`${styles.button} ${styles.apple}`}>
							Sign in with Apple
						</button>
						<button className={`${styles.button} ${styles.google}`}>
							Sign in with Google
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
