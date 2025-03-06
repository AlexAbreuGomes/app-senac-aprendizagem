// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import React from 'react';
import Quiz from '../../../components/quiz';
import quizData from '../../../data/quizData';

const QuizGame1 = () => {
  return <Quiz questions={quizData} level={1} />;
};

export default QuizGame1;
