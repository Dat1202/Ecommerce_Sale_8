import { useContext } from "react";
import MyContext from "../../configs/MyContext";

const PostProduct = () => {
    const insets = useSafeAreaInsets();
    const [user, dispatch] = useContext(MyContext)

    const [product, setproduct] = useState({
        "name": "",
        "price": "",
        "image": "",
        "description": "",
        "quantity": "",
        "category": "",
        "store": user.id
    })

    const addOrUpdateProduct = async () => {
        let form = new FormData()
        for (let key in product) {
            if (key === "image") {
                form.append(key, {
                    uri: user[key].uri,
                    name: user[key].fileName,
                    type: "image/jpeg"
                })
            }
            else
                form.append(key, user[key])
        }

        try {
            if (action === "Add") {
                let res = await Apis.post(endpoints['products'], form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )
            console.error(res.data)
            } else {
                let res = await Apis.put(endpoints['product-details'], form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )
            console.error(res.data)
            }
            navigation.navigate("Login")
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
                        className="ml-4"
                        placeholder="Nhập giá" >
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="product" size={24} color="black" />
                    <TextInput value={product.description} onChangeText={(t) => change("description", t)}
                        className="ml-4"
                        placeholder="Nhập mô tả">
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="product" size={24} color="black" />
                    <TextInput value={product.quantity} onChangeText={(t) => change("quantity", t)}
                        className="ml-4"
                        placeholder="Nhập số lượng">
                    </TextInput>
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <AntDesign name="product" size={24} color="black" />
                    <TextInput value={product.category} onChangeText={(t) => change("category", t)}
                        className="ml-4"
                        placeholder="Chọn Cate">
                    </TextInput>
                </View>


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
                {user.image ? <Image style={{ width: 100, height: 100 }} source={{ uri: user.image.uri }} /> : ""}

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