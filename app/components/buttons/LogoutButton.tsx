'use client'

import { logout } from '../../(pages)/account/actions'

export default function LogoutButton() {
	return <button onClick={() => logout()}>Logout</button>
}
