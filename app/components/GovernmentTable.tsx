'use client'

import '../styles/TableStyles.css'
import React, { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'
import { DataType, SortingMode, Table } from 'ka-table'

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
	const [searchText, setSearchText] = useState('')

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
				}
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const tableProps = {
		columns: [
			{
				key: 'municipality',
				title: 'Municipality',
				dataType: DataType.String,
				isSortable: true,
			},
			{
				key: 'department',
				title: 'Department',
				dataType: DataType.String,
				isSortable: true,
			},
			{
				key: 'openTime',
				title: 'Opening Time',
				dataType: DataType.String,
				isSortable: false,
				// TODO: add custom sorting
			},
			{
				key: 'closeTime',
				title: 'Closing Time',
				dataType: DataType.String,
				isSortable: false,
				// TODO: add custom sorting
			},
			{
				key: 'phoneNumber',
				title: 'Phone Number',
				dataType: DataType.String,
				isSortable: false,
			},
			{
				key: 'website',
				title: 'Website',
				dataType: DataType.String,
				isSortable: false,
			},
		],
		data: data.map((item: any) => ({
			id: item.municipality_name,
			municipality: item.municipality_name,
			department: item.department_name,
			openTime: item.opening_time,
			closeTime: item.closing_time,
			phoneNumber: item.phone_number,
			website: item.website,
		})),
		rowKeyField: 'id',
		sortingMode: SortingMode.Single,
		searchText: searchText,
		onSearch: (searchText: string) => {
			setSearchText(searchText)
		},
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error loading data!</p>

	return (
		<div className='main-container'>
			<input
				type='search'
				value={searchText}
				onChange={(event) => {
					setSearchText(event.currentTarget.value)
				}}
				className='top-element'
				placeholder='Search...'
			/>
			<Table {...tableProps} />
		</div>
	)
}

export default GovernmentTable
