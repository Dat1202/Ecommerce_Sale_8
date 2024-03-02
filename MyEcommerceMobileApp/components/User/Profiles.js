import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Logout from "./Logout";
import { useContext } from "react";
import MyContext from "../../configs/MyContext";
import Store from "../Store/Store";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profiles = ({ navigation }) => {
  const [user, dispatch] = useContext(MyContext)
  const insets = useSafeAreaInsets();

  const logout = async () => {
    await AsyncStorage.removeItem('access-token')
    dispatch({
      "type": "logout",
    })
  }
  //                                      //
  // 1. chưa đăng kí
  // 2. Đăng kí rồi
  //    2.1 chưa duyệt
  //    2.2 đã duyệt
  //    2.3 hủy
  // Check xem đã có chưa(đang là user hay store trong role) 
  // -> chưa(user) thì vào trang đăng kí
  // -> rồi(pending) thì báo đang chờ/đã hủy, có link đăng kí


  const isRegistered = () => {
    if (user.user_role === "user") {
      if (user.status === "Pending") {
        <Text>Yêu cầu về cửa hàng của bạn đang được duyệt, vui lòng chờ!!!</Text>
      } else if (user.status === "") {// rỗng tức là chưa đăng kí
        <TouchableOpacity onPress={() => navigation.navigate('RegisterStore')}>
          <Text>Đăng kí Store</Text>
        </TouchableOpacity>
      }
    } else if (user.user_role === "store") {
      <TouchableOpacity onPress={() => navigation.navigate('Store')}>
        <Text>Store của tui</Text>
      </TouchableOpacity>
    }
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = 'res.cloudinary.com/dy4p98hhs/';
    return `https://${cloudinaryDomain}/${publicId}`;
  };
  const handleViewShop = () => {
    navigation.navigate('Store', { storeId: user.store });
  };

  return (
    <View style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      <View className="bg-white pt-1">
        <View className="flex-row	items-center ">
          <TouchableOpacity className="ml-2 border-2 border-transparent rounded-full bg-gray-400" onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View >
          {user === null ? (
            <View className="flex-row items-center mt-2 p-2 justify-around">
              <Image
                source={{ uri: 'https://www.pikpng.com/pngl/m/263-2631740_empty-avatar-png-user-png-clipart.png' }}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'cover',
                  borderRadius: 50,
                }} />
              <Button title="Đăng nhập" color="orange" onPress={() => navigation.navigate("Login")} />
              <Button title="Đăng ký" onPress={() => navigation.navigate("Register")} />
            </View>
          ) :
            (<View className="flex-row items-center mt-2 p-2 justify-around">
              <Image
                source={{ uri: addCloudinaryDomain(user.avatar) }}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'cover',
                  borderRadius: 50,
                }} />
              <Button title="Đăng xuất" color="orange" onPress={logout} />
            </View>
            )}
        </View>
      </View >

      {user === null ? (
        <View>
          <Text>Chào bạn</Text>
        </View>
      ) : (
        user.user_role === 3 && user.status === 'Approved' ? (
          <View>
            <TouchableOpacity onPress={handleViewShop}>
              <Text>Store của tui</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Chart')}>
              <Text>Thống kê</Text>
            </TouchableOpacity>
          </View>
        ) : (
          user.user_role === 2 && user.status === '' ? (
            <TouchableOpacity onPress={() => navigation.navigate('RegisterStore')}>
              <Text>Tạo cửa hàng</Text>
            </TouchableOpacity>
          ) : (
            user.status === 'Pending ' && <Text>Cửa hàng chờ xác nhận admin</Text>
          )
        )
      )}


      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Test')}>
          <Text>Đến trang RegisterStore</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('rtg')}>
          <Text>Đrểe</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chart')}>
          <Text>Chart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Logout />
      </View> */}
    </View >
  )
}

export default Profiles

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%'
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});