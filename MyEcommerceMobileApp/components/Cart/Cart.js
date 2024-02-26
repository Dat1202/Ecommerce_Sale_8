import { useContext, useEffect, useState } from "react";
import MyContext from "../../configs/MyContext";
import MyCartContext from "../../configs/MyCartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CartItem from "./CartItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/Apis";

const Cart = ({navigation}) => {
    const [user, ] = useContext(MyContext);
    const [, cartDispatch] = useContext(MyCartContext);
    const [carts, setCarts] = useState(null);
    const deepEqual = require('deep-equal');

    useEffect(() => {
        console.log("reload!")
        let isSameObj = (obj1, obj2) => {
            for(let item in obj1 ){
                try {
                    if (deepEqual(obj1[item], obj2[item], {strict: true}))
                        continue;
                    return false
                } catch {
                    return false
                }
            }
            return true
        }
        let loadCart = async () => {
            console.log("Reload!!!")
            try {
                let cartAsync = await AsyncStorage.getItem('cart')
                const new_cart = JSON.parse(cartAsync)
                console.log(isSameObj(new_cart, carts))
                if(!deepEqual(new_cart, carts, {strict: true}) || !isSameObj(new_cart, carts))
                    setCarts(new_cart)
                console.log(carts)
            } catch (ex) {
                console.log("Cart kh lay dc ")
                console.log(ex)
            }
        }
        loadCart();
    }, [carts])

    const updateItem = async () => {
        // cookie.save("cart", carts);
        AsyncStorage.setItem('cart', JSON.stringify(carts))

        cartDispatch({
            "type": "update",
            "payload": Object.values(carts).reduce((init, current) => init + current["quantity"], 0)
        })
    }

    const increQuantity = async (id) => {
        let new_cart = JSON.parse(JSON.stringify(carts))
        new_cart[id]["quantity"] += 1
        await AsyncStorage.setItem('cart', JSON.stringify(new_cart))
        setCarts({...carts, [id]: {...carts[id], "quantity": carts[id]["quantity"] += 1}})
    }
    const decreQuantity = async (id) => {
        let new_cart = JSON.parse(JSON.stringify(carts))
        new_cart[id]["quantity"] -= 1
        await AsyncStorage.setItem('cart', JSON.stringify(new_cart))
        setCarts({...carts, [id]: {...carts[id], "quantity": carts[id]["quantity"] -= 1}})
    }

    const deleteItem = async (item) => {
        console.log(item.product)
        if (item.product in carts) {
            // cartDispatch({
            //     "type": "dec",
            //     "payload": item.quantity
            // });
            let new_cart = JSON.parse(JSON.stringify(carts));
            delete new_cart[item.product];
            delete carts[item.product]
            await AsyncStorage.setItem('cart', JSON.stringify(carts))
            setCarts(new_cart);
        }
        await AsyncStorage.setItem('cart', JSON.stringify(carts))
    }

    const pay = () => {
        const process = async () => {
            data = []
            for (let item in carts) {
                console.log(item)
                data.push(carts[item])
            }
            console.log(data)
            let access_token = AsyncStorage.getItem('access-token')
            let res = await authApi(access_token).post(endpoints['pay'], data);
            if (res.status === 200) {
                // cookie.remove("cart");
                await AsyncStorage.removeItem('cart')
                setCarts([]);
                cartDispatch({
                    "type": "update",
                    "payload": 0
                });
            }
        }

        process();
    }

    if (carts === null)
        return <Text>Không có sản phẩm trong giỏ!</Text>

    if (carts.length === 0)
        return <Text>Thanh toán thành công!</Text>



    return (
            <View style={{width: '100%', height: '100%', position: 'relative',
                    // backgroundColor: COLOURS.white,
                }}>
                <ScrollView>
                    <View style={{ width: '100%', flexDirection: 'row', paddingTop: 16, paddingHorizontal: 16, justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="chevron-left" style={{ fontSize: 18, padding: 12, borderRadius: 12,
                                    // backgroundColor: COLOURS.backgroundLight, color: COLOURS.backgroundDark,
                                }}/>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight: '400',
                                // color: COLOURS.black,
                            }}> Order Details
                        </Text>
                        <View></View>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: '500', letterSpacing: 1, paddingTop: 20, paddingLeft: 16, marginBottom: 10,
                            // color: COLOURS.black,
                        }}> My Cart
                    </Text>
                    {Object.values(carts).map(p => {
                            return <>
                            {/* <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.unitPrice} VNĐ</td>
                            <td>
                                <Form.Control type="number" value={carts[p.id]["quantity"]} onBlur={updateItem} 
                                    onChange={e => setCarts({...carts, [p.id]: {...carts[p.id], "quantity": parseInt(e.target.value)}})} />
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => deleteItem(p)}>&times;</Button>
                            </td>
                            </tr> */}

                            <View style={{ paddingHorizontal: 16 }} >
                                <CartItem key={p.id} product={p} incre={(id)=>increQuantity(id)} decre={(id)=>decreQuantity(id)} deletee={(p) => deleteItem(p)}/>
                            </View>
                            </>
                        })}

                    <View>
                        <View style={{ paddingHorizontal: 16, marginVertical: 10, }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', letterSpacing: 1, marginBottom: 20,
                                    // color: COLOURS.black,
                                }}> Delivery Location
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, marginRight: 18,
                                        // color: COLOURS.blue, backgroundColor: COLOURS.backgroundLight,
                                        }}>
                                        <MaterialCommunityIcons name="truck-delivery-outline" style={{ fontSize: 18,
                                                // color: COLOURS.blue,
                                            }}/>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500',
                                                // color: COLOURS.black,
                                            }}> 2 Petre Melikishvili St.
                                        </Text>
                                        <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 20, opacity: 0.5,
                                                // color: COLOURS.black,
                                            }}>0162, Tbilisi
                                        </Text>
                                    </View>
                                </View>
                                <MaterialCommunityIcons name="chevron-right" // style={{ fontSize: 22, color: COLOURS.black }}
                                />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 16,  marginVertical: 10, }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', letterSpacing: 1, marginBottom: 20,
                                    // color: COLOURS.black,
                                }}> Payment Method
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, marginRight: 18,
                                        // color: COLOURS.blue, backgroundColor: COLOURS.backgroundLight,
                                        }}>
                                        <Text style={{ fontSize: 10, fontWeight: '900', letterSpacing: 1,
                                                // color: COLOURS.blue,
                                            }}> VISA
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500',
                                                // color: COLOURS.black,
                                            }}> Visa Classic
                                        </Text>
                                        <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 20, opacity: 0.5,
                                                // color: COLOURS.black,
                                            }}> ****-9092
                                        </Text>
                                    </View>
                                </View>
                                <MaterialCommunityIcons name="chevron-right"
                                // style={{ fontSize: 22, color: COLOURS.black }}
                                />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 16, marginTop: 40, marginBottom: 80, }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', letterSpacing: 1, marginBottom: 20,
                                    // color: COLOURS.black,
                                }}> Order Info
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, }}>
                                <Text style={{ fontSize: 12, fontWeight: '400', maxWidth: '80%', opacity: 0.5,
                                        // color: COLOURS.black,
                                    }}> Subtotal
                                </Text>
                                <Text style={{ fontSize: 12, fontWeight: '400', opacity: 0.8,
                                        // color: COLOURS.black,
                                    }}> &#8377; total
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className="bg-white p-4 flex-row justify-between	">
                        <View>
                        <TouchableOpacity className="border-2	border-red-600 p-1 " style={styles.viewShopButton} onPress={pay}>
                            <Text className="text-red-500	">Thanh toán </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 300,
    },
    viewShopButton: {
      marginTop: 16,
    },
  });