import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

const HomeScreen = ({ navigation }) => {
    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>HomeScreen</Text>
            <Button title="跳转到新闻页面" onPress={() => navigation.navigate("News")} />
        </View>
    )
}

const NewsScreen = ({ navigation }) => {
    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>NewsScreen</Text>
            <Button title="跳转到主页面" onPress={() => navigation.navigate("Home")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "red",
        fontSize: 40
    }
})

export default function NavigatorList() {
    return (
        <Stack.Navigator initialRouteName="News">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}