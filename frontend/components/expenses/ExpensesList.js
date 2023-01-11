import { Pressable, FlatList, View, StyleSheet } from "react-native";
import { useState } from "react";
import colors from '../../styles/palette';
import ProfileIcon from "../ProfileIcon";
import Text from "../../custom/MyText";
import { useNavigation } from "@react-navigation/native";

export default function ExpensesList({ style, count, setCount, expenses, setExpenses, headerTitle, showPaid, roommates }) {

    const navigation = useNavigation()

    const markAsPaid = (expense) => {
        let expensesTemp = expenses
        expensesTemp.find(exp => exp.id === expense.id).paid = !expensesTemp.find(exp => exp.id === expense.id).paid
        
        if (!showPaid) {
            expensesTemp = expensesTemp.filter(exp => !exp.paid)
        }
        setCount(count + 1)
        setExpenses(expensesTemp)
    }

    const renderExpenseItem = ({ name, description, due, ind_amount, pay_to, paid, id}) => {
        const date = due ? new Date(due).toDateString() : ""
        const paidButtonStyles = paid && styles.paidButton
        const person = roommates.find(roommate => roommate.id === pay_to)
        return (
            <Pressable 
                style={styles.item} 
                onPress={() => navigation.navigate("Expense", { name })}
            >
                <ProfileIcon person={person} style={{ wrapper: styles.itemIcon }} />
                
                <View style={styles.col1}>
                    <Text style={styles.itemName}>{name}</Text>
                    <Pressable style={styles.itemButton}>
                        <Pressable 
                            style={styles.buttonText}
                            onPress={() => markAsPaid({ id, paid })}
                        >
                            <Text style={[styles.buttonText, paidButtonStyles]}>{paid ? "Paid" : "Mark Paid"}</Text>
                        </Pressable>
                    </Pressable>
                    
                </View>
                
                <View style={styles.col2}>
                    <Text style={styles.itemAmount}>${ind_amount}</Text>
                    {
                        !paid && <Text style={styles.itemDue}>{date}</Text>
                    }
                    
                </View>
            </Pressable>
        )
    }

    return (
        <FlatList
            style={[styles.flatlist, style]}
            ListHeaderComponent={() => <Text style={styles.header}>{headerTitle}</Text>}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            ListEmptyComponent={() => <Text style={styles.emptyListText}>No Upcoming Expenses!</Text>}
            data={expenses}
            extraData={count}
            renderItem={({item}) => renderExpenseItem(item)}
        />
    )
}

const styles = StyleSheet.create({
    flatlist: {
        paddingTop: '3%'
    },
    header: {
        color: colors.textGray,
        fontSize: '28px',
        textAlign: 'center'
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingBottom: 20,
    },
    itemIcon: {
        flexBasis: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    col1: {
        flexBasis: '40%',
        display: 'flex',
        marginLeft: '5%',
    },
    itemName: {
        flex: 1,
        color: colors.textGray,
        fontSize: '22px',
        marginBottom: 15,
    },
    itemButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.green,
        color: colors.textGray,
        width: 80,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.green,
        margin: 0,
        textAlign: 'center',
    },
    paidButton: {
        backgroundColor: colors.green,
        color: colors.backgroundGray,
    },
    col2: {
        flex: 1,
        marginRight: '5%',
    },
    itemAmount: {
        color: colors.textGray,
        textAlign: 'right',
        fontSize: '24px',
        color: colors.red,
        marginBottom: 15,
    },
    itemDue: {
        textAlign: 'right',
    },
    divider: {
        width: '80%',
        height: 1,
        marginLeft: '15%',
        backgroundColor: colors.shadeGray,
    },
    emptyListText: {
        fontSize: '24px',
        textAlign: 'center',
        marginTop: '40%',
        color: colors.darkShadeGray,
    }
})