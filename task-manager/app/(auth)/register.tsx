import {SafeAreaView, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {BackButton} from "@/components/Back";
import {Asset} from "expo-asset";
import Notification from "@/components/Notification";
import {ThemedText} from "@/components/ThemedText";
import {FormInput, mapFormikProps} from "@/components/FormInput";
import {Button} from "@/components/Button";
import {useRouter} from "expo-router";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useState} from "react";

const Login = () => {
    const logo = Asset.fromModule(require("../../assets/images/login.png")).uri;
    const router = useRouter();
    const [notif, setNotif] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);

    return(
        <SafeAreaView style={styles.container}>
            <BackButton/>
            <View style={styles.imgContainer}>
                <Image source={{uri: logo}} resizeMode="contain" style={{width: 250, height: 300}}/>
                <ThemedText type={'title'} style={{marginTop: -20}}>Register</ThemedText>
            </View>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email').required('Email is required'),
                    password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
                })}
                onSubmit={async (values) => {
                    try {
                        const res = await axios.post(
                            'https://express-js-1z8q.onrender.com/users/signup',
                            {
                                email: values.email,
                                password: values.password,
                            },
                            { headers: { 'Content-Type': 'application/json' } }
                        );

                        setNotif({ message: 'Registration successful!', type: 'success' });
                        setTimeout(() => {
                            router.push('/login');
                        }, 2000);

                        console.log(res.data);
                    } catch (err: any) {
                        const errorMessage =
                            err.response?.data?.errors
                                ? Object.values(err.response.data.errors).join(', ')
                                : 'An error occurred';

                        setNotif({ message: errorMessage, type: 'error' });
                        console.log(err.response?.data?.errors);
                    }
                }}
            >
                {(formik) => (
                    <View style={styles.formContainer}>
                        <FormInput labelText={'Email'} placeholder={'Enter your email'} {...mapFormikProps('email', formik)}/>
                        <View>
                            <FormInput labelText={'Password'} placeholder={'Enter your password'}  {...mapFormikProps('password', formik)}/>
                        </View>
                        <Button text={'Register'} onPress={formik.handleSubmit} color={'#fff'} $maxWidth={'100%'} style={{backgroundColor: 'black'}}/>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <ThemedText type={'default'}>Already have an account?</ThemedText>
                            <TouchableOpacity onPress={() => router.push("/login")}>
                                <ThemedText type={'defaultSemiBold'}>Login</ThemedText>
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