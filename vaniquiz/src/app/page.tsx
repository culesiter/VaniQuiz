"use client";
import React from 'react';
import { AppProps } from 'next/app';
import { useRouter, usePathname  } from 'next/navigation';
import LoginForm from '@/components/auth/login';
import RegisterForm from '@/components/auth/register';
import QuizPage from './quiz/page';
import { useSelector } from 'react-redux';
import useLocalStorage from './hooks/localStorage';
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const pathName = usePathname(); 
  const user = useSelector((state: { user: any }) => state.user.user);
  const [userData, setUserData] = useLocalStorage("userData", null)

  const handleStartQuiz = () => {
    if (!userData?.id)  return  router.push('/login');
    return router.push('/quiz');
  };
  
  // Here you can add any global logic, such as authentication checks, etc.

  // Route based on the path
  const renderPage = () => {
    switch (pathName) {
      case '/register':
        return <RegisterForm />;
      case '/quiz':
      return <QuizPage />;
      default:
        return <LoginForm />;
    }
  };

  // return (
  //   <>
  //     {renderPage()}
  //   </>
  // );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">VaniQuiz</h1>
      <div className="flex justify-center">
        <button onClick={handleStartQuiz} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Start Quiz
        </button>
      </div>
    </div>
  </div>
  );
};

export default MyApp;
// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//         <RegisterForm />
//     </main>
//   );
// }
