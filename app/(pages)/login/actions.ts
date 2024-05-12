'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

type FormState = {
	message: string
}

export async function login(prevState: FormState, formData: FormData) {
	const supabase = createClient()
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const {
		data: { user },
		error,
	} = await supabase.auth.signInWithPassword(data)

	const signInRedirect = () => {
		revalidatePath('/', 'layout')
		redirect('/')
	}

	if (user?.confirmed_at) {
		return {
			message: error ? error.message : signInRedirect(),
		}
	} else {
		return { message: 'Verify your email to log in' }
	}
}

export async function loginWithGoogle() {
	const supabase = createClient()

	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: '/',
		},
	})

	if (error) {
		console.error(error)
		redirect('/error')
	}

	revalidatePath('/', 'layout')
	redirect('/')
}
