import IssueTable from '@/app/components/IssueTable'
import modalStyles from '@/app/styles/Modals.module.css'

export default async function Tracker({ government }: any) {
	return (
		<div>
			<h1 style={{display: 'flex', justifyContent: 'center'}}>Issue Tracker</h1>
			<IssueTable />
		</div>
	)
}
