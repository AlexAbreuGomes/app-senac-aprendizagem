import { videos } from "../../../data/videos";
import { VideoAprendizagem } from "../../../components/videoComponent";
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, FlatList, Image, StyleSheet,Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import {useFonts as IBMPlexMono,IBMPlexMono_400Regular,IBMPlexMono_700Bold,IBMPlexMono_500Medium} from "@expo-google-fonts/ibm-plex-mono";


const screenWidth = Dimensions.get('window').width

export default function Screen (){

   useFonts({
     LuckiestGuy: LuckiestGuy_400Regular,
     IBMPlexMonoRegular: IBMPlexMono_400Regular,
     IBMPlexMonoBold: IBMPlexMono_700Bold,
     IBMPlexMonoMedium: IBMPlexMono_500Medium,
   });

    return(
       
        <SafeAreaView style={styles.container}>
            <StatusBar/>
               <View style={styles.areaBanner}>
                    <Image
                        style={styles.imgBanner}
                        source={require('../../../assets/imgBannerTabVideos.png')}
                        resizeMode="stretch"
                    />
                    <Text style={styles.textBanner}>Vídeo Aprendizagem</Text>
               </View>

                <FlatList
                    data={videos}
                    renderItem={({item}) => <VideoAprendizagem data={item}/>}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.flatlist}
                    showsVerticalScrollIndicator={false}
                />    
        </SafeAreaView>
    )
   
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        gap: 30
    },
    areaBanner:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderWidth: 0,
        width: screenWidth,
        height: 180
    },
    imgBanner:{
        borderWidth: 0,
        width: 150,
        height: 150
    },
    textBanner:{
        fontSize: 35,
        fontFamily: 'LuckiestGuy',
        color: '#044B8B'
    },
    flatlist:{ 
        width: screenWidth,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 20,
        paddingTop: 20,
        gap: 30

    }
});