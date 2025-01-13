import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

type ScoreRouteParams = {
  score: number;
  totalQuestions: number;
};

interface ScoreProps {
  route: {
    params: ScoreRouteParams;
  };
}

const Score: React.FC<ScoreProps> = ({ route }) => {
  const { score, totalQuestions } = route.params;
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Você acertou {score} de {totalQuestions} perguntas!</Text>
      <Button title="Voltar para o Quiz" onPress={() => router.push('/quiz')} />
    </View>
  );
};

export default Score;
