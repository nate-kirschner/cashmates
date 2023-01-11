import { Button, StyleSheet, Pressable, View } from "react-native";
import Text from "../custom/MyText";
import ProfileIcon from "./ProfileIcon";
import colors from '../styles/palette';


// first name, last name, venmo
export default function MeScreen({ person }) {

    return (
        <View style={styles.me}>
            <ProfileIcon person={person} style={{ wrapper: styles.iconWrapper, profile: styles.iconProfile, initials: styles.iconInitials }} />
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.text}>{person.firstname || ""}</Text>

            <Text style={styles.label}>Last Name</Text>
            <Text style={styles.text}>{person.lastname || ""}</Text>

            {
                person.venmo && (
                    <>
                        <Text style={styles.label}>Venmo Username</Text>
                        <Text style={styles.text}>{person.venmo || ""}</Text>
                    </>
                )
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    me: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    iconWrapper: {
        flexBasis: '100%',
        marginBottom: 40,
    },
    iconProfile: {
        marginTop: 20,
        alignSelf: 'center',
        width: 200,
        height: 200,
    },
    iconInitials: {
        fontSize: '60px',
    },
    label: {
        textAlign: 'right',
        flexBasis: '48%',
        marginTop: 20,
        marginRight: '2%',
        fontSize: '18px',
        alignSelf: 'center',
        
    },
    text: {
        textAlign: 'left',
        flexBasis: '48%',
        marginLeft: '2%',
        marginTop: 20,
        fontSize: '18px',
        alignSelf: 'center',
        color: colors.darkShadeGray,
    }
})

