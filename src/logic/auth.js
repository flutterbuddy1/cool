import { routes } from "../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";
import { ToastAndroid } from 'react-native';
import { makeObservable, observe, observable, action } from "mobx";

class Auth {
    isError = false;
    error = "";
    isLoading = false;


    constructor() {
        makeObservable(this, {
            isError: observable,
            error: observable,
            isLoading: observable,
            login: action,
        });
    }


    async login(username, password, navigator) {
        this.isError = false;
        this.isLoading = true;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": username,
            "password": password
        });
        // "Chaz.Champlin43@yahoo.com"
        // "admin"
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`${config.apiUrl}/user/login`, requestOptions)
            .then(response => response.json())
            .then(async (result) => {
                console.log(result);
                if (result['data'] != null) {
                    this.isLoading = false;
                    const jsonValue = JSON.stringify(result['data']);
                    try {
                        await AsyncStorage.setItem("userData", jsonValue);
                        await AsyncStorage.setItem("isLoggedIn", "1");
                        navigator.replace(routes.home);
                    } catch (e) {
                        this.isLoading = false;
                        console.log(e);
                    }
                } else {
                    this.isLoading = false;
                    this.isError = true;
                    this.error = result['message'];
                }
            })
            .catch(error => {
                this.isLoading = false;
                this.error = error;
                console.log('error', error)
            });
        // navigator.navigate(routes.home);
    }

    async register(
        firstName,
        lastName,
        email,
        phone,
        password,
        navigation,
    ) {
        this.isError = false;
        this.isLoading = true;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "phoneNumber": phone
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${config.apiUrl}/user/register`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.isLoading = false;
                if (result['data'] != null) {
                    ToastAndroid.show("Login To Verify", ToastAndroid.LONG);
                    navigation.replace(routes.login);
                } else {
                    this.isError = true;
                    this.error = result['message'];
                }
            })
            .catch(error => {
                this.isLoading = false;
                console.log('error', error)
            });
    }
}


export const auth = new Auth();