
import { lockCodes } from "./constants";
import type { WS_EVENT } from "./types";
import { lockDoors, setupVerisure } from "./verisure";
import { setupSocketClient } from "./socket";

await setupVerisure();
const socket = setupSocketClient();

socket.addEventListener("message", (event) => {
  if (event.type === "message") {
    const data = JSON.parse(event.data) as WS_EVENT;

    if (data.status === "success") {
      const { sia_code, user_name } = data.data.event;

      if (lockCodes.includes(sia_code)) {
        console.log(`Alarm activated by ${user_name}: lock`);
        lockDoors();
      }
    }
  }
});
