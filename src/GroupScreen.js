import { useEffect } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const GroupScreen = ({route}) => {
    const {name} = route.params
    const ws = new WebSocket('ws://10.60.246.50:8084')
    useEffect(() => {
        ws.onopen = () => {
            ws.send(JSON.stringify({type: 'connect', name: name}))
        }
        return () => {
            ws.close();
        };
    }, [])
    return (
        <View style={{flex: 1}}>
            <Text>Group Chat</Text>
            <View style={styles.messageBox}>
                <Icon name="paperclip" size={20} color="#000"/>
                <TextInput style={styles.textBox} placeholder="Type a message"/>
                <Icon name="content-copy" size={20} color="#000"/>
                <TouchableOpacity style={styles.sendBtn} onPress={()=>{}}>
                    <Icon name="send" size={20} color="#FFF"/>
                </TouchableOpacity>
            </View>
        </View>
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
