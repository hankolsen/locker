/* Accept self signed certificate */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

type MessageCallback = (event: Bun.BunMessageEvent) => void;

const RECONNECT_INTERVAL = 30_000;
let intervalTimer: NodeJS.Timeout | undefined = undefined;

let socket: WebSocket;

const openConnection = () => {
  socket = new WebSocket(
    `${process.env.SPC_WS_URL}?username=${process.env.SPC_WS_USER_NAME}&password=${process.env.SPC_WS_PASSWORD}`,
  );
};

export const setupSocketClient = (messageCallback: MessageCallback) => {
  openConnection();

  socket.addEventListener('open', () => {
    console.log('Connected to server');
    clearInterval(intervalTimer);
    intervalTimer = undefined;
  });

  socket.addEventListener('message', (event) => {
    messageCallback(event);
  });

  socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event.code, event.reason);
    
    if (intervalTimer === undefined) {
      intervalTimer = setInterval(() => {
        console.log('Reconnecting');
        openConnection();
      }, RECONNECT_INTERVAL);
    }
  });

  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });
};
