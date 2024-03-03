"use client";
import React, { useState, useEffect } from 'react';
import Drawer from '../utls/drawer';
import { useDispatch } from 'react-redux';
import { addPoints } from '@/recoil/actions/quizActions';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface QuizItemProps {
  id: number,
  title: string;
  question: string;
  answers: any[];
  total_correct: number;
  hint: string;
  onNext: () => void;
  isLastItem : boolean
}


const QuizItem: React.FC<QuizItemProps> = ({ title, question, answers, hint, total_correct,onNext, id, isLastItem}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState<string>('');
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const notify = () => toast.success("Quizs completed!");
 const dispatch = useDispatch();
  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  useEffect(()=> { setSelectedAnswer([])}, [id])

  useEffect(()=> { 
    checkIscompletedQuiz()
    console.log('selectedAnswer', selectedAnswer);
    
  }, [selectedAnswer])


  const handleAnswer = (answer: any) => {
    setSelectedAnswer(prevArray => {
      return [...prevArray, answer.id];
    }); 
    if (answer.is_correct && answer.is_correct != 0) {
      dispatch(addPoints());
    }
    // [...selectedAnswer, answer.id]
    // if (index === 309) {
    //   dispatch(addPoints());
    //   setAnswerFeedback('Correct!');
    //   toggleDrawer();
    //   if (isLastItem) {
    //     router.push('/completion');
    //   }
    // //   onNext(); 
    // } else {
    //   setAnswerFeedback('Please try again.');
    // } 
  };

  const checkIscompletedQuiz = () => {
    let total_correct_selected = 0;
    answers.forEach(element => {
      if (element.is_correct && selectedAnswer.includes(element.id)) total_correct_selected++;
    });
    if(total_correct == total_correct_selected){
          if (isLastItem) {
            notify();
        setTimeout(() => {
          router.push('/completion');
        }, 500);
      } else {
        setIsDrawerOpen((prevState) => !prevState);
      }
     
    }
  }

  const BtnNext:any = () => {
    return <button
    className="px-4 py-2 text-sm text-blue-600 focus:outline-none"
    onClick={() => {
      toggleDrawer();
        onNext();
    }}
    >
    next
</button>
  }

  const checkIncludes =(id: number) =>{
    return selectedAnswer.includes(id);
  }

  const RenderAddtions: React.FC<any> = (answer) => { 
    if (answer.is_correct && answer.is_correct != 0) return <span className="ml-2">✅</span>
    return <div className="text-red-600 text-sm">Please try again</div>
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
       <ToastContainer />
      <div className="px-4 py-5 sm:px-6">
        <div className="grid grid-cols-7">
            <div className="col-span-7">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{question}</p>
            </div>
             
        </div>
        <div className="mt-4 space-y-2">
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className={`block w-full text-left px-4 py-2 border rounded-md 
              `}
              disabled={checkIncludes(answer.id)}
            >
              {answer.text}

              {checkIncludes(answer.id) && RenderAddtions(answer)}
            </button>
          ))}
        </div> 
        <button
          className="mt-4 px-4 py-2 text-sm text-blue-600 focus:outline-none"
          onClick={() => setShowHint(true)}
        >
          Hint
        </button>
        {showHint && <p className="mt-2 text-sm text-gray-600">{hint}</p>}
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        <h2 className="text-xl font-semibold">Drawer Content</h2>
        <p>This is some content inside the drawer.</p>
        <BtnNext/>
      </Drawer>
    </div>
  );
};

export default QuizItem;