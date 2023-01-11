import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Dashboard from './Dashboard';
import AllExpenses from './expenses/AllExpenses';
import RoomScreen from './RoomScreen';
import MeScreen from './MeScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ token, user, roomId, roommates}) {

    const navigation = useNavigation()

    return (
        <Tab.Navigator>
                <Tab.Screen 
                    name="Dashboard" 
                    children={() => <Dashboard token={token} userId={user.id} roomId={roomId} roommates={roommates} />}
                />
                <Tab.Screen name="Expenses" component={AllExpenses} />
                <Tab.Screen 
                    name="New Expense" 
                    children={() => <View />} 
                    listeners={() => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("New Expense")
                        }
                    })}
                />
                <Tab.Screen name="Room" children={() => <RoomScreen roomId={roomId} roommates={roommates} />} />
                <Tab.Screen name="Profile" children={() => <MeScreen person={user} />} />
            </Tab.Navigator>
        
    )
}