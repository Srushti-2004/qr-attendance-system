// src/AttendanceReport.js
import React, { useState, useEffect } from 'react';

function AttendanceReport() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [records, setRecords] = useState([]);

    const fetchAttendance = async () => {
        const response = await fetch(`/api/attendance/${date}`);
        const data = await response.json();
        setRecords(data);
    };

    useEffect(() => {
        fetchAttendance();
    }, [date]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Attendance Report</h2>
            <div className="form-group">
                <label htmlFor="date">Select Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button onClick={fetchAttendance} className="btn btn-primary mt-3">Fetch Attendance</button>
            <h3 className="mt-4">Records for {date}:</h3>
            <ul className="list-group">
                {records.map((record, index) => (
                    <li key={index} className="list-group-item">
                        {JSON.stringify(record.attendance)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AttendanceReport;
