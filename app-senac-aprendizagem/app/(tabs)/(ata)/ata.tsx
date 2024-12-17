import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet,Text, Button } from "react-native"
import { StatusBar } from "expo-status-bar"
export default function Screen (){
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <Text style={styles.h1}>Ata</Text>
        </SafeAreaView>
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