"use client";
import React, { useState } from 'react';
import { useRouter, usePathname  } from 'next/navigation';
import { signIn } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '@/recoil/actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from '@/app/hooks/localStorage';
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const handleRegister = () => {
    return router.push('/register');
  }
  const notify = () => toast.success("Login Success!");
  const [userData, setUserData] = useLocalStorage("userData", null)

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await signIn(username, password);
      if (!token || !token.id) {
          setNotification(token.message);
      } else{
        dispatch(setUser(token));
        setUserData(token);
        notify();
        return router.push('/quiz');
      }
      // Redirect user to dashboard or desired page upon successful sign-in
    } catch (error) {
      // console.error('Sign-in failed:', error.message);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen ">
       <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="username"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div> 
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-2">
              <div className="text-sm">
                <div onClick={handleRegister} className="font-medium text-blue-600 hover:text-blue-500">
                  Register new account?
                </div>
              </div>
            </div>
            {notification && (
              <div className="flex items-center justify-between mt-2">
              <div className="text-sm">
                <div className="font-medium text-red-600 hover:text-blue-500">
                  {notification}
                </div>
              </div>
            </div>
            )}
            
        </div>
      </div>
    </div>
  );
};

export default LoginForm;