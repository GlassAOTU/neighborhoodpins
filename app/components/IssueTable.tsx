'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'

export default function IssueTable() {
	const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
	const [error, setError] = useState()

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

    if (loading) return <p>Loading...</p>
	if (error) return <p>Error loading data!</p>

	return (
		<div>
			{data.map((pin) => (
				<div key={pin.id}>
					{`${pin.issues?.issue_name} on ${pin.street_name}, ${pin.town_name}, ${pin.zipcode}`} <br />
					{pin.severity.replace(/\b\w/g, (s: String) => s.toUpperCase())} {'severity'} <br />
					{`Overseen by ${pin.government?.municipality_name} ${pin.government.department_name}`} <br />
					{pin.government.phone_number} <br />
                    {''} <br />
				</div>
			))}
		</div>
	)
}
