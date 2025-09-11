import Verisure from 'verisure';
import { doorLockOperation, overviewOperation } from './operations';

let installations: VerisureInstallation[] = [];
let doorLockLabels: string[] = [];
const code = process.env.VERISURE_LOCK_CODE ?? '';

export const setupVerisure = async () => {
  const verisure = new Verisure(
    process.env.VERISURE_EMAIL ?? '',
    process.env.VERISURE_PASSWORD ?? '',
  );

  await verisure.getToken();
  installations = await verisure.getInstallations();
  const overview = await installations[0]?.client(overviewOperation);
  if (overview) {
    doorLockLabels = overview.installation.doorlocks.map(
      ({ device }) => device.deviceLabel,
    );
  }
};

export const lockDoors = async () => {
  doorLockLabels.forEach((deviceLabel) => {
    if (installations?.[0]) {
      installations[0].client(doorLockOperation(deviceLabel, code));
    }
  });
};
