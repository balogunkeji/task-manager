import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import {Calendar, Calendar1, Home2, Notepad2, SearchNormal1, User} from "iconsax-react-nativejs";

 function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#666666', tabBarInactiveTintColor: 'black', tabBarStyle: {
            paddingTop: 10,
            } }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Today',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Calendar1 size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="upcoming"
                options={{
                    headerShown: false,
                    title: 'Upcoming',
                    tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    title: 'Search',
                    tabBarIcon: ({ color }) => <SearchNormal1 size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="user"
                options={{
                    headerShown: false,
                    title: 'User',
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>

    );
}
export default TabLayout;