'use client'

import '../styles/TableStyles.css'
import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'
import { Table, DataType, SortingMode } from 'ka-table'
import { ChildComponents } from 'ka-table/models'

export default function HistoryTable() {
	const [data, setData] = useState<any>([])
	const [userData, setUserData] = useState<any>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [searchText, setSearchText] = useState('')

	const supabase = createClient()

	const fetchUsers = async () => {
		const { data, error } = await supabase.auth.getUser()
		if (error) {
			console.error('No user found', error);
		} else {
			setUserData(data.user);
		}
	}
	
	const fetchData = async () => {
		if (!userData) {
			console.log('No user data available');
			return;
		}
	
		const { data: fetchedData, error: any } = await supabase
			.from('pins')
			.select(`
				id, issue_type_id, severity, street_name, town_name, zipcode, municipality_name,
				government (municipality_name, department_name, phone_number, website),
				issues (*)
			`)
			.match({'submitted_by': userData.id});  // Use the user ID here
	
		if (error) {
			setError(error);
		} else {
			setData(fetchedData || []);
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchUsers();
	}, []);
	
	useEffect(() => {
		if (userData) {
			fetchData();
		}
	}, [userData]);  // Dependency on userData
	

	const tableProps = {
		columns: [
			{
				key: 'issueName',
				title: 'Issue Name',
				dataType: DataType.String,
				isSortable: true,
			},
			{
				key: 'severity',
				title: 'Severity',
				dataType: DataType.String,
				isSortable: false,
			},
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
			{
				key: 'website',
				title: 'Website',
				dataType: DataType.String,
				isSortable: false,
			},
		],
		data: data.map((pin: any) => ({
			id: pin.id,
			issueName: pin.issues?.issue_name,
			severity: pin.severity.replace(/\b\w/g, (letter: string) =>
				letter.toUpperCase()
			),
			location: `${pin.street_name}, ${pin.town_name}, ${pin.zipcode}`,
			departmentInfo: `${pin.government?.municipality_name} ${pin.government.department_name}`,
			phoneNumber: pin.government.phone_number,
			website: pin.government.website,
		})),
		rowKeyField: 'id',
		sortingMode: SortingMode.Single,
		searchText: searchText,
		columnResizing: true,
		onSearch: (searchText: string) => {
			setSearchText(searchText)
		}
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
