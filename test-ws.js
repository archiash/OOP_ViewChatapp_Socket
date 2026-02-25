import { WebSocket } from 'ws';

const url1 = 'ws://localhost:8080/ws';
const url2 = 'ws://localhost:8080/ws/websocket';

const testWs = (url) => {
    return new Promise((resolve) => {
        const ws = new WebSocket(url);
        ws.on('open', () => {
            console.log(`Connected to ${url}`);
            ws.close();
            resolve(true);
        });
        ws.on('error', (err) => {
            console.error(`Failed connecting to ${url}: ${err.message}`);
            resolve(false);
        });
        ws.on('unexpected-response', (req, res) => {
            console.error(`Unexpected response for ${url}: ${res.statusCode}`);
            resolve(false);
        });
    });
};

(async () => {
    await testWs(url1);
    await testWs(url2);
})();
