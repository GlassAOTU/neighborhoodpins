'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function signup(formData: any) {
	const supabase = createClient()
	const data = {
		email: formData.get('email'),
		password: formData.get('password'),
	}

	// const { error } = await supabase.auth.signUp(data)

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			data: {
				name: formData.get('name')
			}
		}
	})

	if (error) {
		console.error(error)
		redirect('/error')
	} else {
		redirect('/')
	}
}
