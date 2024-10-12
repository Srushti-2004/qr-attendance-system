const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { Document, Packer, Paragraph, Table, TableCell, TableRow } = require('docx');
const fs = require('fs');

const generateDailyReport = async (date) => {
    const attendanceRecords = await Attendance.find({ date });

    const doc = new Document();
    doc.addSection({
        children: [
            new Paragraph({ text: `Daily Attendance Report - ${date}`, heading: "Heading1", alignment: "center" }),
            new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("User ID")] }),
                            new TableCell({ children: [new Paragraph("Name")] }),
                            new TableCell({ children: [new Paragraph("Attendance Status")] }),
                        ],
                    }),
                    ...attendanceRecords.map(record => new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph(record.userId)] }),
                            new TableCell({ children: [new Paragraph("User Name Here")] }), // Get user's name if needed
                            new TableCell({ children: [new Paragraph(record.status)] }),
                        ],
                    })),
                ],
            }),
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(`./reports/Daily_Attendance_${date}.docx`, buffer);
    console.log(`Daily attendance report for ${date} saved successfully.`);
};

const validateQRData = (qrData) => {
    const { date } = JSON.parse(qrData);
    const now = new Date();
    const qrDate = new Date(date);
    const timeDiff = (now - qrDate) / (1000 * 60); // Difference in minutes
    return timeDiff <= 10; // Allow attendance marking within 10 minutes of QR code generation
};

router.post('/mark', async (req, res) => {
    const { qrData } = req.body;
    if (!validateQRData(qrData)) {
        return res.status(400).json({ message: 'QR Code expired or invalid.' });
    }

    const { userId, date } = JSON.parse(qrData);
    const existingRecord = await Attendance.findOne({ userId, date });

    if (existingRecord) {
        return res.status(400).json({ message: "Attendance already marked for today." });
    }

    const attendance = new Attendance({ userId, date });
    await attendance.save();
    await generateDailyReport(date);
    res.json({ message: 'Attendance marked and report generated.' });
});

module.exports = router;
