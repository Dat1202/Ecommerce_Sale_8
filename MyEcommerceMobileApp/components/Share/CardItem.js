import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CardItem = ({ navigation, data }) => {

    const goToDetails = (productId) => {
        navigation.navigate('ProductDetails', {productId: productId})
    }
    
    return (
        <TouchableOpacity onPress={() => goToDetails(data.id)}
            // key={data.id}
            className="px-1 py-2 box-border"
            style={{
                width: '41%',
            }}
        >   
            <View className="w-48 h-72 bg-white	items-center">
                <Image
                    source={{ uri: data.image }}
                    style={{
                        width: '100%',
                        height: '70%',
                        resizeMode: 'cover',
                    }}
                />
                <View className="justify-center	"
                    style={{
                        flex: 1,
                    }}>
                    <Text className="text-black text-center px-1"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {data.name}
                    </Text>
                </View>
                <Text className="text-red-600 pb-2" >{data.price}₫</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardItem