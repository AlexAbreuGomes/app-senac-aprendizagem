import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";


export default function TabLayout(){
    return(
       <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: '#A8A8A8'}
       }}>
            <Tabs.Screen
                name="(home)"
                options={{
                    title:  'Home',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />

            <Tabs.Screen
                name="(videos)"
                options={{
                    title:  'Vídeos',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="youtube" color={color} />,
                }}
            />

            <Tabs.Screen
                name="(quiz)"
                options={{
                    title:  'Quiz',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="play" color={color} />,
                }}
            />

            <Tabs.Screen
                name="(ata)"
                options={{
                    title:  'Ata',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="amazon" color={color} />,
                }}
            />

            <Tabs.Screen
                name="(sobreNos)"
                options={{
                    title:  'Conheça',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="user-circle-o" color={color} />,
                }}
            />
       </Tabs>
    )
}