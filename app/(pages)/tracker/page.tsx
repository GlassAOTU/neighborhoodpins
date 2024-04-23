import IssueTable from "@/app/components/IssueTable";

export default async function Tracker({government}: any) {
    
	return (
		<div>
            <h1>Issue Tracker</h1>
			<IssueTable />
        </div>
	)
}
