import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native'; import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartItem = () => {
  return (
    <View>
      <TouchableOpacity
        // key={data.key}
        // onPress={() => navigation.navigate('ProductDetails', {productID: data.id})}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            // source={data.productImage}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              name
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}>
                productPrice
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
            // onPress={() => removeItemFromCart(data.id)}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};



export default CartItem