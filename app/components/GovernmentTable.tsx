'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { createClient } from '../utils/supabase/client'

import { HiOutlineHome } from 'react-icons/hi'
import { IoIosSearch } from 'react-icons/io'
import { WiTime8 } from 'react-icons/wi'
import { CgDatabase } from 'react-icons/cg'
import { MdOutlinePhoneInTalk } from 'react-icons/md'

import Underline from '@/public/underline.png'

interface GovernmentData {
	municipality_name: string
	department_name: string
	opening_time: string
	closing_time: string
	phone_number: string
	website: string
}

function GovernmentTable() {
	const [data, setData] = useState<GovernmentData[]>([])
	const [filteredData, setFilteredData] = useState<GovernmentData[]>([])
	const [searchValue, setSearchValue] = useState<string>('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()

	const supabase = createClient()

	useEffect(() => {
		const fetchData = async () => {
			const { data: fetchedData, error: any } = await supabase
				.from('government')
				.select('*')

			if (error) {
				setError(error)
				setLoading(false)
			} else {
				if (fetchedData) {
					setData(fetchedData)
					setFilteredData(fetchedData)
				}
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const onSearch = (e: any) => {
		e.preventDefault()
		let filtered = searchValue
			? data.filter((obj) =>
					obj.municipality_name
						.toLocaleLowerCase()
						.includes(searchValue.toLocaleLowerCase())
			  )
			: data
		setFilteredData(filtered)
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error loading data!</p>

	return (
		<div className='my-[100px] container'>
			<div className='text-center'>
				<h2 className='relative inline-block text-[40px] text-[#1E1E1E] font-bold lg:text-[70px]'>
					Resources{' '}
					<Image
						src={Underline}
						alt=''
						className='absolute left-0 bottom-0'
					/>
				</h2>
			</div>

			<form className='mt-8 relative lg:mx-20' onSubmit={onSearch}>
				<input
					type='text'
					placeholder='Search'
					className='h-[48px] w-full bg-transparent border border-[#E6E6E6] pl-[50px] pr-[130px] rounded-full flex items-center text-[20px] text-[#3a3a3a] outline-0'
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button
					className='w-[115px] h-[46px] flex justify-center items-center bg-[#AADD66] rounded-full absolute top-[1px] right-[1px]'
					type='submit'
				>
					SEARCH
				</button>
				<IoIosSearch className='text-2xl text-[#747474] absolute left-3 top-3' />
			</form>

			<div className='mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3'>
				{filteredData.length ? (
					filteredData.map((item, index) => (
						<div
							key={index}
							className='bg-[white] border border-[#E6E6E6] rounded overflow-hidden'
							style={{
								boxShadow:
									'9px -9px 16px -5px rgba(102, 115, 121, 0.08)',
							}}
						>
							<div className='border-b border-[#E6E6E6] flex'>
								<div className='w-[75px] h-[75px] bg-[#125B49] rounded flex justify-center items-center'>
									<HiOutlineHome className='text-white text-3xl' />
								</div>
								<div className='p-4 flex flex-col justify-center'>
									<h4 className='font-semibold'>
										Municipality
									</h4>
									<p className='mt-[6px]'>
										{item.municipality_name}
									</p>
								</div>
							</div>

							{/* Department */}
							<div className='mx-3 h-[63px] grid grid-cols-2 border-b border-[#E6E6E6]'>
								<div className='flex items-center gap-2'>
									<CgDatabase className='text-2xl' />
									<h4 className='font-semibold'>
										Department
									</h4>
								</div>
								<div className='flex items-center'>
									<p>{item.department_name}</p>
								</div>
							</div>
							{/* Opening Time */}
							<div className='mx-3 h-[63px] grid grid-cols-2 border-b border-[#E6E6E6]'>
								<div className='flex items-center gap-2'>
									<WiTime8 className='text-2xl' />
									<h4 className='font-semibold'>
										Opening Time
									</h4>
								</div>
								<div className='flex items-center'>
									<p>{item.opening_time}</p>
								</div>
							</div>
							{/* Closing Time */}
							<div className='mx-3 h-[63px] grid grid-cols-2 border-b border-[#E6E6E6]'>
								<div className='flex items-center gap-2'>
									<WiTime8 className='text-2xl' />
									<h4 className='font-semibold'>
										Closing Time
									</h4>
								</div>
								<div className='flex items-center'>
									<p>{item.closing_time}</p>
								</div>
							</div>
							{/* Phone Number */}
							<div className='mx-3 h-[63px] grid grid-cols-2 border-b border-[#E6E6E6]'>
								<div className='flex items-center gap-2'>
									<MdOutlinePhoneInTalk className='text-2xl' />
									<h4 className='font-semibold'>
										Phone Number
									</h4>
								</div>
								<div className='flex items-center'>
									<p>{item.phone_number}</p>
								</div>
							</div>

							<div className='h-[75px] overflow-hidden py-4 px-5 flex items-center gap-3 bg-[#125B49] text-white'>
								<div className='flex gap-2.5'>
									<HiOutlineHome />
									<h4 className='font-semibold'>Website:</h4>
								</div>

								<div className='overflow-hidden'>
									<a
										href={item.website}
										target='_blank'
										className='hover:underline'
									>
										{item.website}
									</a>
								</div>
							</div>
						</div>
					))
				) : (
					<div className='h-[60vh] flex justify-center items-center text-2xl font-semibold'>
						Empty Results
					</div>
				)}
			</div>
		</div>
	)
}

export default GovernmentTable
