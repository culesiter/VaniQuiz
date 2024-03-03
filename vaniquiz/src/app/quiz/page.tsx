"use client";
import React, { useState, useEffect } from 'react';
import QuizItem from '@/components/quiz/quiz.item';
import { useSelector } from 'react-redux'; 
import TopNavigation from '@/components/nav/TopNavigation';
import { useRouter, usePathname  } from 'next/navigation';
import useLocalStorage from '../hooks/localStorage';
import { getQuizs } from '@/services/quizService';
const QuizPage: React.FC = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizList, setQuizList] = useState<any[]>([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLastItem, setIsLastItem] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useLocalStorage("userData", null)

  useEffect(() => {
    if (!userData?.id) return router.push('/login');
    
    try {
      (async () => {
        const quizs = await getQuizs();
        setQuizList(quizs); 
      })();
    } catch (error) {
    }
  }, []);



  const handleNext = () => {
    if (currentQuizIndex < quizList.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setShowNextButton(false); // Reset next button visibility
      if (currentQuizIndex === quizList.length - 2) {
        setIsLastItem(true); 
      } 
    } else {
     
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
      <TopNavigation />
        {quizList[currentQuizIndex] && (
          <QuizItem
            id={quizList[currentQuizIndex].id}
            title={quizList[currentQuizIndex].title}
            question={quizList[currentQuizIndex].question}
            answers={quizList[currentQuizIndex].answers}
            total_correct={quizList[currentQuizIndex].total_correct}
            hint={quizList[currentQuizIndex].hint}
            onNext={handleNext}
            isLastItem={isLastItem}
          />
        )}
        {showNextButton && (
          <button
            className="mt-4 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;