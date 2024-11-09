'use client'

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Hotel {
  name: string;
  location: string;
  rating: number;
  image: string;
}

// Static data for hotels and images
const hotelNames = [
  'GHotel',
  'HorizonInn',
  'UrbanStay',
  'LuxurySuites',
  'SkylineHotel'
];

const hotelImages = [
  '/hotel1.jpg',
  '/hotel2.jpg',
  '/hotel3.jpg',
  '/hotel4.jpg',
  '/hotel5.jpg'
];

// Function to generate mock hotels data
const generateHotels = (city: string): Hotel[] => {
  return hotelNames.map((hotelName, index) => {
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const image = hotelImages[index % hotelImages.length];
    return {
      name: `${hotelName} ${city}`,
      location: `${city} - ${Math.floor(Math.random() * 5 + 1)} km from city center`,
      rating: parseFloat(rating),
      image: image
    };
  });
};

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Extract city from the path
  const city = pathname?.split('/')[2] || ''; // assuming the format is /hotels/[city]

  useEffect(() => {
    if (city) {
      setHotels(generateHotels(city));  // Generate hotels for the specified city
    }
  }, [city]);

  // Handle hotel click to navigate to the details page
  const handleHotelClick = (hotelName: string) => {
    //remove the city name form the hotel name
    hotelName = hotelName.replace(city, '').trim();
    router.push(`/hotels/${city}/${hotelName}`);  // Navigate to /hotels/[city]/[hotelName]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl text-gray-800 mb-1">Where to stay in</h1>
      <h2 className="text-4xl font-semibold text-gray-800 mb-6">{city}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg bg-white"
              onClick={() => handleHotelClick(hotel.name)}
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-white">
                <h2 className="text-xl font-bold">{hotel.name}</h2>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 15.27L16.18 19l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l4.46 4.73L3.82 19z"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mt-2">{hotel.location}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels available for this city.</p>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
