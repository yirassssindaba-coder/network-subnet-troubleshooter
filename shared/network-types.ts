import { z } from "zod";

export const ipAddressSchema = z.string().regex(
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  "Invalid IP address format"
);

export const cidrSchema = z.number().min(0).max(32);

export const subnetInputSchema = z.object({
  ipAddress: ipAddressSchema,
  cidr: cidrSchema,
});

export type SubnetInput = z.infer<typeof subnetInputSchema>;

export interface SubnetResult {
  ipAddress: string;
  cidr: number;
  subnetMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  ipType: string;
  binarySubnetMask: string;
  wildcardMask: string;
}

export interface TroubleshootingStep {
  id: string;
  title: string;
  description: string;
  commands?: string[];
  expectedResult?: string;
  troubleTip?: string;
}

export interface TroubleshootingCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: TroubleshootingStep[];
}
