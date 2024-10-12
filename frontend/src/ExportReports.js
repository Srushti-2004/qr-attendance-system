// src/ExportReports.js
import React from 'react';

function ExportReports() {
    const exportReports = () => {
        // Simulate exporting reports (this could involve calling your backend)
        const reportData = "Attendance Report:\n\nUser: John Doe - Present\nUser: Jane Smith - Absent"; // Dummy data
        const blob = new Blob([reportData], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'attendance_report.txt';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Export Attendance Reports</h2>
            <button onClick={exportReports} className="btn btn-primary">Download Report</button>
        </div>
    );
}

export default ExportReports;
