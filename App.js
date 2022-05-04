import React, { useEffect, useState } from 'react';
import { Dimensions } from "react-native";
import SplashView from './src/views/splash/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from "react-native-vector-icons/Ionicons";

import LoginView from './src/views/login/login';
import RegisterView from './src/views/register/register';
import { routes } from './src/routes';
import HomeView from './src/views/home/home';
import CustomDrawer from './src/views/drawer/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainSplash from './src/views/main/main';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerPage() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={
      (props) => <CustomDrawer {...props} />
    } screenOptions={{
      drawerStyle: {
        width: Dimensions.get("window").width,
      },
      headerShown: false,
      drawerLabelStyle: {
        color: '#fff',
        fontSize: 23,
      },
      drawerItemStyle: {
        padding: 10,
      },
      drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.17)",
    }}>
      <Drawer.Screen name="Home" component={HomeView} options={{
        drawerIcon: () => <Icon name='home-outline' size={30} color='white' />,
      }} />
      <Drawer.Screen name="About" component={HomeView} options={{
        drawerIcon: () => <Icon name='help-buoy-outline' size={30} color='white' />,
      }} />
      <Drawer.Screen name="Messages" component={HomeView} options={{
        drawerIcon: () => <Icon name='chatbox-ellipses-outline' size={30} color='white' />,
      }} />
      <Drawer.Screen name="Settings" component={HomeView} options={{
        drawerIcon: () => <Icon name='settings-outline' size={30} color='white' />,
      }} />
      <Drawer.Screen name="Roles" component={HomeView} options={{
        drawerIcon: () => <Icon name='person-outline' size={30} color='white' />,
      }} />
    </Drawer.Navigator>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.main}>
        <Stack.Screen name={routes.main} component={MainSplash} options={{
          headerShown: false,
        }} />

        <Stack.Screen name={routes.splash} component={SplashView} options={{
          headerShown: false,
        }} />

        <Stack.Screen name={routes.login} component={LoginView} options={{
          headerShown: false,
        }} />

        <Stack.Screen name={routes.register} component={RegisterView} options={{
          headerShown: false,
        }} />

        <Stack.Screen name={routes.home} component={DrawerPage} options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
