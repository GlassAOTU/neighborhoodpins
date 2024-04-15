import Link from 'next/link'
import styles from '../../styles/Login.module.css'

export default function Signup() {
	const signUp = async () => {
		'use server'
		console.log('Sign up with email')
	}

	return (
		<div className={styles.fullpage}>
			<div className={styles.center}>
				<div className={styles.container}>
					<h1>First time user?</h1>
					<form action={signUp} className={styles.form}>
						<input
							type='text'
							className={styles.input}
							placeholder='Name'
						/>
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
							<strong>Sign up with email</strong>
						</button>
						<Link href='/login' className={styles.subtext}>
							Already have an account? Log in!
						</Link>
					</form>

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
