'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function login(formData: any) {
	const supabase = createClient()
	const data = {
		email: formData.get('email'),
		password: formData.get('password'),
	}

	const { error } = await supabase.auth.signInWithPassword(data)

	if (error) {
		console.error(error)
		redirect('/error')
	}

	revalidatePath('/', 'layout')
	redirect('/')
}