import { motion } from "framer-motion";
import { Database, CheckCircle, Hash, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlockchainTransaction {
  id: string;
  hash: string;
  type: "patch_deploy" | "device_auth" | "threat_log" | "config_change";
  device: string;
  timestamp: string;
  status: "confirmed" | "pending";
  blockNumber: number;
}

const mockTransactions: BlockchainTransaction[] = [
  {
    id: "TX-001",
    hash: "0x7f3a8b4c1d9e2f5a6b8c3d1e9f2a5b7c4d8e1f9a2b5c7d3e8f1a4b6c9d2e5f8a",
    type: "patch_deploy",
    device: "IoT-7B3C",
    timestamp: "2 mins ago",
    status: "confirmed",
    blockNumber: 15472834,
  },
  {
    id: "TX-002",
    hash: "0x2b5c7d3e8f1a4b6c9d2e5f8a7f3a8b4c1d9e2f5a6b8c3d1e9f2a5b7c4d8e1f9a",
    type: "device_auth",
    device: "IoT-5F2A",
    timestamp: "5 mins ago",
    status: "confirmed",
    blockNumber: 15472831,
  },
  {
    id: "TX-003",
    hash: "0x9d2e5f8a7f3a8b4c1d9e2f5a6b8c3d1e9f2a5b7c4d8e1f9a2b5c7d3e8f1a4b6c",
    type: "threat_log",
    device: "IoT-2D8F",
    timestamp: "12 mins ago",
    status: "confirmed",
    blockNumber: 15472828,
  },
  {
    id: "TX-004",
    hash: "0x4d8e1f9a2b5c7d3e8f1a4b6c9d2e5f8a7f3a8b4c1d9e2f5a6b8c3d1e9f2a5b7c",
    type: "config_change",
    device: "IoT-9E1A",
    timestamp: "18 mins ago",
    status: "pending",
    blockNumber: 15472825,
  },
  {
    id: "TX-005",
    hash: "0x6b8c3d1e9f2a5b7c4d8e1f9a2b5c7d3e8f1a4b6c9d2e5f8a7f3a8b4c1d9e2f5a",
    type: "patch_deploy",
    device: "IoT-4C6B",
    timestamp: "25 mins ago",
    status: "confirmed",
    blockNumber: 15472820,
  },
  {
    id: "TX-006",
    hash: "0x8f1a4b6c9d2e5f8a7f3a8b4c1d9e2f5a6b8c3d1e9f2a5b7c4d8e1f9a2b5c7d3e",
    type: "device_auth",
    device: "IoT-3F9E",
    timestamp: "32 mins ago",
    status: "confirmed",
    blockNumber: 15472815,
  },
];

const typeConfig = {
  patch_deploy: { label: "Patch Deploy", color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
  device_auth: { label: "Device Auth", color: "text-neon-green", bg: "bg-neon-green/10" },
  threat_log: { label: "Threat Log", color: "text-destructive", bg: "bg-destructive/10" },
  config_change: { label: "Config Change", color: "text-neon-purple", bg: "bg-neon-purple/10" },
};

const Blockchain = () => {
  const confirmedCount = mockTransactions.filter((t) => t.status === "confirmed").length;
  const pendingCount = mockTransactions.filter((t) => t.status === "pending").length;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-cyan">Blockchain Transaction Logs</h1>
          <p className="mt-2 text-muted-foreground">Immutable audit trail of all system operations</p>
        </div>

        {/* Blockchain Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="mt-2 text-3xl font-bold text-neon-cyan">{mockTransactions.length}</p>
              </div>
              <Database className="h-10 w-10 text-neon-cyan" />
            </div>
          </Card>

          <Card className="border border-neon-green/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="mt-2 text-3xl font-bold text-neon-green">{confirmedCount}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-neon-green" />
            </div>
          </Card>

          <Card className="border border-yellow-400/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="mt-2 text-3xl font-bold text-yellow-400">{pendingCount}</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-400 animate-pulse" />
            </div>
          </Card>

          <Card className="border border-neon-purple/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Latest Block</p>
                <p className="mt-2 text-3xl font-bold text-neon-purple">15472834</p>
              </div>
              <Hash className="h-10 w-10 text-neon-purple" />
            </div>
          </Card>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {mockTransactions.map((tx, index) => {
            const typeConf = typeConfig[tx.type];

            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6 transition-all hover:scale-[1.01]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-3">
                        <Hash className="h-6 w-6 text-neon-cyan" />
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-foreground">{tx.id}</h3>
                            <Badge className={`${typeConf.bg} ${typeConf.color}`}>{typeConf.label}</Badge>
                            {tx.status === "confirmed" ? (
                              <Badge className="bg-neon-green/10 text-neon-green">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Confirmed
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-400/10 text-yellow-400">
                                <Clock className="mr-1 h-3 w-3" />
                                Pending
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{tx.timestamp}</p>
                        </div>
                      </div>

                      <div className="space-y-2 rounded-lg border border-border bg-background/50 p-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Transaction Hash:</span>
                          <span className="font-mono text-xs text-neon-cyan">{tx.hash.slice(0, 20)}...{tx.hash.slice(-10)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Device:</span>
                          <span className="font-mono text-foreground">{tx.device}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Block Number:</span>
                          <span className="font-mono text-neon-purple">{tx.blockNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Blockchain Info */}
        <Card className="mt-8 border border-neon-cyan/30 bg-neon-cyan/5 backdrop-blur-xl p-6">
          <div className="flex items-start gap-4">
            <Database className="h-8 w-8 text-neon-cyan" />
            <div>
              <h3 className="text-lg font-semibold text-neon-cyan">Immutable Security Ledger</h3>
              <p className="mt-2 text-muted-foreground">
                All device operations, patch deployments, and security events are cryptographically signed and stored on
                the blockchain. This creates a tamper-proof audit trail that ensures data integrity and enables forensic
                analysis of security incidents. Transactions are verified through consensus and permanently recorded.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default Blockchain;
