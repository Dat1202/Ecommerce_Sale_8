import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Filter = ({ route }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('Mới nhất');
  const { storeId, cateId } = route.params;
  const navigation = useNavigation();

  const data = ['Mới nhất', 'Giá giảm dần', 'Giá tăng dần'];

  const handleCategoryPress = (item) => {
    setSelectedCategory(item);

    if (item === 'Mới nhất') {
      navigation.setParams({q: '', sort_by: 'sort', order: '', storeId: storeId, cateId: cateId });
    } else if (item === 'Giá giảm dần') {
      navigation.setParams({ q: '', sort_by: '', order: 'desc', storeId: storeId, cateId: cateId });
    } else if (item === 'Giá tăng dần') {
      navigation.setParams({ q: '', sort_by: '', order: 'asc', storeId: storeId, cateId: cateId });
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.container1,
      ]}
    >
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategoryPress(item)}
          style={[
            styles.categoryButton,
            selectedCategory === item
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
  );
};

export default Filter;

const styles = StyleSheet.create({
  container1: {
    justifyContent: 'space-around',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 26,
    marginHorizontal: 5,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    color: "#fd5c32",
  }
});