import Verisure from "verisure";
import { lockCodes } from "./constants";
import type { WS_EVENT } from "./types";
import { overviewOperation } from "./operations";

/* Accept self signed certificate */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const socket = new WebSocket(
  `${process.env.SPC_WS_URL}?username=${process.env.SPC_WS_USER_NAME}&password=${process.env.SPC_WS_PASSWORD}`,
);

socket.addEventListener("open", () => {
  console.log("Connected to server");
});

socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);

  if (event.type === "message") {
    const data = JSON.parse(event.data) as WS_EVENT;

    if (data.status === "success") {
      const { sia_code, user_name } = data.data.event;

      if (lockCodes.includes(sia_code)) {
        console.log(`Alarm activated by ${user_name}: lock`);
        doorlocks.forEach((deviceLabel) => {
          if (installations?.[0]) {
            installations[0].client({
              operationName: "DoorLock",
              variables: {
                deviceLabel,
                input: { code: process.env.VERISURE_LOCK_CODE },
              },
              query: `mutation DoorLock($giid: String!, $deviceLabel: String!, $input: LockDoorInput!) {
                  transactionId: DoorLock(giid: $giid, deviceLabel: $deviceLabel, input: $input)
                }`,
            });
          }
        });
      }
    }
  }
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket connection closed:", event.code, event.reason);
});

socket.addEventListener("error", (error) => {
  console.error("WebSocket error:", error);
});

const verisure = new Verisure(
  process.env.VERISURE_EMAIL ?? "",
  process.env.VERISURE_PASSWORD ?? "",
);

let installations: VerisureInstallation[] = [];
let doorlocks: string[] = [];

verisure
  .getToken()
  .then(() => verisure.getInstallations())
  .then((insts) => {
    installations = insts;
    if (installations?.[0]) {
      installations[0].client(overviewOperation).then((overview) =>
        overview.installation.doorlocks.forEach((doorlock) => {
          doorlocks.push(doorlock.device.deviceLabel);
        }),
      );
    }
  });
