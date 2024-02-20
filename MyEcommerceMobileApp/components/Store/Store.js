import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { Ionicons } from '@expo/vector-icons';
import SearchComponent from '../Share/Search';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import Category from './Category';
import CardItem from '../Share/CardItem';
import Filter from '../Share/Filter';
import Review from './Review';

const Store = ({ route, navigation }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('Sản phẩm');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [productStore, setProductStore] = React.useState(null);
  const [categoryStore, setCategoryStore] = React.useState(null);
  const [store, setStore] = React.useState(null);
  const insets = useSafeAreaInsets();
  const data = ['Sản phẩm', 'Danh mục', 'Review'];
  const { storeId, sortBy, order } = route.params;

  React.useEffect(() => {
    const loadStore = async () => {
      try {
        const res = await Apis.get(endpoints['store'](storeId));
        setStore(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    const loadCateStore = async () => {
      try {
        const res = await Apis.get(endpoints['category-store'](storeId));
        setCategoryStore(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    const loadProductStore = async () => {
      let url = endpoints["products-store"](storeId);

      if (order !== undefined && order !== null && searchQuery !== undefined && searchQuery !== null)
        url = `${url}?order=${order}&q=${searchQuery}`;
      else if (sortBy !== undefined && sortBy !== null && searchQuery !== undefined && searchQuery !== null)
        url = `${url}?sortBy=${sortBy}&q=${searchQuery}`;
      else if (order !== undefined && order !== null)
        url = `${url}?order=${order}`
      else if (sortBy !== undefined && sortBy !== null)
        url += `sortBy=${sortBy}`;
      else if (searchQuery !== undefined && searchQuery !== null) {
        url += `?q=${searchQuery}`;
      }

      try {
        const res = await Apis.get(url);
        setProductStore(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProductStore()
    loadCateStore()
    loadStore();

  }, [sortBy, order, searchQuery]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSearch = (searchText) => {
    setSearchQuery(searchText);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      {store === null ? <ActivityIndicator /> :
        <ScrollView style={styles.container} className="bg-slate-100">
          <View className="bg-white pt-1">
            <View className="flex-row	items-center ">
              <TouchableOpacity className="ml-2 border-2 border-transparent rounded-full bg-gray-400" onPress={handleGoBack}>
                <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <SearchComponent onSearch={handleSearch} navigation={navigation} />
              </View>
            </View>

            <View className="flex-row items-center mt-2 p-4">
              <Image
                source={{ uri: 'https://res.cloudinary.com/dy4p98hhs/image/upload/v1705723922/i01x5nw5i5ine1lvtwms.jpg' }}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'cover',
                  borderRadius: 50,
                }}
              />
              <View className="ml-2">
                <View className="ml-2">
                  <Text className="font-medium text-xl">{store.name}</Text>
                </View>
                <Text>
                  <Entypo name="star" size={20} color="#e3ec13" /> 4.6  Đã bán 250
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.container1}
              style={{}}
            >
              {data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCategoryPress(item)}
                  style={[
                    styles.categoryButton,
                    selectedCategory === item && styles.selectedCategoryButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === item && styles.selectedCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {selectedCategory === 'Sản phẩm' && (
            <>
              <Filter route={route} />

              <View className="flex-wrap flex-row justify-between	" style={{
                backgroundColor: '#E6E6E6',
                width: '100%',
              }}>
                {productStore === null ? (
                  <ActivityIndicator />
                ) : productStore.length === 0 ? (
                  <View style={{ flex: 1 }}>
                    <Text className="text-center p-2" >
                      Không có sản phẩm
                    </Text>
                  </View>
                ) : (
                  productStore.map((data) => (
                    <View key={data.id}>
                      <CardItem navigation={navigation} data={data} />
                    </View>
                  ))
                )}
              </View>
            </>)}

          {selectedCategory === 'Danh mục' && (
            <ScrollView style={styles.storeInfoContainer}>
              {categoryStore === null ? (
                <ActivityIndicator />
              ) : (
                categoryStore.map((category) => (
                  <Category key={category.id} category={category} storeId={storeId} navigation={navigation} />
                ))
              )}
            </ScrollView>
          )}

          {selectedCategory === 'Review' && (
            <ScrollView>
              <Review route={route} navigation={navigation} />
            </ScrollView>
          )}

        </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: '100%',
    justifyContent: "space-around"
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedCategoryButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#fd5c32',
  },
  selectedCategoryText: {
    color: "#fd5c32",
  }
});
export default Store;