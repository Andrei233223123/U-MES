import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from 'react';
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomePage() {
    const { username } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {

        const onBackPress = () => {

            return false;
        }

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

    }, []);


    return (
        <ScrollView style={styles.ScrollView}>
            <LinearGradient
                colors={['#010408f5', '#06121ef5']}
                style={{ borderRadius: 10, flex: 1 }}
            >
                <View style={styles.Box}>
                    <ThemedText style={{ color: 'white' }}>
                        <Text style={{ fontSize: 19, marginBottom: 5 }}>{`Welcome Back, ${username}\n\n`}</Text>

                        <Text style={{ fontSize: 15 }}>Manage your motorycle services and track your bike's maintenance</Text>
                    </ThemedText>
                </View>
            </LinearGradient>

            <View style={{ marginVertical: 40, flexDirection: 'row', flexWrap: 'wrap', flexGrow: 1, rowGap: 20, columnGap: 10 }}>

                <View style={styles.card}>
                    <Text>Active Services</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>1</Text>
                    <View style={{ backgroundColor: '#06121ef5', padding: 10, width: 50, borderRadius: 10 }}>
                        <FontAwesome name='wrench' size={30} color={'white'} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text>Registered Motorycle</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>1</Text>
                    <View style={{ backgroundColor: '#0b1f33f5', padding: 10, width: 50, borderRadius: 10 }}>
                        <MaterialCommunityIcons name='bike' size={30} color={'white'} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text>Completed Services</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>1</Text>
                    <View style={{ backgroundColor: 'rgba(1, 210, 84)', padding: 10, width: 50, borderRadius: 10 }}>
                        <Feather name='check-circle' size={30} color={'white'} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text>Notification</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>1</Text>
                    <View style={{ backgroundColor: '#f74702', padding: 10, width: 50, borderRadius: 10 }}>
                        <Ionicons name='notifications' size={30} color={'white'} />
                    </View>
                </View>

            </View>

            <View style={styles.quickAction}>

                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Quick Actions</Text>

                <TouchableOpacity style={styles.quickCard}
                    onPress={()=> navigation.navigate('Services')}
                >
                    <AntDesign name='plus-square' size={24} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Request Service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickCard}>
                    <AntDesign name='open-ai' size={24} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>AI Assistant</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: 'row',
                    gap: 10,
                    borderRadius: 5,
                    borderColor: 'rgb(32, 114, 9)',
                    borderWidth: 2,
                    padding: 10,
                    alignItems: 'center'
                }}>
                    <MaterialIcons name='directions-bike' size={24} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Browse Part</Text>
                </TouchableOpacity>

            </View>


            <View style={styles.ActiveServices}>

                <View style={styles.AS_COMP}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Active Services</Text>
                    <Text style={{ backgroundColor: 'black', padding: 5, borderRadius: 5, color: 'white', fontWeight: 'bold' }}>1</Text>
                </View>

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

                    <View>
                        <Text>Staff:Tech B</Text>
                        <Text style={{ fontWeight: 'bold' }}>Est. Cost: {'\u20B1'}4,000</Text>
                    </View>

                </View>

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

                    <View>
                        <Text>Staff:Tech B</Text>
                        <Text style={{ fontWeight: 'bold' }}>Est. Cost: {'\u20B1'}4,000</Text>
                    </View>

                </View>

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

                    <View>
                        <Text>Staff:Tech B</Text>
                        <Text style={{ fontWeight: 'bold' }}>Est. Cost: {'\u20B1'}4,000</Text>
                    </View>

                </View>

            </View>

            <View style={styles.CompletedServices}>

                <View style={styles.AS_COMP}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Recent Completed Services</Text>
                </View>

                <View style={styles.AS_COMP2}>
                    <View style={styles.AS_COMP2_SUB1}>

                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Tire Replacement</Text>
                            <Text style={{ fontSize: 12 }}>Honda CBR600RR</Text>
                        </View>

                        <View style={{ backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, elevation: 1 }}>
                            <Text style={{ color: 'black', fontSize: 11, fontWeight:'bold'}}>Completed</Text>
                        </View>

                    </View>

                    <View>
                        <Text style={{ justifyContent: 'center'}}>Rating: {'\u2605 \u2605 \u2605 \u2605'}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Est. Cost: {'\u20B1'}4,000</Text>
                    </View>

                </View>

            </View>



        </ScrollView>
    );
}


const styles = {
    ScrollView: {
        padding: 20,
        marginBottom: 50
    },
    Box: {
        padding: 20,

    },
    card: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        backgroundColor: 'white',
        width: 180,
        padding: 20,
        elevation: 1

    },
    quickAction: {
        backgroundColor: 'white',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 20,
        gap: 10,
        elevation: 1

    },
    quickCard: {
        flexDirection: 'row',
        gap: 10,
        borderRadius: 5,
        borderColor: 'rgb(2, 9, 35)',
        borderWidth: 2,
        padding: 10,
        alignItems: 'center'
    },
    ActiveServices: {
        marginTop: 30,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 20,
        elevation: 1
    },
    AS_COMP: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 1
    },
    AS_COMP2: {
        marginHorizontal: 20,
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
    CompletedServices: {
        marginTop: 30,
        marginBottom: 100,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 20,
        elevation: 1
    }
}