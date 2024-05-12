'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

type FormState = {
	message: string
}

export async function signUp(prevState: FormState, formData: FormData) {
	const supabase = createClient()
	const data = {
		email: formData.get('email'),
		password: formData.get('password'),
	}

	// const { error } = await supabase.auth.signUp(data)

	const { error } = await supabase.auth.signUp({
		email: data.email as string,
		password: data.password as string,
		options: {
			data: {
				name: formData.get('name') as string,
			},
		},
	})
	
	return {
		message: error ? error.message : "Verify your email complete registration",
	}
}
