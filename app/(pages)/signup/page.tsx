import Link from 'next/link'
import styles from '../../styles/Login.module.css'

export default function Signup() {
	return (
		<div className={styles.fullpage}>
			<div className={styles.center}>
				<div className={styles.container}>
					<h1>First time user?</h1>

					{/* form start */}
					<form className={styles.form}>
						<input
							type='text'
							name='name'
							className={styles.input}
							placeholder='Name'
							autoComplete='off'
							required
						/>
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
							<strong>Sign up</strong>
						</button>

						<Link href='/login' className={styles.subtext}>
							Already have an account? Log in!
						</Link>
					</form>
					{/* form end */}

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
