import { db } from '@/firebaseConfig';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams } from 'expo-router';
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface ServiceRecord {
    id: string;
    serviceType: string;
    motorcycle: string;
    status: string;
    assignedStaff?: string;
    amount?: string;
    estCost?: string;
    estTime?: string;
    date?: string;
    time?: string;
    issueDescription?: string;
    createdAt?: any;
}

export function Completed({ username }: { username: string }) {
    const [completedServices, setCompletedServices] = useState<ServiceRecord[]>([]);

    useEffect(() => {
        if (!username) return;
        const q = query(
            collection(db, "services"),
            where("customer", "==", username),
            where("status", "==", "completed")
        );

        const unsubscribe = onSnapshot(q, (snap) => {
            setCompletedServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceRecord)));
        });
        return () => unsubscribe();
    }, [username]);

    return (
        <View style={{ marginTop: 10 }}>
            {completedServices.map((item) => (
                <View key={item.id} style={styles.AS_COMP2}>
                    <View style={styles.AS_COMP2_SUB1}>
                        <View>
                            <Text style={styles.boldText}>{item.serviceType}</Text>
                            <Text style={styles.subText}>{item.motorcycle}</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: '#2ecc71' }]}>
                            <Text style={styles.statusText}>COMPLETED</Text>
                        </View>
                    </View>
                    <View style={styles.component}>
                        <View><Text style={styles.label}>Staff</Text><Text style={styles.value}>{item.assignedStaff || "N/A"}</Text></View>
                        <View><Text style={styles.label}>Total Paid</Text><Text style={[styles.value, { color: '#2ecc71' }]}>₱{item.amount || item.estCost || "0"}</Text></View>
                        <View><Text style={styles.label}>Date</Text><Text style={styles.value}>{item.date}</Text></View>
                    </View>
                    <TouchableOpacity style={styles.chatButton}>
                        <Entypo name='text-document' size={20} color={'black'} />
                        <Text style={{ fontWeight: '600', marginLeft: 8 }}>View Service Summary</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

export function Active({ username }: { username: string }) {
    const [data, setData] = useState<ServiceRecord[]>([]);

    useEffect(() => {
        if (!username) return;
        const q = query(
            collection(db, "services"),
            where("customer", "==", username),
            where("status", "in", ["pending", "active"])
        );
        const unsub = onSnapshot(q, (snap) => {
            setData(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceRecord)));
        });
        return () => unsub();
    }, [username]);

    return (
        <View style={{ marginTop: 10 }}>
            {data.map((item) => {
                const isApproved = item.status === 'active';

                return (
                    <View key={item.id} style={styles.AS_COMP2}>
                        {/* 1. Header */}
                        <View style={styles.requestHeaderRow}>
                            <View style={styles.refBadge}>
                                <Text style={styles.refText}>REF: {item.id.substring(0, 5)}</Text>
                            </View>
                            <View style={[styles.statusLabelBadge, isApproved && { backgroundColor: '#000000' }]}>
                                <Text style={[styles.statusLabelText, isApproved && { color: '#ffffff' }]}>
                                    {isApproved ? 'Approved & Ongoing' : 'Pending Approval'}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.serviceTitle}>{item.serviceType}</Text>
                        <Text style={styles.motorcycleSub}>{item.motorcycle}</Text>

                        {/* 2. Stepper Tracker */}
                        <View style={styles.stepperContainer}>
                            <View style={styles.stepItem}>
                                {/* Step 1 turns black when approved */}
                                <View style={[styles.stepCircle, isApproved && styles.stepActive]}>
                                    <Text style={[styles.stepNumber, isApproved && { color: 'white' }]}>1</Text>
                                </View>
                                <Text style={styles.stepLabel}>Approved</Text>
                            </View>
                            <View style={[styles.stepLine, isApproved ? { backgroundColor: '#000' } : { backgroundColor: '#dee2e6' }]} />
                            
                            <View style={styles.stepItem}>
                                <View style={styles.stepCircle}>
                                    <Text style={styles.stepNumber}>2</Text>
                                </View>
                                <Text style={styles.stepLabel}>Payment</Text>
                            </View>
                            <View style={styles.stepLineDisabled} />
                            
                            <View style={styles.stepItem}>
                                <View style={styles.stepCircle}>
                                    <Text style={styles.stepNumber}>3</Text>
                                </View>
                                <Text style={styles.stepLabel}>Verified</Text>
                            </View>
                        </View>

                        {/* 3. Conditional Info Display */}
                        {isApproved ? (
                            /* --- DISPLAYED WHEN APPROVED --- */
                            <View style={styles.adminFeedbackBox}>
                                <Text style={styles.feedbackTitle}>Admin Message & Estimation</Text>
                                <View style={styles.infoGrid}>
                                    <View style={styles.infoCol}>
                                        <Text style={styles.infoLabel}>Assigned Staff</Text>
                                        <Text style={styles.infoValue}>{item.assignedStaff || "Technician A"}</Text>
                                    </View>
                                    <View style={styles.infoCol}>
                                        <Text style={styles.infoLabel}>Estimated Cost</Text>
                                        <Text style={[styles.infoValue, { color: '#2ecc71', fontWeight: '700' }]}>
                                            ₱{item.estCost}
                                        </Text>
                                    </View>
                                    <View style={styles.infoCol}>
                                        <Text style={styles.infoLabel}>Est. Duration</Text>
                                        <Text style={styles.infoValue}>{item.estTime || "2 Hours"}</Text>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            /* --- DISPLAYED WHEN STILL PENDING --- */
                            <View style={styles.infoGrid}>
                                <View style={styles.infoCol}>
                                    <Text style={styles.infoLabel}>Preferred Date</Text>
                                    <Text style={styles.infoValue}>{item.date}</Text>
                                </View>
                                <View style={styles.infoCol}>
                                    <Text style={styles.infoLabel}>Preferred Time</Text>
                                    <Text style={styles.infoValue}>{item.time}</Text>
                                </View>
                                <View style={styles.infoCol}>
                                    <Text style={styles.infoLabel}>Request Date</Text>
                                    <Text style={styles.infoValue}>{item.date}</Text> 
                                </View>
                            </View>
                        )}

                        {/* 4. Issue Description */}
                        <View style={styles.descriptionArea}>
                            <Text style={styles.infoLabel}>Issue Description</Text>
                            <View style={styles.descriptionTextBg}>
                                <Text style={styles.descriptionText}>{item.issueDescription}</Text>
                            </View>
                        </View>

                        {/* 5. Conditional Bottom Message */}
                        {isApproved ? (
                            <View style={[styles.adminMessageBg, { backgroundColor: '#ffffff', borderColor: '#000000' }]}>
                                <Text style={[styles.adminMessageText, { color: '#e42424' }]}>
                                    ✅ <Text style={{ fontWeight: 'bold' }}>Your request is approved!</Text> Please proceed to the shop or prepare for the service.
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.adminMessageBg}>
                                <Text style={styles.adminMessageText}>
                                    ⌛ <Text style={{ fontWeight: 'bold' }}>Waiting for admin approval.</Text> We'll notify you once reviewed.
                                </Text>
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
}

export default function ServicePage() {
    const { username } = useLocalSearchParams();
    const [tab, setTab] = useState<'active' | 'completed'>('active');
    const [counts, setCounts] = useState({ active: 0, completed: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMotorcycle, setSelectedMotorcycle] = useState('Yamaha Mio i 125');
    const [selectedService, setSelectedService] = useState('Change Oil');
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [issue, setIssue] = useState('');

    useEffect(() => {
        if (!username) return;
        const q = query(collection(db, "services"), where("customer", "==", username));
        const unsubscribe = onSnapshot(q, (snap) => {
            const all = snap.docs.map(doc => doc.data() as ServiceRecord);
            setCounts({
                active: all.filter(s => s.status === 'active' || s.status === 'pending').length,
                completed: all.filter(s => s.status === 'completed').length
            });
        });
        return () => unsubscribe();
    }, [username]);

    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, "services"), {
                customer: username, motorcycle: selectedMotorcycle, serviceType: selectedService,
                date: date.toLocaleDateString(), time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                issueDescription: issue, status: "pending", createdAt: serverTimestamp(),
                assignedStaff: "", estCost: "0", estTime: "", amount: "", paymentMethod: "GCash"
            });
            setModalVisible(false); setIssue(''); alert("Request Sent!");
        } catch (e) { console.error(e); }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tabButton, tab === 'active' && styles.activeTabBtn]} onPress={() => setTab('active')}>
                    <AntDesign name="clock-circle" size={18} color={tab === 'active' ? 'white' : 'black'} />
                    <Text style={{ color: tab === 'active' ? 'white' : 'black' }}> Active ({counts.active})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, tab === 'completed' && styles.activeTabBtn]} onPress={() => setTab('completed')}>
                    <Feather name="check-circle" size={18} color={tab === 'completed' ? 'white' : 'black'} />
                    <Text style={{ color: tab === 'completed' ? 'white' : 'black' }}> Completed ({counts.completed})</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.RequestService} onPress={() => setModalVisible(true)}>
                <AntDesign name='plus' size={20} color={'white'} /><Text style={{ color: 'white', fontWeight: 'bold' }}>Request New Service</Text>
            </TouchableOpacity>

            {tab === 'active' ? <Active username={username as string} /> : <Completed username={username as string} />}

            <Modal
                animationType='slide'
                visible={modalVisible}
                transparent={true}
                statusBarTranslucent={true} // Ensures blur covers the status bar area
            >
                <BlurView style={styles.modalOverlay} intensity={90} tint='dark'>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>New Service Request</Text>

                        {/* Select Motorcycle */}
                        <Text style={styles.inputLabel}>Select Motorcycle</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedMotorcycle}
                                onValueChange={(v) => setSelectedMotorcycle(v)}
                                style={styles.pickerStyle}
                            >
                                <Picker.Item label="Yamaha Mio i 125" value="Yamaha Mio i 125" />
                                <Picker.Item label="Honda Click 125i" value="Honda Click 125i" />
                                <Picker.Item label="Suzuki Burgman" value="Suzuki Burgman" />
                            </Picker>
                        </View>

                        {/* Select Service Type */}
                        <Text style={styles.inputLabel}>Service Type</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedService}
                                onValueChange={(v) => setSelectedService(v)}
                                style={styles.pickerStyle}
                            >
                                <Picker.Item label='Change Oil' value='Change Oil' />
                                <Picker.Item label='Brake Service' value='Brake Service' />
                                <Picker.Item label='Engine Tune Up' value='Engine Tune Up' />
                            </Picker>
                        </View>

                        {/* Date and Time Buttons */}
                        <View style={styles.dateTimeRow}>
                            <TouchableOpacity onPress={() => setShowDate(true)} style={styles.dateTimeBtn}>
                                <Text style={styles.dateTimeText}>📅 {date.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowTime(true)} style={styles.dateTimeBtn}>
                                <Text style={styles.dateTimeText}>⏰ {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            </TouchableOpacity>
                        </View>

                        {showDate && (
                            <DateTimePicker
                                value={date}
                                mode='date'
                                display="default"
                                onChange={(e, d) => { setShowDate(false); if (d) setDate(d); }}
                            />
                        )}

                        {showTime && (
                            <DateTimePicker
                                value={time}
                                mode='time'
                                is24Hour={false}
                                display="default"
                                onChange={(e, t) => { setShowTime(false); if (t) setTime(t); }}
                            />
                        )}

                        {/* Issue Description */}
                        <Text style={styles.inputLabel}>Issue Description</Text>
                        <TextInput
                            placeholder='Describe the problem...'
                            multiline
                            numberOfLines={4}
                            style={styles.textArea}
                            value={issue}
                            onChangeText={setIssue}
                        />

                        {/* Modal Actions */}
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit Request</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                                <Text style={{ color: '#666' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    tabContainer: { flexDirection: 'row', gap: 15 },
    tabButton: { flex: 1, flexDirection: 'row', padding: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd' },
    activeTabBtn: { backgroundColor: '#0b0e2c', borderColor: '#0b0e2c' },
    RequestService: { backgroundColor: '#000', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20, gap: 10 },
    AS_COMP2: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
    AS_COMP2_SUB1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    boldText: { fontWeight: 'bold', fontSize: 17 },
    subText: { fontSize: 13, color: '#666' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    statusText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
    component: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 },
    label: { fontSize: 12, color: '#888' },
    value: { fontWeight: '600', fontSize: 14 },
    chatButton: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    requestHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    refBadge: { backgroundColor: '#f1f1f1', padding: 5, borderRadius: 5 },
    refText: { fontSize: 12, fontWeight: 'bold' },
    statusLabelBadge: { backgroundColor: '#000000', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5 },
    statusLabelText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
    serviceTitle: { fontSize: 20, fontWeight: 'bold' },
    motorcycleSub: { fontSize: 14, color: '#666', marginBottom: 20 },
    stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
    stepItem: { alignItems: 'center', width: 60 },
    stepCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#e9ecef', justifyContent: 'center', alignItems: 'center' },
    stepActive: { backgroundColor: '#000' },
    stepNumber: { color: '#adb5bd', fontSize: 12, fontWeight: 'bold' },
    stepLabel: { fontSize: 10, color: '#868e96', marginTop: 5 },
    stepLine: { height: 2, flex: 1, backgroundColor: '#000', marginHorizontal: -10, marginBottom: 15 },
    stepLineDisabled: { height: 2, flex: 1, backgroundColor: '#dee2e6', marginHorizontal: -10, marginBottom: 15 },
    infoGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    infoCol: { flex: 1 },
    infoLabel: { fontSize: 11, color: '#868e96' },
    infoValue: { fontSize: 13, fontWeight: '500' },
    statusBoxRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    statusBoxYellow: { flex: 1, backgroundColor: '#ffffff', borderLeftWidth: 4, borderLeftColor: '#000000', padding: 10, borderRadius: 8 },
    statusBoxOrange: { flex: 1, backgroundColor: '#ffffff', borderLeftWidth: 4, borderLeftColor: '#000000', padding: 10, borderRadius: 8 },
    statusBoxLabel: { fontSize: 11, color: '#868e96' },
    statusBoxValueYellow: { color: '#000000', fontWeight: 'bold' },
    statusBoxValueOrange: { color: '#000000', fontWeight: 'bold' },
    descriptionArea: { marginBottom: 20 },
    descriptionTextBg: { backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 },
    descriptionText: { fontSize: 13 },
    adminMessageBg: { backgroundColor: '#ffffff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#000000' },
    adminMessageText: { fontSize: 12, color: '#000000' },
    modalOverlay: { flex: 1, justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: 'white', borderRadius: 20, padding: 25 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    dateTimeBtn: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 15 },
    textArea: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, height: 80, marginBottom: 20 },
    modalActions: { flexDirection: 'row', gap: 10 },
    submitBtn: { flex: 2, backgroundColor: 'black', padding: 15, borderRadius: 8, alignItems: 'center' },
    cancelBtn: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
    inputLabel: {fontSize: 14,fontWeight: '600',color: '#444',marginBottom: 8,},
    pickerWrapper: {borderWidth: 1,borderColor: '#ddd',borderRadius: 10,marginBottom: 15,overflow: 'hidden',},
    pickerStyle: {width: '100%',height: 50,},
    dateTimeRow: {flexDirection: 'row',gap: 10,marginBottom: 15,},
    dateTimeText: {fontSize: 14,color: '#333',},
    adminFeedbackBox: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    feedbackTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#495057',
        marginBottom: 10,
        textTransform: 'uppercase',
    },

});