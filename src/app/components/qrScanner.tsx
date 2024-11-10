import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

interface QRScannerModalProps {
  onScanSuccess: (data: string) => void;
  onClose: () => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ onScanSuccess, onClose }) => {
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    const getDevices = async () => {
      const devices = await codeReader.current.getVideoInputDevices();
      if (devices.length > 0) {
        // Choose the first available video input device (usually the rear camera on mobile)
        codeReader.current.decodeFromVideoDevice(devices[0].deviceId, videoRef.current, (result, error) => {
          if (result) {
            onScanSuccess(result.getText());
            setScanning(false);
            onClose();
          }
          if (error && !(error instanceof NotFoundException)) {
            console.error("QR code scanning error:", error);
            setScanError("Could not scan QR code. Please try again.");
          }
        });
      }
    };
  
    if (scanning && videoRef.current) {
      getDevices();
    }
  
    return () => {
      codeReader.current.reset();
    };
  }, [scanning, onScanSuccess, onClose]);
  

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
  <video ref={videoRef} style={{ width: '100%', height: 'auto' }} autoPlay />
  </div>
        )}

        {/* Display scan error if any */}
        {scanError && <p className="error-text text-red-500">{scanError}</p>}

        <button
          onClick={() => {
            setScanning(false);
            setScanError(null);
            onClose();
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRScannerModal;
