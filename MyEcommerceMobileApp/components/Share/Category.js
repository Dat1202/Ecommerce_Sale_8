import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Apis, { endpoints } from '../../configs/Apis';

const Cate = ({ navigation }) => {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadCategories = async () => {
      let url = endpoints["categories"];

      try {
        let res = await Apis.get(url);
        setCategories(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    navigation.navigate('Home', { "cateId": category.id });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => handleCategoryPress('All')}
        style={[
          styles.categoryButton,
          selectedCategory === 'All' && styles.selectedCategoryButton,
        ]}
      >
        <Text
          style={[
            styles.categoryButtonText,
            selectedCategory === 'All' && styles.selectedCategoryText,
          ]}
        >
          Tất cả
        </Text>
      </TouchableOpacity>
      {categories === null ? (
        <ActivityIndicator />
      ) : (
        categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default Cate;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
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