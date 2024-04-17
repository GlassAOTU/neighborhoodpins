import Link from 'next/link'
import { createClient } from '../utils/supabase/server'
import AccountButton from './AccountButton'

export default async function LoginButton() {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()
	console.log({ data })
	if (data.user) {
		return (
			<div>
				<AccountButton />
			</div>
		)
	}

	return (
		<div>
			<Link href='/login'>Login</Link>
		</div>
	)
}
