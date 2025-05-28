import {View, Text, SafeAreaView} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useSession} from "@/components/ctx";

const Upcoming = () => {
    const { session, isLoading } = useSession();

    return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText type={'title'}>Upcoming</ThemedText>
    </SafeAreaView>
    )
}

export default Upcoming;