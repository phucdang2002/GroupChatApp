import { useEffect, useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons'
const GroupScreen = ({ route }) => {
    const { name } = route.params
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const ws = new WebSocket('ws://localhost:8084')
    useEffect(() => {
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'connect', name: name }))
        }
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setMessages((prev) => [...prev, data])
        }
        return () => {
            ws.close();
        };

    }, [name])
    const sendMessage = () => {
        ws.send(JSON.stringify({ type: 'message', name: name, message: message }))
        setMessage('')
    }
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    item.type === 'connect' ? <Text style={{ textAlign: "center" }}>{item.message}</Text> : (
                        <View style={[{margin: 20},name === item.name ? styles.sender : styles.receiver]}>
                            <Text>{item.name}</Text>
                            <View style={[styles.content, { backgroundColor: name === item.name ? '#24786D' : '#ddd' }]}>
                                <Text>{item.message}</Text>
                            </View>
                        </View>
                    )
                }
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
        zIndex: 100,
        backgroundColor: '#FFF'
    },
    content: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    sender: {
        alignSelf: 'flex-end', 
        alignItems: 'flex-end'
    },
    receiver: {
        alignSelf: 'flex-start'
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
