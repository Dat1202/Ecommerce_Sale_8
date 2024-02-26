import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import CardItem from '../Share/CardItem';
import Apis, { endpoints } from '../../configs/Apis';

const Test = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [products, setProducts] = useState(null);

    React.useEffect(() => {
        const loadProducts = async () => {
            let url = endpoints["products"];

            try {
                let res = await Apis.get(url);
                setProducts(res.data.results);
            } catch (ex) {
                console.error(ex);
            }
        };
        loadProducts();
    }, []);

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        const currentPosition = contentOffset.y;
        setScrollPosition(currentPosition);
    };

    return (
        <View>
            <FlatList
                data={products}
                renderItem={CardItem}
                keyExtractor={(item) => item.id.toString()}
                onScroll={handleScroll}
            />
            <Text>Scroll position: {scrollPosition}</Text>
        </View>
    );
};

export default Test;