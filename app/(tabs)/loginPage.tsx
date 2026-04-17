import { ThemedText } from '@/components/ThemedText';
import { auth } from '@/firebaseConfig';
import { BlurView } from 'expo-blur';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('Admin');
    const [showModal, setShowModal] = useState(false);
    const userAuthenticate = async () => {

        try {
            await signInWithEmailAndPassword(auth, email, password);

            const uid = auth.currentUser?.uid;


        } catch (err: any) {

        }
    }
    return (
        <View style={styles.background}>
            <View style={styles.box}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <ThemedText style={{ fontSize: 24, color: '#191970', fontWeight: 'bold' }}>U-MES</ThemedText>
                    <Text>Motorcycle Servcie Management</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Email Address</Text>
                    <TextInput
                        keyboardType='default'
                        placeholder='Enter your email'
                        onChangeText={setEmail}
                        value={email}
                        style={{ borderWidth: 1, borderRadius: 5, borderColor: 'rgba(0,0,0,0.2)', marginVertical: 5 }}
                    ></TextInput>
                </View>

                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>Password</Text>
                    <TextInput
                        keyboardType='default'
                        placeholder='Enter your password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        style={{ borderWidth: 1, borderRadius: 5, borderColor: 'rgba(0,0,0,0.2)', marginVertical: 5 }}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>

                <View style={styles.register}>
                    <Text>Don't have an account? <Text style={{ color: '#0f1340', fontWeight: 'bold' }}>Register as Customer</Text></Text>
                </View>

                <View style={styles.credentials}>
                    <Text style={{ marginBottom: 10 }}>Demo Credentials:</Text>
                    <Text style={{ fontWeight: 'bold', color: '#0f1340' }}>Admin: <Text style={{ color: 'black', fontWeight: 400 }}>admin@umesadmin.com/123</Text></Text>
                    <Text style={{ fontWeight: 'bold', color: '#0f1340' }}>Customer: <Text style={{ color: 'black', fontWeight: 400 }}>customer@umes.com/123</Text></Text>
                </View>
            </View>

            <Modal
                visible={showModal}
                statusBarTranslucent={true}
                presentationStyle='fullScreen'
                transparent={true}
            >
                <BlurView
                    intensity={100}
                    tint='dark'
                    style={styles.modal}
                >
                    <View>
                        <View style={styles.modalCard}>
                            
                            <Image
                                source={require('@/assets/images/lofi.gif')}
                                style={{ width: 70, height: 70 }}
                            ></Image>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Welcome Back {username}!</Text>
                            <TouchableOpacity style={styles.continue}>
                                <Text style={{ color: 'white' }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </View>
    )
}

const styles = {
    background: {
        backgroundColor: '#0f1340',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: 'white',
        width: 350,
        borderRadius: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginHorizontal: 20,
        backgroundColor: '#0f1340',
        borderRadius: 5,
        padding: 10
    },
    register: {
        marginHorizontal: 20,
        alignItems: 'center'
    },
    credentials: {
        margin: 20,
        marginHorizontal: 25,
        gap: 2
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalCard: {
        backgroundColor: 'white',
        paddingHorizontal: 50,
        paddingBottom: 20,
        borderRadius: 20,
        alignItems: 'center'
    },
    continue: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        width:150,
        alignItems:'center'
    },

}