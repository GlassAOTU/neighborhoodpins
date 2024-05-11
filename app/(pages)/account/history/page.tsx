'use client'
import Image from "next/image"
import Underline from "@/public/underline.png"
import HistoryTable from "@/app/components/HistoryTable"
import { useEffect, useState } from "react"
import { createClient } from "@/app/utils/supabase/client"
import router from "next/router"

export default function History() {

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
        <main className='flex flex-col items-center'>
            <div className='text-center'>
                <h2 className='relative inline-block text-[40px] text-[#1E1E1E] font-bold lg:text-[70px] mt-10'>
                    Your Submissions{' '}
                    <Image
                        src={Underline}
                        alt=''
                        className='absolute left-0 bottom-0'
                    />
                </h2>
                <HistoryTable />
            </div>
        </main>
    )
}