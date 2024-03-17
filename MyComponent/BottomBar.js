import { React, useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TextInput, Button, FlatList, Image, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import ToastExample from '../ToastExample';


const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const data = [
        { id: "1", uri: require("../img/1.png"), aspectRatio: 4 / 3 },
        { id: "2", uri: require("../img/2.png"), aspectRatio: 3 / 2 },
        { id: "3", uri: require("../img/3.png"), aspectRatio: 16 / 9 },
        { id: "4", uri: require("../img/4.png"), aspectRatio: 3 / 4 },
        { id: "5", uri: require("../img/5.png"), aspectRatio: 4 / 5 },
    ];

    const renderItem = ({ item }) => (
        <Image
            source={item.uri}
            style={{
                width: 150,
                aspectRatio: item.aspectRatio,
            }}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </View>
    )
}

const SettingsScreen = ({ route }) => {
    const { searchText } = route.params || {};

    const [deviceInfo, setDeviceInfo] = useState(null);

    useEffect(() => {
        const getDeviceInfo = async () => {
            try {
                const brand = DeviceInfo.getBrand();
                const model = DeviceInfo.getModel();
                const systemName = DeviceInfo.getSystemName();
                const systemVersion = DeviceInfo.getSystemVersion();

                setDeviceInfo({
                    brand,
                    model,
                    systemName,
                    systemVersion,
                });
            } catch (error) {
                console.error("Error fetching device info:", error);
            }
        };

        getDeviceInfo();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Brand: {deviceInfo?.brand}</Text>
            <Text>Model: {deviceInfo?.model}</Text>
            <Text>System Name: {deviceInfo?.systemName}</Text>
            <Text>System Version: {deviceInfo?.systemVersion}</Text>
            <Text>Input: {searchText}</Text>
        </View>
    );
};

const SearchScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        ToastExample.show(searchText, ToastExample.LONG);
        navigation.navigate('Settings', { searchText: searchText });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="搜索..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <Button
                title="搜索"
                onPress={handleSearch}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
})

export default function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="paper-plane-sharp" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                onPress={() => { }}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="build-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
