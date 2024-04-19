// components/Modal.js
import React, { useState } from 'react'
import styles from '../styles/Modals.module.css'

export default function ConfirmationModal({
	address,
	municipality,
	onClose,
	onSubmit,
	onDeletePin,
}: any) {
	const [issueSelection, setIssueSelection] = useState('')
	const [severitySelection, setSeveritySelection] = useState('')
	const handleRadioChange = (event: any) => {
		setIssueSelection(event.target.value)
	}

	const handleCancel = () => {
		onDeletePin()
		onClose()
	}

	const handleSubmit = () => {
		onSubmit()
		onClose()
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
						<strong style={{fontSize: '18px'}}>Town of {municipality}</strong>
						<br />
							{/* TODO: potentially hide address on modal because of delayed API response */}
							{address[0]}, {address[1]}, {address[2]}
							
							
						</p>
					</div>

					<div className={styles.radioButtons}>
						<h2>Select the issue:</h2>

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
								/>
								<span className={styles.name}>Pothole</span>
							</label>
							<label className={styles.radio}>
								<input
									className={styles.tree}
									type='radio'
									name='issues'
									value='2'
								/>
								<span className={styles.name}>Fallen tree</span>
							</label>
							<label className={styles.radio}>
								<input
									className={styles.light}
									type='radio'
									name='issues'
									value='3'
								/>
								<span className={styles.name}>Streetlight</span>
							</label>
							<label className={styles.radio}>
								<input
									className={styles.flood}
									type='radio'
									name='issues'
									value='4'
								/>
								<span className={styles.name}>Flooding</span>
							</label>
						</div>
					</div>
					<div className={styles.radioButtons}>
						<h2>Select the severity:</h2>
						<div className={styles.radioInputs}>
							<label className={styles.radio}>
								<input className={styles.low} type='radio' name='severity' value='1' />
								<span className={styles.name}>Low</span>
							</label>
							<label className={styles.radio}>
								<input className={styles.medium} type='radio' name='severity' value='2' />
								<span className={styles.name}>Medium</span>
							</label>
							<label className={styles.radio}>
								<input className={styles.high} type='radio' name='severity' value='3' />
								<span className={styles.name}>High</span>
							</label>
						</div>
					</div>

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
