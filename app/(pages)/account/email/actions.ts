'use server'

import { createClient } from '@/app/utils/supabase/server'

type FormState = {
	message: string
}

export async function changeEmail(prevState: FormState, formData: FormData) {
	const supabase = createClient()
	const { data, error } = await supabase.auth.updateUser({
		email: formData.get('email') as string
	})
	return {
		message: error
			? error.message
			: 'Confirm email change on the new email account',
	}
}
