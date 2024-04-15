// components/Modal.js
import React, { useState } from 'react'
import styles from '../styles/ConfirmationModal.module.css'

export default function ConfirmationModal ({
	address,
	municipality,
	onClose,
	onSubmit,
	onDeletePin,
}: any) {
	const [issueSelection, setIssueSelection] = useState('')
	const [severitySelection, setSeveritySelection] = useState('')

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
							{/* TODO: potentially hide address on modal because of delayed API response */}
							{address[0]}, {address[1]}, {address[2]}
							<br />
							Overseen by the{' '}
							<strong>Town of {municipality}</strong>
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
									type='radio'
									name='issues'
									value='pothole'
								/>
								<span className={styles.name}>Pothole</span>
							</label>
							<label className={styles.radio}>
								<input
									type='radio'
									name='issues'
									value='tree'
								/>
								<span className={styles.name}>Fallen tree</span>
							</label>
							<label className={styles.radio}>
								<input
									type='radio'
									name='issues'
									value='streetlight'
								/>
								<span className={styles.name}>Streetlight</span>
							</label>
							<label className={styles.radio}>
								<input
									type='radio'
									name='issues'
									value='flooding'
								/>
								<span className={styles.name}>Flooding</span>
							</label>
						</div>
					</div>
					<div className={styles.radioButtons}>
						<h2>Select the severity:</h2>
						<div className={styles.radioInputs}>
							<label className={styles.radio}>
								<input type='radio' name='severity' />
								<span className={styles.name}>Low</span>
							</label>
							<label className={styles.radio}>
								<input type='radio' name='severity' />
								<span className={styles.name}>Medium</span>
							</label>
							<label className={styles.radio}>
								<input type='radio' name='severity' />
								<span className={styles.name}>High</span>
							</label>
						</div>
					</div>
					{/* </form> */}

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
