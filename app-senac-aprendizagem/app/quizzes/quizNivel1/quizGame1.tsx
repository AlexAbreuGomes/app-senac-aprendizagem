import React from 'react';
import Quiz from '../../../components/quiz';
import quizData from '../../../data/quizData';

const QuizGame1 = () => {
  return <Quiz questions={quizData} level={1} />;
};

export default QuizGame1;
