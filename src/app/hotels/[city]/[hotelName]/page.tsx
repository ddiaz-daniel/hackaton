'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import path from 'path';

// Static hotel description and prices
const hotelDescription = 'A comfortable stay with excellent amenities and great service.';
const mockComments = [
  { name: 'John Doe', comment: 'Amazing stay! Highly recommend.' },
  { name: 'Jane Smith', comment: 'Beautiful hotel, will come back for sure.' },
  { name: 'Alice Johnson', comment: 'Not bad, but a little expensive for what it is.' },
];

// Room types
const roomTypes = [
  { type: 'Single Room', description: 'A cozy room for one guest.', basePrice: 60 },
  { type: 'Double Room', description: 'A comfortable room for up to two guests.', basePrice: 100 },
  { type: 'Family Room', description: 'Spacious room for up to four guests.', basePrice: 150 },
];

const ReservationPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hotelName = path.parse(pathname).base;
  const city = path.parse(pathname).dir.split('/').pop();

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [dailyPrices, setDailyPrices] = useState<Map<string, number>>(new Map());
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
  const [guestCount, setGuestCount] = useState(1);

  // Generate a random price for each day of the current month
  useEffect(() => {
    const generatePricesForMonth = () => {
      const prices = new Map<string, number>();
      const currentMonth = dayjs().month();
      const currentYear = dayjs().year();
      const daysInMonth = dayjs().daysInMonth();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = dayjs(new Date(currentYear, currentMonth, day)).format('YYYY-MM-DD');
        const price = Math.floor(Math.random() * 100) + 50;
        prices.set(date, price);
      }

      setDailyPrices(prices);
    };

    generatePricesForMonth();
  }, []);

  // Calculate the total price based on selected dates, room type, and guest count
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      let total = 0;
      const checkIn = dayjs(checkInDate).startOf('day');
      const checkOut = dayjs(checkOutDate).startOf('day');

      for (let current = checkIn; current.isBefore(checkOut); current = current.add(1, 'day')) {
        const priceForDay = dailyPrices.get(current.format('YYYY-MM-DD')) || selectedRoom.basePrice;
        total += priceForDay * (guestCount > 2 ? 1.25 : 1); // Adjust price for more than 2 guests
      }

      setPrice(total);
    }
  }, [checkInDate, checkOutDate, dailyPrices, selectedRoom, guestCount]);

  const handlePayment = () => {
    const reservationData = {
      hotelName: hotelName,
      city: city,
      checkInDate: checkInDate ? dayjs(checkInDate).format('YYYY-MM-DD') : null,
      checkOutDate: checkOutDate ? dayjs(checkOutDate).format('YYYY-MM-DD') : null,
      roomType: selectedRoom.type,
      guestCount,
      price,
    };

    // Retrieve existing reservations or initialize an empty array
    const existingReservations = JSON.parse(localStorage.getItem('reservations') as string) || [];
    existingReservations.push(reservationData);

    // Save the updated reservation list back to localStorage
    localStorage.setItem('reservations', JSON.stringify(existingReservations));

    // Redirect to the payment page
    router.push('/pay');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl text-gray-900 mb-4">Book Your Stay at {hotelName} {city}</h1>

      {/* Image Carousel */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="carousel w-80 h-80 bg-gray-300 rounded-lg overflow-hidden relative">
          {[1, 2, 3].map((img) => (
            <div key={img} className="absolute inset-0 transition-opacity duration-700">
              <img src={`hotel-image-${img}.jpg`} alt={`Image ${img}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">{hotelName}</h2>
          <p className="text-gray-700 mb-4">{hotelDescription}</p>
        </div>
      </div>

      {/* Room Types */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Room Types</h3>
        <div className="space-y-4">
          {roomTypes.map((room) => (
            <div
              key={room.type}
              onClick={() => setSelectedRoom(room)}
              className={`p-4 rounded-lg shadow cursor-pointer ${selectedRoom.type === room.type ? 'bg-blue-100' : 'bg-white'}`}
            >
              <p className="font-semibold text-gray-800">{room.type}</p>
              <p className="text-gray-700">{room.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Counter */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Guests</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="px-3 py-1 bg-gray-300 rounded-md">-</button>
          <p className="text-gray-800">{guestCount}</p>
          <button onClick={() => setGuestCount(Math.min(4, guestCount + 1))} className="px-3 py-1 bg-gray-300 rounded-md">+</button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Check-in and Check-out Dates</h3>
        <div className="flex gap-4">
          <div>
            <label>Check-in:</label>
            <input
              type="date"
              value={checkInDate ? dayjs(checkInDate).format('YYYY-MM-DD') : ''}
              onChange={(e) => setCheckInDate(new Date(e.target.value))}
              min={dayjs().format('YYYY-MM-DD')}
              className="border p-2 rounded-md"
            />
          </div>
          <div>
            <label>Check-out:</label>
            <input
              type="date"
              value={checkOutDate ? dayjs(checkOutDate).format('YYYY-MM-DD') : ''}
              onChange={(e) => setCheckOutDate(new Date(e.target.value))}
              min={checkInDate ? dayjs(checkInDate).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')}
              className="border p-2 rounded-md"
            />
          </div>
        </div>

        <p className="mt-4 text-lg text-gray-800">Total Price: €{price}</p>
      </div>

      {/* Show Comments */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">What our guests are saying:</h3>
        <div className="space-y-4">
          {mockComments.map((comment, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold text-gray-800">{comment.name}</p>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pay button */}
      <div className="mt-8">
        <button
          onClick={handlePayment}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
        >
          Pay: €{price}
        </button>
      </div>
    </div>
  );
};

export default ReservationPage;
