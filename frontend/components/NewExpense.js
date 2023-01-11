import { useEffect, useState, useRef } from "react";
import { StyleSheet, TextInput, View, TouchableWithoutFeedback, FlatList, Pressable, Platform, SafeAreaView, KeyboardAvoidingView, ScrollView, Button } from "react-native";
import Text from "../custom/MyText";
import colors from '../styles/palette';
import { Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { List } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import { addNewExpense } from "../service/api";
import { useNavigation } from "@react-navigation/native";
import DivideExpense from "./expenses/DivideExpense";

export default function NewExpense({ token, user, roomId, roommates }) {

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={submitExpense} title="Submit" />
            )
        })
    }, [navigation])

    const roommatesWithUser = [...roommates, user]
    const roommatesAmountPercent = roommatesWithUser.map(roommate => { 
        return { ...roommate, amount: 0, percent: 0 } 
    })

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [due, setDue] = useState(new Date())
    const [recurring, setRecurring] = useState(false)
    const [description, setDescription] = useState("")
    const [payTo, setPayTo] = useState(0)
    const [payToPickerOpen, setPayToPickerOpen] = useState(false)
    const [amountDivided, setAmountDivided] = useState(roommatesAmountPercent)
    const [count, setCount] = useState(0) 
    const [alerts, setAlerts] = useState([])

    const submitExpense = async () => {
        if (title != "" && amount != 0) {
            const body = {
                userId: user.id,
                roomId,
                expense: {
                    name: title,
                    description: description,
                    due: due,
                    payTo: payTo,
                    recurring: recurring,
                    totalAmount: amount,
                    amounts: amountDivided.map(val => { return { id: val.id, amount: parseFloat(val.amount) }}),
                    alerts: alerts
                }
            }
            console.log(body)
            const response = await addNewExpense(body, token)
            console.log(response)

            if (response != null && response.message && response.message === "success") {
                setTitle("")
                setAmount(0)
                setDue(new Date())
                setRecurring(false)
                setDescription("")
                setPayTo(0)
                setAmountDivided(roommatesAmountPercent)
                setAlerts([])
                navigation.navigate("main")
            }
        }
    }

    useEffect(() => {
        if (alerts.length <= 1) {
            setAlerts([{ date: due }])
        }
    }, [due])

    const items = [
        { label: "Landlord", value: 0 }, 
        { label: user.firstname + " " + user.lastname, value: user.id}, 
        ...roommates.map(roommate => { return { label: roommate.firstname + " " + roommate.lastname, value: roommate.id}})
    ]
    
   

    const setDecimals = () => {
        // setAmount(parseFloat(amount).toFixed(2))
        amountDivided.forEach(item => {
            item.amount = parseFloat(item.amount).toFixed(2)
            item.percent = parseFloat(item.percent).toFixed(3)
        })
        setCount(count + 1)
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidHide", () => {
            setDecimals();
        })
    }, [])

    useEffect(() => {
        if (isNaN(amount)) {
            setAmount(0)
        }
        amountDivided.forEach(item => {
            item.amount = parseFloat(Math.ceil(amount * 100 / amountDivided.length) / 100).toFixed(2)
            item.percent = parseFloat(100 / amountDivided.length).toFixed(3)
        })
    }, [amount])

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            behavior="padding"
            style={{ flex: 1 }}
            enabled
        >
        <ScrollView>
        <TouchableWithoutFeedback 
            onPress={() => { Keyboard.dismiss() }} 
            style={{width: '100%'}}
        >
            <View>
                <TextInput 
                    style={styles.titleInput}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Expense Name"
                />
                <List.AccordionGroup>
                    <List.Accordion 
                        open={true}
                        id="1"
                        title="Main Info"
                        style={[styles.mainInfoAccordion]}
                    >
                        
                        <View style={styles.mainInfoBlock} key={1}>
                        

                            <Text style={styles.payToLabel}>Pay this expense to:</Text>
                            <DropDownPicker
                                items={items}
                                value={payTo}
                                defaultIndex={0}
                                containerStyle={styles.payToDropdown}
                                onSelectItem={(value) => setPayTo(value.value)}
                                onOpen={() => setPayToPickerOpen(true)}
                                open={payToPickerOpen}
                                onClose={() => setPayToPickerOpen(false)}
                                style={styles.payToDropdown}
                                listMode="SCROLLVIEW"
                            />

                            <Text style={styles.amountLabel}>Amount:</Text>
                            <Text style={styles.dueLabel}>Due: </Text>
                            <TextInput
                                style={styles.inputAmount}
                                onChangeText={setAmount}
                                value={amount}
                                placeholder="0.00"
                                keyboardType="numeric"
                            />
                            <DateTimePicker
                                style={styles.inputDate}
                                testID="dateTimePicker"
                                value={due}
                                is24Hour={true}
                                onChange={(event, date) => setDue(date)}
                                minimumDate={new Date()}
                            />

                            <View style={styles.recurringView}>
                                <Checkbox
                                    style={styles.recurringCheckbox}
                                    value={recurring}
                                    onValueChange={() => setRecurring(!recurring)}
                                />
                                <Pressable 
                                    style={styles.recurringCheckboxText}
                                    onPress={() => setRecurring(!recurring)}
                                >
                                    <Text>Is this a recurring payment every month?</Text>
                                </Pressable>
                            </View>

                            <Text 
                                style={{ marginLeft: '5%', marginRight: '5%', marginBottom: 0, marginTop: 25 }}
                            >
                                (Optional) Write a brief description about the expense:
                            </Text>

                            
                            
                            <TextInput 
                                multiline
                                numberOfLines={4}
                                onChangeText={text => setDescription(text)}
                                value={description}
                                style={styles.description}
                            />
                           
                            
                        </View>
                        
                    </List.Accordion>

                    <List.Accordion 
                        id="2"
                        title="Divide Expense"
                        style={styles.divideExpenseAccordion}
                        titleStyle={{ zIndex: -1 }}
                    >
                        <DivideExpense amount={amount} amountDivided={amountDivided} setAmountDivided={setAmountDivided} count={count} setCount={setCount} />
                    </List.Accordion>


                    <List.Accordion 
                        id="3"
                        title="Alerts"
                        style={styles.divideExpenseAccordion}
                        titleStyle={{ zIndex: -1 }}
                    >
                        <View key={3}>
                            <Text style={styles.alertsDescText}>Set alerts for this expense</Text>

                            {
                                alerts.map((alert, index) => {
                                    return (
                                        <View style={styles.alertRow} key={index + new Date().getTime()}>
                                            <Text style={styles.alertTitle}>Alert {index + 1}</Text>
                                            <DateTimePicker
                                                style={[styles.inputDate, styles.alertInputDate]}
                                                testID="dateTimePicker"
                                                value={alert.date}
                                                is24Hour={true}
                                                onChange={(event, date) => {
                                                    const newAlerts = alerts.map((item, idx) => {
                                                        if (idx === index) {
                                                            item.date = date
                                                        }
                                                        return item
                                                    })
                                                        
                                                    setAlerts(newAlerts)
                                                }}
                                                minimumDate={new Date()}
                                            />
                                            <Pressable
                                                onPress={() => {
                                                    const newAlerts = alerts.filter((item, idx) => idx !== index)
                                                    setAlerts(newAlerts)
                                                }}
                                                style={styles.alertDeleteBtn}
                                            >
                                                <Text style={{ color: colors.red }}>Remove</Text>
                                            </Pressable>
                                        </View>
                                    )
                                })
                            }

                            <Pressable
                                onPress={() => setAlerts([...alerts, { date: new Date()}])}    
                                style={styles.addAlertButton}
                            >
                                <Text style={styles.addAlertButtonText}>+ New Alert</Text>
                            </Pressable>
                        </View>

                    </List.Accordion>
                    
                </List.AccordionGroup>

            </View>
        </TouchableWithoutFeedback>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

// alerts

const styles = StyleSheet.create({
    newExpense: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        
    },
    titleInput: {
        height: 60,
        width: '95%',
        margin: '2.5%',
        backgroundColor: colors.midLightShadeGray,
        padding: 10,
        fontSize: '24px',
        marginBottom: 25,
    },


    // Main Info Accordion
    mainInfoAccordion: {

    },
    mainInfoBlock: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingBottom: 10,
        justifyContent: 'center',
    },
    amountLabel: {
        width: '50%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: '18px',
        marginBottom: 15,
    },
    dueLabel: {
        width: '50%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: '18px',
        marginBottom: 15,
    },
    inputAmount: {
        borderWidth: 1,
        fontSize: '18px',
        padding: 10,
        height: 40,
        alignSelf: 'center',
        width: '25%',
        marginLeft: '5%',
    },
    inputDate: {
        marginLeft: '20%',
    },
    payToLabel: {
        // marginLeft: '10%',
        // alignSelf: 'flex-start',
        paddingTop: 15,
        marginBottom: 5,
    },
    payToDropdown: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%', 
        marginBottom: 15,
        zIndex: 99
    },
    recurringView: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: '15%'
    },
    recurringCheckbox: {
        marginRight: 20,
        alignSelf: 'center'
    },
    recurringCheckboxText: {
        width: '75%',
    },
    description: {
        height: 100,
        width: '80%',
        margin: '2.5%',
        backgroundColor: colors.lightShadeGray,
        borderWidth: 1,
        padding: 10,
        fontSize: '16px',
        marginBottom: 25,
    },

    


    alertsDescText: {
        fontSize: '20px',
        marginTop: 25,
        marginLeft: '5%',
        width: '90%',
    },
    alertRow: {
        display: 'flex',
        flexDirection: 'row',
        margin: '5%',
        justifyContent: 'space-between'
    },
    alertTitle: {
        fontSize: '18px',
        alignSelf: 'center',
    },
    alertInputDate: {
        marginLeft: 0,
        
    },
    alertDeleteBtn: {
        alignSelf: 'center',
        borderColor: colors.textGray,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: colors.red
    },
    addAlertButton: {
        marginLeft: '5%',
        marginTop: 25
    },
    addAlertButtonText: {
        fontSize: '18px',
        color: '#0000AA',
        marginBottom: 20,
    }
    
})