import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from "react-native";
import { config } from '../../config';
import { routes } from '../../routes';

function MainSplash({ navigation }) {


    useEffect(async () => {
        var data = await AsyncStorage.getItem("isLoggedIn");
        console.log("IS USER LOGGEDIN " + data);
        if (data == "1") {
            setTimeout(() => {
                navigation.replace(routes.home);
            }, 2000);
        } else {
            setTimeout(() => {
                navigation.replace(routes.splash);
            }, 2000);
        }
    }, []);

    return (
        <View style={{
            height: Dimensions.get("window").height,
            backgroundColor: "#9572F8",
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
        }}>
            <Text style={{
                fontSize: 50,
                fontWeight: "bold",
                color: "#fff"
            }}>{config.appName}</Text>
        </View>
    );
}

export default MainSplash;