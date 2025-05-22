import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    label: string;
    selected: boolean;
    onPress: () => void;
}

const RadioButton: React.FC<Props> = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.radio}>
                {selected && <View></View>}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#333',
    },
    label: {
        fontSize: 16,
    },
});

export default RadioButton;
