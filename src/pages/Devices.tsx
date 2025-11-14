import { motion } from "framer-motion";
import { Shield, Activity, AlertCircle, CheckCircle, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Device {
  id: string;
  name: string;
  type: string;
  status: "active" | "patching" | "alert" | "offline";
  lastSeen: string;
  threats: number;
  patches: number;
}

const mockDevices: Device[] = [
  { id: "IoT-5F2A", name: "Temperature Sensor #1", type: "Sensor", status: "active", lastSeen: "2 mins ago", threats: 0, patches: 2 },
  { id: "IoT-7B3C", name: "Security Camera #4", type: "Camera", status: "patching", lastSeen: "5 mins ago", threats: 1, patches: 1 },
  { id: "IoT-2D8F", name: "Smart Lock #12", type: "Lock", status: "alert", lastSeen: "1 min ago", threats: 3, patches: 0 },
  { id: "IoT-9E1A", name: "Motion Detector #7", type: "Sensor", status: "active", lastSeen: "3 mins ago", threats: 0, patches: 1 },
  { id: "IoT-4C6B", name: "Environmental Monitor", type: "Sensor", status: "active", lastSeen: "4 mins ago", threats: 0, patches: 3 },
  { id: "IoT-8A2D", name: "Access Controller #2", type: "Controller", status: "offline", lastSeen: "2 hours ago", threats: 0, patches: 0 },
  { id: "IoT-3F9E", name: "Smart Thermostat", type: "Controller", status: "active", lastSeen: "1 min ago", threats: 0, patches: 1 },
  { id: "IoT-6D4C", name: "Fire Alarm System", type: "Sensor", status: "active", lastSeen: "2 mins ago", threats: 0, patches: 0 },
];

const statusConfig = {
  active: { color: "text-neon-green", bg: "bg-neon-green/10", border: "border-neon-green/30", label: "Active", icon: CheckCircle },
  patching: { color: "text-neon-cyan", bg: "bg-neon-cyan/10", border: "border-neon-cyan/30", label: "Patching", icon: Activity },
  alert: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "Alert", icon: AlertCircle },
  offline: { color: "text-muted-foreground", bg: "bg-muted/10", border: "border-muted/30", label: "Offline", icon: Shield },
};

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDevices = mockDevices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-neon-cyan">Device Management</h1>
            <p className="mt-2 text-muted-foreground">Monitor and manage all connected IoT devices</p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search devices by name, ID, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-neon-cyan/30 bg-background/50 pl-10"
            />
          </div>
        </Card>

        {/* Device Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = mockDevices.filter((d) => d.status === status).length;
            return (
              <Card key={status} className={`border ${config.border} ${config.bg} backdrop-blur-xl p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{config.label}</p>
                    <p className={`mt-1 text-2xl font-bold ${config.color}`}>{count}</p>
                  </div>
                  <config.icon className={`h-8 w-8 ${config.color}`} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDevices.map((device, index) => {
            const config = statusConfig[device.status];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/devices/${device.id}`}>
                  <Card className={`border ${config.border} bg-card/50 backdrop-blur-xl p-6 transition-all hover:scale-105 cursor-pointer`}>
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{device.name}</h3>
                        <p className="text-sm text-muted-foreground">{device.id}</p>
                      </div>
                      <StatusIcon className={`h-6 w-6 ${config.color}`} />
                    </div>

                    <div className="mb-4 flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {device.type}
                      </Badge>
                      <Badge className={`${config.bg} ${config.color} text-xs`}>{config.label}</Badge>
                    </div>

                    <div className="space-y-2 border-t border-border pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Seen:</span>
                        <span className="text-foreground">{device.lastSeen}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active Threats:</span>
                        <span className={device.threats > 0 ? "text-destructive" : "text-neon-green"}>
                          {device.threats}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Patches Applied:</span>
                        <span className="text-neon-cyan">{device.patches}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Devices;
