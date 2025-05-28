// components/Dropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText'; // or replace with Text

type DropdownProps = {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    placeholder?: string;
};

export default function Dropdown({ options, selected, onSelect, placeholder }: DropdownProps) {
    const [visible, setVisible] = useState(false);

    const handleSelect = (value: string) => {
        onSelect(value);
        setVisible(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(true)}>
                <Text style={styles.selectedText}>{selected || placeholder || 'Select an option'}</Text>
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.modal}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        // borderWidth: 1,
        // borderColor: '#ccc',
        // paddingVertical: 12,
        // paddingHorizontal: 16,
        // borderRadius: 8,
        // backgroundColor: '#fff',
    },
    selectedText: {
        color: '#000',
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        maxHeight: 250,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
});
