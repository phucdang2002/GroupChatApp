const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8084 })
server.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', message => {
        // console.log(`Received: ${message}`);
        const data = JSON.parse(message);
        console.log(data);
        
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast: ${message}`);
            }
        })
    })
    ws.on('close', () => {
        console.log('Client disconnected');
    })
})
console.log("Server is running on port 8084");

