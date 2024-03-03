"use client";
import React from 'react';
import useLocalStorage from '@/app/hooks/localStorage';
import { useDispatch } from 'react-redux';
import { useRouter, usePathname  } from 'next/navigation';
import { setUser } from '@/recoil/actions/userActions';

const TopNavigation: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useLocalStorage("userData", null)

  const handleGoBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handlelogOut = () => {
    dispatch(setUser({}));
    setUserData(null)
    router.push('/'); // Navigate back to the previous page
  };

  return (
    <div className="bg-white border-b border-gray-300 py-4 px-8 flex items-center justify-between">
      <button onClick={handleGoBack} className="text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 className="text-gray-800 text-lg font-semibold">VaniQuiz</h1>
      <div>
        <button onClick={handlelogOut} className="text-blue-800">
            Logout
        </button>
      </div>
    </div>
  );
};

export default TopNavigation;