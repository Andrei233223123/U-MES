import { db } from '@/firebaseConfig';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams } from 'expo-router';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

interface Motorcycle {
    id: string;
    Customer: string;
    Brand: string;
    Model: string;
    Year: string;
    LicensePlate: string;
    VIN: string;
    Color: string;
}

export default function Motorcycle() {

    const { username } = useLocalSearchParams();
    const [data, setData] = useState<Motorcycle[]>([]);
    const red = 'rgba(230, 32, 32, 0.65)';
    const black = 'rgba(0, 0, 0, 0.65)';
    const white = 'rgba(255, 255, 255, 0.65)';
    const gray = 'rgba(128, 128, 128, 0.65)';
    const blue = 'rgba(32, 32, 230, 0.65)';

    const [show, setShow] = useState(false);

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [vin, setVin] = useState('');
    const [color, setColor] = useState('');

    const handleSaveMotorcycle = async () => {

        if (!brand || !model || !year || !licensePlate || !vin || !color) {
            alert('Please fill in all fields');
            return;
        }

        if (!username) {
            alert('User not found. Please log in again.');
            return;
        }

        try {
            const motorcycleData = {
                Brand: brand,
                Model: model,
                Year: year,
                LicensePlate: licensePlate,
                VIN: vin,
                Color: color,
                Customer: username,
            };
            await setDoc(doc(db, 'motorcycles', vin), motorcycleData);
            alert('Motorcycle saved successfully!');
            setShow(false);
            setBrand('');
            setModel('');
            setYear('');
            setLicensePlate('');
            setVin('');
            setColor('');
        } catch (error) {
            console.error('Error saving motorcycle:', error);
            alert('Failed to save motorcycle. Please try again.');
        }
    }

    useEffect(() => {
        const q = query(collection(db, 'motorcycles'), where('Customer', '==', username));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Motorcycle)));
        });

    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Registered Motorcycles</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => { setShow(true) }}>
                    <Text style={styles.addButtonText}>Add Motorcycle</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.motorcycleList}>
                {data.map((motorcycle) => {
                    return (
                        
                        /* List of motorcycles with details */
                        <View key={motorcycle.id} style={[styles.motorcycleItem, {display: !motorcycle.VIN ? 'none' : 'flex'}]}>
                            <FontAwesome6 name="motorcycle" size={40} color={red} />
                            <Text style={styles.motorcycle}>{motorcycle.Brand} {motorcycle.Model}</Text>
                            <View style={styles.motorcycleDetails}>
                                <Text>Year:</Text>
                                <Text>{motorcycle.Year}</Text>
                            </View>
                            <View style={styles.motorcycleDetails}>
                                <Text>License Plate:</Text>
                                <Text>{motorcycle.LicensePlate}</Text>
                            </View>
                            <View style={styles.motorcycleDetails}>
                                <Text>VIN:</Text>
                                <Text>{motorcycle.VIN}</Text>
                            </View>
                            <View style={styles.motorcycleDetails}>
                                <Text>Color:</Text>
                                <Text>{motorcycle.Color}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>

            <Modal
                visible={show}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
            >
                <View style={styles.modalContent}>
                    <View style={styles.ContentBox}>
                        <Text style={styles.ContentTitle}>Add Motorcycle</Text>

                        {/* Form fields for motorcycle details */}
                        <Text style={styles.inputLabel}>Brand *</Text>
                        <TextInput style={styles.input} placeholder="e.g., Honda, Yamaha"
                            value={brand}
                            onChangeText={setBrand}
                        />
                        <Text style={styles.inputLabel}>Model *</Text>
                        <TextInput style={styles.input} placeholder="e.g., CBR600R, R1"
                            value={model}
                            onChangeText={setModel}
                        />
                        <Text style={styles.inputLabel}>Year *</Text>
                        <TextInput style={styles.input} placeholder="e.g., 2020"
                            value={year}
                            onChangeText={setYear}
                        />
                        <Text style={styles.inputLabel}>License Plate *</Text>
                        <TextInput style={styles.input} placeholder="e.g., ABC-1234"
                            value={licensePlate}
                            onChangeText={setLicensePlate}
                        />
                        <Text style={styles.inputLabel}>VIN *</Text>
                        <TextInput style={styles.input} placeholder="e.g., 1HGBH41JXMN109186"
                            value={vin}
                            onChangeText={setVin}
                        />
                        <Text style={styles.inputLabel}>Color *</Text>
                        <TextInput style={styles.input} placeholder="e.g., Red, Blue, Black"
                            value={color}
                            onChangeText={setColor}
                        />

                        {/* Save button */}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveMotorcycle}>
                            <Text style={styles.saveButtonText}>Save Motorcycle</Text>
                        </TouchableOpacity>
                        {/* Cancel button */}
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setShow(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
    },
    addButton: {
        backgroundColor: '#101828',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#101828'
    },
    motorcycleList: {
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
    },
    motorcycleItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    motorcycleDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    motorcycle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContentBox: {
        backgroundColor: 'white',
        width: '80%',
        height: 'auto',
        borderRadius: 20,


    },
    ContentTitle: {
        fontSize: 20,
        fontWeight: 400,
        margin: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 20,

    },
    inputLabel: {
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    saveButton: {
        backgroundColor: '#101828',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    cancelButtonText: {
        color: 'black',
        fontWeight: 'bold'
    }
})