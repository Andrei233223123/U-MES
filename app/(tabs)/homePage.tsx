import { ThemedText } from '@/components/ThemedText';
import { db } from '@/firebaseConfig'; // Ensure your config is correct
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface ServiceRecord {
    id: string;
    serviceType: string;
    motorcycle: string;
    status: string;
    assignedStaff?: string;
    estCost?: string;
}

export default function HomePage() {
    const { username } = useLocalSearchParams();
    const navigation = useNavigation();


    // Stats States
    const [activeCount, setActiveCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [motoCount, setMotoCount] = useState(0);

    // List States
    const [recentActive, setRecentActive] = useState<ServiceRecord[]>([]);
    const [recentCompleted, setRecentCompleted] = useState<ServiceRecord[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
        if (!username) return;

        // 1. Listen for Services (Active & Completed)
        const qServices = query(collection(db, "services"), where("customer", "==", username));
        const unsubServices = onSnapshot(qServices, (snap) => {
            const allServices = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceRecord));

            const activeList = allServices.filter(s => s.status === 'active' || s.status === 'pending');
            const completedList = allServices.filter(s => s.status === 'completed');

            setRecentActive(activeList.slice(0, 3));
            setRecentCompleted(completedList.slice(0, 1));
            setActiveCount(activeList.length);
            setCompletedCount(completedList.length);
            setLoading(false);
        });

        // 2. Fetch User's Registered Motorcycles Count
        const qUsers = query(collection(db, "users"), where("fullName", "==", username));
        const unsubUsers = onSnapshot(qUsers, (snap) => {
            if (!snap.empty) {
                const userData = snap.docs[0].data();
                setMotoCount(userData.motorcycle?.length || 0);
            }
        });

        // 3. Hardware Back Press Logic
        const onBackPress = () => {
            return true; // Prevents the user from going back to the login screen
        };

        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        // CLEANUP: This runs when the component unmounts
        return () => {
            unsubServices(); // Stop listening to services
            unsubUsers();    // Stop listening to user profile
            subscription.remove(); // Stop listening to back button
        };
    }, [username]);

    if (loading) {
        return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" color="#06121e" /></View>;
    }

    return (
        <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#010408f5', '#06121ef5']}
                style={{ borderRadius: 15, elevation: 5 }}
            >
                <View style={styles.Box}>
                    <ThemedText style={{ color: 'white' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{`Welcome Back, \n${username}`}</Text>
                        {"\n\n"}
                        <Text style={{ fontSize: 14, opacity: 0.8 }}>Manage your motorcycle services and track maintenance in real-time.</Text>
                    </ThemedText>
                </View>
            </LinearGradient>

            {/* Dashboard Stats */}
            <View style={styles.statsGrid}>
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Active Services</Text>
                    <Text style={styles.cardCount}>{activeCount}</Text>
                    <View style={[styles.cardIconBox, { backgroundColor: '#06121ef5' }]}>
                        <FontAwesome name='wrench' size={20} color={'white'} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardLabel}>My Motorcycles</Text>
                    <Text style={styles.cardCount}>{motoCount}</Text>
                    <View style={[styles.cardIconBox, { backgroundColor: '#0b1f33f5' }]}>
                        <MaterialCommunityIcons name='bike' size={22} color={'white'} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardLabel}>History</Text>
                    <Text style={styles.cardCount}>{completedCount}</Text>
                    <View style={[styles.cardIconBox, { backgroundColor: '#2ecc71' }]}>
                        <Feather name='check-circle' size={20} color={'white'} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Alerts</Text>
                    <Text style={styles.cardCount}>0</Text>
                    <View style={[styles.cardIconBox, { backgroundColor: '#f74702' }]}>
                        <Ionicons name='notifications' size={20} color={'white'} />
                    </View>
                </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionContainer}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={{ gap: 12 }}>
                    <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Services', { username: username})}>
                        <AntDesign name='plus-square' size={20} color="#020923" />
                        <Text style={styles.quickText}>Request New Service</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.quickCard, { borderColor: '#101828' }]}>
                        <Ionicons name='chatbubbles-outline' size={20} color="#101828" />
                        <Text style={styles.quickText}>AI Assistant</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Active Services List */}
            <View style={styles.ActiveServices}>
                <View style={styles.AS_COMP}>
                    <Text style={styles.sectionTitle}>In Progress</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>{activeCount}</Text></View>
                </View>

                {recentActive.length > 0 ? recentActive.map((item) => (
                    <View key={item.id} style={styles.AS_COMP2}>
                        <View style={styles.AS_COMP2_SUB1}>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{item.serviceType}</Text>
                                <Text style={{ fontSize: 12, color: '#666' }}>{item.motorcycle}</Text>
                            </View>
                            <View style={styles.statusBadgeSmall}>
                                <Text style={styles.statusTextSmall}>{item.status === 'active' ? 'Ongoing' : 'Pending'}</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 13, marginTop: 5 }}>Technician: {item.assignedStaff || 'TBA'}</Text>
                    </View>
                )) : (
                    <Text style={styles.emptyText}>No active services.</Text>
                )}
            </View>

            {/* Recent Completed List */}
            <View style={styles.CompletedServices}>
                <View style={styles.AS_COMP}>
                    <Text style={styles.sectionTitle}>Recent Completed</Text>
                </View>

                {recentCompleted.length > 0 ? recentCompleted.map((item) => (
                    <View key={item.id} style={styles.AS_COMP2}>
                        <View style={styles.AS_COMP2_SUB1}>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{item.serviceType}</Text>
                                <Text style={{ fontSize: 12, color: '#666' }}>{item.motorcycle}</Text>
                            </View>
                            <View style={styles.completedBadge}>
                                <Text style={styles.completedBadgeText}>Finished</Text>
                            </View>
                        </View>
                        <Text style={{ fontWeight: 'bold', color: '#2ecc71', marginTop: 5 }}>Cost: ₱{item.estCost}</Text>
                    </View>
                )) : (
                    <Text style={styles.emptyText}>No recent history.</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    ScrollView: { padding: 20, backgroundColor: '#fdfdfd' },
    Box: { padding: 25 },
    statsGrid: {
        marginVertical: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 15
    },
    card: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 15,
        backgroundColor: 'white',
        width: '48%',
        padding: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        position: 'relative'
    },
    cardLabel: { fontSize: 12, color: '#666', marginBottom: 5 },
    cardCount: { fontSize: 28, fontWeight: 'bold', color: '#101828' },
    cardIconBox: {
        position: 'absolute', right: 10, bottom: 10,
        padding: 8, borderRadius: 10
    },
    quickActionContainer: {
        backgroundColor: 'white', borderRadius: 15,
        padding: 20, elevation: 3, borderWidth: 1, borderColor: '#f0f0f0'
    },
    sectionTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 15, color: '#101828' },
    quickCard: {
        flexDirection: 'row', gap: 12, borderRadius: 10,
        borderColor: '#020923', borderWidth: 1.5,
        padding: 14, alignItems: 'center'
    },
    quickText: { fontSize: 15, fontWeight: '600' },
    ActiveServices: { marginTop: 30, backgroundColor: 'white', borderRadius: 15, paddingBottom: 15, elevation: 2 },
    AS_COMP: {
        flexDirection: 'row', justifyContent: 'space-between',
        padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0'
    },
    badge: { backgroundColor: '#101828', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5 },
    badgeText: { color: 'white', fontWeight: 'bold' },
    AS_COMP2: { marginHorizontal: 15, marginTop: 12, padding: 12, borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 12 },
    AS_COMP2_SUB1: { flexDirection: 'row', justifyContent: 'space-between' },
    statusBadgeSmall: { backgroundColor: '#f39c12', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
    statusTextSmall: { color: 'white', fontSize: 10, fontWeight: 'bold' },
    completedBadge: { backgroundColor: '#2ecc71', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
    completedBadgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
    CompletedServices: { marginTop: 30, marginBottom: 80, backgroundColor: 'white', borderRadius: 15, paddingBottom: 15, elevation: 2 },
    emptyText: { textAlign: 'center', padding: 20, color: '#999', fontSize: 13 }
});