import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react';
import React, {
    useState,
    useEffect
} from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList, StyleSheet, ToastAndroid } from "react-native";
import { users } from '../../logic/users';
import { routes } from '../../routes';
import ProgressDialog from 'react-native-progress-dialog';



export default HomeView = observer(({ navigation }) => {

    const [name, setName] = useState("");

    useEffect(async () => {
        users.getUsers();

        var data = await AsyncStorage.getItem("userData");
        console.log("+++++++++++" + data);
        var json = JSON.parse(data);
        var userName = json['user']['firstName'];
        console.log(userName);
        setName(userName);
    }, [])

    return (
        <>
            <View style={{
                height: 70,
                width: Dimensions.get("window").width,
                backgroundColor: "#9572F8",
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "space-between",
                paddingHorizontal: 20,
                elevation: 5,
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.toggleDrawer()}>
                        <Image source={require("../../assets/bar-icon.png")} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff',
                        marginLeft: 30,
                    }}>Home</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={async () => {
                    await AsyncStorage.clear();
                    navigation.replace(routes.login);
                }}>
                    <Text style={{
                        color: "white",
                        fontWeight: "bold"
                    }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={users.usersList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            ToastAndroid.show(`User ${item['firstName']} Clicked`, ToastAndroid.SHORT);
                        }}
                        style={styles.userContainer}>
                        <View style={styles.profileImage}></View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#000',
                            textTransform: "uppercase"
                        }} >{item['firstName']}</Text>
                    </TouchableOpacity>
                )}
            />
            <ProgressDialog visible={users.isLoading} />

        </>
    );
})

const styles = StyleSheet.create({
    userContainer: {
        minHeight: 50,
        width: "95%",
        margin: 10,
        backgroundColor: "#fff",
        marginVertical: 5,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginRight: 20,
        backgroundColor: "#9572F8",
    }
});