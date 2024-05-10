// components/Modal.js
import React, { useState } from 'react'
import { submitPin } from '../actions/supabase'

export default function MapPinModal({
	point,
	address,
	municipality,
	uuid,
	onClose,
	onDeletePin,
}: any) {
	const [issueSelection, setIssueSelection] = useState('')
	const [severitySelection, setSeveritySelection] = useState('')
	const [showError, setShowError] = useState(false)

	const createFinalData = () => {
		return {
			submitted_by: uuid,
			issue_type_id: parseInt(issueSelection),
			severity: severitySelection,
			longitude: parseFloat(point.lng),
			latitude: parseFloat(point.lat),
			street_name: address[0],
			town_name: address[1],
			zipcode: address[2],
			municipality_name: municipality,
		}
	}

	const onSubmit = () => {
		if (issueSelection === '' || severitySelection === '') {
			setShowError(true)
		} else {
			submitPin(createFinalData())
			onClose()
		}
	}

	const handleCancel = () => {
		onDeletePin()
		onClose()
	}

	const handleSubmit = () => {
		onSubmit()
	}

	// changes state variable on radio button change
	const onIssueChange = (e: any) => {
		setIssueSelection(e.target.value)
	}
	const onSeverityChange = (e: any) => {
		setSeveritySelection(e.target.value)
	}

	return (
		<>
			{/* // style for the transparent background */}
			<div
				className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-100'
				// close modal if the background is clicked on
				onClick={handleCancel}
			>
				{/* styling and code for the main modal window */}
				<div
					className='bg-white rounded-xl p-5 gap-5 flex flex-col sm:gap-10 shadow-xl sm:p-10 z-'
					onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
				>
					<div>
						<div className='text-center border-b border-y-6 border-neutral-400 font-bold text-3xl'>
							Create a Pin
						</div>
					</div>

					<div>
						<div className='mb-3 text-center underline decoration-1 decoration-neutral-400 font-semibold text-2xl'>
							Address
						</div>
						<div className='text-lg text-center'>
							<div className=' font-bold'>
								Town of {municipality}
							</div>
							{/* 
								address[0] == road name
								address[1] == town name
								address[2] == zipcode
							*/}
							{address[0]}, {address[1]}, {address[2]}
						</div>
					</div>

					<div>
						<div className='mb-3 text-center underline decoration-1 decoration-neutral-400 font-semibold text-2xl'>
							Issue
						</div>

						<div className='flex flex-row w-96 gap-2'>
							<label className='flex-auto text-center'>
								<input
									className='hidden peer'
									type='radio'
									name='issues'
									value='1'
									checked={issueSelection === '1'}
									onChange={onIssueChange}
									required
								/>
								<span className='flex justify-center items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 hover:bg-orange-300 hover:ring-orange-700 rounded-xl peer-checked:bg-orange-400 peer-checked:ring-orange-700 peer-checked:ring-2 transition ease-in-out cursor-pointer'>
									Pothole
								</span>
							</label>
							<label className='flex-auto text-center'>
								<input
									className='hidden peer'
									type='radio'
									name='issues'
									value='2'
									checked={issueSelection === '2'}
									onChange={onIssueChange}
								/>
								<span className='flex justify-center items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 hover:bg-green-300 hover:ring-green-700 rounded-xl peer-checked:bg-green-400 peer-checked:ring-green-700 peer-checked:ring-2 transition ease-in-out cursor-pointer'>
									Fallen tree
								</span>
							</label>
							<label className='flex-auto text-center'>
								<input
									className='hidden peer'
									type='radio'
									name='issues'
									value='3'
									checked={issueSelection === '3'}
									onChange={onIssueChange}
								/>
								<span className='flex justify-center items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 hover:bg-yellow-200 hover:ring-yellow-500 rounded-xl peer-checked:bg-yellow-300 peer-checked:ring-yellow-500 peer-checked:ring-2 transition ease-in-out cursor-pointer'>
									Streetlight
								</span>
							</label>
							<label className='flex-auto text-center'>
								<input
									className='hidden peer'
									type='radio'
									name='issues'
									value='4'
									checked={issueSelection === '4'}
									onChange={onIssueChange}
								/>
								<span className='flex justify-center items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 hover:bg-blue-300 hover:ring-blue-600 rounded-xl peer-checked:bg-blue-400 peer-checked:ring-blue-600 peer-checked:ring-2 transition ease-in-out cursor-pointer'>
									Flooding
								</span>
							</label>
						</div>
					</div>
					<div>
						<div className='mb-3 text-center underline decoration-1 decoration-neutral-400 font-semibold text-2xl'>
							Severity
						</div>
						<div className='flex flex-row w-96 gap-2'>
							<label className='flex-auto text-center'>
								<input
									className='hidden peer'
									type='radio'
									name='severity'
									value='low'
									checked={severitySelection === 'low'}
									onChange={onSeverityChange}
									required
								/>
								<span className='flex justify-center items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 hover:bg-yellow-200 hover:ring-yellow-500 rounded-xl peer-checked:bg-yellow-300 peer-checked:ring-yellow-500 peer-checked:ring-2 transition ease-in-out cursor-pointer'>
									Low
								</span>
							</label>
							<label className='flex-auto text-center'>
								<input
									className='hidden peer'
									type='radio'
									name='severity'
									value='medium'
									checked={severitySelection === 'medium'}
									onChange={onSeverityChange}
								/>
								<span className='flex justify-center items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 hover:bg-orange-300 hover:ring-orange-700 rounded-xl peer-checked:bg-orange-400 peer-checked:ring-orange-700 peer-checked:ring-2 transition ease-in-out cursor-pointer'>
									Medium
								</span>
							</label>
							<label className='flex-auto text-center'>
								<input
									className='hidden peer'
									type='radio'
									name='severity'
									value='high'
									checked={severitySelection === 'high'}
									onChange={onSeverityChange}
								/>
								<span className='flex justify-center items-center w-full h-full py-2 ring-1 ring-inset ring-neutral-400 hover:bg-red-300 hover:ring-red-700 rounded-xl peer-checked:bg-red-400 peer-checked:ring-red-700 peer-checked:ring-2 transition ease-in-out cursor-pointer'>
									High
								</span>
							</label>
						</div>
					</div>

					{showError && (
						<p className='text-white text-center bg-red-500 p-3 rounded-md'>
							Please select an issue and severity
						</p>
					)}

					{/* styling and code for the cancel and submit button */}
					<div className='flex flex-row flex-wrap justify-between content-center'>
						<button
							onClick={handleCancel}
							className='text-red-900 rounded-xl bg-red-200 ring-1 ring-inset ring-red-600 px-5 py-2 font-bold hover:bg-red-300 transition ease-in-out'
						>
							Cancel
						</button>
						<input
							type='button'
							value='Submit'
							onClick={handleSubmit}
							className='text-green-900 rounded-xl bg-green-300 ring-1 ring-inset ring-green-600 px-5 py-2 font-bold hover:bg-green-400 transition ease-in-out cursor-pointer'
						/>
					</div>
					{/* </div> */}
				</div>
			</div>
		</>
	)
}
