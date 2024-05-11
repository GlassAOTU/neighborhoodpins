'use server'

import { createClient } from '@/app/utils/supabase/server'

type FormState = {
	message: string
}

export async function sendForgotPassword(
	prevState: FormState,
	formData: FormData
) {
	const supabase = createClient()
	const email = formData.get('email') as string
	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {redirectTo: 'http://localhost:3000/reset-password'})
	return {
		message: error ? error.message : 'Password reset email sent',
	}
}
