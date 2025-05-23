import {SafeAreaView, StyleSheet, View,  TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import React, {useCallback, useRef, useState} from "react";
import {Add, DirectInbox} from "iconsax-react-nativejs";
import RadioButton from "@/components/RadioButton";
import BottomSheet from '@gorhom/bottom-sheet';
import ReusableBottomSheet from "@/components/ReusableBottomSheet";

function HomeScreen() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selected, setSelected] = useState('option1');

    const handleSheetChanges = useCallback((index: any) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    return(
        <SafeAreaView style={styles.container}>
           <View style={styles.tasksContainer}>
               <ThemedText type={'title'}>Today</ThemedText>
               <View style={{flexDirection: 'row', gap: 5,  marginTop: 10}}>
                   <ThemedText type={'subtitle'} style={{fontSize: 14,}}>22 May.</ThemedText>
                   <ThemedText type={'subtitle'} style={{fontSize: 14}}>Thursday</ThemedText>
               </View>
           </View>
            <TouchableOpacity style={styles.tasksTitle} onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
                <RadioButton label={''} selected={selected === 'option1'} onPress={() => setSelected('option1')} />
                <View style={styles.task}>
                    <ThemedText type={'subtitle'} style={{fontSize: 14,}}>Tomisin</ThemedText>
                    <ThemedText style={{fontSize: 12,}}>Tomisin</ThemedText>
                    <ThemedText style={{fontSize: 12,}}>Tomisin</ThemedText>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <ThemedText style={{fontSize: 12,}}>Tomisin</ThemedText>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                            <ThemedText style={{fontSize: 12,}}>Inbox</ThemedText>
                            <DirectInbox size={12} color={'#000'}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addIcon} onPress={() => {}}>
                <Add size={30} color={'#fff'}/>
            </TouchableOpacity>

            <ReusableBottomSheet
                ref={bottomSheetRef}
                data={Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`)}
                onChange={handleSheetChanges}
                snapPoints={['25%', '50%', '90%']}
            />
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        position: 'relative',
        height: '100%',
        width: '100%',
    },
   addIcon: {
        position: 'absolute',
       height: 50,
       width: 50,
       borderRadius: 25,
       backgroundColor: '#1D1C1A',
       alignItems: 'center',
       justifyContent: 'center',
       bottom: 20,
       right: 20,
   },
   tasksContainer: {
        margin: 20,
       width: '90%',
       borderBottomWidth: 1,
       borderBottomColor: '#444444',
       paddingBottom: 10,
   },
    tasksTitle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 20,    },
    task: {
        width: '85%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#444444',
        paddingBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
    },
    item: {
        fontSize: 16,
        paddingVertical: 4,
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },

})