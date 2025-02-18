import React, { useState } from 'react';
import { SafeAreaView, Text, Pressable, View, Modal, Animated, StatusBar, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';  // Importando useRouter
import { COLORS } from '../constants/colors';
import Button from '../components/ButtonQuiz';
import { Image } from 'expo-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { calculateScorePercentage, generateFinalMessage, getScoreColor, saveQuizScore } from '../app/utils/scoreUtils';
import { getData, storeData } from '../app/utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type QuizProps = {
  questions: {
    question: string;
    options: string[];
    correct_option: string;
  }[];
  level: number; // Adicione esta linha
};


const Quiz: React.FC<QuizProps> = ({ questions, level }) => {

  const router = useRouter();  // Usando useRouter para navegação
  const params = useLocalSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [unlockedLevels, setUnlockedLevels] = useState<number>(1);


  const allQuestions = questions;

  const validateAnswer = (selectedOption: string) => {
    const correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption === correct_option) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };



  const getStoredData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : null; // Retorna o valor ou null se não existir
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      return null;
    }
  };


  const handleNext = async () => {
    if (currentQuestionIndex === allQuestions.length - 1) {
      setShowScoreModal(true);

      const value = parseFloat(calculateScorePercentage(score, allQuestions.length));

      // ✅ Verifica se a pontuação é suficiente para salvar
      if (value >= 70) {
        const existingScore = await getStoredData(`quizScore${level}`);

        // Salva apenas se não existir ou se a nova pontuação for maior
        if (!existingScore || (existingScore && JSON.parse(existingScore).score < value)) {
          saveQuizScore(`quizScore${level}`, value, allQuestions.length);
        }

        // ✅ Marca o nível como concluído
        await storeData(`quizCompletedLevel${level}`, "true");
      } else {
        // Remove o status de concluído se a pontuação for insuficiente
        await AsyncStorage.removeItem(`quizCompletedLevel${level}`);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }

    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };




  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };


  const [showCongratsModal, setShowCongratsModal] = useState(false);

  const finishQuiz = () => {
    setShowCongratsModal(true);
  };


  const goToNextLevel = async () => {
    const currentLevel = level;
    const nextLevel = currentLevel + 1;

    // ✅ Verifica a pontuação antes de desbloquear
    const scoreData = await getData(`quizScore${currentLevel}`);
    if (scoreData) {
      const { score, totalQuestions } = JSON.parse(scoreData);
      const percentage = (score / totalQuestions) * 100;

      if (percentage >= 70 && nextLevel <= 3) {
        await storeData(`quizLevel${nextLevel}`, "unlocked");
        setUnlockedLevels((prev) => Math.max(prev, nextLevel));
        router.replace("/quiz");
      }
    }
  };


  //alert para voltar para home
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const goToHome = () => {
    setShowCustomAlert(true);
  };




  const scorePercentage = calculateScorePercentage(score, allQuestions.length);
  const isButtonDisabled = parseFloat(scorePercentage) < 70;


  const scorePercentageLogo = calculateScorePercentage(score, allQuestions.length);
  const isPositiveScore = parseFloat(scorePercentageLogo) >= 70;
  const imageSource = isPositiveScore
    ? require('../assets/images/medalha.gif')  // Imagem para pontuação positiva
    : require('../assets/images/metas2.gif');  // Imagem para pontuação negativa



  const renderQuestion = () => {
    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionIndex}>
          <Text style={styles.indexText}>{currentQuestionIndex + 1}</Text>
          <Text style={styles.totalText}>/ {allQuestions.length}</Text>
        </View>

        <Text style={styles.questionText}>{allQuestions[currentQuestionIndex]?.question}</Text>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.options.map((option: string) => (
          <Pressable
            key={option}
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            style={({ pressed }) => [
              styles.optionButton,
              pressed && styles.pressedOption, // Adiciona estilo quando pressionado
              {
                borderColor:
                  option === correctOption
                    ? COLORS.success
                    : option === currentOptionSelected
                      ? COLORS.error
                      : COLORS.secondary + '40',
                backgroundColor:
                  option === correctOption
                    ? COLORS.success + '20'
                    : option === currentOptionSelected
                      ? COLORS.error + '20'
                      : COLORS.secondary + '20',
              },
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
            {option === correctOption ? (
              <View style={{
                width: 35, height: 35, borderRadius: 30, marginLeft: 5,
                backgroundColor: COLORS.success,
                justifyContent: 'center', alignItems: 'center',
              }}>
                <MaterialCommunityIcons name="check" style={{
                  color: COLORS.white,
                  fontSize: 27
                }} />
              </View>
            ) : option === currentOptionSelected ? (
              <View style={{
                width: 35, height: 35, borderRadius: 30, marginLeft: 5,
                backgroundColor: COLORS.error,
                justifyContent: 'center', alignItems: 'center'
              }}>
                <MaterialCommunityIcons name="close" style={{
                  color: COLORS.white,
                  fontSize: 27
                }} />
              </View>
            ) : null}
          </Pressable>
        ))}
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <Button
          title="Próxima"
          onPress={handleNext}
          style={styles.nextButton}
        />
      );
    }
    return null;
  };


  const renderProgressBar = () => {
    const progressAnim = progress.interpolate({
      inputRange: [0, allQuestions.length],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[styles.progressBar, { width: progressAnim }]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {renderProgressBar()}
          {renderQuestion()}
          {renderOptions()}
          {renderNextButton()}
          <Modal animationType="slide" transparent={true} visible={showScoreModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  source={imageSource}
                  style={styles.logoImage}
                />

                <Text style={styles.modalTitle}>Quiz Finalizado!</Text>

                <Text style={styles.modalText}>
                  Você acertou {score} de {allQuestions.length} questões.
                </Text>


                <Text style={styles.modalText2}>
                  Pontuação:{' '}
                  <Text style={{ color: getScoreColor(score, allQuestions.length) }}>
                    {calculateScorePercentage(score, allQuestions.length)}
                  </Text>
                </Text>


                <Text style={styles.modalFinalMessage}>
                  {generateFinalMessage(score, allQuestions.length)}
                </Text>

                {/* <Button
                title="Reiniciar Quiz"
                onPress={restartQuiz}
                style={styles.restartButton}
              /> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Pressable style={styles.restartButton} onPress={restartQuiz}>
                    <MaterialIcons name="restart-alt" size={50} color="#ffffff" />
                    {/* <Text style={styles.restartButtonText}>Reiniciar</Text> */}
                  </Pressable>

                  {/* <Pressable
                  onPress={goToNextLevel}
                  style={[styles.nextLevelButton, isButtonDisabled && { opacity: 0.5 }]}
                  disabled={isButtonDisabled}
                >
                  <Text style={styles.nextLevelText}>Próximo Nível</Text>
                  <MaterialIcons name="navigate-next" size={35} color="#ffffff" />
                </Pressable> */}


                  {level === 3 ? (
                    <Pressable
                      onPress={finishQuiz}
                      style={[styles.nextLevelButton, isButtonDisabled && { opacity: 0.5 }]}
                      disabled={isButtonDisabled}
                    >
                      <Text style={styles.nextLevelTextFinal}>Finalizar</Text>
                      <MaterialIcons name="stairs" size={30} color="#ffffff" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={goToNextLevel}
                      style={[styles.nextLevelButton, isButtonDisabled && { opacity: 0.5 }]}
                      disabled={isButtonDisabled}
                    >
                      <Text style={styles.nextLevelText}>Próximo Nível</Text>
                      <MaterialIcons name="navigate-next" size={35} color="#ffffff" />
                    </Pressable>
                  )}


                </View>

              </View>


              <Pressable onPress={goToHome} style={styles.backButton}>
                <MaterialCommunityIcons name="exit-to-app" style={styles.iconHome} />
                <Text style={styles.backButtonText}>Voltar para home</Text>
              </Pressable>

            </View>
          </Modal>







          <Modal visible={showCongratsModal} transparent={true} animationType="fade">
            <View style={styles.modalOverlay2}>
              <View style={styles.customAlertContainer2}>
                <Text style={styles.customAlertTitle2}>🎉 Parabéns! 🎉</Text>

                <Text style={{ fontFamily: 'IBM-Plex-Mono', fontSize: 16, marginBottom: 10, color: COLORS.primary }}>Você concluiu com sucesso!</Text> <Text style={styles.customAlertMessage2}> Cada desafio superado é um degrau rumo a um futuro brilhante.
                  Continue evoluindo com determinação, pois o sucesso é construído um passo de cada vez. Lembre-se: o futuro é de quem nunca para de crescer!
                </Text>

                <Pressable
                  style={[styles.alertButton2, styles.confirmButton]}
                  onPress={() => {
                    setShowCongratsModal(false);
                    router.replace("/quiz");
                  }}
                >
                  <Text style={styles.alertButtonText2}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>









          <Modal
            visible={showCustomAlert}
            transparent={true}
            animationType="fade"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.customAlertContainer}>
                <Text style={styles.customAlertTitle}>Confirmar</Text>
                <Text style={styles.customAlertMessage}>
                  Você realmente quer voltar à página inicial?
                </Text>
                <View style={styles.customAlertButtons}>
                  <Pressable
                    style={[styles.alertButton, styles.cancelButton]}
                    onPress={() => setShowCustomAlert(false)}
                  >
                    <Text style={styles.alertButtonText}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.alertButton, styles.confirmButton]}
                    onPress={() => {
                      setShowCustomAlert(false);
                      router.replace('/quiz');
                    }}
                  >
                    <Text style={styles.alertButtonText}>Sim</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // Permite que o conteúdo do ScrollView cresça
    backgroundColor: COLORS.background, // Fundo azul
  },
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  questionContainer: {
    marginTop: 20,
    marginBottom: 20,


  },
  questionIndex: {
    flexDirection: 'row',
    alignItems: 'flex-end',

  },
  indexText: {
    color: COLORS.accent,
    fontSize: 30,
    fontFamily: 'LuckiestGuy-Regular',
    opacity: 0.99,
    marginRight: 2,

  },
  totalText: {
    color: COLORS.accent,
    fontSize: 24,
    opacity: 0.9,
    fontFamily: 'LuckiestGuy-Regular',

  },
  questionText: {
    color: COLORS.white,
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    maxWidth: '95%',
    marginTop: 10,


  },
  optionButton: {
    borderWidth: 3,
    minHeight: 63,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginVertical: 8,
  },
  pressedOption: {
    opacity: 0.7, // Reduz a opacidade quando pressionado
  },
  optionText: {
    paddingVertical: 5,
    fontSize: 19,
    color: COLORS.white,
    fontFamily: 'LuckiestGuy-Regular',
    lineHeight: 21,
    width: '88%',
    textAlign: 'justify',


  },
  iconContainer: {
    width: 32, // Tamanho exato do ícone
    height: 32, // Tamanho exato do ícone
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 16, // Exatamente metade da largura e altura para um círculo perfeito
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.white,
    fontSize: 20,
  },
  nextButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: COLORS.accent,
    padding: 23,
    borderRadius: 30,
    elevation: 5,





  },
  pressedNextButton: {
    opacity: 0.7, // Reduz a opacidade quando pressionado
  },
  nextButtonText: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
    width: '100%',
    height: 20,
    borderRadius: 20,
    backgroundColor: '#00000020',
  },
  progressBar: {
    height: 20,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  modalContent: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 43,
    paddingBottom: 20,
    width: '90%',
    borderRadius: 60,
    alignItems: 'center',
    elevation: 5, // Para sombra no Android
    shadowColor: '#000000', // Para sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logoImage: {
    width: 125, // Aumente o tamanho para algo maior
    height: 120, // Ajuste conforme necessário
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 30,
    fontFamily: 'LuckiestGuy-Regular',
    textAlign: 'center',
    color: '#044B8B',
  },
  modalText: {
    fontSize: 20,
    width: '85%',
    height: 80,
    textAlign: 'center',
    fontFamily: 'IBM-Plex-Mono3',
    color: COLORS.primary,
  },
  modalText2: {
    fontSize: 28,

    marginBottom: 30,
    width: '70%',
    height: 80,
    textAlign: 'center',
    fontFamily: 'IBM-Plex-Mono',
    color: COLORS.primary,
  },
  modalFinalMessage: {
    fontSize: 14,
    fontFamily: 'IBM-Plex-Mono2',
    color: COLORS.primary,
    textAlign: 'center',
    width: '92%',

  },

  restartButton: {
    backgroundColor: COLORS.accent,
    width: '42%',
    marginTop: 20,
    height: 68,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    elevation: 5, // Para sombra no Android
    shadowColor: '#000', // Para sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressedRestartButton: {
    opacity: 0.7, // Reduz a opacidade quando pressionado
  },
  restartButtonText: {
    fontSize: 20,
    fontFamily: 'LuckiestGuy-Regular',
    textAlign: 'center',
    color: COLORS.white,
  },
  backButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    elevation: 5, // Para sombra no Android
    shadowColor: '#000', // Para sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  backButtonText: {
    color: COLORS.primary,
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  iconHome: {
    color: COLORS.primary,
    fontSize: 32,
  },
  nextLevelButton: {
    width: '65%',
    height: 68,
    marginTop: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: 'center',
    elevation: 5, // Para sombra no Android
    shadowColor: '#000', // Para sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressedNextLevelButton: {
    opacity: 0.7, // Reduz a opacidade quando pressionado
  },
  nextLevelButtonText: {
    fontSize: 20,
    fontFamily: 'LuckiestGuy-Regular',
    textAlign: 'center',
    color: COLORS.white,
    marginLeft: 10,
  },
  nextLevelTextFinal: {
    fontSize: 20,
    fontFamily: 'LuckiestGuy-Regular',
    textAlign: 'center',
    color: COLORS.white,
  },
  nextLevelText: {
    fontSize: 16,
    fontFamily: 'LuckiestGuy-Regular',
    textAlign: 'center',
    color: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customAlertContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  customAlertTitle: {
    fontSize: 18,
    fontFamily: 'LuckiestGuy-Regular',
    color: COLORS.primary,
    marginBottom: 10,
  },
  customAlertMessage: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: 'LuckiestGuy-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  customAlertButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  alertButton: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 5, // Para sombra no Android

  },
  cancelButton: {
    backgroundColor: COLORS.accent,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  alertButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: 'LuckiestGuy-Regular'
  },






  modalOverlay2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  customAlertContainer2: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  customAlertTitle2: {
    fontSize: 20,
    fontFamily: "LuckiestGuy-Regular",
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  customAlertMessage2: {
    fontSize: 16,
    fontFamily: "IBM-Plex-Mono",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  alertButton2: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  confirmButton2: {
    backgroundColor: "#4CAF50",
  },
  alertButtonText2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Quiz;
