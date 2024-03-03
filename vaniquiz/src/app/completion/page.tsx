"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import TotalPointsDisplay from '@/components/quiz/TotalPointsDisplay';

const TotalPointsPage: React.FC = () => {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.push('/'); // Navigate to the home page
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 ">Total Points Page</h1>
        <TotalPointsDisplay />

        <button onClick={handleGoHomeClick} className=" mt-2 bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50">
        Go to Home Page
</button>
      </div>
    </div>
  );
};

export default TotalPointsPage;