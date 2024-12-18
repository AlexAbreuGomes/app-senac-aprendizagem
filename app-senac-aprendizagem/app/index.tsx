import { router} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Screen() {
  const start = () => {
    router.replace("/home");
  };

  return (
   
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <Text style={styles.h1}>BEM-VINDO À SUA JORNADA DE APRENDIZADO!</Text>
        <Text style={styles.p}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim aliquam reiciendis esse natus! Officia porro iusto non odit, commodi magni consectetur quis adipisci nisi recusandae corporis facere doloribus facilis corrupti!</Text>
        
        <Button title="teste rota" onPress={start} />
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  p: {
    fontSize: 14,
    textAlign:'center',
    marginBottom: 10,
  },
});
