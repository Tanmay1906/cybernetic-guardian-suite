import { motion } from "framer-motion";
import { ArrowLeft, Shield, Activity, AlertCircle, CheckCircle, Cpu, Wifi, HardDrive } from "lucide-react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

const DeviceDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const performanceData = [
    { time: "10:00", cpu: 45, memory: 62, network: 120 },
    { time: "11:00", cpu: 52, memory: 58, network: 140 },
    { time: "12:00", cpu: 38, memory: 65, network: 100 },
    { time: "13:00", cpu: 61, memory: 72, network: 180 },
    { time: "14:00", cpu: 48, memory: 68, network: 150 },
    { time: "15:00", cpu: 55, memory: 70, network: 160 },
  ];

  const securityEvents = [
    { time: "14:32:18", event: "Authentication successful", severity: "success" },
    { time: "14:28:45", event: "Firmware update completed v2.4.1", severity: "info" },
    { time: "14:15:22", event: "Anomaly detected in traffic pattern", severity: "warning" },
    { time: "14:02:10", event: "Self-healing protocol activated", severity: "success" },
    { time: "13:48:33", event: "Security scan completed - No threats", severity: "success" },
  ];

  const severityColors = {
    success: "text-neon-green",
    info: "text-neon-cyan",
    warning: "text-yellow-400",
    error: "text-destructive",
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <Link to="/devices">
            <Button variant="outline" className="mb-4 border-neon-cyan/30">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Devices
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-neon-cyan">Device Details: {id}</h1>
              <p className="mt-2 text-muted-foreground">Temperature Sensor #1</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-neon-green/10 text-neon-green">
                <CheckCircle className="mr-1 h-3 w-3" />
                Active
              </Badge>
              <Badge variant="secondary">Sensor</Badge>
            </div>
          </div>
        </div>

        {/* Device Info Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="mt-2 text-3xl font-bold text-neon-cyan">48%</p>
              </div>
              <Cpu className="h-10 w-10 text-neon-cyan" />
            </div>
          </Card>

          <Card className="border border-neon-green/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Memory</p>
                <p className="mt-2 text-3xl font-bold text-neon-green">68%</p>
              </div>
              <HardDrive className="h-10 w-10 text-neon-green" />
            </div>
          </Card>

          <Card className="border border-neon-purple/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network</p>
                <p className="mt-2 text-3xl font-bold text-neon-purple">150 KB/s</p>
              </div>
              <Wifi className="h-10 w-10 text-neon-purple" />
            </div>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mb-8 border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6">
          <h3 className="mb-4 text-lg font-semibold text-neon-cyan">Performance Metrics (Last 6 Hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
              <XAxis dataKey="time" stroke="#6ee7b7" />
              <YAxis stroke="#6ee7b7" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 14, 26, 0.9)",
                  border: "1px solid rgba(0, 240, 255, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="cpu" stroke="#00f0ff" strokeWidth={2} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#00ffaa" strokeWidth={2} name="Memory %" />
              <Line type="monotone" dataKey="network" stroke="#a855f7" strokeWidth={2} name="Network KB/s" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Device Information */}
          <Card className="border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6">
            <h3 className="mb-4 text-lg font-semibold text-neon-cyan">Device Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Device ID</span>
                <span className="font-mono text-foreground">{id}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Type</span>
                <span className="text-foreground">Temperature Sensor</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Firmware Version</span>
                <span className="text-foreground">v2.4.1</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">IP Address</span>
                <span className="font-mono text-foreground">192.168.1.45</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">MAC Address</span>
                <span className="font-mono text-foreground">5F:2A:8B:4C:1D:9E</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Last Update</span>
                <span className="text-foreground">2 mins ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blockchain Verified</span>
                <span className="text-neon-green">
                  <CheckCircle className="inline h-4 w-4" /> Yes
                </span>
              </div>
            </div>
          </Card>

          {/* Security Events */}
          <Card className="border border-neon-green/30 bg-card/50 backdrop-blur-xl p-6">
            <h3 className="mb-4 text-lg font-semibold text-neon-green">Recent Security Events</h3>
            <div className="space-y-3">
              {securityEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg border border-border bg-background/50 p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${severityColors[event.severity]}`}>
                        {event.event}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{event.time}</p>
                    </div>
                    {event.severity === "success" && <CheckCircle className="h-4 w-4 text-neon-green" />}
                    {event.severity === "warning" && <AlertCircle className="h-4 w-4 text-yellow-400" />}
                    {event.severity === "info" && <Activity className="h-4 w-4 text-neon-cyan" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button 
            onClick={() => {
              toast({
                title: "Security Scan Initiated",
                description: `Running comprehensive scan on ${id}...`,
              });
            }}
            className="bg-neon-cyan text-primary-foreground hover:bg-neon-cyan/90 glow-cyan"
          >
            <Shield className="mr-2 h-4 w-4" />
            Run Security Scan
          </Button>
          <Button 
            onClick={() => {
              toast({
                title: "Patch Deployment Started",
                description: "Applying latest security patch v2.4.1...",
              });
            }}
            className="bg-neon-green text-primary-foreground hover:bg-neon-green/90 glow-green"
          >
            <Activity className="mr-2 h-4 w-4" />
            Apply Patch
          </Button>
          <Button 
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Device Isolated",
                description: "Device has been disconnected from the network",
              });
            }}
            variant="outline" 
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Isolate Device
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default DeviceDetails;
