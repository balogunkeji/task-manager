// components/LabelInputDropdown.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';

type Props = {
    labels: string[];
    onChange: (labels: string[]) => void;
    placeholder?: string;
};

export default function LabelInputDropdown({ labels, onChange, placeholder = "Add label" }: Props) {
    const [input, setInput] = useState('');

    const addLabel = () => {
        const newLabel = input.trim();
        if (newLabel && !labels.includes(newLabel)) {
            onChange([...labels, newLabel]);
            setInput('');
        }
    };

    const removeLabel = (labelToRemove: string) => {
        onChange(labels.filter((label) => label !== labelToRemove));
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={addLabel}
                />
                <TouchableOpacity onPress={addLabel} style={styles.addBtn}>
                    <Text style={{ color: '#fff' }}>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={labels}
                keyExtractor={(item) => item}
                horizontal
                contentContainerStyle={styles.labelsRow}
                renderItem={({ item }) => (
                    <View style={styles.labelChip}>
                        <Text style={styles.labelText}>{item}</Text>
                        <TouchableOpacity onPress={() => removeLabel(item)}>
                            <Text style={styles.removeText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
        width: '100%',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    addBtn: {
        backgroundColor: 'orangered',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    labelsRow: {
        marginTop: 8,
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    labelChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    labelText: {
        marginRight: 6,
        color: '#333',
    },
    removeText: {
        color: '#888',
        fontWeight: 'bold',
    },
});
