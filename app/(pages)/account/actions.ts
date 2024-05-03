'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function changeEmail(formData: any) {
	const supabase = createClient()
	const data = {
		email: formData.get('email'),
	}
	const { error } = await supabase.auth.updateUser({ email: data.email })
	if (error) {
		console.error(error)
	}
}

export async function logout() {
	const supabase = createClient()
	const { error } = await supabase.auth.signOut()
	if (error) {
		console.error(error)
		redirect('/error')
	}

	revalidatePath('/login')
	revalidatePath('/account')
	revalidatePath('/')
	redirect('/')
}
