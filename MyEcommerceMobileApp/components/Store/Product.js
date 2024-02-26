import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import CardItem from '../Share/CardItem';
import Filter from '../Share/Filter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Product = ({ route, navigation }) => {
    const [productStore, setProductStore] = useState(null);
    const { storeId, cateId, sortBy, order } = route.params;
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const loadProductStore = async () => {
            let url = endpoints["products-store"](storeId);

            if (order !== undefined && order !== null && cateId !== undefined && cateId !== null)
                url = `${url}?order=${order}&cateId=${cateId}`;
            else if (sortBy !== undefined && sortBy !== null && cateId !== undefined && cateId !== null)
                url = `${url}?sortBy=${sortBy}&cateId=${cateId}`;
            else if (cateId !== undefined && cateId !== null)
                url = `${url}?cate_id=${cateId}`
            // else if (sortBy !== undefined && sortBy !== null)
            //     url = `${url}?sort_by=${sortBy}`
            // else if (order !== undefined && order !== null)
            //     url = `${url}?order=${order}`

            try {
                const res = await Apis.get(url);
                setProductStore(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadProductStore();
    }, [storeId, cateId, sortBy, order])

    if (productStore === null) {
        return <ActivityIndicator />;
    }

    return (
        <View style={{
            paddingTop: insets.top,
        }}>
            <View>
                <Filter route={route} />
            </View>
            <ScrollView>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", backgroundColor: '#E6E6E6', width: '100%' }}>
                    {productStore.length === 0 ? (
                        <Text>Không có sản phẩm</Text>
                    ) : (
                        productStore.map((data) => (
                            <View key={data.id}>
                                <CardItem navigation={navigation} data={data} />
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

export default Product;