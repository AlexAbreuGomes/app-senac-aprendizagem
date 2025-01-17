import React from "react";
import { Tabs, } from "expo-router";
import { Image } from "react-native";

export default function TabLayout(){
    return(
       <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: '#ffffff', height: 60, paddingTop: 5,},
            tabBarLabelStyle: {fontSize: 12,   fontWeight: 'bold'}, 
            tabBarAccessibilityLabel: 'Navegação de abas',
            
            tabBarActiveTintColor: '#044B8B',
            tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.40)',
            tabBarShowLabel: true,
            
       }}>
            <Tabs.Screen
                name="(home)"
                options={{
                    title:  'Home',
                    tabBarIcon: ({ focused }) => (
                        <Image
                          source={
                            focused
                              ? require("../../assets/icon-tab-home-active.png")
                              : require("../../assets/icon-tab-home-inative.png")
                          }
                          style={{ width: 29, height: 29 }}
                          resizeMode="contain"
                        />
                      ),
                
                }}
            />

            <Tabs.Screen
                name="(videos)"
                options={{
                    title:  'Vídeos',
                    tabBarIcon: ({ focused }) => (
                        <Image
                          source={
                            focused
                              ? require("../../assets/icon-tab-video-ative.png")
                              : require("../../assets/icon-tab-video-inative.png")
                          }
                          style={{ width: 30, height: 30 }}
                          resizeMode="contain"
                        />
                      ),
                
                }}
               
            />

            <Tabs.Screen
                name="(quiz)"
                options={{
                    title:  'Quiz',
                    tabBarIcon: ({ focused }) => (
                        <Image
                          source={
                            focused
                              ? require("../../assets/icon-tab-medalha-active.png")
                              : require("../../assets/icon-tab-medalha-inative.png")
                          }
                          style={{ width: 34, height: 35 }}
                          resizeMode="contain"
                        />
                      ),
                
                }}
            />
            <Tabs.Screen
                name="(ata)"
                options={{
                    title:  'Ata',
                    tabBarIcon: ({ focused }) => (
                        <Image
                          source={
                            focused
                            ? require("../../assets/icon-tab-mala-active.png")
                            : require("../../assets/icon-tab-mala-inative.png")
                          }
                          style={{ width: 34, height: 35 }}
                          resizeMode="contain"
                        />
                      ),
                
                }}
            />

            <Tabs.Screen
                name="(faq)"
                options={{
                    title:  'Faq',
                    tabBarIcon: ({ focused }) => (
                        <Image
                          source={ 
                            focused
                              ? require("../../assets/icon-tab-faq-active.png")
                              : require("../../assets/icon-tab-faq-inative.png")
                          }
                          style={{ width: 34, height: 35 }}
                          resizeMode="contain"
                    
                        />
                      ),
                }}
            />

            <Tabs.Screen
                name="(sobreNos)"
                options={{
                    title:  'Conheça',
                    tabBarIcon: ({ focused }) => (
                        <Image
                          source={ 
                            focused
                              ? require("../../assets/icon-tab-conheca-active.png")
                              : require("../../assets/icon-tab-conheca-inative.png")
                          }
                          style={{ width: 42, height: 45 }}
                          resizeMode="contain"
                        />
                      ),
                }}
            />
       </Tabs>
    )
}