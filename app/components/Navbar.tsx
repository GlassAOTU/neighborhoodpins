"use client";

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Turn as Hamburger } from 'hamburger-react'
import './Navbar.css'

export default function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false)

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
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/issue-tracker">Issue Tracker</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
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