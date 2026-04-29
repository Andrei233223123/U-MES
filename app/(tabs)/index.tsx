import { View } from '@/components/Themed';
import { useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './navigation';
export default function TabOneScreen() {


  useEffect(() => {

    const onBackPress = ()=>{
      
      return false;
    }

    BackHandler.addEventListener('hardwareBackPress',onBackPress);

  }, []);


  return (

    <View style={styles.container}>
      <Navigation />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
