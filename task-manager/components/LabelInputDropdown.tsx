// components/ModalLabelInput.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Pressable,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface Props {
    visible: boolean;
    onClose: () => void;
    labels: string[];
    onChange: (labels: string[]) => void;
}

const ModalLabelInput = ({ visible, onClose, labels, onChange }: Props) => {
    const [input, setInput] = useState("");

    const addLabel = () => {
        const trimmed = input.trim();
        if (trimmed && !labels.includes(trimmed)) {
            onChange([...labels, trimmed]);
            setInput("");
        }
    };

    const removeLabel = (label: string) => {
        onChange(labels.filter((item) => item !== label));
    };

    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <ThemedText type="subtitle" style={styles.title}>Add Labels</ThemedText>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a label"
                            value={input}
                            onChangeText={setInput}
                            onSubmitEditing={addLabel}
                        />
                        <TouchableOpacity onPress={addLabel} style={styles.addButton}>
                            <Text style={{ color: "#fff" }}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={labels}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <View style={styles.labelItem}>
                                <Text style={styles.labelText}>{item}</Text>
                                <Pressable onPress={() => removeLabel(item)}>
                                    <Text style={styles.remove}>✕</Text>
                                </Pressable>
                            </View>
                        )}
                        style={{ marginTop: 10 }}
                    />

                    <TouchableOpacity onPress={onClose} style={styles.doneButton}>
                        <Text style={{ color: "#fff" }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ModalLabelInput;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modal: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        minHeight: 300,
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: "orangered",
        padding: 10,
        borderRadius: 8,
    },
    labelItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f1f1f1",
        padding: 8,
        borderRadius: 8,
        marginTop: 6,
    },
    labelText: {
        fontSize: 14,
    },
    remove: {
        fontSize: 16,
        color: "red",
        marginLeft: 10,
    },
    doneButton: {
        marginTop: 20,
        backgroundColor: "#1D1C1A",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
});
