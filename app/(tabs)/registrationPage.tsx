import { ThemedText } from '@/components/ThemedText';
import { auth, db } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function Registration() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const router = useRouter();


    const validateUser = async(userAuthenticate : any) => {

        try {
            const fields: { [key: string]: string } = {
                fullName: fullName,
                email: email,
                mobile: mobile,
                password: password
            }

            for (const [label, value] of Object.entries(fields)) {
                if (!value || value.trim() === '') {
                    throw {
                        code: 'Missing Field',
                        message: `${label.charAt(0).toUpperCase + label.slice(1)} is required`
                    }
                }
            }


        } catch (err: any) {
            const code = err.code;
            Alert.alert('InputERR', code)
        }

        const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(validateEmail)) {
            Alert.alert('Invalid Email Address', `${email} is not valid`);
            return
        }

        const validateMobile = /^(09|\+6309)\d{9}$/;
        if (!mobile.match(validateMobile)) {
            Alert.alert('Invalid Mobile Number', `${mobile} is not valid`);
            return;
        }

        if (repeatPassword !== password) {
            Alert.alert('Invalid Password', 'Password not match');
            return;
        }

        try {

            const user = await createUserWithEmailAndPassword(auth,email,password);
            userAuthenticate = user.user

            const docRef = doc(db,'users',userAuthenticate.uid);

            await setDoc(docRef,{
                fullName:fullName,
                email:email,
                mobile:mobile,
                password:password,
                role:'customer',
                createdAt: new Date().toISOString().slice(0,10),
                motorcycle:[]
            })

            Alert.alert('SUCCESS', `Created Your Account in ${new Date().toISOString().slice(0,10)}`)
            router.replace('/loginPage');
        } catch (err: any) {

            const code = err.code

            Alert.alert('invalid',code)
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.box}>

                <View style={{ alignItems: 'center', gap: 5 }}>
                    <ThemedText style={styles.themedtext}><Text>Create Account</Text></ThemedText>
                    <Text>Customer Registration</Text>

                </View>

                <View style={{ marginTop: 20 }}>
                    <Text>Full Name*</Text>
                    <TextInput
                        placeholder='Enter your full name'
                        keyboardType='default'
                        value={fullName}
                        onChangeText={setFullName}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View>
                    <Text>Email Address*</Text>
                    <TextInput
                        placeholder='Enter your email'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View>
                    <Text>Mobile Number*</Text>
                    <TextInput
                        placeholder='Enter your mobile number'
                        keyboardType='phone-pad'
                        value={mobile}
                        onChangeText={setMobile}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View>
                    <Text>Password*</Text>
                    <TextInput
                        placeholder='Enter Password'
                        keyboardType='default'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={styles.input}
                    ></TextInput>
                </View>

                <View>
                    <Text>Confirm Password*</Text>
                    <TextInput
                        placeholder='Confirm Password'
                        keyboardType='default'
                        value={repeatPassword}
                        onChangeText={setRepeatPassword}
                        secureTextEntry={true}
                        style={styles.input}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.RegisterButton}
                    onPress={(validateUser)}
                >
                    <Text style={{ fontSize: 15, color: 'white' }}>Register</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text>Already have an account? <Text style={{ color: '#0f1340', fontWeight: 'bold' }} onPress={()=> router.push('/loginPage')}>Login</Text></Text>
                </View>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create( {
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#0f1340',
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 5

    },
    themedtext: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#0f1340',

    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 5,
        width: 300,
        marginBottom: 10
    },
    RegisterButton: {
        backgroundColor: '#0f1340',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})