import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, makeObservable, observable } from "mobx";
import { config } from "../config";

class Users {

    usersList = [];
    isLoading = false;

    constructor() {
        makeObservable(this, {
            usersList: observable,
            isLoading: observable,
            getUsers: action
        })
    }

    async getUsers() {
        this.isLoading = true;
        var data = await AsyncStorage.getItem("userData");
        console.log("+++++++++++" + data);
        var json = JSON.parse(data);
        var token = json['token'];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "search": {
                "email": "",
                "status": "",
                "gender": "",
                "age": "",
                "name": ""
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${config.apiUrl}/admin/user/fetch`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.isLoading = false;
                console.log(result['data']['allUsers'])
                this.usersList = result['data']['allUsers'];
            })
            .catch(error => {
                this.isLoading = false;
                console.log('error', error)
            });
    }

}

export const users = new Users();