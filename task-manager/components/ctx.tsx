import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import axios from 'axios';
import {useRouter} from "expo-router";

const AuthContext = createContext<{
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: async () => {},
    signOut: () => {},
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('token');
    const router = useRouter();
    const signIn = async (email: string, password: string) => {
        try {
            const res = await axios.post(
                'https://express-js-1z8q.onrender.com/users/login',
                {
                    email,
                    password,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const token = res.data.token;
            setSession(token);
        } catch (error: any) {
            const message =
                error.response?.data?.errors
                    ? Object.values(error.response.data.errors).join(', ')
                    : 'Login failed. Please try again.';
            throw new Error(message);
        }
    };

    const signOut = () => {
        setSession(null);
        router.replace("/(auth)/login");
        console.log('sign out', session);
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
