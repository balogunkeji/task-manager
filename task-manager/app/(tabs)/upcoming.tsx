import {View, Text, SafeAreaView} from "react-native";
import {ThemedText} from "@/components/ThemedText";

const Upcoming = () => {
    return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText type={'title'}>Upcoming</ThemedText>
    </SafeAreaView>
    )
}

export default Upcoming;