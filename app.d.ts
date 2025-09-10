type DoorLock = {
  device: {
    deviceLabel: string;
  };
};

type Overview = {
  installation: {
    doorlocks: DoorLock[];
  };
};
declare class VerisureInstallation {
  constructor(installation, client);
  client(clientOptions: ClientOptions): Promise<Overview>;
}

declare class Verisure {
  constructor(email: string, password: string);
  getToken(): Promise<string[]>;
  getInstallations(): Promise<VerisureInstallation[]>;
}

declare module 'verisure' {
  export = Verisure;
}
