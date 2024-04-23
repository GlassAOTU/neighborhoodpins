import { createClient } from '../../utils/supabase/server'
import AccountButton from './AccountButton'
import LoginButton from './LoginButton'

export default async function LoginButtonNav() {
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
			<LoginButton />
		</div>
	)
}
