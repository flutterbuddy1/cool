import React, { Component, useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { config } from "../../config";
import { routes } from '../../routes';
import PagerView from 'react-native-pager-view';


function SplashView({ navigation }) {
    const [page, setPage] = useState(0);
    const pageRef = useRef(0);

    return (
        <View style={{
            height: Dimensions.get("window").height,
            backgroundColor: "#fff"
        }}>
            <PagerView
                ref={pageRef}
                style={{
                    flex: 1
                }} initialPage={page} onPageSelected={(p) => {
                    console.log(p.nativeEvent.position);
                    setPage(p.nativeEvent.position);
                }}>
                {
                    config.splash.map((item, index) =>
                        <View key={index}>
                            <View style={styles.sectionContainer}>
                                <Image
                                    style={styles.sectionImage}
                                    source={config.splash[index].image}
                                />
                            </View>
                            <Text
                                style={styles.sectionTitle}
                            > {config.splash[index].title} </Text>
                            <Text
                                style={styles.sectionDesc}
                            > {config.splash[index].desc} </Text>
                        </View>
                    )}
            </PagerView>

            <View style={{
                bottom: 80,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            }}>
                {
                    config.splash.map((item, index) => <View key={index} style={{
                        height: page == index ? 13 : 9,
                        width: page == index ? 13 : 9,
                        margin: 10,
                        backgroundColor: page == index ? "#4285F4" : "grey",
                        borderRadius: 100,
                    }} />)
                }
            </View>

            <View style={styles.sectionButton}>
                <TouchableOpacity
                    onPress={() => navigation.replace(routes.login)}
                    activeOpacity={0.7}
                    style={styles.buttonSignIn}>
                    <Text style={styles.textWhite}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.replace(routes.register)}
                    activeOpacity={0.7}
                    style={styles.buttonRegister}>
                    <Text style={styles.textBlack}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    sectionContainer: {
        height: "55%",
        margin: 9,
        borderRadius: 10,
        backgroundColor: "#9572F8",
    },
    sectionImage: {
        height: "100%",
        width: "100%",
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 38,
        marginTop: 20,
        color: "#464444",
        fontFamily: "Outfit",

    },
    sectionDesc: {
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: "10%",
        fontWeight: "300",
        color: "#000000",
        fontFamily: "Outfit",

    },
    sectionButton: {
        bottom: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
    },
    textWhite: {
        color: "#fff",
        fontWeight: "bold", fontSize: 18
    },
    textBlack: {
        color: "#545151",
        fontWeight: "bold", fontSize: 18
    },
    buttonSignIn: {
        backgroundColor: "#000",
        padding: 15,
        width: "35%",
        borderRadius: 8,
        alignItems: "center",
        elevation: 8,
    },
    buttonRegister: {
        backgroundColor: "#F3F3F3",
        padding: 15,
        width: "35%",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        elevation: 8,
        alignItems: "center"
    }
});
export default SplashView;
