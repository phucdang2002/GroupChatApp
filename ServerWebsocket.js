const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8084 });

server.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        const data = JSON.parse(message);
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                let sendData = {};
                const uniqueId = Date.now() + Math.random(); // Generate a unique ID

                if (data.type === 'connect') {
                    sendData = {
                        id: uniqueId,
                        type: 'connect',
                        name: data.name,
                        message: `${data.name} has connected`
                    };
                } else if (data.type === 'message') {
                    sendData = {
                        id: uniqueId,
                        type: 'message',
                        name: data.name,
                        message: data.message
                    };
                } else if (data.type === 'broadcast') {
                    sendData = {
                        id: uniqueId,
                        type: 'broadcast',
                        message: `Broadcast: ${message}`
                    };
                }
                client.send(JSON.stringify(sendData));
            }
        });
    });
});
console.log("Server is running on port 8084");

