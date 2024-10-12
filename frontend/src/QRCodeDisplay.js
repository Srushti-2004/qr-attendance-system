// src/QRCodeDisplay.js
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeDisplay = ({ user }) => {
    const qrData = user ? `${user.id}-${user.username}` : 'No user selected';

    return (
        <div className="container mt-5">
            <h2 className="text-center">Your QR Code</h2>
            {user ? (
               <QRCodeSVG value="https://example.com" />

            ) : (
                <p>No user data available. Please register or select a user.</p>
            )}
        </div>
    );
};

export default QRCodeDisplay;
