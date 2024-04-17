'use client'

import React, { useEffect, useState } from 'react'
import supabase from '../supabaseClient'

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
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()

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
                }
                setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error loading data!</p>

	return (
		<div>
			{data.map((item) => (
				<div key={item.municipality_name}>
					{' '}
					<br />
					{item.municipality_name} <br />
					{item.department_name} <br />
					{item.opening_time} <br />
					{item.closing_time} <br />
					{item.phone_number} <br />
					<a href={`${item.website}`}>{item.website}</a> <br />
				</div>
			))}
		</div>
	)
}

export default GovernmentTable
