import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, ToastAndroid } from "react-native";
import { config } from '../../config';
import { auth } from "../../logic/auth";
import { routes } from '../../routes';
import { observer } from 'mobx-react';
import ProgressDialog from 'react-native-progress-dialog';





export default RegisterView = observer(({ navigation }) => {
    const [firstname, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    return (
        <View style={{
            height: Dimensions.get("window").height,
            backgroundColor: "#fff"
        }}>
            <Text style={styles.title}>{config.register.title}</Text>
            <Text style={styles.desc}>{config.register.desc}</Text>
            <View style={styles.spacer} />
            {error && <Text style={styles.error}>All Fields Are Required</Text>}
            {auth.isError && <Text style={styles.error}>{auth.error}</Text>}
            <TextInput
                placeholderTextColor="#ccc"
                placeholder='First Name'
                style={styles.input}
                keyboardType='default'
                onChange={(e) => setName(e.nativeEvent.text)}
            />
            <View style={{ height: 10 }} />

            <TextInput
                placeholderTextColor="#ccc"
                placeholder='Last Name'
                style={styles.input}
                keyboardType='default'
                onChange={(e) => setLastName(e.nativeEvent.text)}
            />
            <View style={{ height: 10 }} />

            <TextInput
                placeholderTextColor="#ccc"
                placeholder='Phone'
                style={styles.input}
                keyboardType='phone-pad'
                onChange={(e) => setPhone(e.nativeEvent.text)}
            />
            <View style={{ height: 10 }} />

            <TextInput
                placeholderTextColor="#ccc"
                placeholder='Email'
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
            <View style={{ height: 20 }} />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={async () => {
                    if (firstname != "" && lastname != "" && phone != "" && email != "" && password != "") {
                        setError(false)
                        auth.register(firstname, lastname, phone, email, password, navigation);
                    } else {
                        setError(true)
                    }

                }}
                style={styles.buttonSignIn}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Register</Text>
            </TouchableOpacity>
            <View style={{ height: 30 }} />
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{ color: "#555454" }}>Already Have an Account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate(routes.login)}
                    activeOpacity={0.7}
                ><Text style={{
                    fontWeight: "bold",
                    color: "#000"
                }}>Login</Text></TouchableOpacity>
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
