// src/MarkAttendance.js
import React, { useState } from 'react';

const users = [
    { id: 1, username: 'John Doe' },
    { id: 2, username: 'Jane Smith' },
    // Add more users as needed
];

function MarkAttendance() {
    const [attendance, setAttendance] = useState({});
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

    const handleAttendanceChange = (userId) => {
        setAttendance((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const attendanceData = {
            date,
            attendance,
        };
        // Here you would typically send the attendance data to your backend
        console.log('Attendance Marked:', attendanceData);
        // Reset the attendance state after submission
        setAttendance({});
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Mark Attendance</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                {users.map((user) => (
                    <div key={user.id} className="form-group form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`user-${user.id}`}
                            checked={attendance[user.id] || false}
                            onChange={() => handleAttendanceChange(user.id)}
                        />
                        <label className="form-check-label" htmlFor={`user-${user.id}`}>
                            {user.username}
                        </label>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary mt-3">Submit Attendance</button>
            </form>
        </div>
    );
}

export default MarkAttendance;
