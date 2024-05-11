'use server'

import { createClient } from '@/app/utils/supabase/server'

type FormState = {
	message: string
}

export async function resetPassword(prevState: FormState, formData: FormData) {
	const supabase = createClient()
	const { data, error } = await supabase.auth.updateUser({
		password: formData.get('password') as string
	})
	return {
		message: error
			? error.message
			: 'Password reset successfully',
	}
}
