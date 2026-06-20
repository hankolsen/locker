import { sendTelegramMessage } from './telegram';

/* Accept self signed certificate */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

type MessageCallback = (event: Bun.BunMessageEvent) => void;

const RECONNECT_INTERVAL = 30_000;
const maxReconnectionAttempts = 10;

let reconnectCount = 0;
let callback: MessageCallback;
let socket: WebSocket | undefined;

const openConnection = () => {
  socket = new WebSocket(
    `${process.env.SPC_WS_URL}?username=${process.env.SPC_WS_USER_NAME}&password=${process.env.SPC_WS_PASSWORD}`,
  );
  socket.addEventListener('open', onWebsocketOpen);
  socket.addEventListener('close', onWebsocketClose);
  socket.addEventListener('message', onMessageCallback);
  socket.addEventListener('error', onWebsocketError);
};

const onWebsocketOpen = () => {
  console.log('Connected to server');
  sendTelegramMessage('✅ WebSocket connected');
  reconnectCount = 0;
};

const onWebsocketClose = (event: CloseEvent) => {
  console.log('WebSocket connection closed:', event.code, event.reason);
  sendTelegramMessage(`⚠️ WebSocket connection closed (${event.reason})`);

  socket = undefined;
  setTimeout(reconnect, RECONNECT_INTERVAL * (reconnectCount + 1));
};

const onWebsocketError = (event: Event) => {
  console.error('WebSocket error:', event);
  sendTelegramMessage(`🔴 WebSocket connection failed`);
};

const reconnect = () => {
  if (reconnectCount < maxReconnectionAttempts) {
    reconnectCount += 1;
  }

  console.log('Reconnecting', reconnectCount);
  openConnection();
};

const onMessageCallback = (event: MessageEvent) => {
  callback(event);
};

export const setupSocketClient = (messageCallback: MessageCallback) => {
  callback = messageCallback;
  openConnection();
};
