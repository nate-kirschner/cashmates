import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Text from '../../custom/MyText';
import ExpensesList from "./ExpensesList";
import colors from '../../styles/palette'


export default function AllExpenses() {

    const [recurringExpenses, setRecurringExpenses] = useState(testData.recurringExpenses);
    const [nonRecurringExpenses, setNonRecurringExpenses] = useState(testData.nonRecurringExpenses);

    return (
        <View>
            {/* <ExpensesList expenses={recurringExpenses} style={styles.listTop} headerTitle="Expenses" showPaid={true} /> */}
            <View style={styles.divider} />
            {/* <ExpensesList expenses={nonRecurringExpenses} style={styles.listBottom} headerTitle="Owed To Me" showPaid={true} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    listTop: {
        flexBasis: '48%',
    },
    listBottom: {
        marginTop: '0%',
        flexBasis: '52%',
    },
    divider: {
        width: '80%',
        marginLeft: '10%',
        height: 1,
        backgroundColor: colors.darkShadeGray
    },
})



const testData = {
    recurringExpenses: [
        {
            name: "rent",
            description: "January rent",
            due: "2022-12-31T02:03:22.770Z",
            amount: 950,
            payTo: { firstName: "House", useId: 0 },
            paid: false,
            id: 1
        },
        {
            name: "rent",
            description: "December rent",
            due: "2022-11-30T02:03:22.770Z",
            amount: 950,
            payTo: { firstName: "House", useId: 0 },
            paid: true,
            id: 2
        },
        
    ],
    nonRecurringExpenses: [
        {
            name: "Gas",
            description: "December Gas Bill",
            due: "2023-01-05T02:03:22.770Z",
            amount: 145.43,
            payTo: { firstName: "House", useId: 0 },
            paid: false,
            id: 2,
        },
        {
            name: "Paper Towels",
            description: "",
            due: null,
            amount: 3.6,
            payTo: { firstName: "Jake", lastName: "Langhoff", userId: 2},
            paid: false,
            id: 3
        },
        {
            name: "Gas",
            description: "November Gas Bill",
            due: "2022-12-05T02:03:22.770Z",
            amount: 108.26,
            payTo: { firstName: "House", useId: 0 },
            paid: true,
            id: 4,
        },
        {
            name: "TP",
            description: "",
            due: null,
            amount: 4.65,
            payTo: { firstName: "Jacob", lastName: "Miller", userId: 6},
            paid: true,
            id: 5,
        },
    ]
}