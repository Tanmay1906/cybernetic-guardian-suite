import { motion } from "framer-motion";
import { Package, Download, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Patch {
  id: string;
  version: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium";
  releaseDate: string;
  affectedDevices: number;
  status: "available" | "deploying" | "deployed";
  progress?: number;
}

const mockPatches: Patch[] = [
  {
    id: "PATCH-2024-001",
    version: "v2.4.1",
    title: "Critical Security Vulnerability Fix",
    description: "Addresses zero-day exploit in authentication module. Immediate deployment recommended.",
    severity: "critical",
    releaseDate: "2024-11-12",
    affectedDevices: 24,
    status: "available",
  },
  {
    id: "PATCH-2024-002",
    version: "v2.3.8",
    title: "TLS Protocol Upgrade",
    description: "Updates encryption protocols to TLS 1.3 for enhanced security.",
    severity: "high",
    releaseDate: "2024-11-10",
    affectedDevices: 45,
    status: "deploying",
    progress: 67,
  },
  {
    id: "PATCH-2024-003",
    version: "v2.3.5",
    title: "Performance Optimization",
    description: "Improves device response time and reduces memory footprint by 15%.",
    severity: "medium",
    releaseDate: "2024-11-08",
    affectedDevices: 156,
    status: "deployed",
  },
  {
    id: "PATCH-2024-004",
    version: "v2.2.9",
    title: "Network Stack Enhancement",
    description: "Resolves intermittent connectivity issues in high-traffic scenarios.",
    severity: "high",
    releaseDate: "2024-11-05",
    affectedDevices: 89,
    status: "deployed",
  },
];

const severityConfig = {
  critical: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30" },
  high: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
};

const statusConfig = {
  available: { label: "Available", color: "text-neon-cyan", icon: Download },
  deploying: { label: "Deploying", color: "text-yellow-400", icon: Clock },
  deployed: { label: "Deployed", color: "text-neon-green", icon: CheckCircle },
};

const Patches = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-cyan">Patch Management</h1>
          <p className="mt-2 text-muted-foreground">Self-healing system updates and security patches</p>
        </div>

        {/* Patch Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Patches</p>
                <p className="mt-2 text-3xl font-bold text-neon-cyan">
                  {mockPatches.filter((p) => p.status === "available").length}
                </p>
              </div>
              <Download className="h-10 w-10 text-neon-cyan" />
            </div>
          </Card>

          <Card className="border border-yellow-400/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deploying</p>
                <p className="mt-2 text-3xl font-bold text-yellow-400">
                  {mockPatches.filter((p) => p.status === "deploying").length}
                </p>
              </div>
              <Clock className="h-10 w-10 text-yellow-400 animate-spin" />
            </div>
          </Card>

          <Card className="border border-neon-green/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deployed</p>
                <p className="mt-2 text-3xl font-bold text-neon-green">
                  {mockPatches.filter((p) => p.status === "deployed").length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-neon-green" />
            </div>
          </Card>

          <Card className="border border-destructive/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Patches</p>
                <p className="mt-2 text-3xl font-bold text-destructive">
                  {mockPatches.filter((p) => p.severity === "critical").length}
                </p>
              </div>
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </Card>
        </div>

        {/* Patches List */}
        <div className="space-y-6">
          {mockPatches.map((patch, index) => {
            const severityConf = severityConfig[patch.severity];
            const statusConf = statusConfig[patch.status];
            const StatusIcon = statusConf.icon;

            return (
              <motion.div
                key={patch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border ${severityConf.border} bg-card/50 backdrop-blur-xl p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-4 flex items-center gap-4">
                        <Package className={`h-8 w-8 ${severityConf.color}`} />
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-foreground">{patch.title}</h3>
                            <Badge className="font-mono text-xs">{patch.version}</Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {patch.id} • Released {patch.releaseDate}
                          </p>
                        </div>
                      </div>

                      <p className="mb-4 text-foreground">{patch.description}</p>

                      <div className="mb-4 flex items-center gap-3">
                        <Badge className={`${severityConf.bg} ${severityConf.color}`}>
                          {patch.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary">{patch.affectedDevices} devices affected</Badge>
                        <Badge className={`${statusConf.color}`}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConf.label}
                        </Badge>
                      </div>

                      {patch.status === "deploying" && patch.progress && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Deployment Progress</span>
                            <span className="text-foreground">{patch.progress}%</span>
                          </div>
                          <Progress value={patch.progress} className="h-2" />
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex flex-col gap-2">
                      {patch.status === "available" && (
                        <Button className="bg-neon-cyan text-primary-foreground hover:bg-neon-cyan/90 glow-cyan">
                          <Download className="mr-2 h-4 w-4" />
                          Deploy Now
                        </Button>
                      )}
                      {patch.status === "deploying" && (
                        <Button variant="outline" className="border-yellow-400/30" disabled>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Deploying...
                        </Button>
                      )}
                      {patch.status === "deployed" && (
                        <Button variant="outline" className="border-neon-green/30 text-neon-green">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Deployed
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Self-Healing Info */}
        <Card className="mt-8 border border-neon-green/30 bg-neon-green/5 backdrop-blur-xl p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-8 w-8 text-neon-green" />
            <div>
              <h3 className="text-lg font-semibold text-neon-green">Self-Healing Protocol Active</h3>
              <p className="mt-2 text-muted-foreground">
                The system automatically detects vulnerable devices and deploys necessary patches. Critical updates are
                prioritized and applied during low-traffic periods to minimize disruption. All patches are verified via
                blockchain before deployment.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default Patches;
