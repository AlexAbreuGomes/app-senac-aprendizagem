import { router, Stack, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Pressable, View, StatusBar, Image, Animated } from "react-native";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons"; // Importando o ícone de check
import { clearAppCache, getData, resetData, resetProgress } from "../../utils/storage";
import { COLORS } from "../../../constants/colors";
import { ResetButton,  } from "../../../components/resetButton";
import { Dimensions } from "react-native";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";



const { width, height } = Dimensions.get("window");

const coinImages = {
  1: require("../../../assets/images/moeda01.png"),
  2: require("../../../assets/images/moeda02.png"),
  3: require("../../../assets/images/moeda03.png"),
} as const;

export default function Screen() {

  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
    IBMPlexMonoMedium: IBMPlexMono_500Medium,
  });



  const [unlockedLevels, setUnlockedLevels] = useState<number>(1);

  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        const level2 = await getData("quizLevel2");
        const level3 = await getData("quizLevel3");
        let maxLevel = 1;
        if (level3 === "unlocked") maxLevel = 3;
        else if (level2 === "unlocked") maxLevel = 2;
        setUnlockedLevels(maxLevel);
      };
      loadProgress();
    }, [])
  );

  const CoinButton = ({ level, unlocked }: { level: keyof typeof coinImages; unlocked: boolean }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
      const checkCompletion = async () => {
        const completed = await getData(`quizCompletedLevel${level}`);
        const scoreData = await getData(`quizScore${level}`);
        
        // ✅ Verifica se o nível foi concluído com ≥70%
        if (completed === "true" && scoreData) {
          const { score, totalQuestions } = JSON.parse(scoreData);
          const percentage = (score / totalQuestions) * 100;
          setIsCompleted(percentage >= 70);
        } else {
          setIsCompleted(false);
        }
      };
      checkCompletion();
    }, [unlockedLevels]);
    
    useEffect(() => {
      if (level === unlockedLevels) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.93, duration: 500, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
          ])
        ).start();
      }
    }, [level, unlockedLevels]);

    return (
      <Pressable
        onPress={() => unlocked && router.push(`../../quizzes/quizNivel${level}`)}
        disabled={!unlocked}
      >
        <View style={styles.coinWrapper}>
          <Animated.Image
            source={coinImages[level]}
            style={[
              styles.coinImage,
              !unlocked && styles.lockedCoin,
              isCompleted && styles.completedCoin, // ✅ Aplica estilo de moeda concluída
              level === unlockedLevels && { transform: [{ scale: scaleAnim }] }, // ✅ Animação para o nível atual
            ]}
          />
          {/* Exibe o ícone de checkmark apenas se o nível estiver concluído com 70% de acertos */}
          {isCompleted && (
            <Ionicons name="checkmark-circle" size={24} color="#F7941D" style={styles.checkIcon} />
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} translucent={true} />
        <View style={styles.header}>
          <Text style={styles.title}>Quiz do Aprendizado</Text>
          <Text style={styles.description}>
            Mostre seu conhecimento!
            <Text style={{ fontFamily: "IBMPlexMonoBold", fontSize: 20,  }}>
              Toque nas moedas para começar, responda ao quiz e, ao completar, você desbloqueia os próximos.
            </Text>
            Acumule pontos, complete os três desafios.
          </Text>
        </View>
        <View style={styles.coinContainer}>
          <View style={styles.coinPosition3}><CoinButton level={3} unlocked={unlockedLevels >= 3} /></View>
          <View style={styles.coinPosition2}><CoinButton level={2} unlocked={unlockedLevels >= 2} /></View>
          <View style={styles.coinPosition1}><CoinButton level={1} unlocked={true} />
          </View>
        </View>
        <View style={styles.resetSection}>
          <ResetButton onReset={(clearAppCache)} title="Resetar Progresso" />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background2,
    justifyContent: "space-evenly",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  description: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: "justify",
    fontFamily: "IBMPlexMonoRegular",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 5,
    width: "100%",
    textAlign: "center",
    fontFamily: "LuckiestGuy",
    color: COLORS.white,
  },
 
  imgIcon: {
    width: width * 0.15, // 20% da largura da tela (ajustável)
    height: width * 0.15, // Mantém a proporção quadrada
    resizeMode: "contain",
  
  },
  coinContainer: {
    width: "100%",
    height: "58%",
    justifyContent: "center",

  },
  coinPosition1: {
    alignItems: "flex-end",

  },
  coinPosition2: {
    alignItems: "center",
  },
  coinPosition3: {
    alignItems: "flex-start",
  },
  coinWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  coinImage: {
    width: width * 0.30, // 20% da largura da tela (ajustável)
    height: width * 0.35, // Mantém a proporção quadrada
    resizeMode: "contain",
  },
  lockedCoin: {
    opacity: 0.5,
  },
  completedCoin: {
    opacity: 0.7, // Moeda concluída fica um pouco mais escura
  },
  checkIcon: {
    position: "absolute",
    top: "52%",
    left: "53%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  resetSection: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 5,
  },
});