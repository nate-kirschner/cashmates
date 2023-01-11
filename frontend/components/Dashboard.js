import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import colors from '../styles/palette';
import ProfileIcon from './ProfileIcon';
import ExpensesList from './expenses/ExpensesList';
import Text from '../custom/MyText';
import { expenses as fetchExpenses } from '../service/api';

export default function Dashboard({ token, roomId, userId, roommates }) {

    const [amount, setAmount] = useState(0)
    
    const [expenses, setExpenses] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const calcAmount = expenses.reduce((prev, curr) => prev - curr.ind_amount, 0)
        setAmount(calcAmount)
    }, [expenses, count])

    useEffect(() => {
        const fetchExpenseData = async () => {
            const body = {
                roomId, 
                userId,
            }
            const response = await fetchExpenses(body, token)
            console.log(response)

            setExpenses(response)
            
        }
        fetchExpenseData()
    }, [roomId, userId])

    const getAmountColor = () => {
        if (amount == 0) {
            return { color: "#000000"}
        } else if (amount > 0) {
            return { color: colors.green}
        } else {
            return { color: colors.red}
        }
    }

    return (
        <View style={styles.dashboard}>
            <View style={styles.amountSection}>
                {
                    amount != 0 && (
                        <Text style={styles.amountAboveText}>
                            {amount > 0 ? "You're Owed" : "You Owe"}
                        </Text>
                    )
                }
                <Text style={[styles.amountText, getAmountColor()]}>${Math.abs(amount)}</Text>
                
            </View>

            

            <View style={styles.expensesSection}>
                <ExpensesList expenses={expenses} setExpenses={setExpenses} count={count} setCount={setCount} headerTitle="Upcoming Expenses" showPaid={false} roommates={roommates} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dashboard: {
        flex: 10,
        width: '100%',
        display: 'flex',
        backgroundColor: colors.backgroundGray,
        fontFamily: 'AmericanTypewriter'
    },
    amountSection: {
        flex: 2,
        marginLeft: '10%',
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
    },
    amountAboveText: {
        color: colors.textGray,
        alignSelf: "center"
    },
    amountText: {
        fontSize: '80px',
        alignSelf: "center",
    },
    profilesSection: {
        flex: 1,
    },
    expensesSection: {
        flex: 6,
        borderColor: colors.textGray,
        // borderTopWidth: 1,
        marginTop: "5%",
    },
});




const testData = {
    amount: -950,
    expenses: [
        {
            name: "rent",
            description: "January rent",
            due: "2022-12-31T02:03:22.770Z",
            amount: 950,
            payTo: { firstname: "House", useId: 0 },
            paid: false,
            id: 1
        },
        {
            name: "Gas",
            description: "December Gas Bill",
            due: "2023-01-05T02:03:22.770Z",
            amount: 145.43,
            payTo: { firstname: "House", useId: 0 },
            paid: false,
            id: 2,
        },
        {
            name: "Paper Towels",
            description: "",
            due: null,
            amount: 3.6,
            payTo: { firstname: "Jake", lastname: "Langhoff", userId: 2},
            paid: false,
            id: 3
        },
    ]
}