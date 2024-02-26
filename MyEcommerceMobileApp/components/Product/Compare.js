import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardItem from '../Share/CardItem';
import Filter from '../Share/Filter';
import Apis, { endpoints } from '../../configs/Apis';

const Compare = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const [productCompare, setProductCompare] = React.useState(null);
    const { productName, cateId } = route.params;
    const shortenedProductName = productName.substring(0, 5);

    React.useEffect(() => {
        const loadProducts = async () => {
            let url = endpoints["products"];

            if (cateId !== undefined && cateId != null && shortenedProductName !== undefined && shortenedProductName != null)
                url = `${url}?cate_id=${cateId}&q=${shortenedProductName}`;
            try {
                let res = await Apis.get(url);
                setProductCompare(res.data.results);
            } catch (ex) {
                console.error(ex);
            }
        };

        loadProducts();
    }, [productName, cateId]);

    if (productCompare === null) {
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
                    {productCompare.length === 0 ? (
                        <Text>Không có sản phẩm</Text>
                    ) : (
                        productCompare.map((data) => (
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

export default Compare