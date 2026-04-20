import AntDesign from '@expo/vector-icons/AntDesign';
import { Alert, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


export function isActive(){
   

    return true;
};


export default function ServicePage() {
    Alert.alert(`${isActive}`);
    return (
        <ScrollView style={{ flex: 1, marginLeft:20, marginTop:20}}>

            <View style={styles.ActiveBox}>
                <AntDesign name="clock-circle" size={22} color={'white'} />
                <Text style={{ color: 'white' }}> Active (1)</Text>
            </View>

            <View>
                
            </View>
        </ScrollView>
    );
}



const styles = {
    ActiveBox: {
        backgroundColor: isActive() ? '#0f1340':'gray',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        width: 120,
        padding: 10,
        borderRadius: 10
    }
}