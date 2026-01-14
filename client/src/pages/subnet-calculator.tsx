import { useState, useCallback } from "react";
import { Calculator, Copy, Check, Info, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { calculateSubnet, validateIpAddress, formatNumber } from "@/lib/subnet-calculator";
import type { SubnetResult } from "@shared/network-types";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label: string;
}

function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 shrink-0"
      onClick={handleCopy}
      data-testid={`button-copy-${label.toLowerCase().replace(/\s+/g, "-")}`}
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </Button>
  );
}

interface ResultRowProps {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}

function ResultRow({ label, value, mono = false, highlight = false }: ResultRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-2.5 px-3 rounded-md",
        highlight && "bg-primary/5 dark:bg-primary/10"
      )}
    >
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={cn(
            "text-sm font-medium truncate",
            mono && "font-mono"
          )}
        >
          {value}
        </span>
        <CopyButton value={value} label={label} />
      </div>
    </div>
  );
}

const commonSubnets = [
  { cidr: 8, label: "/8 - 16,777,214 hosts" },
  { cidr: 16, label: "/16 - 65,534 hosts" },
  { cidr: 24, label: "/24 - 254 hosts" },
  { cidr: 25, label: "/25 - 126 hosts" },
  { cidr: 26, label: "/26 - 62 hosts" },
  { cidr: 27, label: "/27 - 30 hosts" },
  { cidr: 28, label: "/28 - 14 hosts" },
  { cidr: 29, label: "/29 - 6 hosts" },
  { cidr: 30, label: "/30 - 2 hosts" },
  { cidr: 31, label: "/31 - 2 hosts (P2P)" },
  { cidr: 32, label: "/32 - 1 host" },
];

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [cidr, setCidr] = useState("24");
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { toast } = useToast();

  const handleCalculate = useCallback(() => {
    setError("");

    if (!ipAddress.trim()) {
      setError("Please enter an IP address");
      return;
    }

    if (!validateIpAddress(ipAddress.trim())) {
      setError("Invalid IP address format. Use format: x.x.x.x where x is 0-255");
      return;
    }

    const cidrNum = parseInt(cidr);
    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
      setError("CIDR must be between 0 and 32");
      return;
    }

    try {
      const subnetResult = calculateSubnet(ipAddress.trim(), cidrNum);
      setResult(subnetResult);
      toast({
        title: "Calculation Complete",
        description: "Subnet details calculated successfully",
      });
    } catch (err) {
      setError("Error calculating subnet. Please check your input.");
    }
  }, [ipAddress, cidr, toast]);

  const handleReset = () => {
    setIpAddress("192.168.1.100");
    setCidr("24");
    setResult(null);
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Calculator className="h-7 w-7 text-primary" />
            Subnet Calculator
          </h1>
          <p className="text-muted-foreground mt-2">
            Calculate network address, broadcast, host range, and more from any IP address and CIDR notation.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Input</CardTitle>
                <CardDescription>Enter an IP address and subnet mask</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ip-address">IP Address</Label>
                  <Input
                    id="ip-address"
                    type="text"
                    placeholder="192.168.1.100"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="font-mono"
                    data-testid="input-ip-address"
                    aria-describedby="ip-help"
                  />
                  <p id="ip-help" className="text-xs text-muted-foreground">
                    Format: x.x.x.x (e.g., 192.168.1.100)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidr">CIDR / Prefix Length</Label>
                  <Select value={cidr} onValueChange={setCidr}>
                    <SelectTrigger id="cidr" className="font-mono" data-testid="select-cidr">
                      <SelectValue placeholder="Select CIDR" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonSubnets.map((subnet) => (
                        <SelectItem
                          key={subnet.cidr}
                          value={subnet.cidr.toString()}
                          className="font-mono"
                        >
                          {subnet.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm" role="alert">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1"
                    data-testid="button-calculate"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    data-testid="button-reset"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  Quick Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">Common Subnets:</p>
                    <ul className="text-muted-foreground space-y-0.5 font-mono text-xs">
                      <li>/24 = 254 hosts</li>
                      <li>/25 = 126 hosts</li>
                      <li>/26 = 62 hosts</li>
                      <li>/27 = 30 hosts</li>
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Private Ranges:</p>
                    <ul className="text-muted-foreground space-y-0.5 font-mono text-xs">
                      <li>10.0.0.0/8</li>
                      <li>172.16.0.0/12</li>
                      <li>192.168.0.0/16</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className={cn(!result && "opacity-60")}>
              <CardHeader>
                <CardTitle className="text-lg">Results</CardTitle>
                <CardDescription>
                  {result
                    ? `Subnet details for ${result.ipAddress}/${result.cidr}`
                    : "Enter an IP address and click Calculate"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Network Information
                      </p>
                      <div className="rounded-lg border divide-y">
                        <ResultRow label="Network Address" value={result.networkAddress} mono highlight />
                        <ResultRow label="Broadcast Address" value={result.broadcastAddress} mono highlight />
                        <ResultRow label="Subnet Mask" value={result.subnetMask} mono />
                        <ResultRow label="Wildcard Mask" value={result.wildcardMask} mono />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Host Range
                      </p>
                      <div className="rounded-lg border divide-y">
                        <ResultRow label="First Usable Host" value={result.firstHost} mono />
                        <ResultRow label="Last Usable Host" value={result.lastHost} mono />
                        <ResultRow label="Total Addresses" value={formatNumber(result.totalHosts)} />
                        <ResultRow label="Usable Hosts" value={formatNumber(result.usableHosts)} highlight />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        IP Classification
                      </p>
                      <div className="rounded-lg border divide-y">
                        <ResultRow label="IP Class" value={`Class ${result.ipClass}`} />
                        <ResultRow label="IP Type" value={result.ipType} />
                      </div>
                    </div>

                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between text-muted-foreground"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        data-testid="button-toggle-advanced"
                      >
                        <span>Advanced Details</span>
                        {showAdvanced ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      {showAdvanced && (
                        <div className="mt-2 rounded-lg border divide-y">
                          <ResultRow
                            label="Binary Subnet Mask"
                            value={result.binarySubnetMask}
                            mono
                          />
                          <ResultRow label="CIDR Notation" value={`/${result.cidr}`} mono />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Enter an IP address and CIDR to see subnet details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
