const io = require('socket.io-client');

describe('Socket.IO API Test Suite', () => {
    const url = 'http://your-socketio-url';  // Replace with your Socket.IO URL

    const testCases = [
        { id: 1, message: 'Hello, World!', expected: 'Hello, Client!' },
        { id: 2, message: 'Test message 2', expected: 'Response 2' },
        { id: 3, message: 'Test message 3', expected: 'Response 3' },
        { id: 4, message: 'Test message 4', expected: 'Response 4' },
        { id: 5, message: 'Test message 5', expected: 'Response 5' }
    ];

    testCases.forEach(testCase => {
        test(`Test case ${testCase.id}`, async () => {
            const socket = io(url, { transports: ['websocket'], forceNew: true });

            const messagePromise = new Promise((resolve, reject) => {
                socket.on('connect', () => {
                    socket.emit('message', testCase.message);
                });

                socket.on('message', (data) => {
                    try {
                        expect(data).toBe(testCase.expected);
                        resolve();
                    } catch (error) {
                        reject(error);
                    } finally {
                        socket.disconnect();
                    }
                });

                socket.on('connect_error', (error) => {
                    reject(error);
                });
            });

            await expect(messagePromise).resolves.not.toThrow();
        });
    });
});