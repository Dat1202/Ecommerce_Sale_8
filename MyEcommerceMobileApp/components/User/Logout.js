import { useContext } from "react"
import { Button } from "react-native"
import MyContext from "../../configs/MyContext"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigation }) => {
    const [user, dispatch] = useContext(MyContext);

    const logout = async () => {
        await AsyncStorage.removeItem('access-token')
        dispatch({
            "type": "logout",
        })
    }
    if (user === null)
        return (<Button title="Login" onPress={() => navigation.navigate("Login")} />)
    return (<Button title="Logout" onPress={logout} />)
}

export default Logout