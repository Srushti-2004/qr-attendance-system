// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import MarkAttendance from './MarkAttendance';
import ExportReports from './ExportReports';
import AttendanceReport from './AttendanceReport';
import Navbar from './Navbar';
import QRCodeDisplay from './QRCodeDisplay';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Register onRegister={setCurrentUser} />} />
                <Route path="/mark-attendance" element={<MarkAttendance />} />
                <Route path="/export-reports" element={<ExportReports />} />
                <Route path="/attendance-report" element={<AttendanceReport />} />
                <Route path="/qr-code" element={<QRCodeDisplay user={currentUser} />} />
            </Routes>
        </Router>
    );
}

export default App;
