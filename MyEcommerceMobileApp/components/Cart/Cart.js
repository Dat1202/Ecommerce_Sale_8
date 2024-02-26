import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native'; import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItem from './CartItem';

const Cart = () => {
    return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    // backgroundColor: COLOURS.white,
                    position: 'relative',
                }}>
                <ScrollView>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingTop: 16,
                            paddingHorizontal: 16,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left"
                                style={{
                                    fontSize: 18,
                                    // color: COLOURS.backgroundDark,
                                    padding: 12,
                                    // backgroundColor: COLOURS.backgroundLight,
                                    borderRadius: 12,
                                }}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 14,
                                // color: COLOURS.black,
                                fontWeight: '400',
                            }}>
                            Order Details
                        </Text>
                        <View></View>
                    </View>
                    <Text
                        style={{
                            fontSize: 20,
                            // color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            paddingTop: 20,
                            paddingLeft: 16,
                            marginBottom: 10,
                        }}>
                        My Cart
                    </Text>
                    <View style={{ paddingHorizontal: 16 }}>
                        <CartItem />
                    </View>
                    <View>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                marginVertical: 10,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    // color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    marginBottom: 20,
                                }}>
                                Delivery Location
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        width: '80%',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            // color: COLOURS.blue,
                                            // backgroundColor: COLOURS.backgroundLight,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 12,
                                            borderRadius: 10,
                                            marginRight: 18,
                                        }}>
                                        <MaterialCommunityIcons
                                            name="truck-delivery-outline"
                                            style={{
                                                fontSize: 18,
                                                // color: COLOURS.blue,
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                // color: COLOURS.black,
                                                fontWeight: '500',
                                            }}>
                                            2 Petre Melikishvili St.
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // color: COLOURS.black,
                                                fontWeight: '400',
                                                lineHeight: 20,
                                                opacity: 0.5,
                                            }}>
                                            0162, Tbilisi
                                        </Text>
                                    </View>
                                </View>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                // style={{ fontSize: 22, color: COLOURS.black }}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                marginVertical: 10,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    // color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    marginBottom: 20,
                                }}>
                                Payment Method
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        width: '80%',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            // color: COLOURS.blue,
                                            // backgroundColor: COLOURS.backgroundLight,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 12,
                                            borderRadius: 10,
                                            marginRight: 18,
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                fontWeight: '900',
                                                // color: COLOURS.blue,
                                                letterSpacing: 1,
                                            }}>
                                            VISA
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                // color: COLOURS.black,
                                                fontWeight: '500',
                                            }}>
                                            Visa Classic
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // color: COLOURS.black,
                                                fontWeight: '400',
                                                lineHeight: 20,
                                                opacity: 0.5,
                                            }}>
                                            ****-9092
                                        </Text>
                                    </View>
                                </View>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                // style={{ fontSize: 22, color: COLOURS.black }}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                marginTop: 40,
                                marginBottom: 80,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    // color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    marginBottom: 20,
                                }}>
                                Order Info
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 8,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '400',
                                        maxWidth: '80%',
                                        // color: COLOURS.black,
                                        opacity: 0.5,
                                    }}>
                                    Subtotal
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '400',
                                        // color: COLOURS.black,
                                        opacity: 0.8,
                                    }}>
                                    &#8377; total
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
    )
}

export default Cart