'use client'
import LogoutButton from '@/app/components/buttons/LogoutButton'
import { createClient } from '@/app/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PrivatePage() {
	const router = useRouter()
	const [userData, setUserData] = useState<any>({
		user: {
			user_metadata: { name: '' },
		},
	})

	useEffect(() => {
		async function fetchUserData() {
			const supabase = createClient()
			const { data } = await supabase.auth.getUser()
			if (!data.user) {
				router.push('/login')
			}
			setUserData(data)
		}

		fetchUserData()
	}, [])

	return (
		// div for background
		<div className='bg-coach-green min-h-screen-80'>
			{/* centers the card div */}
			<div className='flex justify-center'>
				{/* div for the card */}
				<div className='mx-auto my-12 p-7 bg-white rounded-lg w-1/5 min-w-[400px] h-1/2 flex flex-col items-center shadow-xl'>
					<span className='text-3xl mt-5 mb-10 font-bold'>
						Account Settings
					</span>
					<div className='flex flex-col text-center mb-10 gap-3'>
					<Link
							href='/account/submissions'
							className='text-blue-900 hover:text-purple-900 underline'
						>
							View submissions
						</Link>
						<Link
							href='/account/name'
							className='text-blue-900 hover:text-purple-900 underline'
						>
							Change name
						</Link>
						<Link
							href='/account/email'
							className='text-blue-900 hover:text-purple-900 underline'
						>
							Change email
						</Link>
						<Link
							href='/account/password'
							className='text-blue-900 hover:text-purple-900 underline'
						>
							Change password
						</Link>
					</div>

					<LogoutButton />
				</div>
			</div>
		</div>
	)
}
