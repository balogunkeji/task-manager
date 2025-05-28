import {SafeAreaView, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {BackButton} from "@/components/Back";
import {Asset} from "expo-asset";
import {ThemedText} from "@/components/ThemedText";
import {FormInput, mapFormikProps} from "@/components/FormInput";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";
import {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import Notification from "@/components/Notification";
import {useSession} from "@/components/ctx";

const Login = () => {
    const logo = Asset.fromModule(require("../../assets/images/login.png")).uri;
    const router = useRouter();
    const { signIn, session } = useSession();
    const [notif, setNotif] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);
    return(
        <SafeAreaView style={styles.container}>
            <BackButton/>
            <View style={styles.imgContainer}>
                <Image source={{uri: logo}} resizeMode="contain" style={{width: 250, height: 300}}/>
                <ThemedText type={'title'} style={{marginTop: -20}}>Login</ThemedText>
            </View>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email').required('Email is required'),
                    password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
                })}
                onSubmit={async (values) => {
                    try {
                        await signIn(values.email, values.password);
                        setNotif({ message: 'Login successful!', type: 'success' });

                        setTimeout(() => {
                            router.push('/(tabs)/home');
                        }, 1500);
                        console.log(session);
                    } catch (err: any) {
                        setNotif({ message: err.message || 'An error occurred', type: 'error' });
                    }
                }}
            >
                {(formik) => (
                    <View style={styles.formContainer}>
                        <FormInput labelText={'Email'} placeholder={'Enter your email'} {...mapFormikProps('email', formik)}/>
                        <View>
                            <FormInput labelText={'Password'} placeholder={'Enter your password'} {...mapFormikProps('password', formik)}/>
                            <ThemedText type={'defaultTitle'} style={{fontSize: 12, alignSelf: 'flex-end'}}>Forgot password?</ThemedText>
                        </View>
                        <Button text={'Login'} onPress={formik.handleSubmit} color={'#fff'} $maxWidth={'100%'} style={{backgroundColor: 'black'}}/>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <ThemedText type={'default'}>Don't have an account?</ThemedText>
                            <TouchableOpacity onPress={() => router.push("/register")}>
                                <ThemedText type={'defaultSemiBold'}>Register</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
            {notif && (
                <Notification
                    message={notif.message}
                    type={notif.type}
                    onHide={() => setNotif(null)}
                /> as any
            )}

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