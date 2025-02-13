import AsyncStorage from "@react-native-async-storage/async-storage";

export const calculateScorePercentage = (score: number, totalQuestions: number): string => {
  if (totalQuestions === 0) {
    return '0.00'; // Retorna 0% caso não haja questões
  }
  const percentage = (score / totalQuestions) * 100;
  return percentage.toFixed(2); // Retorna o valor com 2 casas decimais

};

export const getScoreColor = (score: number, totalQuestions: number): string => {
  const percentage = (score / totalQuestions) * 100;

  if (percentage >= 70) {
    return 'green'; // Verde para percentuais de 70% ou mais
  } else {
    return 'red'; // Vermelho para percentuais abaixo de 70%
  }
};


export const generateFinalMessage = (score: number, totalQuestions: number): string => {
  const percentage = (score / totalQuestions) * 100;
  
  if (percentage === 100) {
    return "Perfeito! Você acertou todas as questões! Não deixou passar nada, incrível! 🎉";
  } else if (percentage >= 90) {
    return  "Incrível! Você acertou a maior parte, só faltaram alguns detalhes. Continue assim! 🚀";
  } else if (percentage >= 85) {
    return  "Parabéns! Ótimo trabalho, vamos para o próximo nível! 🎯";
  } else if (percentage >= 80) {
    return  "Bom trabalho! Você acertou a maior parte, só mais um empurrãozinho e fica perfeito! 👏";
  } else if (percentage >= 70) {
    return "Bom trabalho! Você acertou a maior parte, continue assim!";
  }  else if (percentage >= 50) {
    return "Continue tentando, você está no caminho certo!";
  } else if (percentage >= 40) {
    return "Não desista! Você está perto de melhorar, só mais um pouco!";
  } else if (percentage >= 30) {
    return "Boa tentativa! Não se preocupe, a prática leva à perfeição!";
  } else if (percentage >= 20) {
    return "Não desista! A cada tentativa você fica mais perto de dominar!";
  } else if (percentage >= 10) {
    return "Não se preocupe, você vai melhorar a cada tentativa!";
  } else {
    return "Ops! Parece que algo deu errado. Que tal revisar e tentar de novo? 😅";
  }
};

// Função para salvar a pontuação ao finalizar o quiz
export const saveQuizScore = async (nameScore: string, score: number, totalQuestions: number) => {
  
  try {
    await AsyncStorage.setItem(nameScore, JSON.stringify({ score, totalQuestions }));
    console.log("Pontuação salva:", { score, totalQuestions }); // Adicione esta linha
  } catch (error) {
    console.error("Erro ao salvar pontuação:", error);
  }
};
