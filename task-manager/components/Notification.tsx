import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationProps {
    message: string;
    type?: NotificationType;
    duration?: number;
    onHide?: () => void;
}

const backgroundColors: Record<NotificationType, string> = {
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
};

const Notification: React.FC<NotificationProps> = ({
                                                       message,
                                                       type = 'info',
                                                       duration = 3000,
                                                       onHide,
                                                   }) => {
    const opacity = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Auto fade out after duration
        const timeout = setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                onHide?.();
            });
        }, duration);

        return () => clearTimeout(timeout);
    }, [opacity, duration, onHide]);

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor: '#fff', opacity,
                borderLeftWidth: 10,
                borderLeftColor: backgroundColors[type]},
            ]}
        >
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create<{
    container: ViewStyle;
    text: TextStyle;
}>({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 0,
        padding: 15,
        borderRadius: 8,
        zIndex: 1000,
        elevation: 10,
    },
    text: {
        color: '#666',
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Notification;
