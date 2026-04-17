import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import RegistrationPage from './registrationPage';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <RegistrationPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
