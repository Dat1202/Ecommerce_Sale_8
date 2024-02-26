import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Apis, { authApi, endpoints } from '../../configs/Apis';

const Test = () => {
    object = [
        {
            "quantity": 3,
            "product": 1,
            "unit_price": 1200
        },
        {
            "quantity": 5,
            "product": 2,
            "unit_price": 1200
        }
    ]
    const addComment = async () => {
        try {
            let accessToken = await AsyncStorage.getItem("access-token")
            const res = await authApi(accessToken).post(endpoints["payment"], object);
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <View>
            <TouchableOpacity className="my-2 " style={{ width: 100, }} onPress={addComment}>
                <Text className="bg-orange-400 p-4 ">Đánh giá</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Test