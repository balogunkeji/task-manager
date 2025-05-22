import {SafeAreaView, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import {Asset} from "expo-asset";
import {ThemedText} from "@/components/ThemedText";
import {useState} from "react";
import {useRouter} from "expo-router";
import {Add, ArrowRotateRight} from "iconsax-react-nativejs";
import RadioButton from "@/components/RadioButton";

const HomeScreen = () => {
    const logo = Asset.fromModule(require("../../assets/images/icon.png")).uri;
    const router = useRouter();
    const [selected, setSelected] = useState('option1');
    return(
        <SafeAreaView style={styles.container}>
           <View style={styles.tasksContainer}>
               <ThemedText type={'title'}>Today</ThemedText>
               <View style={{flexDirection: 'row', gap: 5,  marginTop: 10}}>
                   <ThemedText type={'subtitle'} style={{fontSize: 14,}}>22 May.</ThemedText>
                   <ThemedText type={'subtitle'} style={{fontSize: 14}}>Thursday</ThemedText>
               </View>
           </View>
            <View style={styles.tasksTitle}>
                <RadioButton label={''} selected={selected === 'option1'} onPress={() => setSelected('option1')} />
                <RadioButton label={''} selected={selected === 'option2'} onPress={() => setSelected('option2')} />
                <View></View>
            </View>
            <TouchableOpacity style={styles.addIcon} onPress={() => {}}>
                <Add size={30} color={'#fff'}/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "space-between",
        alignItems: "flex-start",
        position: 'relative',
        height: '100%',
        width: '100%',
        margin: 20,
    },
   addIcon: {
        position: 'absolute',
       height: 50,
       width: 50,
       borderRadius: 25,
       backgroundColor: '#1D1C1A',
       alignItems: 'center',
       justifyContent: 'center',
       bottom: 0,
       right: 40,
   },
   tasksContainer: {
        marginTop: 20,
       width: '90%',
       // gap: 10,
       borderBottomWidth: 1,
       borderBottomColor: '#444444',
       paddingBottom: 10,
   },
    tasksTitle: {
        marginTop: 10,
        flexDirection: 'row',

    }

})