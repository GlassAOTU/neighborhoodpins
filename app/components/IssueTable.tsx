'use client'

import '../styles/TableStyles.css'
import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'
import { Table, DataType, SortingMode } from 'ka-table'

// ! change search bar to match resources page
// ! add website column
// ! add severity column

export default function IssueTable() {
	const [data, setData] = useState<any>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [searchText, setSearchText] = useState('')

	const supabase = createClient()

	useEffect(() => {
		const fetchData = async () => {
			const { data: fetchedData, error: any } = await supabase
				.from('pins')
				.select(
					`id, issue_type_id, severity, street_name, town_name, zipcode, municipality_name,
                    government (municipality_name, department_name, phone_number),
                    issues (*)`
				)

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
				key: 'issueName',
				title: 'Issue Name',
				dataType: DataType.String,
				isSortable: true,
			},
			// TODO: add more columns
			// {
			// 	key: 'severity',
			// 	title: 'Severity',
			// 	dataType: DataType.String,
			// 	isSortable: false,
			//  TODO: add custom sorting
			// },
			{
				key: 'location',
				title: 'Location',
				dataType: DataType.String,
				isSortable: false,
			},
			{
				key: 'departmentInfo',
				title: 'Department Info',
				dataType: DataType.String,
				isSortable: true,
			},
			{
				key: 'phoneNumber',
				title: 'Phone Number',
				dataType: DataType.String,
				isSortable: false,
			},
		],
		data: data.map((pin: any) => ({
			id: pin.id,
			issueName: pin.issues?.issue_name,
			// TODO: add more columns
			// severity: pin.severity.replace(/\b\w/g, (letter: string) =>
			// 	letter.toUpperCase()
			// ),
			location: `${pin.street_name}, ${pin.town_name}, ${pin.zipcode}`,
			departmentInfo: `${pin.government?.municipality_name} ${pin.government.department_name}`,
			phoneNumber: pin.government.phone_number,
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
				className='top-element rounded-2xl'
				placeholder='Search'
			/>
			<Table {...tableProps} />
		</div>
	)
}
