import {SafeAreaView, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import {Asset} from "expo-asset";
import {ThemedText} from "@/components/ThemedText";
import {useState} from "react";
import {useRouter} from "expo-router";

const Home = () => {
    const logo = Asset.fromModule(require("../assets/images/splash-icon.png")).uri;
    const [selected, setSelected] = useState("register");
    const router = useRouter();
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.image}>
                <Image source={{uri: logo}} resizeMode="contain" style={{width: 263, height: 300}}/>
                <ThemedText type={'defaultTitle'}>dompet.</ThemedText>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <ThemedText type={'defaultTitle'}>anytime and</ThemedText>
                    <ThemedText type={'defaultTitle'}>anywhere</ThemedText>
                </View>
                <View>
                    <ThemedText type={'default'} color={'#1D1C1A50'}>Whenever and wherever you need it, dompet is here. Complete actions with a single click.</ThemedText>
                </View>
               <View style={styles.BtnContainer}>
                   <TouchableOpacity style={selected === 'register' ? styles.btn : styles.btn2} onPress={() => {
                       setSelected("register");
                       router.push("/register");
                   }}>
                       <ThemedText type={'defaultSemiBold'} color={'#fff'}>Register</ThemedText>
                   </TouchableOpacity>
                   <TouchableOpacity style={selected === 'login' ? styles.btn : styles.btn2} onPress={() => {
                       setSelected("login");
                       router.push("/login");
                   }}>
                       <ThemedText type={'defaultSemiBold'} color={'#fff'}>Sign In</ThemedText>
                   </TouchableOpacity>
               </View>
            </View>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    image: {
        marginTop: '30%',
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 26,
        gap: 15,
        marginBottom: '10%',
    },
    BtnContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 50,
        borderRadius: 15,
        backgroundColor: "#4A4A4A",
        marginTop: 20,
        flexDirection: "row",
        // gap: 20
    },
    btn:{
        flex: 1,
        height: 50,
        borderRadius: 15,
        backgroundColor: "#1D1C1A",
        justifyContent: "center",
        alignItems: "center",
    },
    btn2:{
        flex: 1,
        alignItems: "center",
    }
})