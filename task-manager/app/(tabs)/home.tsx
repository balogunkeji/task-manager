import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback, ActivityIndicator, Platform
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React, {useCallback, useEffect, useRef, useState} from "react";
import { Add, Calendar, DirectInbox, Flag, Tag } from "iconsax-react-nativejs";
import RadioButton from "@/components/RadioButton";
import BottomSheet from '@gorhom/bottom-sheet';
import ReusableBottomSheet from "@/components/ReusableBottomSheet";
import { FormInput } from "@/components/FormInput";
import {useSession} from "@/components/ctx";
import {Redirect} from "expo-router";
import {TaskValues, useTask} from "@/hooks/useTask";
import DateTimePicker from '@react-native-community/datetimepicker';
import Dropdown from "@/components/Dropdown";
import ModalLabelInput from "@/components/LabelInputDropdown";
import axios from "axios";
import {tls} from "node-forge";


function HomeScreen() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetRef2 = useRef<BottomSheet>(null);
    const [selected, setSelected] = useState('option1');
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { session, isLoading } = useSession();
    const [isLabelModalOpen, setLabelModalOpen] = useState(false);
    const [data, setData] = useState<Array<{ _id: string; completed: boolean }>>([])
    const [value, setValue] = useState<TaskValues>({
        title: '',
        description: '',
        completed: false,
        priority: '',
        dueDate: '',
        labels: [],
    });
    const [show, setShow] = useState(false);
    const { createTask } = useTask(value,session)
    const handleSheetChanges = useCallback((index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);
    const onChange = (_event: any, selectedDate?: Date) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            setValue({ ...value, dueDate: selectedDate.toISOString() });
        }
    };
    const closeSheet = () => {
        bottomSheetRef2.current?.close();
    };

    const handleTask = useCallback(async () => {
        try {
            const task = await createTask();
            console.log("Task created:", task);
            closeSheet();
        } catch (err: any) {
            alert(err.message || "Failed to create task.");
        }
    }, [createTask])

    // ✅ Updated: No snapToIndex call here
    const handleSheetChange = useCallback((index: number) => {
        setIsSheetOpen(index !== -1);
    }, []);

    const handleRemove = async (id: string) => {
        try {
            const taskToToggle = data.find(task => task._id === id);
            if (!taskToToggle) return;

            const updatedCompleted = !taskToToggle.completed;

            setData(prev =>
                prev.map(task =>
                    task._id === id ? { ...task, completed: updatedCompleted } : task
                )
            );

            // Update on the server
            await axios.put(`https://express-js-1z8q.onrender.com/api/task/${id}`, {
                completed: updatedCompleted,
            });
        } catch (err) {
            console.log("Failed to toggle completion:", err);
        }
    };


    const fetchTasks = async () => {
        try {
            const res = await axios.get<Array<{ _id: string; completed: boolean }>>('https://express-js-1z8q.onrender.com/api/task');
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
         fetchTasks();
    }, []);


    console.log(data)

    if (isLoading) {
        return null
    }
    if (!session) return <Redirect href="/(auth)/login" />;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tasksContainer}>
                <ThemedText type={'title'}>Today</ThemedText>
                <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
                    <ThemedText type={'subtitle'} style={{ fontSize: 14 }}>22 May.</ThemedText>
                    <ThemedText type={'subtitle'} style={{ fontSize: 14 }}>Thursday</ThemedText>
                </View>
            </View>

            {
                data.map((item: any) => (
                    <View style={styles.tasksTitle} key={item._id}>
                        <RadioButton
                            label={''}
                            selected={selected === item._id}
                            onPress={() => {
                                setSelected(item._id);
                                handleRemove(item._id);
                            }}
                        />
                        <View style={styles.task}>
                            <ThemedText type={'subtitle'} style={{ fontSize: 14 }}>{item?.title}</ThemedText>
                            <ThemedText style={{ fontSize: 12 }}>{item?.description}</ThemedText>
                            <ThemedText style={{ fontSize: 12 }}>Tomisin</ThemedText>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <ThemedText style={{ fontSize: 12 }}>Tomisin</ThemedText>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                    <ThemedText style={{ fontSize: 12 }}>Inbox</ThemedText>
                                    <DirectInbox size={12} color={'#000'} />
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            }

            <TouchableOpacity style={styles.addIcon} onPress={() => bottomSheetRef2.current?.snapToIndex(0)}>
                <Add size={30} color={'#fff'} />
            </TouchableOpacity>


            {isSheetOpen && (
                <TouchableWithoutFeedback onPress={closeSheet}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            <ReusableBottomSheet
                ref={bottomSheetRef2}
                onChange={handleSheetChange}
                snapPoints={['25%']}
            >
                <View style={{ width: '100%' }}>
                    <FormInput labelText={''} placeholder={'e.g. Search flights for upcoming trip p2'} style={{ borderWidth: 0 }} value={value.title}  onChangeText={(text) => setValue((prev) => ({ ...prev, title: text }))}
                    />
                    <FormInput labelText={''} placeholder={'Description'} style={{ borderWidth: 0 }}  value={value.description} onChangeText={(text) => setValue((prev) => ({ ...prev, description: text }))}/>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <TouchableOpacity style={styles.box} onPress={() => setShow(true)}>
                            <Calendar size={20} color={'#444'} />
                            <ThemedText type={'subtitle'} style={{ fontSize: 14 }}>Date</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box}>
                            <Flag size={20} color={'#444'} />
                            <Dropdown
                                options={['low', 'medium', 'high']}
                                selected={value.priority}
                                onSelect={(val) => setValue((prev) => ({ ...prev, priority: val }))}
                                placeholder="Priority"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box} onPress={() => setLabelModalOpen(true)}>
                            <Tag size={20} color={'#444'} />
                            <ThemedText type={'subtitle'} style={{ fontSize: 14 }}>Labels</ThemedText>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 15}}>
                        <TouchableOpacity onPress={handleTask}>
                            <ThemedText type={'subtitle'} style={{fontSize: 16, color: 'orangered'}}>Done</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
                {show && (
                    <DateTimePicker
                        value={value.dueDate ? new Date(value.dueDate) : new Date()}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
                <ModalLabelInput
                    visible={isLabelModalOpen}
                    labels={value.labels}
                    onChange={(labels) => setValue((prev) => ({ ...prev, labels }))}
                    onClose={() => setLabelModalOpen(false)}
                />
            </ReusableBottomSheet>

        </SafeAreaView>
    );
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
        marginLeft: 20,
        marginTop: 20,
    },
    task: {
        width: '85%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#444444',
        paddingBottom: 5,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '25%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fafafa',
        borderRadius: 10,
        marginVertical: 10,
    }
});
