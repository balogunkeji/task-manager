import {Image, TouchableOpacity} from "react-native";
// import {useRouter} from "expo-router";
import {Asset} from "expo-asset";
import {useNavigation} from "expo-router";

export const BackButton = () => {
    const logo = Asset.fromModule(require("../assets/images/back.png")).uri;

    const navigation = useNavigation();    return(
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={{uri: logo}} resizeMode="contain" style={{width: 32, height: 32}}/>
        </TouchableOpacity>
    )
}