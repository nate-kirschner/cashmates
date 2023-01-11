import { FlatList, StyleSheet, View } from "react-native";
import Text from "../custom/MyText";
import ProfileIcon from "./ProfileIcon";
import colors from '../styles/palette';


export default function RoomScreen({ roomId, roommates }) {

    const renderRoommate = (roommate) => {
        return (
            <View style={styles.item} id={roommate.id}>
                <ProfileIcon person={roommate} />
                <Text style={styles.itemName}>{roommate.firstname} {roommate.lastname}</Text>
            </View>
        )
    }

    return (
        <View>
            {
                roommates.map(item => {
                    return renderRoommate(item)
                })
            }
            {/* <FlatList 
                data={roommates}
                renderItem={({item}) => renderRoommate(item)}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    itemName: {
        flexBasis: '80%',
        textAlign: 'left',
        paddingLeft: '15%'
    }
})