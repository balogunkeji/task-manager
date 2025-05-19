import {SafeAreaView, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {BackButton} from "@/components/Back";
import {Asset} from "expo-asset";
import {ThemedText} from "@/components/ThemedText";
import {FormInput} from "@/components/FormInput";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";

const Login = () => {
    const logo = Asset.fromModule(require("../../assets/images/login.png")).uri;
    const router = useRouter();
    return(
        <SafeAreaView style={styles.container}>
            <BackButton/>
            <View style={styles.imgContainer}>
                <Image source={{uri: logo}} resizeMode="contain" style={{width: 250, height: 300}}/>
                <ThemedText type={'title'} style={{marginTop: -20}}>Login</ThemedText>
            </View>
            <View style={styles.formContainer}>
                <FormInput labelText={'Email'} placeholder={'Enter your email'} />
                <View>
                    <FormInput labelText={'Email'} placeholder={'Enter your email'} />
                    <ThemedText type={'defaultTitle'} style={{fontSize: 12, alignSelf: 'flex-end'}}>Forgot password?</ThemedText>
                </View>
                <Button text={'Login'} onPress={() => console.log('Login')} color={'#fff'} $maxWidth={'100%'} style={{backgroundColor: 'black'}}/>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <ThemedText type={'default'}>Don't have an account?</ThemedText>
                    <TouchableOpacity onPress={() => router.push("/register")}>
                        <ThemedText type={'defaultSemiBold'}>Register</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
    },
    imgContainer: {
        width: '100%',
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        gap: 20,
    },
})