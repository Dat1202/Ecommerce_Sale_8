import React, { createContext, useEffect, useReducer, useState } from "react";
import Home from './components/Home/Home'
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductDetails from "./components/Product/ProductDetails";
import CardItem from "./components/Share/CardItem";
import Store from "./components/Store/Store";
import Login from './components/User/Login';
import Register from './components/User/Register';
import MyUserReducer from './reducers/MyUserReducer';
import MyContext from './configs/MyContext';
import MyCartContext from './configs/MyCartContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Profiles from "./components/User/Profiles";
import Product from "./components/Store/Product";
import Review from "./components/Store/Review";
import Comment from "./components/Product/Comment";
import RegisterStore from "./components/User/RegisterStore";
import Logout from "./components/User/Logout";
import MyCartCounterReducer from "./reducers/MyCartCounterReducer";
import Cart from "./components/Cart/Cart";
import PostProduct from "./components/Product/PostProduct";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Compare from "./components/Product/Compare";
import Chart from "./components/AdminStore/Chart";
import Test from "./components/Home/Test";
import { ActivityIndicator } from "react-native";

const Tab = createBottomTabNavigator();

const countCartItem = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const carts = JSON.parse(cart);
      console.log(carts);
  
      if (carts !== null) {
        let totalQuantity = 0;
        for (const key in carts) {
            if (carts.hasOwnProperty(key)) {
              const item = carts[key];
              const quantity = item.quantity;
              totalQuantity += quantity;
            }
          }
        return totalQuantity;
      }
    } catch (error) {
      console.error('Error retrieving cart:', error);
    }
  
    return 0;
  };

const App = () => {
    var base_color = "#ff5722"
    const [user, dispatch] = useReducer(MyUserReducer, null)
    const [counter, setCounter] = useState(0);
    const [cartCounter, cartDispatch] = useReducer(MyCartCounterReducer, counter);
    
    useEffect(() => {
        const fetchCartQuantity = async () => {
            const quantity = await countCartItem();
            await setCounter(quantity);
            cartDispatch({
                "type": "update",
                "payload": counter
            })
        };
        
        fetchCartQuantity();
    }, []);

    return (
        <SafeAreaProvider>
            <MyContext.Provider value={[user, dispatch]}>
            <MyCartContext.Provider value={[cartCounter, cartDispatch]}>
                <NavigationContainer>
                    <Tab.Navigator initialRouteName={Home}
                        screenOptions={{ headerShown: false }} backBehavior={"history"}
                    >
                        <Tab.Screen name="Home" component={Home} options={{
                            tabBarActiveTintColor: base_color,
                            tabBarIcon: ({ color }) => (
                                <Feather name="home" size={24} color={color} />
                            ),
                        }} />
                        <Tab.Screen name='Cart' component={Cart} options={{
                            title: "Cart",
                            tabBarActiveTintColor: base_color,
                            tabBarIcon: ({ color }) => (
                                <Feather name="shopping-cart" size={24} color={color} />
                            ),
                            unmountOnBlur: true,
                            tabBarBadge: cartCounter
                        }} />
                        <Tab.Screen name='Profiles' component={Profiles} options={{
                            title: "Profiles",
                            tabBarActiveTintColor: base_color,
                            tabBarIcon: ({ color }) => (
                                <Feather name="user" size={24} color={color} />
                            ),
                        }} />
                        <Tab.Screen name="Logout" component={Logout} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Login" component={Login} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Register" component={Register} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="RegisterStore" component={RegisterStore} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
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
                        <Tab.Screen name="Review" component={Review} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Comment" component={Comment} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />

                        <Tab.Screen name="PostProduct" component={PostProduct} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Compare" component={Compare} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Chart" component={Chart} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                        <Tab.Screen name="Test" component={Test} options={{
                            tabBarItemStyle: { display: "none" }
                        }} />
                    </Tab.Navigator>
                </NavigationContainer>
            </MyCartContext.Provider>
            </MyContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;

style = { tabBarActiveBackgroundColor: "#ff5722" }
