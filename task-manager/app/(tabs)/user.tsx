import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ArrowRight2, Logout, Notification} from "iconsax-react-nativejs";
import {FormInput} from "@/components/FormInput";
import {useCallback, useRef, useState} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import ReusableBottomSheet from "@/components/ReusableBottomSheet";

const User = () => {
    const [user, setUser] = useState({
        name: 'Tomisin Balogun',
        email: '',
        password: '',
    })
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetRef2 = useRef<BottomSheet>(null);
    const handleSheetChanges = useCallback((index: any) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);
    const handleSheetChange = useCallback((index: any) => {
        bottomSheetRef2.current?.snapToIndex(index);
    }, []);

    return (
       <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginHorizontal: 20}}>
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
           <View style={{ marginHorizontal: 20, gap: 10, marginTop: 20}}>
               <FormInput labelText={'FULL NAME'} value={user.name} onChangeText={(text) => setUser({...user, name: text})} />
               <View>
                   <ThemedText style={{color: '#666'}}>EMAIL</ThemedText>
                   <TouchableOpacity style={styles.email} onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
                       <ThemedText style={{fontSize: 18}}>tomi@mail.com</ThemedText>
                       <ArrowRight2 size={20} color={'#444'}/>
                   </TouchableOpacity>
               </View>
               <View>
                   <ThemedText style={{color: '#666', marginTop: 10}}>PASSWORD</ThemedText>
                   <TouchableOpacity style={[styles.email, {justifyContent: 'center'}]} onPress={() => bottomSheetRef2.current?.snapToIndex(0)}>
                       <ThemedText style={{fontSize: 18, textAlign: 'center'}}>Add Password</ThemedText>
                   </TouchableOpacity>
               </View>
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
           <ReusableBottomSheet ref={bottomSheetRef} onChange={handleSheetChanges} snapPoints={['90%']}>
               <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
                   <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                       <ThemedText type={'subtitle'} style={{fontSize: 16, color: 'red'}}>Cancel</ThemedText>
                   </TouchableOpacity>
                   <ThemedText type={'subtitle'} style={{fontSize: 16,}}>Update Email</ThemedText>
                   <ThemedText type={'subtitle'} style={{fontSize: 16, color: '#666'}}>Done</ThemedText>
               </View>
               <View style={{ gap: 10, marginTop: 40, width: '100%'}}>
                   <FormInput labelText={'New'} placeholder={'enter email'}  />
                   <FormInput labelText={'Confirm'} placeholder={'re-enter email'} />
               </View>
           </ReusableBottomSheet>
           <ReusableBottomSheet ref={bottomSheetRef2} onChange={handleSheetChange} snapPoints={['90%']}>
               <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
                   <TouchableOpacity onPress={() => bottomSheetRef2.current?.close()}>
                       <ThemedText type={'subtitle'} style={{fontSize: 16, color: 'red'}}>Cancel</ThemedText>
                   </TouchableOpacity>
                   <ThemedText type={'subtitle'} style={{fontSize: 16,}}>Update Email</ThemedText>
                   <ThemedText type={'subtitle'} style={{fontSize: 16, color: '#666'}}>Done</ThemedText>
               </View>
               <View style={{ gap: 10, marginTop: 40, width: '100%'}}>
                   <FormInput labelText={'New'} placeholder={'enter password'}  />
                   <View>
                       <FormInput labelText={'Confirm'} placeholder={'re-enter password'} />
                       <ThemedText style={{fontSize: 14, color: '#666', marginTop: -10}}>Your password must be at 8 characters long.</ThemedText>
                   </View>
               </View>
           </ReusableBottomSheet>
       </SafeAreaView>
    )
}

export default User;

const styles = StyleSheet.create({
   container: {
       flex: 1,
       // margin: 20,
       position: 'relative',
       gap: 20,
   },
    avatar: {
       width: 40,
       height: 40,
       borderRadius: 50,
    },
    logout: {
        gap: 30,
        position: 'absolute',
        bottom: 20,
        width: '90%',
        marginHorizontal: 20,
   },
    delete: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#1d151d',
        borderRadius: 10,
    },
    email: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
        height: 50,
        backgroundColor: '#fafafa',
        borderRadius: 10,
        paddingHorizontal: 10,
    }
})