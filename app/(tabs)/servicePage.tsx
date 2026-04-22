import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { default as DateTimePicker, default as DateTimePicker2 } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function Completed() {


    return (
        <View>

            <View style={styles.AS_COMP2}>
                <View style={styles.AS_COMP2_SUB1}>

                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Chain Adjustment</Text>
                        <Text style={{ fontSize: 12 }}>Honda CBR600RR</Text>
                    </View>

                    <View style={{ backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10, borderColor: 'rgb(255, 255, 255)', borderWidth: 1, elevation: 3 }}>
                        <Text style={{ color: 'black', fontSize: 11 }}>Completed</Text>
                    </View>

                </View>


                <View style={styles.component}>

                    <View>
                        <Text style={{ fontSize: 15 }}>Assigned Staff</Text>
                        <Text style={{ fontWeight: 'bold' }}>Tech B</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15 }}>Total Cost: </Text>
                        <Text style={{ fontWeight: 'bold' }}>{'\u20B1'}4,000</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15 }}>{'Completed Date'}</Text>
                        <Text style={{ fontWeight: 'bold' }}>2026-03-19</Text>
                    </View>
                </View>

                <View style={{ marginLeft: 15 }}>
                    <Text>Your Rating</Text>
                    <Text>{'\u2605 \u2605 \u2605 \u2605'} "Excellent service!"</Text>
                </View>



                <TouchableOpacity style={styles.chatButton}>
                    <Entypo name='download' size={30} color={'black'} />
                    <Text>Download PDF</Text>
                </TouchableOpacity>

            </View>

        </View>
    );

}


export function Active() {

    return (
        <View>


            <View style={styles.AS_COMP2}>
                <View style={styles.AS_COMP2_SUB1}>

                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Chain Adjustment</Text>
                        <Text style={{ fontSize: 12 }}>Honda CBR600RR</Text>
                    </View>

                    <View style={{ backgroundColor: 'black', justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontSize: 11 }}>Waiting for Parts</Text>
                    </View>

                </View>


                <View style={styles.component}>

                    <View>
                        <Text style={{ fontSize: 15 }}>Assigned Staff</Text>
                        <Text style={{ fontWeight: 'bold' }}>Tech B</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15 }}>Est. Cost: </Text>
                        <Text style={{ fontWeight: 'bold' }}>{'\u20B1'}4,000</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15 }}>{'Estimated Time'}</Text>
                        <Text style={{ fontWeight: 'bold' }}>1 Hour</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15 }}>{'Request Date'}</Text>
                        <Text style={{ fontWeight: 'bold' }}>2026-03-19</Text>
                    </View>
                </View>

                <View>

                    <Text style={{ marginLeft: 5 }}>Notes</Text>
                    <Text
                        style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderRadius: 10, padding: 10 }}
                    >Need to order new chain</Text>

                </View>



                <TouchableOpacity style={styles.chatButton}>
                    <AntDesign name='wechat' size={30} color={'black'} />
                    <Text>Chat with Admin</Text>
                </TouchableOpacity>

            </View>



        </View>
    );
}


export default function ServicePage() {


    const [isActive, setIsActive] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);

    const setActive = () => {
        setIsActive(true);
        setIsCompleted(false);
    }


    const setCompleted = () => {
        setIsActive(false);
        setIsCompleted(true);

    }
    const [modalVisible, setModalVisible] = useState(false); // Controls Modal
    const [selectedMotorcycle, setSelectedMotorcycle] = useState(null); // Controls Dropdown Value
    const [selectedService, setSelectedService] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [issue, setIssue] = useState('');

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
    }

    const dateFormat = (rawDate) => {
        let mm = rawDate.getMonth() + 1;
        let dd = rawDate.getDate();
        let yy = rawDate.getFullYear().toString().substr(-2);

        if (mm < 10) mm = `0${mm}`
        if (dd < 10) dd = `0${dd}`

        return `${mm}/${dd}/${yy}`;
    }

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
    }

    const timeFormat = (rawTime) => {
        let hours = rawTime.getHours();
        let minutes = rawTime.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${minutesStr} ${ampm}`;
    }

    return (
        <ScrollView style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>

            <View style={{ flexDirection: 'row', gap: 20 }}>

                <TouchableOpacity style={[styles.ActiveBox, { backgroundColor: isActive ? '#0b0e2c' : 'white', borderColor: 'black', borderWidth: 1 }]}
                    onPress={setActive}
                >
                    <AntDesign name="clock-circle" size={22} color={isActive ? 'white' : 'black'} />
                    <Text style={{ color: isActive ? 'white' : 'black' }}> Active (1)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.Completed, { backgroundColor: isCompleted ? '#0b0e2c' : 'white', borderColor: 'black', borderWidth: 1 }]}
                    onPress={setCompleted}
                >
                    <Feather name="check-circle" size={22} color={isCompleted ? 'white' : 'black'} />
                    <Text style={{ color: isCompleted ? 'white' : 'black' }}> Completed (1)</Text>
                </TouchableOpacity>

            </View>

            <View>

                <TouchableOpacity style={styles.RequestService} onPress={() => setModalVisible(true)}>
                    <AntDesign name='plus' size={24} color={'white'} />
                    <Text style={{ color: 'white' }}>Request Service</Text>
                </TouchableOpacity>

            </View>

            {isActive && <Active />}
            {isCompleted && <Completed />}

            <Modal
                animationType='fade'
                visible={modalVisible}
                statusBarTranslucent={true}
                transparent={true}

            >
                <BlurView
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    intensity={100}
                    tint='dark'
                >
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)' }}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Request Service</Text>

                        <View>
                            <Text>Select Motorcycle</Text>
                            <Picker
                                selectedValue={selectedMotorcycle}
                                onValueChange={(itemValue) => setSelectedMotorcycle(itemValue)}
                                placeholder='Choose a Motorcycle'
                                dropdownIconColor="black"
                                style={{ width: '100%', borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
                            >
                                <Picker.Item label="Yamaha Mio i 125" value="mio" />
                                <Picker.Item label="Honda Click 125i" value="click" />
                                <Picker.Item label="Suzuki Burgman" value="burgman" />
                            </Picker>
                        </View>

                        <View>
                            <Text>Service Type</Text>
                            <Picker
                                placeholder='Choose a service Type'
                                selectedValue={selectedService}
                                onValueChange={(itemValue) => setSelectedService(itemValue)}
                                dropdownIconColor={'black'}
                                style={{ width: '100%', }}
                            >
                                <Picker.Item label='Change Oil' value='change-oil' />
                                <Picker.Item label='Brake Service' value='brake-service' />
                                <Picker.Item label='Engine Tune Up' value='tune-up' />
                            </Picker>
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text>Preferred Date</Text>
                            <View style={{ backgroundColor: 'white', borderWidth: 1, padding: 5, borderRadius: 5, marginBottom: 5 }}>
                                <Text>{dateFormat(date)}</Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: 'black', width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 5 }} onPress={() => setShowDate(true)}>
                                <Text style={{ color: 'white' }}>Select Date</Text>
                            </TouchableOpacity>

                            {showDate && (<DateTimePicker
                                value={date}
                                mode='date'
                                display='calendar'
                                onChange={onDateChange} />)}
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text>Preferred Time</Text>
                            <View style={{ backgroundColor: 'white', borderWidth: 1, padding: 5, borderRadius: 5, marginBottom: 5 }}>
                                <Text>{timeFormat(time)}</Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: 'black', width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 5 }} onPress={() => setShowTime(true)}>
                                <Text style={{ color: 'white' }}>Select Time</Text>
                            </TouchableOpacity>
                            {showTime && (
                                <DateTimePicker2
                                    value={time}
                                    mode='time'
                                    display='clock'
                                    is24Hour={false}
                                    onChange={onTimeChange}
                                />
                            )}
                        </View>

                        <View>
                            <Text>Issue Description</Text>
                            <TextInput
                                placeholder='Describe the issue or service needed'
                                value={issue}
                                onChangeText={setIssue}
                                keyboardType='default'
                                style={{ borderWidth: 1, borderRadius: 5, marginBottom: 10 }}
                            ></TextInput>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderRadius: 5 }}>
                                <Text style={{ color: 'white' }}>Submit Request</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', borderRadius: 5, elevation: 2, width: 120, justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(false)}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </BlurView>
            </Modal>

        </ScrollView>
    );


}



const styles = {


    ActiveBox: {

        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        padding: 10,
        borderRadius: 10,
        flex: 1
    },
    Completed: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        width: 145,
        padding: 10,
        borderRadius: 10,
        flex: 1
    },
    AS_COMP2: {
        elevation: 2,
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10
    },
    AS_COMP2_SUB1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    RequestService: {
        backgroundColor: 'black',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 20,
        gap: 10
    },
    component: {
        flexGrow: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 30,
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10

    },
    chatButton: {
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0,0.1)',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 170,
        padding: 10,
        marginVertical: 20,
        elevation: 1
    },

}



