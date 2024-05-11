import styles from '@/app/styles/Home.module.css'

export default function MapLegend() {
	return (
		<div className={styles.mapLegend}>
			<div>
				<div
					// className={styles.legendTitle}
					className='text-md font-bold p-2 text-center underline'
				>
					Color Legend
				</div>

				<div className='bg-orange-400 p-1 rounded-lg sm:p-1 sm:my-1'>Pothole</div>
				<div className='bg-green-400 p-1 rounded-lg sm:p-1 sm:my-1'>Fallen tree</div>
				<div className='bg-yellow-400 p-1 rounded-lg sm:p-1 sm:my-1'>Broken streetlight</div>
				<div className='bg-blue-400 p-1 rounded-lg sm:p-1 sm:my-1'>Flooding</div>
			</div>
		</div>
	)
}
