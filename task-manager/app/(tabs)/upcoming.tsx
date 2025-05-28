import {View, Text, SafeAreaView, ActivityIndicator} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useSession} from "@/components/ctx";
import {Redirect} from "expo-router";
import React from "react";

const Upcoming = () => {
    const { session, isLoading } = useSession();
    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }    if (!session) return <Redirect href="/(auth)/login" />;
    return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText type={'title'}>Upcoming</ThemedText>
    </SafeAreaView>
    )
}

export default Upcoming;