"use client";

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Turn as Hamburger } from 'hamburger-react'
import './Navbar.css'
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const isActive = (href: string) => pathname === href

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link href='/'>
                        <Image
                            className="logo"
                            src="../logo.svg"
                            alt="NeighborhoodPins logo"
                            width={400}
                            height={80}
                            priority
                        />
                    </Link>
                </div>
                <div className="menuIcon" onClick={() => handleShowNavbar()}>
                    <Hamburger size={40} direction="right" />
                </div>
                <div className={`${"navElements"}  ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <Link href="/" className={isActive("/") ? "active" : ""}>Home</Link>
                        </li>
                        <li>
                            <Link href="/issue-tracker" className={isActive("/issue-tracker") ? "active" : ""}>Issue Tracker</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
                        </li>
                        <li>
                            <Link href="/about" className={isActive("/about") ? "active" : ""}>About</Link>
                        </li>
                        <li id="account-button">
                            <Link href="/login">Login/Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}