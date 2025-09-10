import type { SIA_CODE } from "./types";

/**
 * BA: Burglar Alarm
 * BR: Burglar Alarm Restore
 * BB: Inhibited or Isolated
 * BU: Deinhibited or Deisolated
 * CL: Area Activated (Full Set)
 * NL: Area Activated (Part Set)
 * OP: Area Deactivated
 * ZC: Zone Closed
 * ZO: Zone Opened
 */

/**
 * CL: Area Activated (Full Set)
 * NL: Area Activated (Part Set)
 */
export const lockCodes: SIA_CODE[] = ["CL", "NL"];
