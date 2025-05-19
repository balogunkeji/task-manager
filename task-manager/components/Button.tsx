import {TouchableOpacity, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";

export const Button = ({onPress, text, $maxWidth, style, color}: {onPress: any, text: string, $maxWidth: any, style: any, color: string}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.btnWrapper, style, {maxWidth: $maxWidth}]}>
            <ThemedText type={'default'} style={{color: color}}>{text}</ThemedText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: 'none',
        borderRadius: 8,
    }
})