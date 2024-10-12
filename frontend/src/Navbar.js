// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Attendance System</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mark-attendance">Mark Attendance</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/export-reports">Export Reports</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

