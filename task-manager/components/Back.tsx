import {Image, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {Asset} from "expo-asset";

export const BackButton = () => {
    const logo = Asset.fromModule(require("../assets/images/back.png")).uri;

    const router = useRouter()
    return(
        <TouchableOpacity onPress={() => router.back()}>
            <Image source={{uri: logo}} resizeMode="contain" style={{width: 32, height: 32}}/>
        </TouchableOpacity>
    )
}