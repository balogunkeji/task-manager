import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Logout, Notification} from "iconsax-react-nativejs";
import {FormInput} from "@/components/FormInput";
import {useState} from "react";

const User = () => {
    const [user, setUser] = useState({
        name: 'Tomisin Balogun',
        email: '',
        password: '',
    })
    return (
       <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }}
                    style={styles.avatar}
                />
                <View style={{marginLeft: 10}}>
                    <ThemedText type={'subtitle'} style={{fontSize: 16}}>Tomisin</ThemedText>
                </View>
            </View>
            <Notification color={'#444'} size={20}/>
        </View>
           <View>
               <FormInput labelText={'FULL NAME'} value={user.name} onChangeText={(text) => setUser({...user, name: text})} />
           </View>
           <View style={styles.logout}>
               <TouchableOpacity style={{flexDirection: 'row', gap: 10}}>
                   <Logout size={20} color={'red'}/>
                   <ThemedText type={'subtitle'} style={{fontSize: 16, color: 'red'}}>Log Out</ThemedText>
               </TouchableOpacity>
               <TouchableOpacity style={styles.delete}>
                   <ThemedText type={'subtitle'} style={{fontSize: 16, color: 'red'}}>DELETE ACCOUNT</ThemedText>
               </TouchableOpacity>
           </View>
       </SafeAreaView>
    )
}

export default User;

const styles = StyleSheet.create({
   container: {
       flex: 1,
       margin: 20,
       position: 'relative',
       gap: 20,
   },
    avatar: {
       width: 40,
       height: 40,
       borderRadius: 50,
    },
    logout: {
        // alignItems: 'center',
        gap: 30,
        position: 'absolute',
        bottom: 20,
        width: '100%',
   },
    delete: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#1d151d',
        borderRadius: 10,
    }
})