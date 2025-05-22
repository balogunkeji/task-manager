import {SafeAreaView, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import {Asset} from "expo-asset";
import {ThemedText} from "@/components/ThemedText";
import {useState} from "react";
import {useRouter} from "expo-router";
import {ArrowRotateRight} from "iconsax-react-nativejs";

const HomeScreen = () => {
    const logo = Asset.fromModule(require("../../assets/images/icon.png")).uri;
    const [selected, setSelected] = useState("register");
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    return(
        <SafeAreaView style={styles.container}>
           <TouchableOpacity onPress={() => {setIsOpen(!isOpen)}}>
               <ArrowRotateRight/>
           </TouchableOpacity>
           <View style={styles.image}>
               <ThemedText type={'defaultTitle'}>Tomisin</ThemedText>
           </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
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