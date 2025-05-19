import React from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FormikHandlers, FormikState } from "formik";

interface FormInputProp {
    labelText?: string;
    placeholder?: string;
    value?: string | number;
    onChangeText?: (text: string) => void;
    onBlur?: (e: any) => void;
    error?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    disabled?: boolean;
    leftClick?: () => void;
    rightClick?: () => void;
}

const FormikError = ({ message }: { message: string | undefined }) =>
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
                              disabled,
                          }: FormInputProp) => (
    <View style={styles.inputWrapper}>
        {labelText && <Text style={styles.label}>{labelText}</Text>}
        <View style={styles.inputContainer}>
            {leftContent && (
                <TouchableOpacity onPress={leftClick} style={styles.leftContent}>
                    {leftContent}
                </TouchableOpacity>
            )}
            <TextInput
                style={{ ...styles.textInput, ...leftContent && styles.leftContent, ...rightContent && styles.rightContent, ...error && styles.errorBorder,}}
                placeholder={placeholder}
                value={value as string}
                onChangeText={onChangeText}
                onBlur={onBlur}
                editable={!disabled}
            />
            {rightContent && (
                <TouchableOpacity onPress={rightClick} style={styles.rightContent}>
                    {rightContent}
                </TouchableOpacity>
            )}
        </View>
        <FormikError message={error} />
    </View>
);

export const mapFormikProps = ( name: string, form: FormikHandlers & FormikState<any>) => ({
    value: form?.values?.[name],
    error: form.touched[name] && form.errors[name] ? String(form.errors[name]) : undefined,
    onChange: form.handleChange(name),
    onBlur: form.handleBlur(name),
    onFocus: form.handleBlur(name),
    onChangeText: form.handleChange(name),
});

const styles = StyleSheet.create({
    inputWrapper: { marginBottom: 0 },
    label: { fontSize: 14, marginBottom: 8, color: "#666666" },
    inputContainer: { position: "relative" },
    textInput: { height: 46, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 8 },
    leftContent: { position: "absolute", left: 10, top: 12 },
    rightContent: { position: "absolute", right: 10, top: 12 },
    errorBorder: { borderColor: "#ee7474" },
    errorText: { color: "#ee7474", fontSize: 12, marginTop: 5 },
});



