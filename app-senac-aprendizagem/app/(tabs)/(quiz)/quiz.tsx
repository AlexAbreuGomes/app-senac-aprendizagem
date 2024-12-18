import { router, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet,Text, Button } from "react-native"
import { BackButton } from "../../../components/backButton"
import { StatusBar } from "expo-status-bar"
export default function Screen (){


    return(
        <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "",
            headerTitleStyle: {
              fontSize: 30,
              color: "#0361dd",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <BackButton onPress={() => router.back()} /> // Botão de voltar
            ),
          }}
        />

        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <Text style={styles.h1}>Quiz</Text>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    }
})