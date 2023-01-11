import { StyleSheet, View } from 'react-native';
import colors from '../styles/palette';
import Text from "../custom/MyText";


export default function ProfileIcon({ person, style }) {
    return (
        <View style={[style && style.wrapper]}>
            <View style={[styles.profile, style && style.profile]}>
                <Text style={[styles.initials, style && style.initials]}>
                    {
                        person === undefined || (!person.firstname && !person.lastname) ? 
                        "L" : 
                        (person.firstname && person.firstname[0]) + (person.lastname && person.lastname[0])
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        borderWidth: 1,
        borderColor: colors.shadeGray,
        borderRadius: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        backgroundColor: colors.lightShadeGrade,
    },
    initials: {
        fontSize: '20px',
        alignSelf: 'center',
        color: colors.textGray,
    }
})