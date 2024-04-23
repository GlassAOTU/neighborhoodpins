// components/Modal.js
import React, { useState } from 'react'
import styles from '../styles/Modals.module.css'
import { submitPin } from '../actions/supabase'

export default function ConfirmationModal({
	point,
	address,
	municipality,
	email,
	onClose,
	onDeletePin,
}: any) {
	const [issueSelection, setIssueSelection] = useState('')
	const [severitySelection, setSeveritySelection] = useState('')
	const [showError, setShowError] = useState(false)

	const createFinalData = () => {
		return {
			submitted_by: email,
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
				className={styles.background}
				// close modal if the background is clicked on
				onClick={handleCancel}
			>
				{/* styling and code for the main modal window */}
				<div
					className={styles.container}
					onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
				>
					{/* <div className={styles.flexColumn}> */}
					<div>
						<h1
							style={{
								borderBottom: '1px solid #000000',
								borderColor: '#16641f',
								marginTop: 0,
							}}
						>
							Create a Pin
						</h1>
					</div>

					<div>
						<h2 style={{ marginTop: 0 }}>Address</h2>
						<p className={styles.text}>
							<strong style={{ fontSize: '18px' }}>
								Town of {municipality}
							</strong>
							<br />
							{/* TODO: potentially hide address on modal because of delayed API response */}
							{/* 
								address[0] == road name
								address[1] == town name
								address[2] == zipcode
							*/}
							{address[0]}, {address[1]}, {address[2]}
						</p>
					</div>

					<div className={styles.radioButtons}>
						<h2>Issue</h2>

						<div
							className={styles.radioInputs}
							style={{ width: '400px' }}
						>
							<label className={styles.radio}>
								<input
									className={styles.pothole}
									type='radio'
									name='issues'
									value='1'
									checked={issueSelection === '1'}
									onChange={onIssueChange}
									required
								/>
								<span className={styles.name}>Pothole</span>
							</label>
							<label className={styles.radio}>
								<input
									className={styles.tree}
									type='radio'
									name='issues'
									value='2'
									checked={issueSelection === '2'}
									onChange={onIssueChange}
								/>
								<span className={styles.name}>Fallen tree</span>
							</label>
							<label className={styles.radio}>
								<input
									className={styles.light}
									type='radio'
									name='issues'
									value='3'
									checked={issueSelection === '3'}
									onChange={onIssueChange}
								/>
								<span className={styles.name}>Streetlight</span>
							</label>
							<label className={styles.radio}>
								<input
									className={styles.flood}
									type='radio'
									name='issues'
									value='4'
									checked={issueSelection === '4'}
									onChange={onIssueChange}
								/>
								<span className={styles.name}>Flooding</span>
							</label>
						</div>
					</div>
					<div className={styles.radioButtons}>
						<h2>Severity</h2>
						<div className={styles.radioInputs}>
							<label className={styles.radio}>
								<input
									className={styles.low}
									type='radio'
									name='severity'
									value='low'
									checked={severitySelection === 'low'}
									onChange={onSeverityChange}
									required
								/>
								<span className={styles.name}>Low</span>
							</label>
							<label className={styles.radio}>
								<input
									className={styles.medium}
									type='radio'
									name='severity'
									value='medium'
									checked={severitySelection === 'medium'}
									onChange={onSeverityChange}
								/>
								<span className={styles.name}>Medium</span>
							</label>
							<label className={styles.radio}>
								<input
									className={styles.high}
									type='radio'
									name='severity'
									value='high'
									checked={severitySelection === 'high'}
									onChange={onSeverityChange}
								/>
								<span className={styles.name}>High</span>
							</label>
						</div>
					</div>

					{showError && (
						<p style={{ color: 'red' }}>
							Please select an issue and severity
						</p>
					)}

					{/* styling and code for the cancel and submit button */}
					<div className={styles.buttonSpacing}>
						<button
							onClick={handleCancel}
							className={styles.cancelButton}
						>
							Cancel
						</button>
						<input
							type='button'
							value='Submit'
							onClick={handleSubmit}
							className={styles.submitButton}
						/>
					</div>
					{/* </div> */}
				</div>
			</div>
		</>
	)
}
