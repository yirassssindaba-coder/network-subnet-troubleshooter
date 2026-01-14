import type { SubnetResult } from "@shared/network-types";

export function ipToNumber(ip: string): number {
  const parts = ip.split(".").map(Number);
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
}

export function numberToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

export function cidrToSubnetMask(cidr: number): string {
  const mask = cidr === 0 ? 0 : ~((1 << (32 - cidr)) - 1) >>> 0;
  return numberToIp(mask);
}

export function cidrToBinaryMask(cidr: number): string {
  return "1".repeat(cidr).padEnd(32, "0").match(/.{8}/g)!.join(".");
}

export function getWildcardMask(subnetMask: string): string {
  return subnetMask
    .split(".")
    .map((octet) => 255 - parseInt(octet))
    .join(".");
}

export function getIpClass(ip: string): string {
  const firstOctet = parseInt(ip.split(".")[0]);
  if (firstOctet >= 1 && firstOctet <= 126) return "A";
  if (firstOctet >= 128 && firstOctet <= 191) return "B";
  if (firstOctet >= 192 && firstOctet <= 223) return "C";
  if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)";
  if (firstOctet >= 240 && firstOctet <= 255) return "E (Reserved)";
  return "Unknown";
}

export function getIpType(ip: string): string {
  const octets = ip.split(".").map(Number);
  
  if (octets[0] === 10) return "Private (RFC 1918)";
  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return "Private (RFC 1918)";
  if (octets[0] === 192 && octets[1] === 168) return "Private (RFC 1918)";
  if (octets[0] === 127) return "Loopback";
  if (octets[0] === 169 && octets[1] === 254) return "Link-Local (APIPA)";
  if (octets[0] >= 224 && octets[0] <= 239) return "Multicast";
  if (octets[0] >= 240) return "Reserved";
  
  return "Public";
}

export function calculateSubnet(ipAddress: string, cidr: number): SubnetResult {
  const ipNum = ipToNumber(ipAddress);
  const subnetMask = cidrToSubnetMask(cidr);
  const maskNum = ipToNumber(subnetMask);
  
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | (~maskNum >>> 0)) >>> 0;
  
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : totalHosts - 2;
  
  let firstHost: string;
  let lastHost: string;
  
  if (cidr === 32) {
    firstHost = numberToIp(networkNum);
    lastHost = numberToIp(networkNum);
  } else if (cidr === 31) {
    firstHost = numberToIp(networkNum);
    lastHost = numberToIp(broadcastNum);
  } else {
    firstHost = numberToIp(networkNum + 1);
    lastHost = numberToIp(broadcastNum - 1);
  }
  
  return {
    ipAddress,
    cidr,
    subnetMask,
    networkAddress: numberToIp(networkNum),
    broadcastAddress: numberToIp(broadcastNum),
    firstHost,
    lastHost,
    totalHosts,
    usableHosts,
    ipClass: getIpClass(ipAddress),
    ipType: getIpType(ipAddress),
    binarySubnetMask: cidrToBinaryMask(cidr),
    wildcardMask: getWildcardMask(subnetMask),
  };
}

export function validateIpAddress(ip: string): boolean {
  const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(ip);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}
