import {View, Text, SafeAreaView, StyleSheet, ActivityIndicator} from "react-native";
import {FormInput} from "@/components/FormInput";
import {ThemedText} from "@/components/ThemedText";
import {SearchNormal} from "iconsax-react-nativejs";
import {useSession} from "@/components/ctx";
import {Redirect} from "expo-router";
import React from "react";

const Search = () => {
    const { session, isLoading } = useSession();
    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }
    if (!session) return <Redirect href="/(auth)/login" />;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <ThemedText type={'defaultTitle'}>Search</ThemedText>
                <FormInput labelText={''} placeholder={'Tasks, Projects, and More'} leftContent={<SearchNormal color={'#ccc'} size={20}/>}/>
            </View>
        </SafeAreaView>
    )
}

export default Search;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    form: {
        gap: 10,
        marginTop: 20
    }
})