import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import Apis, { endpoints } from '../../configs/Apis';
import { Ionicons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import { Entypo } from '@expo/vector-icons';
import Comment from './Comment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetails = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = React.useState(null);
  const [productSold, setProductSold] = React.useState(null);
  const windowDimensions = useWindowDimensions();

  React.useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await Apis.get(endpoints['product-details'](productId));
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const loadProductSold = async () => {
      try {
        const res = await Apis.get(endpoints['sold'](productId));
        setProductSold(res.data);

      } catch (error) {
        console.error(error);
      }
    };
    loadProductSold();
    loadProduct();
  }, [productId]);

  if (product === null) {
    return <ActivityIndicator style={styles.container} />;
  }

  const handleViewShop = () => {
    navigation.navigate('Store', { storeId: product.store.id });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const tagsStyles = {
    p: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    h1: {
      fontSize: 20,
    },
  };

  const addToCart = async (p) => {
    // Lưu đơn vào cookies
    // let cart = cookie.load("cart") || null;
    let cart = await AsyncStorage.getItem("cart") || null;
    cart = JSON.parse(cart)
    if (cart === null)
        cart = {};
    
    if (p.id in cart) {
        // sản phẩm đã có trong giỏ
        cart[p.id]["quantity"] += 1;
    } else {
        // sản phẩm chưa có trong giỏ
        cart[p.id] = {
            "product": p.id,
            "name": p.name,
            "unit_price": p.price,
            "quantity": 1
        };
    }
    await AsyncStorage.setItem("cart", JSON.stringify(cart))
    console.log(cart)
  }

  const productComponent = () => {
    if(user !== null && product.store.user.id === user.id) {
      return <>
      <TouchableOpacity onPress={navigate('PostProduct')}> // vào trang add/update sp
        <View>Update SP</View>
      </TouchableOpacity>
      <TouchableOpacity onPress={Apis.delete["product-details"](product.id)}> // send delete request ròi navigate về store: navigate('store')
        <View>Delete SP</View>
      </TouchableOpacity></>
    }
    return ""
  }


  const handleViewCompare = () => {
    navigation.navigate('Compare', { "cateId": product.category.id, "productName": product.name });
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = 'res.cloudinary.com/dy4p98hhs/';
    return `https://${cloudinaryDomain}/${publicId}`;
  };
  return (
    <ScrollView className="bg-slate-100" style={styles.container}>
      <View className="relative">
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity className="absolute z-20 top-8 left-4 border-2 border-transparent	rounded-full bg-gray-400" onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View className="bg-white p-4 mb-2" style={{ width: windowDimensions.width }}>
        <Text className="font-bold text-2xl mb-2 text-red-500" >₫{product.price}</Text>
        <Text className="font-bold text-2xl mb-4" numberOfLines={2} ellipsizeMode="tail">{product.name}</Text>
        <View className="flex-row justify-between	">
          {productSold === null || productSold === undefined || productSold[0] === null || productSold[0] === undefined
            ? <Text>Đã bán 0</Text>
            : (
              <Text>Đã bán {productSold[0].count}</Text>
            )}

          <View>
            <TouchableOpacity className="border-2	border-red-600 p-1" onPress={handleViewCompare}>
              <Text className="text-red-500	s">So sánh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="bg-white p-4 flex-row justify-between	">
        <View>
          <TouchableOpacity className="border-2	border-red-600 p-1 " style={styles.viewShopButton} onPress={() =>addToCart(product)}>
            <Text className="text-red-500	">Thêm vào giỏ hàng </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white p-4 flex-row justify-between	">
        <View className="flex-row">
          <Image
            source={{ uri: addCloudinaryDomain(product.store.user.avatar) }}

            style={{
              width: 80,
              height: 80,
              resizeMode: 'cover',
            }}
          />
          <View className="ml-2">
            <Text className="font-medium text-xl">{product.store.name}</Text>
            <View className="flex-row items-center	">
              <Entypo name="location-pin" size={20} color="black" />
              <Text className="font-light	text-xl">{product.store.location}</Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity className="border-2	border-red-600 p-1 " style={styles.viewShopButton} onPress={handleViewShop}>
            <Text className="text-red-500	">Xem Shop </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white p-4 mt-2">
        <Text className="font-normal">Mô tả sản phẩm</Text>
        <RenderHTML tagsStyles={tagsStyles} source={{ html: product.description }} contentWidth={windowDimensions.width} />
      </View>
      <View className="bg-white p-4 mt-2">
        <Comment route={route} navigation={navigation} />
        <View>
          <Text>Có thể bạn cũng thích</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  viewShopButton: {
    marginTop: 16,
  },
});

export default ProductDetails;