import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, ToastAndroid } from "react-native";
import ProgressDialog from 'react-native-progress-dialog';

import { config } from '../../config';
import { auth } from "../../logic/auth";
import { routes } from '../../routes';

export default LoginView = observer(({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    return (
        <View style={{
            height: Dimensions.get("window").height,
            backgroundColor: "#fff"
        }}>
            <Text style={styles.title}>{config.login.title}</Text>
            <Text style={styles.desc}>{config.login.desc}</Text>
            <View style={styles.spacer} />
            {error && <Text style={styles.error}>Email & Password Field is Required</Text>}
            {auth.isError && <Text style={styles.error}>{auth.error}</Text>}
            <TextInput
                placeholderTextColor="#ccc"
                placeholder='Email, phone or username'
                style={styles.input}
                keyboardType='email-address'
                onChange={(e) => setEmail(e.nativeEvent.text)}
            />
            <View style={{ height: 10 }} />
            <TextInput
                placeholderTextColor="#ccc"
                secureTextEntry={true}
                placeholder='Password'
                keyboardType='default'
                style={styles.input}
                onChange={(e) => setPassword(e.nativeEvent.text)}
            />
            <View style={{ height: 10 }} />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 20,
            }}>
                <View />
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 20 }} />
            <TouchableOpacity
                onPress={async () => {
                    if (email != "" && password != "") {
                        setError(false)
                        auth.login(email, password, navigation);
                    } else {
                        setError(true)
                    }
                }}
                activeOpacity={0.7}
                style={styles.buttonSignIn}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
            <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={{
                    fontSize: 18,
                    color: "#000",
                    fontWeight: "bold",
                }}>OR</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.spacer} />
            <View style={styles.otherLogin}>
                <TouchableOpacity
                    activeOpacity={0.7}

                    style={{
                        margin: 20,
                    }}
                    onPress={() => ToastAndroid.show('Google Login', ToastAndroid.SHORT)}>
                    <Image source={require("../../assets/google.png")} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}

                    style={{
                        margin: 20,
                    }}
                    onPress={() => ToastAndroid.show('Facebook Login', ToastAndroid.SHORT)}>

                    <Image source={require("../../assets/facebook.png")} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 30 }} />
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{ color: "#555454" }}>Don't Have an Account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate(routes.register)}
                    activeOpacity={0.7}
                ><Text style={{
                    fontWeight: "bold",
                    color: "#000"
                }}>Register Now</Text></TouchableOpacity>
            </View>
            <ProgressDialog visible={auth.isLoading} />
        </View>
    );
})
const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 38,
        marginTop: 30,
        color: '#464444'
    },
    desc: {
        textAlign: 'center',
        fontSize: 13,
        paddingHorizontal: '10%',
        lineHeight: 16,
        marginTop: 20,
        color: '#000'
    },
    spacer: {
        height: 20
    },
    input: {
        borderColor: "#8E8383",
        borderWidth: 0.6,
        borderRadius: 5,
        marginHorizontal: 23,
        paddingHorizontal: 15,
        color: "#000",
    },
    forgot: {
        textAlign: 'right',
        color: "#000",
        fontSize: 15,
        fontWeight: 'bold'
    },

    buttonSignIn: {
        alignSelf: "center",
        backgroundColor: "#000",
        padding: 15,
        marginHorizontal: 23,
        width: "90%",
        borderRadius: 8,
        alignItems: "center",
        elevation: 8,
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    line: {
        height: 0.7,
        backgroundColor: '#000',
        width: '40%',
    },
    otherLogin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 20,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 20
    }
});
