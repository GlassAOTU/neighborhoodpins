'use server'

import { createClient } from '@/app/utils/supabase/server'

type FormState = {
    message: string
}

export async function changeName(prevState: FormState, formData: FormData) {
	const supabase = createClient()
	const { data, error } = await supabase.auth.updateUser({
		data: { name: formData.get('name') }
	})
    return {
        message: error ? error.message : 'Name updated'
    }
}
