import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { Ionicons } from '@expo/vector-icons';
import SearchComponent from '../Share/Search';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import Category from './Category';
import CardItem from '../Share/CardItem';
import Filter from '../Share/Filter';
import Review from './Review';
import MyContext from '../../configs/MyContext';
import { useIsFocused } from '@react-navigation/native';

const Store = ({ route, navigation }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('Sản phẩm');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [productStore, setProductStore] = React.useState(null);
  const [categoryStore, setCategoryStore] = React.useState(null);
  const [store, setStore] = React.useState(null);
  const insets = useSafeAreaInsets();
  const data = ['Sản phẩm', 'Danh mục', 'Review'];
  const { storeId, sortBy, order } = route.params;
  const [user, dispatch] = useContext(MyContext)
  const [storeAvgStar, setStoreAvgStar] = React.useState(null);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const loadStore = async () => {
      try {
        const res = await Apis.get(endpoints['store'](storeId));
        setStore(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    const loadStoreAvgStar = async () => {
      try {
        const res = await Apis.get(endpoints['get-avg-star'](storeId));
        setStoreAvgStar(res.data);
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

    loadProductStore();
    loadCateStore();
    loadStore();
    loadStoreAvgStar();
  }, [sortBy, order, searchQuery, navigation.isFocused()]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSearch = (searchText) => {
    setSearchQuery(searchText);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = 'res.cloudinary.com/dy4p98hhs/';
    return `https://${cloudinaryDomain}/${publicId}`;
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
                source={{ uri: addCloudinaryDomain(store.user.avatar) }}
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
                  <Entypo name="star" size={20} color="#e3ec13" />
                  {storeAvgStar === null || storeAvgStar === undefined || storeAvgStar[0] === null || storeAvgStar[0] === undefined
                    ? <Text>0</Text>
                    : (
                      <Text>Đã bán {storeAvgStar[0].avg_star}</Text>
                    )}
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
              {user !== null && store.user.id === user.id?<>      
                <View className="bg-white p-4 flex-row justify-between	">
                  <View>
                    <TouchableOpacity className="border-2	border-red-600 p-1 " style={styles.viewShopButton} onPress={()=>{navigation.navigate('PostProduct')}}>
                      <Text className="text-red-500	">Add Product </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>:<></>}
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