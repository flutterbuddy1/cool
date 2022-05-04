import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props} style={{
            backgroundColor: "#9572F8",
        }}>
            <View style={{
                height: 50,
                paddingTop: 20,
                paddingHorizontal: 20,
            }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.toggleDrawer()}>
                    {/* <Image source={require("../../assets/bar-icon.png")} /> */}
                    <Icon name="close" size={35} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{
                padding: 40,
            }}>
                <DrawerItemList {...props} />
            </View>
            <View style={{
                height: 1,
                backgroundColor: "#fff",
            }} />
            <View style={{
                padding: 40,
            }}>
                <DrawerItem {...props}
                    label="Help"
                    icon={() => <Icon name='help-circle-outline' size={30} color="white" />}
                    labelStyle={{
                        color: '#fff',
                        fontSize: 23,
                    }}
                    drawerActiveBackgroundColor="rgba(255, 255, 255, 0.17)"
                />
            </View>

        </DrawerContentScrollView>
    );
}

export default CustomDrawer;