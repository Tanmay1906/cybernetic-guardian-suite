import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, CheckCircle, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  device: string;
  timestamp: string;
  status: "active" | "investigating" | "resolved";
}

const mockAlerts: Alert[] = [
  {
    id: "ALT-001",
    severity: "critical",
    title: "Unauthorized Access Attempt Detected",
    description: "Multiple failed authentication attempts from IP 45.32.178.92",
    device: "IoT-2D8F",
    timestamp: "2 mins ago",
    status: "active",
  },
  {
    id: "ALT-002",
    severity: "high",
    title: "Anomalous Network Traffic Pattern",
    description: "Unusual data transfer volume detected exceeding normal baseline by 340%",
    device: "IoT-7B3C",
    timestamp: "15 mins ago",
    status: "investigating",
  },
  {
    id: "ALT-003",
    severity: "medium",
    title: "Outdated Firmware Version",
    description: "Device running firmware v1.8.2, critical security update v2.4.1 available",
    device: "IoT-9E1A",
    timestamp: "1 hour ago",
    status: "active",
  },
  {
    id: "ALT-004",
    severity: "critical",
    title: "Potential DDoS Attack Vector",
    description: "Abnormal request rate from device suggesting botnet participation",
    device: "IoT-3F9E",
    timestamp: "3 hours ago",
    status: "investigating",
  },
  {
    id: "ALT-005",
    severity: "high",
    title: "Encryption Protocol Weakness",
    description: "Device using deprecated TLS 1.0, immediate upgrade required",
    device: "IoT-4C6B",
    timestamp: "5 hours ago",
    status: "active",
  },
  {
    id: "ALT-006",
    severity: "low",
    title: "Certificate Expiring Soon",
    description: "SSL certificate will expire in 7 days",
    device: "IoT-6D4C",
    timestamp: "1 day ago",
    status: "resolved",
  },
];

const severityConfig = {
  critical: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", icon: AlertTriangle },
  high: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30", icon: AlertCircle },
  medium: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", icon: AlertCircle },
  low: { color: "text-neon-cyan", bg: "bg-neon-cyan/10", border: "border-neon-cyan/30", icon: Info },
};

const statusConfig = {
  active: { label: "Active", color: "text-destructive", bg: "bg-destructive/20" },
  investigating: { label: "Investigating", color: "text-yellow-400", bg: "bg-yellow-400/20" },
  resolved: { label: "Resolved", color: "text-neon-green", bg: "bg-neon-green/20" },
};

const Alerts = () => {
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");
  const { toast } = useToast();

  const filteredAlerts = filter === "all" ? mockAlerts : mockAlerts.filter((a) => a.severity === filter);

  const activeCount = mockAlerts.filter((a) => a.status === "active").length;
  const criticalCount = mockAlerts.filter((a) => a.severity === "critical").length;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-cyan">Security Alerts</h1>
          <p className="mt-2 text-muted-foreground">Real-time threat detection and incident management</p>
        </div>

        {/* Alert Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border border-destructive/30 bg-destructive/10 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="mt-2 text-3xl font-bold text-destructive">{activeCount}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-destructive pulse-glow" />
            </div>
          </Card>

          <Card className="border border-destructive/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="mt-2 text-3xl font-bold text-destructive">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
          </Card>

          <Card className="border border-orange-500/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High</p>
                <p className="mt-2 text-3xl font-bold text-orange-500">
                  {mockAlerts.filter((a) => a.severity === "high").length}
                </p>
              </div>
              <AlertCircle className="h-10 w-10 text-orange-500" />
            </div>
          </Card>

          <Card className="border border-neon-green/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="mt-2 text-3xl font-bold text-neon-green">
                  {mockAlerts.filter((a) => a.status === "resolved").length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-neon-green" />
            </div>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6 border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-4">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-neon-cyan" />
            <div className="flex gap-2">
              {["all", "critical", "high", "medium", "low"].map((level) => (
                <Button
                  key={level}
                  onClick={() => setFilter(level as any)}
                  variant={filter === level ? "default" : "outline"}
                  className={filter === level ? "bg-neon-cyan text-primary-foreground" : ""}
                  size="sm"
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => {
            const severityConf = severityConfig[alert.severity];
            const statusConf = statusConfig[alert.status];
            const SeverityIcon = severityConf.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`border ${severityConf.border} ${severityConf.bg} backdrop-blur-xl p-6 transition-all hover:scale-[1.01]`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-3">
                        <SeverityIcon className={`h-6 w-6 ${severityConf.color}`} />
                        <div>
                          <h3 className={`text-lg font-semibold ${severityConf.color}`}>{alert.title}</h3>
                          <p className="text-sm text-muted-foreground">{alert.id} • {alert.timestamp}</p>
                        </div>
                      </div>

                      <p className="mb-4 text-foreground">{alert.description}</p>

                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-mono">
                          {alert.device}
                        </Badge>
                        <Badge className={`${statusConf.bg} ${statusConf.color}`}>{statusConf.label}</Badge>
                        <Badge className={`${severityConf.bg} ${severityConf.color}`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="ml-4 flex gap-2">
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Investigation Started",
                            description: `Analyzing threat ${alert.id} on device ${alert.device}`,
                          });
                        }}
                        size="sm" 
                        className="bg-neon-cyan text-primary-foreground hover:bg-neon-cyan/90"
                      >
                        Investigate
                      </Button>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Alert Resolved",
                            description: `${alert.title} has been marked as resolved`,
                          });
                        }}
                        size="sm" 
                        variant="outline" 
                        className="border-neon-green/30"
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Alerts;
