import React from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInputProps,
} from "react-native";
import { FormikHandlers, FormikState } from "formik";

interface FormInputProp extends TextInputProps {
    labelText?: string;
    error?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    leftClick?: () => void;
    rightClick?: () => void;
}

const FormikError = ({ message }: { message?: string }) =>
    message ? <Text style={styles.errorText}>{message}</Text> : null;

export const FormInput = ({
                              labelText,
                              placeholder,
                              error,
                              value,
                              onChangeText,
                              onBlur,
                              leftContent,
                              rightContent,
                              leftClick,
                              rightClick,
                              editable = true,
                              ...rest
                          }: FormInputProp) => {
    const hasLeft = !!leftContent;
    const hasRight = !!rightContent;

    return (
        <View style={styles.inputWrapper}>
            {labelText && <Text style={styles.label}>{labelText}</Text>}

            <View style={styles.inputContainer}>
                {hasLeft && (
                    <TouchableOpacity onPress={leftClick} style={styles.leftContent}>
                        {leftContent}
                    </TouchableOpacity>
                )}
                <TextInput
                    style={[
                        styles.textInput,
                        hasLeft && { paddingLeft: 40 },
                        hasRight && { paddingRight: 40 },
                        error && styles.errorBorder,
                    ]}
                    placeholder={placeholder}
                    value={value as string}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    editable={editable}
                    {...rest}
                />
                {hasRight && (
                    <TouchableOpacity onPress={rightClick} style={styles.rightContent}>
                        {rightContent}
                    </TouchableOpacity>
                )}
            </View>

            <FormikError message={error} />
        </View>
    );
};

export const mapFormikProps = (
    name: string,
    form: FormikHandlers & FormikState<any>
) => ({
    value: form.values?.[name],
    error: form.touched?.[name] && form.errors?.[name] ? String(form.errors[name]) : undefined,
    onChangeText: form.handleChange(name),
    onBlur: form.handleBlur(name),
});

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 16,
        width: "100%",
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: "#666666",
    },
    inputContainer: {
        position: "relative",
        width: "100%",
        justifyContent: "center",
    },
    textInput: {
        height: 46,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    leftContent: {
        position: "absolute",
        left: 10,
        zIndex: 1,
    },
    rightContent: {
        position: "absolute",
        right: 10,
        zIndex: 1,
    },
    errorBorder: {
        borderColor: "#ee7474",
    },
    errorText: {
        color: "#ee7474",
        fontSize: 12,
        marginTop: 4,
    },
});
