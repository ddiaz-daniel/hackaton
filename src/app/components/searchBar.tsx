"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const router = useRouter();
    const [query, setQuery] = useState("");  
    const [results, setResults] = useState<string[]>([]); 
  const locations = [
    "Vienna",
    "Graz",
    "Linz",
    "Salzburg",
    "Innsbruck",
    "Klagenfurt",
    "Wiener Neustadt",
    "Sankt Pölten",
    "Dornbirn",
    "Feldkirch",
    "Bregenz",
    "Villach",
    "Wels",
    "Steyr",
    "Krems an der Donau",
    "Leonding",
    "Amstetten",
    "Schwechat",
    "Traun",
    "Tulln an der Donau",
    "Bad Ischl",
    "Baden bei Wien",
    "Eisenstadt",
    "Mödling",
    "Kitzbühel",
    "Zell am See",
    "Lustenau",
    "Sankt Johann im Pongau",
    "Bruck an der Mur",
    "Kapfenberg",
    "Vöcklabruck",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Filter locations based on the query
    if (value) {
      const filteredResults = locations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]); // Clear results when the input is empty
    }
  };

  // Navigate to hotels page when a location is selected
  const handleLocationClick = (location: string) => {
    router.push(`/hotels/${location}`); // Navigate to the dynamic hotels page with the city name
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-6">
      <input
        type="text"
        placeholder="Where do you want to go?"
        value={query}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      />
      {query && results.length > 0 && (
        <ul className="mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto">
          {results.map((location, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100 text-gray-600"
              onClick={() => handleLocationClick(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
