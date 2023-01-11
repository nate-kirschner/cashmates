import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import Text from "../custom/MyText";
import colors from '../styles/palette';
import { joinRoom, createRoom } from "../service/api";

export default function JoinRoom({ token, user, setRoomId }) {

    const [roomName, setRoomName] = useState("")
    const [roomUniqueId, setRoomUniqueId] = useState("")

    const [showModal, setShowModal] = useState(false)

    const createRoomHandler = async () => {
        if (roomName != "") {
            const body = {
                roomName,
                userId: user.id
            }
            console.log("body", body)
            const response = await createRoom(body, token);
            console.log("response", response)

            if (response !== null) {
                setRoomId(response.roomId)
            }
        }
    }

    const joinRoomHandler = () => {
        if (roomId.length != 10) {

        }
    }

    return (
        <TouchableWithoutFeedback 
            onPress={() => { Keyboard.dismiss() }} 
            style={{width: '100%'}}
        >
            <View style={styles.container}>

                <View style={styles.section}>
                    <Text style={styles.title}>Create a Room</Text>
                    <TextInput 
                        style={styles.roomTitleInput}
                        placeholder="Room Name"
                        value={roomName}
                        onChangeText={setRoomName}
                    />
                    <Pressable style={styles.createRoomButton} onPress={createRoomHandler}>
                        <Text style={styles.createRoomButtonText}>Create New Room</Text>
                    </Pressable>
                </View>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine}/>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Join a Room</Text>
                    <TextInput 
                        style={styles.roomTitleInput}
                        placeholder="Room ID"
                        value={roomUniqueId}
                        onChangeText={setRoomUniqueId}
                    />
                    <Pressable style={styles.createRoomButton} onPress={joinRoomHandler}>
                        <Text style={styles.createRoomButtonText}>Join This Room</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    section: {
        justifyContent: 'center'
    },
    title: {
        fontSize: '24px',
        textAlign: 'center',
    },
    roomTitleInput: {
        borderWidth: 1,
        borderColor: colors.textGray,
        fontSize: '20px',
        padding: 10,
        width: '70%',
        marginLeft: '15%',
        marginTop: 20,
        borderRadius: 10,
    },
    createRoomButton: {
        padding: 15,
        borderWidth: 1,
        borderColor: colors.textGray,
        marginTop: 20,
        width: '70%',
        marginLeft: '15%',
        borderRadius: 10,
    },
    createRoomButtonText: {
        fontSize: '18px',
        textAlign: 'center'
    },


    divider: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        marginTop: 70,
        marginBottom: 70,
    },
    dividerLine: {
        width: '30%',
        height: 1,
        backgroundColor: colors.textGray,
        alignSelf: 'center',
    },
    dividerText: {
        fontSize: '30px'

    }
})