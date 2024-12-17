import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet,Text, Button } from "react-native"
export default function Screen (){
    const start = ()=>{
        router.replace('/home')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.h1}> Testes</Text>
            <Button
                title="teste rota"
                onPress={start}
            />
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