import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
    const {logout} = props
    return (
        <div className="navbar">
            <Link className="nav-link" to="/profile">Profile</Link>
            <Link className="nav-link" to="/public">Public</Link>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
    )
}