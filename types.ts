export type SIA_CODE =
  | "BA"
  | "BR"
  | "BB"
  | "BU"
  | "CL"
  | "NL"
  | "OP"
  | "ZC"
  | "ZO";

export type WS_EVENT = {
  status: string;
  data: {
    event: {
      ev_seq: string;
      ev_grp: string;
      ev_id: string;
      ev_desc: string;
      timestamp: string;
      timestamp_spc: string;
      sia_code: SIA_CODE;
      sia_address: string;
      cid_code: string;
      cid_qual: string;
      zone_id: string;
      zone_name: string;
      area_id: string;
      area_name: string;
      user_id: string;
      user_name: string;
    };
  };
};
