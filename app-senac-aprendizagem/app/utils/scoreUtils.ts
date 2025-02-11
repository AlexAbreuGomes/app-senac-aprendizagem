export const calculateScorePercentage = (score: number, totalQuestions: number): number => {
  if (totalQuestions === 0) {
    return 0; // Retorna 0 caso não haja questões
  }
  return (score / totalQuestions) * 100; // Retorna o valor como número
};


const getPercentage = (score: number, totalQuestions: number): number => {
  return totalQuestions === 0 ? 0 : (score / totalQuestions) * 100;
};

export const getScoreColor = (score: number, totalQuestions: number): string => {
  return getPercentage(score, totalQuestions) >= 70 ? 'green' : 'red';
};

export const generateFinalMessage = (score: number, totalQuestions: number): string => {
  const percentage = getPercentage(score, totalQuestions);

  if (percentage === 100) {
    return "Perfeito! Você acertou todas as questões! Incrível! 🎉";
  } else if (percentage >= 90) {
    return "Ótimo desempenho! Você quase gabaritou, continue assim! 🚀";
  } else if (percentage >= 80) {
    return "Muito bom! Você está quase lá, falta pouco! 👏";
  } else if (percentage >= 70) {
    return "Bom trabalho! Você acertou a maioria, continue evoluindo!";
  } else if (percentage >= 50) {
    return "Você está no caminho certo, com um pouco mais de treino vai ficar ótimo!";
  } else if (percentage >= 30) {
    return "Boa tentativa! Continue praticando e verá progresso!";
  } else if (percentage >= 10) {
    return "Não desista! Aprender é um processo, cada erro te ensina algo!";
  } else {
    return "Ops! Parece que algo deu errado. Que tal revisar e tentar de novo? 😅";
  }
};



import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para salvar a pontuação ao finalizar o quiz
export const saveQuizScore = async (score: number, totalQuestions: number) => {
  
  try {
    await AsyncStorage.setItem("quizScore", JSON.stringify({ score, totalQuestions }));
    console.log("Pontuação salva:", { score, totalQuestions }); // Adicione esta linha
  } catch (error) {
    console.error("Erro ao salvar pontuação:", error);
  }
};
