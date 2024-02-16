import React, { useReducer } from "react";
import Home from './components/Home/Home'
import Cate from './components/Share/Category';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductDetails from "./components/Product/ProductDetails";
import CardItem from "./components/Share/CardItem";
import Store from "./components/Store/Store";
import Login from './components/User/Login';
import MyUserReducer from './reducers/MyUserReducer';
import MyContext from './configs/MyContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Profiles from "./components/User/Profiles";
import Product from "./components/Store/Product";


const Tab = createBottomTabNavigator();

const App = () => {
    var base_color = "#ff5722"
    const [user, dispatch] = useReducer(MyUserReducer, null)
    console.log(`App: ${user}`)
    return (
        <SafeAreaProvider>
            <MyContext.Provider value={[user, dispatch]}>
                <NavigationContainer>
                    <Tab.Navigator initialRouteName={Home}
                        screenOptions={{ headerShown: false }}
                    >
                        <Tab.Screen name="Home" component={Home} options={{
                            tabBarActiveTintColor: base_color,
                            tabBarIcon: ({color}) => (
                                <Feather name="home" size={24} color={color}/>
                            ), 
                        }} />
                        <Tab.Screen name="Categories" component={Cate} options={{
                            tabBarActiveTintColor: base_color,
                            tabBarIcon: ({color}) => (
                                <Feather name="database" size={24} color={color}/>
                            ), 
                        }} />
                        {user === null ? <>
                            <Tab.Screen name='Login' component={Login} options={{ title: "Profiles", 
                            tabBarActiveTintColor: base_color,
                            tabBarIcon: ({color}) => (
                                <Feather name="user" size={24} color={color}/>
                            ), 
                        }} />
                        </> : <>
                            {/* <Tab.Screen name="User" component={User} options={{ title: user.username }} />
                            <Tab.Screen name="Logout" component={Logout} /> */}
                            <Tab.Screen name="Profiles" component={Profiles} options={{
                            tabBarActiveTintColor: base_color,
                            tabBarIcon: ({color}) => (
                                <Feather name="user" size={24} color={color}/>
                            ), 
                        }} />
                        </>}


                        <Tab.Screen name="CardItem" component={CardItem} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="ProductDetails" component={ProductDetails} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Store" component={Store} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Product" component={Product} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                    </Tab.Navigator>
                </NavigationContainer>
            </MyContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;

style = {tabBarActiveBackgroundColor: "#ff5722"}
