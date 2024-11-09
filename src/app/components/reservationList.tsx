"use client"
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // To generate the QR code
import { format, differenceInSeconds } from 'date-fns'; // For date calculations

// Types for reservation data
interface Reservation {
  hotelName: string;
  city: string;
  checkInDate: string;
  checkOutDate: string;
  price: number;
  roomType: string;
  guestCount: number;
  user: {
    name: string;
    paymentStatus: string; 
  };
}

const ReservationList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [checkedIn, setCheckedIn] = useState<boolean>(false); // Track check-in status
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Load reservations from local storage
  useEffect(() => {
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }

    // Key press event listener for QR scan simulation
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'c' || event.key === 'C') {
        if (!checkedIn && selectedReservation) {
          setCheckedIn(true);
        } else if (checkedIn && selectedReservation) {
          setCheckedIn(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [checkedIn, selectedReservation]);

  // Calculate the countdown to check-in and check-out
  const calculateCountdown = (targetDate: string) => {
    const target = new Date(targetDate);
    return differenceInSeconds(target, currentDate);
  };

  // Open the modal with the selected reservation details
  const openModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  // Check if the current date is within check-in and check-out dates
  const isWithinCheckInDate = (checkInDate: string, checkOutDate: string) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return currentDate >= checkIn && currentDate <= checkOut;
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}>
      <h1 className="text-xl text-gray-900 mb-4">Your Reservations</h1>
      
      <div className="space-y-4">
        {reservations.map((reservation, index) => {
          const checkInCountdown = calculateCountdown(reservation.checkInDate);
          const checkOutCountdown = calculateCountdown(reservation.checkOutDate);
          const withinCheckInDate = isWithinCheckInDate(reservation.checkInDate, reservation.checkOutDate);
          const isCheckedOut = checkedIn && currentDate >= new Date(reservation.checkOutDate);
          const isExpired = currentDate > new Date(reservation.checkOutDate); // Expired reservation

          return (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all duration-300 ${checkedIn || isExpired ? 'bg-gray-300' : ''}`}
              onClick={() => !isExpired && !checkedIn && openModal(reservation)} // Prevent click if expired or checked in
            >
              <h3 className="font-semibold text-gray-800">{reservation.hotelName} in {reservation.city}</h3>
              <p className="text-gray-700">Room: {reservation.roomType}</p>
              <p className="text-gray-700">Check-in: {reservation.checkInDate}</p>
              <p className="text-gray-700">Check-out: {reservation.checkOutDate}</p>
              <p className="text-gray-700">Guests: {reservation.guestCount}</p>
              <p className="text-gray-700">Total Price: €{reservation.price}</p>

              {/* Display Countdown if within check-in and check-out date */}
              {withinCheckInDate && !checkedIn && checkInCountdown > 0 && (
                <p className="text-gray-500">
                  Time until Check-in: {format(new Date(checkInCountdown * 1000), 'HH:mm:ss')}
                </p>
              )}
              {withinCheckInDate && !checkedIn && checkInCountdown <= 0 && (
                <p className="text-green-500">Check-in now!</p>
              )}

              {isCheckedOut && (
                <p className="text-red-500">
                  Time until Check-out: {format(new Date(checkOutCountdown * 1000), 'HH:mm:ss')}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {isModalOpen && selectedReservation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Reservation QR Code</h2>
            
            {/* Show QR code if within check-in or check-out range */}
            {true && !checkedIn && (
              <div className="mb-4">
                <QRCode
                  value={JSON.stringify({
                    reservation: selectedReservation,
                    user: selectedReservation.user,
                  })}
                  size={256}
                />
              </div>
            )}
            <button
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
