import { TextInput, StyleSheet, View } from "react-native";
import Text from "../../custom/MyText";


export default function DivideExpense({ amount, amountDivided, setAmountDivided, count, setCount }) {

    const updateAmountDivided = (person, newAmount) => {
        console.log(person)
        if (isNaN(newAmount)) {
            newAmount = 0
        }
        amountDivided.find(item => item.id === person.id).amount = newAmount
        amountDivided.find(item => item.id === person.id).percent = parseFloat(100 * newAmount / amount).toFixed(3)
        setCount(count + 1)
    }

    const updateAmountDividedPercent = (person, newPercent) => {
        if (isNaN(newPercent)){
            newPercent = parseFloat(100 / amountDivided.length()).toFixed(3)
        }
        amountDivided.find(item => item.id === person.id).percent = newPercent
        amountDivided.find(item => item.id === person.id).amount = parseFloat((newPercent / 100) * amount).toFixed(2)
        setCount(count + 1)
    }

    const renderAllocator = (person) => {
        return (
            <View style={styles.allocateRow} key={person.id}>
                <Text style={styles.allocateName}>{person.firstname} {person.lastname}</Text>
                <TextInput
                    value={person.value}
                    defaultValue={person.amount.toString()}
                    onChangeText={(amount) => updateAmountDivided(person, amount)}
                    keyboardType="numeric"
                    style={styles.amountDividedInputNumber}
                />
                <TextInput
                    defaultValue={person.percent.toString()}
                    onChangeText={(percent) => updateAmountDividedPercent(person, percent)}
                    keyboardType="numeric"
                    style={styles.amountDividedInputPercent}
                />
            </View>
        )
    }



    return (
        <View style={styles.divideExpenseBlock} key={2}>
            <Text 
                style={{ marginLeft: '5%', marginRight: '5%', marginBottom: 10, marginTop: 10 }}
            >
                How should this expense be divided among roommates?
            </Text>

            <View style={styles.allocateRow}>
                <Text style={{ width: '25%', marginLeft: '5%', fontWeight: 'bold' }}>Roommate</Text>
                <Text style={{ width: '27.5%', marginLeft: '5%', textAlign: 'center', fontWeight: 'bold' }}>$</Text>
                <Text style={{ width: '27.5%', marginLeft: '5%', textAlign: 'center', fontWeight: 'bold' }}>%</Text>
            </View>

            {
                amountDivided.map(item => {
                    return renderAllocator(item)
                })
            }

            <View style={styles.allocateRow}>
                <Text style={{ width: '25%', marginLeft: '5%', fontWeight: 'bold' }}>Total</Text>
                <Text style={{ width: '27.5%', marginLeft: '5%', textAlign: 'center', fontWeight: 'bold' }}>
                    {amountDivided.reduce((acc, val) => acc + parseFloat(val.amount), 0).toFixed(2)}
                    </Text>
                <Text style={{ width: '27.5%', marginLeft: '5%', textAlign: 'center', fontWeight: 'bold' }}>
                    {parseFloat(amountDivided.reduce((acc, val) => acc + parseFloat(val.percent), 0)).toFixed(2)}
                </Text>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    divideExpenseAccordion: {
        zIndex: -1
    },
    divideExpenseBlock: {
        // backgroundColor: 'blue'
    },
    
    allocateRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    allocateName: {
        width: '25%',
        marginLeft: '5%',
        alignSelf: 'center'
    },
    amountDividedInputNumber: {
        borderWidth: 1,
        fontSize: '16px',
        padding: 10,
        height: 40,
        alignSelf: 'center',
        width: '27.5%',
        marginLeft: '5%',
    },
    amountDividedInputPercent: {
        borderWidth: 1,
        fontSize: '16px',
        padding: 10,
        height: 40,
        alignSelf: 'center',
        width: '27.5%',
        marginLeft: '5%',
    },


})