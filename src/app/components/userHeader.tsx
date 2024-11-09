

const UserHeader = () => {
        return (
          <div className="flex flex-col items-center mb-6">
            <img
              src="/profile.jpg" // Placeholder image, update path as needed
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <div className="text-center mt-4">
              <p className="text-xl font-semibold">John Doe</p>
            </div>
          </div>
    
          {/* Search Bar */}
          <div className="w-full px-4 mb-6">
            <input
              type="text"
              placeholder="Looking for a hotel?"
              className="w-full p-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
    }
