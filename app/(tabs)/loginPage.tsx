import { ThemedText } from '@/components/ThemedText';
import { auth, db } from '@/firebaseConfig';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Image, Linking, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [userRole, setUserRole] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [invalidModal, setInvalidModal] = useState(false);
    const [isLogin, setIsLogin] = useState('Login');
    const [pressable, setPressable] = useState(false);
    const router = useRouter();

    const userAuthenticate = async () => {
        if (!email || !password) {
            setInvalidModal(true);
            return;
        }

        setPressable(true);
        setIsLogin('Logging in...');

        try {
          
            const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;

           
            const docRef = doc(db, 'users', user.uid);
            const snap = await getDoc(docRef);

            if (snap.exists()) {
                const data = snap.data();
                setUsername(data.fullName || 'User');
                setUserRole(data.role || 'customer'); 
                setShowModal(true);
            } else {
                Alert.alert("Error", "User data not found in database.");
                setPressable(false);
                setIsLogin('Login');
            }

        } catch (err: any) {
            console.error(err);
            setInvalidModal(true);
            setPressable(false);
            setIsLogin('Login');
        }
    };

    const handleContinue = () => {
        if (userRole === 'admin') {
            
            Linking.openURL('https://admin-web-url.com');
        } else {

            router.push({ pathname: '/navigation', params: { username: username } });
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.box}>
                <View style={styles.headerContainer}>
                    <ThemedText style={styles.logoText}>U-MES</ThemedText>
                    <Text style={styles.subLogoText}>Motorcycle Service Management</Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder='Enter your email'
                        onChangeText={setEmail}
                        value={email}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder='Enter your password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, pressable && { opacity: 0.7 }]}
                    onPress={userAuthenticate}
                    disabled={pressable}
                >
                    <Text style={styles.buttonText}>{isLogin}</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/registrationPage')}>
                        <Text style={styles.registerLink}>Register as Customer</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.credentialsBox}>
                    <Text style={styles.demoTitle}>Demo Credentials:</Text>
                    <Text style={styles.demoText}><Text style={styles.bold}>Admin:</Text> admin@umesadmin.com / 123</Text>
                    <Text style={styles.demoText}><Text style={styles.bold}>Customer:</Text> customer@umes.com / 123</Text>
                </View>
            </View>

            {/* Success Welcome Modal */}
            <Modal visible={showModal} transparent={true} animationType='fade'>
                <BlurView intensity={100} tint='dark' style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Image source={require('@/assets/images/lofi.gif')} style={styles.modalGif} />
                        <Text style={styles.welcomeText}>Welcome Back, {username}!</Text>
                        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
                            <Text style={styles.continueText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </Modal>

            {/* Error Modal */}
            <Modal visible={invalidModal} transparent={true} animationType='fade'>
                <BlurView intensity={100} tint='dark' style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Image source={require('@/assets/images/lofi.gif')} style={styles.modalGif} />
                        <Text style={styles.errorText}>Invalid email or password</Text>
                        <TouchableOpacity style={styles.continueBtn} onPress={() => setInvalidModal(false)}>
                            <Text style={styles.continueText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#0f1340',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: 'white',
        width: '90%',
        maxWidth: 350,
        borderRadius: 15,
        paddingVertical: 20,
        elevation: 5,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    logoText: {
        fontSize: 28,
        color: '#0f1340',
        fontWeight: 'bold',
    },
    subLogoText: {
        fontSize: 12,
        color: '#666',
    },
    inputGroup: {
        marginHorizontal: 25,
        marginVertical: 8,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 14,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        padding: 12,
        fontSize: 14,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 25,
        backgroundColor: '#0f1340',
        borderRadius: 8,
        padding: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerLink: {
        color: '#0f1340',
        fontWeight: 'bold',
    },
    credentialsBox: {
        marginTop: 25,
        padding: 15,
        backgroundColor: '#f8f9fa',
        marginHorizontal: 25,
        borderRadius: 8,
    },
    demoTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    demoText: {
        fontSize: 11,
        color: '#555',
    },
    bold: { fontWeight: 'bold' },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        backgroundColor: 'white',
        width: '80%',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
    },
    modalGif: {
        width: 80,
        height: 80,
        marginBottom: 15,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#d9534f',
        marginBottom: 20,
    },
    continueBtn: {
        backgroundColor: '#0f1340',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    continueText: {
        color: 'white',
        fontWeight: 'bold',
    },
});