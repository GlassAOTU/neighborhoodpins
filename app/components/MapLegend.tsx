import styles from '@/app/styles/Home.module.css'

export default function MapLegend() {
	return (
		<div className={styles.mapLegend}>
			<div className='w-200 bottom-0 left-0 bg-white rounded-xl'>
				<div
					// className={styles.legendTitle}
					className='text-md font-bold p-2 text-center underline'
				>
					Color Legend
				</div>

				<div className='bg-orange-400 p-1 m-1 rounded-lg'>Pothole</div>
				<div className='bg-green-400 p-1 m-1 rounded-lg'>Fallen tree</div>
				<div className='bg-yellow-400 p-1 m-1 rounded-lg'>Broken streetlight</div>
				<div className='bg-blue-400 p-1 m-1 rounded-lg'>Flooding</div>
			</div>
		</div>
	)
}
