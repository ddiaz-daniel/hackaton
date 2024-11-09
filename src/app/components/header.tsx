'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const goMainMenu = () => {
    router.push('/');
  };

  return (
    <header className="flex flex-col justify-center items-center bg-gray-100 pt-1 relative b-0">
      <div className="absolute z-0 bg-green-500 h-10 w-full flex justify-center items-center"></div>
      
      <button
        onClick={goMainMenu}
        className="rounded-full z-10"
      >
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={100}
          height={100}
          className="cursor-pointer border-4 border-green-500 rounded-full bg-white"
        />
      </button>
    </header>
  );
};

export default Header;
