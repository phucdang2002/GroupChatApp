import { useEffect, useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons'
const GroupScreen = ({ route }) => {
    const { name } = route.params
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const ws = new WebSocket('ws://192.168.1.3:8084')
    useEffect(() => {
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'connect', name: name }))
        }
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log(data);
            setMessages([...messages, data])
            console.log(messages);
        }
        return () => {
            ws.close();
        };

    }, [])
    const sendMessage = () => {
        ws.send(JSON.stringify({ type: 'message', name: name, message: message }))
        setMessage('')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    item.type === 'connect' ? <Text>{item.message}</Text> : (
                        <View style={name === item.name ? styles.sender : styles.receiver}>
                            <Text>{item.name}: {item.message}</Text>
                        </View>
                    )
                }}
            />
            <View style={styles.messageBox}>
                <Icon name="attach-file" size={20} color="#000" />
                <TextInput style={styles.textBox} value={message} onChangeText={setMessage} placeholder="Type a message" />
                <Icon name="content-copy" size={20} color="#000" />
                <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage()}>
                    <Icon name="send" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    messageBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderTopWidth: 3,
        borderTopColor: '#ddd',
    },
    sender: {
        width: '100%',
        backgroundColor: '#24786D',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    receiver: {
        width: '100%',
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    textBox: {
        width: '70%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#ddd',
        borderRadius: 15,
    },
    sendBtn: {
        backgroundColor: '#24786D',
        padding: 10,
        borderRadius: 50,
    }
});
export default GroupScreen
