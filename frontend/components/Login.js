import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, StyleSheet, TextInput, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import Text from "../custom/MyText";
import colors from '../styles/palette';
import { login } from "../service/api";

export default function Login({ setToken, setUser, setRoomId }) {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const loginHandler = async () => {
        const body = {
            username,
            password
        }

        const response = await login(body)
        
        setToken(response.token)
        setUser(response.user)
        setRoomId(response.roomId)
    }

    return (
        <TouchableWithoutFeedback 
            onPress={() => { Keyboard.dismiss() }} 
            style={{width: '100%'}}
        >
            <View style={styles.loginPage}>
                <TextInput 
                    style={styles.usernameInput}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username"
                />

                <TextInput 
                    style={styles.passwordInput}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                />

                <Pressable style={styles.loginButton} onPress={loginHandler}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    loginPage: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    usernameInput: {
        borderWidth: 1,
        borderColor: colors.textGray,
        width: '70%',
        marginLeft: '15%',
        marginTop: '30%',
        marginBottom: '10%',
        fontSize: '20px',
        padding: 10,
        borderRadius: 10,
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: colors.textGray,
        width: '70%',
        marginLeft: '15%',
        fontSize: '20px',
        padding: 10,
        borderRadius: 10,
    },
    loginButton: {
        borderWidth: 1,
        borderColor: colors.textGray,
        width: '20%',
        marginTop: '10%',
        marginLeft: '40%',
        padding: 10,
        borderRadius: 10,
    },
    loginButtonText: {
        fontSize: '16px',
        textAlign: 'center'
    }
})