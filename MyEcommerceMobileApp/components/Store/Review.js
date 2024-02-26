import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native'
import React from 'react'
import Apis, { authApi, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterReview from './FilterReivew';
import moment from 'moment';
import 'moment/locale/vi';
import MyContext from "../../configs/MyContext";
import { useContext } from "react";

const Review = ({ route, navigation }) => {
    const [rating, setRating] = React.useState(5);
    const { storeId, star } = route.params;
    const [reviews, setReview] = React.useState("");
    const [note, setNote] = React.useState("");
    const [user, dispatch] = useContext(MyContext)

    React.useEffect(() => {
        const loadReview = async () => {
            let url = endpoints['reviews'](storeId);

            if (star !== undefined && star !== null) {
                url += `?star=${star}`;
            }

            try {
                const res = await Apis.get(url);
                setReview(res.data);
            } catch (error) {
                console.error(error);
            }

        };

        loadReview();
    }, [star]);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = 'res.cloudinary.com/dy4p98hhs/';
        return `https://${cloudinaryDomain}/${publicId}`;
    };

    const addReview = async () => {
        try {
            let accessToken = await AsyncStorage.getItem("access-token")
            const res = await authApi(accessToken).post(endpoints["add-reviews"](storeId), {
                "note": note,
                "star": rating,
            });
            setNote("");
            setRating(5);
            setReview([res.data, ...reviews]);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            {user === null ? (
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text>Đăng nhập để đánh giá</Text>
                </TouchableOpacity>
            ) : (
                <View>
                    <View className="flex-row justify-center ">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Text
                                className="text-4xl px-4 "
                                key={value}
                                value={value}
                                onPress={() => handleRatingClick(value)}
                                style={{
                                    color: value <= rating ? 'gold' : 'black',
                                }}
                            >
                                ★
                            </Text>
                        ))}
                    </View>
                    <View className="p-1">
                        <TextInput value={note} onChangeText={(t) => setNote(t)}
                            className="border-2	border-slate-300 p-4"
                            placeholder="Nhập văn bản">
                        </TextInput>

                        <TouchableOpacity className="my-2 " style={{ width: 100, }} onPress={addReview}>
                            <Text className="bg-orange-400 p-4 ">Đánh giá</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <FilterReview route={route} />

            <View>
                {reviews.length === 0 ? (
                    <Text className="text-center text-red-500 p-4 text-2xl">Chưa có đánh giá</Text>
                ) : (
                    reviews.map((r) => (
                        <View className="border-b-2 pr-4 mr-2" >
                            <View key={r.id} className="flex-row p-4">
                                <Image
                                    source={{ uri: addCloudinaryDomain(r.user.avatar) }}
                                    style={{
                                        width: 50, height: 50, borderRadius: 150, resizeMode: 'cover',
                                    }}
                                />
                                <View className="ml-2">
                                    <Text className="ms-4">{r.user.username}</Text>
                                    <View className="flex-row">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Text class=""
                                                key={index}
                                                style={{ color: index < r.star ? 'gold' : 'black' }}
                                            >
                                                ★
                                            </Text>
                                        ))}
                                    </View>
                                    <Text locale="vi" className="ms-4">{moment(r.created_date).locale('vi').fromNow()}</Text>
                                    <Text className="text-base">{r.note}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </View>
    )
}

export default Review