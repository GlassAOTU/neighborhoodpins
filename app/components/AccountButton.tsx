'use client'

import { useRouter } from 'next/navigation';
import styles from '../styles/AccountButtons.module.css'

export default function AccountButton() {
  const router = useRouter();

  const handleRedirect = () => {
    // Navigate to the 'account' page
    router.push('/account');
  };

  return (
    <button onClick={handleRedirect} className={styles.accountButton}>Account</button>
  );
}
