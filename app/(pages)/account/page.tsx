import LogoutButton from '@/app/components/buttons/LogoutButton'
import { createClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {

	const supabase = createClient();
    const {data: userData} = await supabase.auth.getUser();

	if (!userData.user){
        redirect('/')
    }

	return (
		<div>
      <h1>My Account</h1>
			<LogoutButton />
		</div>
	)
}
