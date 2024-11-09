"use client"
import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState("");  // State for the search query
  const [results, setResults] = useState<string[]>([]); // State for search results

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

  // Handle input changes
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

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-6">
      <input
        type="text"
        placeholder="Search for a location..."
        value={query}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
      />
      {query && results.length > 0 && (
        <ul className="mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto">
          {results.map((location, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setQuery(location)} // Set the query to the clicked result
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
