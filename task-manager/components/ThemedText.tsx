import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
    color?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'defaultTitle';
};

export function ThemedText({
                               style,
                               type = 'default',
                               color,
                               ...rest
                           }: ThemedTextProps) {
    const themeColor = '#1D1C1A'
    const textColor = color || themeColor;

    return (
        <Text style={[{ color: textColor }, styles[type], style]} {...rest} />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    defaultTitle: {
        fontSize: 24,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4', // Ensure link color is not overridden
    },
});
