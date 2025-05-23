import {View, Text, SafeAreaView, StyleSheet} from "react-native";
import {FormInput} from "@/components/FormInput";
import {ThemedText} from "@/components/ThemedText";
import {SearchNormal} from "iconsax-react-nativejs";

const Search = () => {
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