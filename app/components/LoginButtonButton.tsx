'use client'

import { useRouter } from 'next/navigation';
import styles from '../styles/AccountButtons.module.css'

export default function LoginButton() {
  const router = useRouter();

  const handleRedirect = () => {
    // Navigate to the 'account' page
    router.push('/login');
  };

  return (
    <button onClick={handleRedirect} className={styles.accountButton}>Login</button>
  );
}
