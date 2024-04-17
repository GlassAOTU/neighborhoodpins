'use client'

import { useRouter } from 'next/navigation';

export default function AccountButton() {
  const router = useRouter();

  const handleRedirect = () => {
    // Navigate to the 'account' page
    router.push('/account');
  };

  return (
    <button onClick={handleRedirect}>Account</button>
  );
}
