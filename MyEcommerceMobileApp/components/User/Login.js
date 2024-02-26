import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useContext, useState } from "react"
import MyContext from "../../configs/MyContext"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);
    const insets = useSafeAreaInsets();

    const login = async () => {
        let reqData = {
            "username": username,
            "password": password,
            "client_id": "jh0EnJFe2uGzTc3kY7kbLHtUgW7NILwkcY9dpt17",
            "client_secret": "GCUhrDHUFqnGiXGXBSrHV2V0Ip3vBoKSL4xoIVa4eLrNPNG64sptXUoEZqF91KBWHCLFJOEbR1SWDENVPzqXARDR24IpprelYyjWmsPOvWkmtzUe21VY3qRYPEWBRqs1",
            "grant_type": "password",
            "withCredentials": "true"
        }
        data = Object.keys(reqData).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key])
        }).join('&')

        try {
            let res = await Apis.post(endpoints['login'], {
                "username": username,
                "password": password,
                "client_id": "jh0EnJFe2uGzTc3kY7kbLHtUgW7NILwkcY9dpt17",
                "client_secret": "GCUhrDHUFqnGiXGXBSrHV2V0Ip3vBoKSL4xoIVa4eLrNPNG64sptXUoEZqF91KBWHCLFJOEbR1SWDENVPzqXARDR24IpprelYyjWmsPOvWkmtzUe21VY3qRYPEWBRqs1",
                "grant_type": "password"
            });
            await AsyncStorage.setItem('access-token', res.data.access_token)
            let user = await authApi(res.data.access_token).get(endpoints['current-user']);
            dispatch({
                type: "login",
                payload: user.data
            });
            navigation.navigate("Home");
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            flex: 1
        }} className="bg-slate-100">
            <View className="flex-row items-center bg-white">
                <TouchableOpacity className=" w-10 h-10 ml-3 mt-3 border-2 border-transparent " onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="orange" />
                </TouchableOpacity>
                <Text className="text-xl">Login</Text>
            </View>

            <View className="justify-center	mt-20 ">
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="user" size={24} color="black" />
                    <TextInput className="ml-4" value={username} onChangeText={t => setUsername(t)} placeholder="Username" />
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput className="ml-4" value={password} onChangeText={t => setPassword(t)} secureTextEntry={true} placeholder="Password" />
                </View>
                <View className="mt-6 items-center">
                    <TouchableOpacity className="items-center	bg-orange-400 p-4 w-28 h-14" onPress={login}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login