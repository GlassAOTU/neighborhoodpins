'use client'

import { loginWithGoogle } from '../../(pages)/login/actions'
import styles from '../../styles/Login.module.css'

export default function LoginGoogleButton() {
	return (
		<button className={`${styles.google} ${styles.button}`} onClick={() => loginWithGoogle()}>
			<img src='./google-logo.svg' className={styles.logo} />
			<strong>Continue with Google</strong>
		</button>
	)
}
