import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet,Text } from "react-native"
import { StatusBar } from "expo-status-bar"

export default function Screen (){
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <Text style={styles.h1}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque rerum velit possimus nam quis maxime asperiores voluptatem, quae est tempore corporis dignissimos voluptatibus delectus corrupti voluptatum numquam aliquid modi architecto?</Text>
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
        fontSize: 15,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    }
})