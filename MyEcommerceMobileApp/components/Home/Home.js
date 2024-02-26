import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Apis, { endpoints } from '../../configs/Apis';
import CardItem from '../Share/CardItem';
import SearchComponent from '../Share/Search';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cate from '../Share/Category';
import ProductDetails from '../Product/ProductDetails';

const Home = ({ navigation, route }) => {
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const cateId = route.params?.cateId;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadProducts = async () => {
      let url = endpoints["products"];

      if (cateId !== undefined && cateId != null && searchQuery !== undefined && searchQuery != null)
        url = `${url}?cate_id=${cateId}&q=${searchQuery}`;
      else if (cateId !== undefined && cateId != null)
        url = `${url}?cate_id=${cateId}`;
      else if (searchQuery !== undefined && searchQuery != null) {
        url += `?q=${searchQuery}`;
      }

      try {
        let res = await Apis.get(url);
        setProducts(res.data.results);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadProducts();
  }, [searchQuery, cateId]);

  const handleSearch = (searchText) => {
    setSearchQuery(searchText);
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <SearchComponent onSearch={handleSearch} navigation={navigation} />
      {/* <TouchableOpacity style={styles.messageButton} onPress={handleSearch}>
        <AntDesign name="message1" size={24} color="white" />
      </TouchableOpacity> */}
      <Cate navigation={navigation} />
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingTop: 10,
          backgroundColor: '#E6E6E6',
          width: '100%',
        }}
      >
        {products === null ? (
          <ActivityIndicator />
        ) : products.length === 0 ? (
          <View style={{ flex: 1 }}>
            <Text className="text-center p-2" >
              Không có sản phẩm
            </Text>
          </View>
        ) : (
          products.map((data) => (
              <View key={data.id}>
                <CardItem navigation={navigation} data={data} />
              </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  messageButton: {
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 8,
    // marginLeft: 10,
    marginRight: 10,
  }
})