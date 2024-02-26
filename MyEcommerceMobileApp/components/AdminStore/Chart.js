import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { authApi, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ChartComponent = ({navigation}) => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [inputMonth, setInputMonth] = useState('');
    const [inputYear, setInputYear] = useState('');
    const [searching, setSearching] = useState(false);
    const [month, setMonth] = useState([]);
    const insets = useSafeAreaInsets();

    const handleSearch = async () => {
        setSearching(true);

        let url = endpoints['stats-revenue-store'];
        let accessToken = await AsyncStorage.getItem('access-token');

        if (inputMonth !== '' && inputYear !== '') {
            url += `?month=${inputMonth}&year=${inputYear}`;
        } else if (inputYear !== '') {
            url += `?year=${inputYear}`;
        } else if (inputMonth !== '') {
            url += `?month=${inputMonth}`;
        }

        try {
            let res = await authApi(accessToken).get(url);
            setData(res.data);
            console.log(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setSearching(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    useEffect(() => {
        if (data !== null) {
            const filteredData = data.filter((d) => d.total_price.month !== null);
            const extractedMonth = filteredData.map((d) => d.total_price.total_price);
            const extractedLabels = filteredData.map((d) => d.total_price.month);
            setLabels(extractedLabels);
            setMonth(extractedMonth);
        }
    }, [data]);

    if (data === null) {
        return <ActivityIndicator />;
    }

    return (
        <ScrollView style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <View className="flex-row items-center bg-white">
                <TouchableOpacity className=" w-10 h-10 ml-3 mt-3 border-2 border-transparent " onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="orange" />
                </TouchableOpacity>
                <Text className="text-xl">Chart</Text>
            </View>
            <View className="justify-center my-2">
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <TextInput
                        value={inputMonth}
                        onChangeText={(text) => setInputMonth(text)}
                        placeholder="Nhập tháng"
                    />
                </View>
                <View className="flex-row border-b-2 border-inherit px-24 py-2">
                    <TextInput
                        value={inputYear}
                        onChangeText={(text) => setInputYear(text)}
                        placeholder="Nhập năm"
                    />
                </View>
                <View className="mt-6 items-center">
                    <TouchableOpacity className="items-center	bg-orange-400 p-4 w-28 h-14" onPress={handleSearch}>
                        <Text>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="items-center">
                {data.length === 0 ? (
                    <Text>Shop chưa có sản phẩm được bán</Text>
                ) : (<BarChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: month,
                            },
                        ],
                    }}
                    width={400}
                    height={400}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        fromZero: true,
                        style: {
                            borderRadius: 16,
                            marginVertical: 8,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        fontSize: 12,
                    }}
                />)}
            </View>

            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.headerCell}>Tháng</Text>
                    <Text style={styles.headerCell}>Tổng tiền</Text>
                </View>

                {/* Rows */}
                {data.map((d, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{d.total_price.month}</Text>
                        <Text style={styles.cell}>{d.total_price.total_price}</Text>
                    </View>
                ))}
            </View>

        </ScrollView>
    );
};

export default ChartComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
    },
    headerCell: {
        flex: 1,
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2',
    },
    cell: {
        flex: 1,
        padding: 10,
    },
});