import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

interface QRScannerModalProps {
  onScanSuccess: (data: string) => void;
  onClose: () => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ onScanSuccess, onClose }) => {
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      onScanSuccess(data);
      setScanning(false); // Stop the scanner on success
      onClose(); // Close modal after successful scan
    }
  };

  const handleError = (error: Error) => {
    console.error("Error scanning QR code:", error);
    setScanError("Could not access camera. Please check permissions and try again.");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-black">QR Code Scanner</h2>

        {/* Show scan button initially */}
        {!scanning ? (
          <button
            onClick={() => setScanning(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mb-4"
          >
            Start Scan
          </button>
        ) : (
          <div className="mb-4">
            <QrReader
              onResult={(result, error) => {
                if (result) handleScan(result.getText());
                if (error) handleError(error);
              }}
              constraints={{ facingMode: 'environment' }} // use 'user' for front camera if testing on laptop/desktop
              videoContainerStyle={{ width: '100%' }} // style the video container
              videoStyle={{ width: '100%' }} // ensure the video preview takes full width
            />
          </div>
        )}

        {/* Display scan error if any */}
        {scanError && <p className="error-text text-red-500">{scanError}</p>}

        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRScannerModal;
