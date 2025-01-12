import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({navigation}) => {
    const [name, setName] = useState("")
    const startChat = () => {
        navigation.navigate('Group', {name: name})
    }
    return (
    <View>
        <Text style={{fontSize: 20}}>Your Name</Text>
        <Text style={{fontSize: 16}}>
            Please enter your name to start a new chat
        </Text>
        <Text style={{fontSize: 16, color: '#24786D'}}>Your name</Text>
        <TextInput style={styles.input} onChangeText={setName}/>
        <TouchableOpacity style={styles.btn} onPress={()=> startChat()}>
            <Text style={styles.btnTitle}>Start chat</Text>
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 10,
  },
  btn: {
    width: 300,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#24786D',
  },
  btnTitle: {
    fontSize: 40,
    color: '#FFF',
  },
});

export default HomeScreen;
