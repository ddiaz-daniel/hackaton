import Image from "next/image";

const UserHeader = () => {
  const firstName = "Felix";
    const lastName = "Wood";

        return (
          <div className="flex flex-col items-center mb-6">
            <Image 
              src="/profile.jpg"
              alt="User avatar"
              width={300}
              height={300}
              className="rounded-full shadow-md border-4 border-red-500 p-2"
            />
            <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Hello, {firstName} {lastName}!</h2>
      </div>
          </div>
        );
    }

export default UserHeader;