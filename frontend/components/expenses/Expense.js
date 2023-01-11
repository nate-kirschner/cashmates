import { RootTagContext, View } from "react-native";
import Text from "../../custom/MyText";

export default function Expense({ route }) {
    const { name, description, payTo, due, paid, amount, totalAmount } = route.params;
    
    return (
        <View>
            <Text>{name}</Text>
            <Text>${amount}</Text>

            
        </View>
    )
}