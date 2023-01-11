import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewExpense from './components/NewExpense';
import Login from './components/Login';
import JoinRoom from './components/JoinRoom';
import TabNavigator from './components/TabNavigator';
import Expense from './components/expenses/Expense';


const RootStack = createStackNavigator()


export default function App() {
    const [user, setUser] = useState(null);
    const [roomId, setRoomId] = useState(null); 
    const [roommates, setRoommates] = useState(testData.roommates)

    const [token, setToken] = useState()

    useEffect(() => {
        const execute = async () => {
            const storedToken = await AsyncStorage.getItem("token")
            if (storedToken && JSON.parse(storedToken).token) {
                setToken(JSON.parse(storedToken).token)
            }

            const storedUser = await AsyncStorage.getItem("user")
            if (storedUser && JSON.parse(storedUser).user) {
                setUser(JSON.parse(storedUser).user)
            }

            const storedRoomId = await AsyncStorage.getItem("roomId")
            if (storedRoomId && JSON.parse(storedRoomId).roomId) {
                setRoomId(JSON.parse(storedRoomId).roomId)
            }
        }
        execute()
    }, [])

    const storeToken = async (token) => {
        setToken(token)
        await AsyncStorage.setItem("token", JSON.stringify({ token }))
    }

    const storeUser = async (user) => {
        setUser(user)
        await AsyncStorage.setItem("user", JSON.stringify({ user }))
    }

    const storeRoomId = async (roomId) => {
        setRoomId(roomId)
        await AsyncStorage.setItem("roomId", JSON.stringify({ roomId }))
    }

    if (token === undefined || token === null || user === undefined || user === null) {
        return <Login setToken={storeToken} setUser={storeUser} setRoomId={storeRoomId} />
    }

    if (roomId === undefined || roomId === null) {
        return <JoinRoom token={token} user={user} setRoomId={storeRoomId} />
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen 
                    name="main" 
                    children={() => 
                        <TabNavigator 
                            token={token} 
                            user={user} 
                            roomId={roomId} 
                            roommates={roommates}
                        />
                    } 
                    options={{ headerShown: false }}
                />
                <RootStack.Screen 
                    name="New Expense" 
                    children={() => <NewExpense token={token} user={user} roomId={roomId} roommates={roommates} />}
                    options={{ 
                        presentation: "modal",
                        headerBackTitle: "Cancel",
                    }}
                />
                <RootStack.Screen
                    name="Expense"
                    component={Expense}
                    options={{ 
                        presentation: "modal",
                        headerBackTitle: "Back",
                    }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
    

}

const testData = {
    roommates: [
        { firstname: "Jake", lastname: "Langhoff", venmo: '12345', id: 12},
        { firstname: "Rishi", lastname: "Agarwal", venmo: '12345', id: 13},
        { firstname: "Shreyas", lastname: "Ravichandar", venmo: '12345', id: 14},
        { firstname: "Keshav", lastname: "Kotteswaran", venmo: '12345', id: 15},
        { firstname: "Jacob", lastname: "Miller", venmo: '12345', id: 16},
    ],
}