import { useContext, useEffect, useState } from "react";
import MyContext from "../../configs/MyContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from 'expo-image-picker'
import Apis, { authApi, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostProduct = ({id, navigation}) => {
    const insets = useSafeAreaInsets();
    const [user, dispatch] = useContext(MyContext)
    const [categories, setCategories] = useState({})
    const [product, setproduct] = useState({
        "name": "",
        "price": "",
        "image": "",
        "description": "",
        "quantity": "",
        "category": "",
    })
    let buttonText = "Them"

    if(id !== undefined) {
        const getProduct = async (id) => {
            data = await Apis.get(id)
            setProduct([...data])
        }
        getProduct(id)
        buttonText = "Sua"
    }
    
    useEffect(() => {
        const loadCategories = async () => {
          let url = endpoints["categories"];
    
          try {
            let res = await Apis.get(url);
            console.log("HEELLLOO")
            console.log(res.data)
            setCategories(res.data);
          } catch (ex) {
            console.error(ex);
          }
        };
    
        loadCategories();
      }, []);


    const addOrUpdateProduct = async () => {
        let form = new FormData()
        for (let key in product) {
            if (key === "image") {
                form.append(key, {
                    uri: product[key].uri,
                    name: product[key].fileName,
                    type: "image/jpeg"
                })
            }
            else
                form.append(key, product[key])
        }

        try {
            // if (action === "Add") {
                console.log(form)
                let res = await Apis.post(endpoints['products'], form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            'Authorization': `Bearer GYUkTCF2fuDsiwSNAQXlWo9h1mGQz2`
                        }
                    }
                )
            console.error(res.data)
            // } else {
            //     let res = await Apis.put(endpoints['product-details'], form,
            //         {
            //             headers: {
            //                 "Content-Type": "multipart/form-data"
            //             }
            //         }
            //     )
            // console.error(res.data)
            // }
            navigation.navigate('Store', { storeId: user.store });
        } catch (ex) {
            console.error(ex)
        }
    }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted')
            alert("Permission Denied!!!")
        else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                change('image', res.assets[0])
            }
        }
    }

    const change = (field, value) => {
        setproduct(current => {
            return { ...current, [field]: value }
        })
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            flex: 1
        }} className="bg-slate-100">
            <View className="flex-row items-center bg-white">
                <TouchableOpacity className=" w-10 h-10 ml-3 mt-3 border-2 border-transparent " onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="orange" />
                </TouchableOpacity>
                <Text className="text-xl">Create Store</Text>
            </View>

            <View className="justify-center	mt-20 ">
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="product" size={24} color="black" />
                    <TextInput value={product.name} onChangeText={(t) => change("name", t)}
                        className="ml-4"
                        placeholder="Nhập tên SP">
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="product" size={24} color="black" />
                    <TextInput value={product.price} onChangeText={(t) => change("price", t)}
                        className="ml-4" inputMode="decimal"
                        placeholder="Nhập giá" >
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="product" size={24} color="black" />
                    <TextInput value={product.description} textAlignVertical="top" onChangeText={(t) => change("description", t)}
                        className="ml-4"
                        placeholder="Nhập mô tả">
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="product" size={24} color="black" />
                    <TextInput value={product.quantity}  onChangeText={(t) => change("quantity", t)}
                        className="ml-4" inputMode="numeric"
                        placeholder="Nhập số lượng">
                    </TextInput>
                </View>
                <SelectDropdown
                    data={categories}
                    onSelect={(selectedItem, index) => {
                        change('category', selectedItem.id)
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem.name
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item.name
                    }}
                />

                <View className="">
                    <TouchableOpacity style={{
                        backgroundColor: '#F8F8F8',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 5,
                    }}
                        onPress={picker}>
                        <Text>Chọn hình sp...</Text>
                    </TouchableOpacity>
                </View>
                {product.image ? <Image style={{ width: 100, height: 100 }} source={{ uri: product.image.uri }} /> : ""}

                <View className="mt-6 items-center">
                    <TouchableOpacity className="items-center bg-orange-400 p-4 w-36 h-14" onPress={addOrUpdateProduct}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PostProduct;