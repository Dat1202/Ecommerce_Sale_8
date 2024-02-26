import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Category = ({ category, storeId, navigation}) => {

    const handleViewProduct = () => {
        navigation.navigate('Product', { "storeId": storeId, "cateId": category.id });
    };

    return (
        <TouchableOpacity className="flex-row items-center content-evenly border-t border-slate-200 p-3" onPress={handleViewProduct}>
            <View className="p-3" style={{ flex: 1 }}>
                <Text>{category.name}</Text>
            </View>
            <AntDesign name="right" size={16} color="black" />
        </TouchableOpacity>
    )
}

export default Category