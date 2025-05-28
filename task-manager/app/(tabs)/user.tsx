import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ArrowRight2, Logout, Notification } from "iconsax-react-nativejs";
import { FormInput } from "@/components/FormInput";
import { useCallback, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import ReusableBottomSheet from "@/components/ReusableBottomSheet";
import { useSession } from "@/components/ctx";

const User = () => {
    const [user, setUser] = useState({
        name: 'Tomisin Balogun',
        email: '',
        password: '',
    });

    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetRef2 = useRef<BottomSheet>(null);

    // Removed snapToIndex from these callbacks to prevent auto-open
    const handleSheetChanges = useCallback((index: number) => {
        // You can log the index here if needed
    }, []);

    const handleSheetChange = useCallback((index: number) => {
        // You can log the index here if needed
    }, []);

    const { signOut } = useSession();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profile}>
                    <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
                    <View style={{ marginLeft: 10 }}>
                        <ThemedText type={'subtitle'} style={{ fontSize: 16 }}>Tomisin</ThemedText>
                    </View>
                </View>
                <Notification color={'#444'} size={20} />
            </View>

            <View style={styles.inputs}>
                <FormInput
                    labelText={'FULL NAME'}
                    value={user.name}
                    onChangeText={(text) => setUser({ ...user, name: text })}
                />

                <View>
                    <ThemedText style={{ color: '#666' }}>EMAIL</ThemedText>
                    <TouchableOpacity
                        style={styles.email}
                        onPress={() => bottomSheetRef.current?.snapToIndex(0)}
                    >
                        <ThemedText style={{ fontSize: 18 }}>tomi@mail.com</ThemedText>
                        <ArrowRight2 size={20} color={'#444'} />
                    </TouchableOpacity>
                </View>

                <View>
                    <ThemedText style={{ color: '#666', marginTop: 10 }}>PASSWORD</ThemedText>
                    <TouchableOpacity
                        style={[styles.email, { justifyContent: 'center' }]}
                        onPress={() => bottomSheetRef2.current?.snapToIndex(0)}
                    >
                        <ThemedText style={{ fontSize: 18, textAlign: 'center' }}>Add Password</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.logout}>
                <TouchableOpacity style={{ flexDirection: 'row', gap: 10 }} onPress={signOut}>
                    <Logout size={20} color={'red'} />
                    <ThemedText type={'subtitle'} style={{ fontSize: 16, color: 'red' }}>Log Out</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.delete}>
                    <ThemedText type={'subtitle'} style={{ fontSize: 16, color: 'red' }}>DELETE ACCOUNT</ThemedText>
                </TouchableOpacity>
            </View>

            <ReusableBottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={['90%']}
            >
                <View style={styles.sheetHeader}>
                    <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                        <ThemedText type={'subtitle'} style={{ fontSize: 16, color: 'red' }}>Cancel</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type={'subtitle'} style={{ fontSize: 16 }}>Update Email</ThemedText>
                    <ThemedText type={'subtitle'} style={{ fontSize: 16, color: '#666' }}>Done</ThemedText>
                </View>

                <View style={styles.sheetContent}>
                    <FormInput labelText={'New'} placeholder={'enter email'} />
                    <FormInput labelText={'Confirm'} placeholder={'re-enter email'} />
                </View>
            </ReusableBottomSheet>

            <ReusableBottomSheet
                ref={bottomSheetRef2}
                onChange={handleSheetChange}
                snapPoints={['90%']}
            >
                <View style={styles.sheetHeader}>
                    <TouchableOpacity onPress={() => bottomSheetRef2.current?.close()}>
                        <ThemedText type={'subtitle'} style={{ fontSize: 16, color: 'red' }}>Cancel</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type={'subtitle'} style={{ fontSize: 16 }}>Update Password</ThemedText>
                    <ThemedText type={'subtitle'} style={{ fontSize: 16, color: '#666' }}>Done</ThemedText>
                </View>

                <View style={styles.sheetContent}>
                    <FormInput labelText={'New'} placeholder={'enter password'} />
                    <View>
                        <FormInput labelText={'Confirm'} placeholder={'re-enter password'} />
                        <ThemedText style={{ fontSize: 14, color: '#666', marginTop: -10 }}>
                            Your password must be at least 8 characters long.
                        </ThemedText>
                    </View>
                </View>
            </ReusableBottomSheet>
        </SafeAreaView>
    );
};

export default User;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    inputs: {
        marginHorizontal: 20,
        gap: 10,
        marginTop: 20,
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
    sheetHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    sheetContent: {
        gap: 10,
        marginTop: 40,
        width: '100%',
    },
});
