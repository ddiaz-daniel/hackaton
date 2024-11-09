"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PayPage = () => {
  const router = useRouter();
  const messages = [
    "We are processing your payment...",
    "Contacting your bank...",
    "Verifying transaction details...",
    "Finalizing payment..."
  ];
  
  const [messageIndex, setMessageIndex] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Change message every 2 seconds

    const confirmationTimeout = setTimeout(() => {
      clearInterval(messageInterval); // Stop cycling messages
      setIsConfirmed(true); // Show checkmark
    }, messages.length * 2000); // After cycling through all messages

    const redirectTimeout = setTimeout(() => {
      router.push('/'); // Redirect to homepage after confirmation
    }, messages.length * 2000 + 5000); // Total delay of messages + 5 seconds

    return () => {
      clearInterval(messageInterval);
      clearTimeout(confirmationTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [router, messages.length]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative h-1/2 text-center">
        {!isConfirmed && (
          <>
            <div className="loader border-t-blue-500 mx-auto mb-6"></div>
            <p className="text-xl font-semibold text-gray-800">{messages[messageIndex]}</p>
          </>
        )}
        {isConfirmed && (
          <>
            <div className="text-green-500 text-6xl mb-6">✓</div>
            <p className="text-xl font-semibold text-gray-800">Payment confirmed!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PayPage;
