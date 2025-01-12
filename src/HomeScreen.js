import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const startChat = () => {
    navigation.navigate('Group', { name: name })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Name</Text>
      <Text style={styles.subtitle}>Please enter your name to start a new chat</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Your name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={startChat}>
        <Text style={styles.buttonText}>Start Chat</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#007b7f',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007b7f',
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
