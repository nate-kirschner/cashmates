import { Text } from "react-native";

export default props => <Text {...props} style={[{fontFamily: 'Helvetica'}, props.style]}>{props.children}</Text>