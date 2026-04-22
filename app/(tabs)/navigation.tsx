import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useLocalSearchParams, useRootNavigationState, useRouter } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import HomePage from './homePage';
import ServicePage from './servicePage';
const Drawer = createDrawerNavigator();

function CustomeDrawerContent(props: any) {


    const currentRoute = props.state.routes[props.state.index].name;
    const router = useRouter();
    const { username } = useLocalSearchParams();

   
    return (
        <View style={{ flex: 1, backgroundColor: '#010408f5' }}>

            <DrawerContentScrollView {...props}>

                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)', paddingLeft: 10 }}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>U-MES</Text>
                    <Text style={{ color: 'white' }}>{username}</Text>
                </View>

                <DrawerItem
                    label={'DashBoard'}
                    icon={({ size }) => <MaterialIcons name='dashboard' size={size} color={'black'} />}
                    style={{ backgroundColor: currentRoute === 'DashBoard' ? 'white' : '#ffffff1a', borderRadius: 10, marginTop: 50, marginBottom: -30, justifyContent: 'center' }}
                    labelStyle={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}
                    onPress={() => props.navigation.navigate('DashBoard')}

                />

                <DrawerItem
                    label={'My Services'}
                    icon={({ size }) => <FontAwesome name='wrench' size={size} color={'black'} />}
                    style={{ backgroundColor: currentRoute === 'Services' ? 'white' : '#ffffff1a', borderRadius: 10, marginTop: 50, marginBottom: -30, justifyContent: 'center',}}
                    labelStyle={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}
                    onPress={() => props.navigation.navigate('Services')}

                />

                <DrawerItem
                    label={'My Motorcycle'}
                    icon={({ size }) => <MaterialIcons name='motorcycle' size={size} color={'black'} />}
                    style={{ backgroundColor: currentRoute === 'Motorcycle' ? 'white' : '#ffffff1a', borderRadius: 10, marginTop: 50, marginBottom: -30, justifyContent: 'center' }}
                    labelStyle={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}
                    onPress={() => alert('hello world')}

                />


                <DrawerItem
                    label={'AI Assistant'}
                    icon={({ size }) => <AntDesign name='open-ai' size={size} color={'black'} />}
                    style={{ backgroundColor: currentRoute === 'Assistant' ? 'white' : '#ffffff1a', borderRadius: 10, marginTop: 50, marginBottom: -30, justifyContent: 'center' }}
                    labelStyle={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}
                    onPress={() => alert('hello world')}

                />

                <DrawerItem
                    label={'My Builds'}
                    icon={({ size }) => <FontAwesome6 name='file-lines' size={size} color={'black'} />}
                    style={{ backgroundColor: currentRoute === 'Builds' ? 'white' : '#ffffff1a', borderRadius: 10, marginTop: 50, marginBottom: -30, justifyContent: 'center' }}
                    labelStyle={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}
                    onPress={() => alert('hello world')}

                />

                <DrawerItem
                    label={'Parts Catalog'}
                    icon={({ size }) => <AntDesign name='code-sandbox' size={size} color={'black'} />}
                    style={{ backgroundColor: currentRoute === 'Catalog' ? 'white' : '#ffffff1a', borderRadius: 10, marginTop: 50, marginBottom: -30, justifyContent: 'center' }}
                    labelStyle={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}
                    onPress={() => alert('hello world')}

                />




            </DrawerContentScrollView>

            <TouchableOpacity style={{ backgroundColor: 'white', marginBottom: 60, marginLeft: 20, flexDirection: 'row', gap: 10, alignItems: 'center', width: 110, padding: 5, borderRadius: 10 }}
                onPress={() => router.replace('/loginPage')}
            >
                <Entypo name='log-out' size={25} color={'black'} />
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );

}


export default  function Navigation() {
    const {username} = useLocalSearchParams();
    const router = useRouter();
    const rootNavState = useRootNavigationState();

    if(!username){
        Alert.alert('error','username not defined');
        async ()=> await new Promise((resolve) => setTimeout(resolve,2000));
        router.push('/loginPage');
        
    }

    return (

        <Drawer.Navigator
            drawerContent={(props) => <CustomeDrawerContent {...props} />}
        >

            <Drawer.Screen
                name='DashBoard'
                component={HomePage}

            ></Drawer.Screen>

            <Drawer.Screen
                name='Services'
                component={ServicePage}
            ></Drawer.Screen>

        </Drawer.Navigator>

    );
}