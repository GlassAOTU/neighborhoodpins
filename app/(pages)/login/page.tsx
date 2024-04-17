import Link from 'next/link'
import styles from '../../styles/Login.module.css'

export default function Login() {
	return (
		<div className={styles.fullpage}>
			<div className={styles.center}>
				<div className={styles.container}>
					<h1>Welcome back!</h1>

					{/* form start */}
					<form className={styles.form}>
						<input
							type='email'
							name='email'
							className={styles.input}
							placeholder='Email'
							required
						/>
						<input
							type='password'
							name='password'
							className={styles.input}
							placeholder='Password'
							required
						/>
						<button
							type='submit'
							className={`${styles.button} ${styles.submit}`}
						>
							<strong>Sign in</strong>
						</button>
						<p className={styles.subtext}>Forgot your password?</p>
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
						<button className={`${styles.button} ${styles.google}`}>
							Sign in with Google
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
