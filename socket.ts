/* Accept self signed certificate */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const setupSocketClient = () => {
  const socket = new WebSocket(
    `${process.env.SPC_WS_URL}?username=${process.env.SPC_WS_USER_NAME}&password=${process.env.SPC_WS_PASSWORD}`,
  );

  socket.addEventListener('open', () => {
    console.log('Connected to server');
  });

  socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event.code, event.reason);
  });

  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return socket;
};
