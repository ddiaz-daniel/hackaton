"use client"
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import Button from '@mui/material/Button';

interface QRScannerModalProps {
  onScanSuccess: (data: string) => void;
  onClose: () => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ onScanSuccess, onClose }) => {
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [tempMessage, setTempMessage] = useState<string | null>(null); // State for the temporary message
  const [modalVisible, setModalVisible] = useState(true); // Control the visibility of the modal
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const [isAfterFirstScan, setIsAfterFirstScan] = useState(false);

  useEffect(() => {
    if (scanning && videoRef.current) {
      // Start scanning with the camera
      codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          onScanSuccess(result.getText());
          setScanning(false); 
            setIsAfterFirstScan(true);
          setTempMessage('Welcome to our hotel 😊, your room is located on the 4th floor, right side of the building. 👉');

          setTimeout(() => {
            setModalVisible(false); 
            onClose(); 
          }, 20000);
        }
        if (error && !(error instanceof NotFoundException)) {
          console.error('QR code scanning error:', error);
          setScanError('Could not scan QR code. Please try again.');
        }
      });
    }

    // Cleanup on unmount or when scanning stops
    return () => {
      codeReader.current.reset();
    };
  }, [scanning, onScanSuccess, onClose]);

  return (
    modalVisible && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
          <h2 className="text-2xl font-semibold mb-4 text-black">QR Code Scanner</h2>

          {!scanning && !isAfterFirstScan? (
            <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20, marginBottom: 20 }}
            onClick={() => setScanning(true)}
            sx={{
                marginTop: 20,
                marginBottom: 20,
                backgroundColor: '#fff', // White background for button
                border: '2px solid green', // Red border color
                color: 'green', // Text color to match the border
                borderRadius: '25px', // More rounded corners
                padding: '10px 20px',
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: '#f8d7da', // Light red background on hover
                  borderColor: '#c62828', // Darker border color on hover
                  color: '#c62828', // Text color on hover
                },
              }}
          >
            Start Scan
          </Button>
            
          ) : (
            <div className="mb-4">
              <video ref={videoRef} style={{ width: '100%' }} autoPlay />
            </div>
          )}

          {isAfterFirstScan && tempMessage && (
            <div className="mb-4 p-4 bg-green-200 text-green-800 rounded-lg text-center">
              {tempMessage}
            </div>
          )}

          {scanError && <p className="error-text text-red-500">{scanError}</p>}

          <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={() => {
            setModalVisible(false); 
            setScanError(null);
            onClose();
          }}
        sx={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: '#fff', // White background for button
            border: '2px solid #d32f2f', // Red border color
            color: '#d32f2f', // Text color to match the border
            borderRadius: '25px', // More rounded corners
            padding: '10px 20px',
            fontSize: '14px',
            '&:hover': {
              backgroundColor: '#f8d7da', // Light red background on hover
              borderColor: '#c62828', // Darker border color on hover
              color: '#c62828', // Text color on hover
            },
          }}
      >
        Close
      </Button>

        </div>
      </div>
    )
  );
};

export default QRScannerModal;
