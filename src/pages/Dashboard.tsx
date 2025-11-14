import { motion } from "framer-motion";
import { Shield, Activity, AlertTriangle, TrendingUp, Cpu, Wifi, Database } from "lucide-react";
import Layout from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { TerminalLog } from "@/components/TerminalLog";
import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const threatData = [
    { time: "00:00", threats: 12 },
    { time: "04:00", threats: 8 },
    { time: "08:00", threats: 24 },
    { time: "12:00", threats: 18 },
    { time: "16:00", threats: 32 },
    { time: "20:00", threats: 15 },
  ];

  const deviceStatusData = [
    { name: "Active", value: 156, color: "#00ffaa" },
    { name: "Patching", value: 24, color: "#00f0ff" },
    { name: "Offline", value: 8, color: "#a855f7" },
    { name: "Alert", value: 12, color: "#ef4444" },
  ];

  const networkData = [
    { time: "10:00", traffic: 2400 },
    { time: "11:00", traffic: 1398 },
    { time: "12:00", traffic: 9800 },
    { time: "13:00", traffic: 3908 },
    { time: "14:00", traffic: 4800 },
    { time: "15:00", traffic: 3800 },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-cyan">Security Command Center</h1>
          <p className="mt-2 text-muted-foreground">Real-time IoT network monitoring and threat detection</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Shield}
            label="Connected Devices"
            value="200"
            trend="12% this week"
            trendUp={true}
            color="cyan"
          />
          <StatCard
            icon={Activity}
            label="Active Threats"
            value="12"
            trend="8% from yesterday"
            trendUp={false}
            color="red"
          />
          <StatCard
            icon={AlertTriangle}
            label="Pending Patches"
            value="24"
            trend="15% this month"
            trendUp={true}
            color="purple"
          />
          <StatCard
            icon={TrendingUp}
            label="System Health"
            value="98.5%"
            trend="2% improvement"
            trendUp={true}
            color="green"
          />
        </div>

        {/* Charts Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Threat Detection Chart */}
          <Card className="border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neon-cyan">Threat Detection (24h)</h3>
              <Activity className="h-5 w-5 text-neon-cyan" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={threatData}>
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
                <Line type="monotone" dataKey="threats" stroke="#00f0ff" strokeWidth={2} dot={{ fill: "#00f0ff", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Device Status Pie Chart */}
          <Card className="border border-neon-green/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neon-green">Device Status</h3>
              <Cpu className="h-5 w-5 text-neon-green" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 14, 26, 0.9)",
                    border: "1px solid rgba(0, 255, 170, 0.3)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {deviceStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Network Traffic Chart */}
          <Card className="border border-neon-purple/30 bg-card/50 backdrop-blur-xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neon-purple">Network Traffic</h3>
              <Wifi className="h-5 w-5 text-neon-purple" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={networkData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.1)" />
                <XAxis dataKey="time" stroke="#c084fc" />
                <YAxis stroke="#c084fc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 14, 26, 0.9)",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    borderRadius: "8px",
                  }}
                />
                <Area type="monotone" dataKey="traffic" stroke="#a855f7" fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Terminal Log */}
          <TerminalLog />
        </div>

        {/* Quick Actions */}
        <Card className="border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6">
          <h3 className="mb-4 text-lg font-semibold text-neon-cyan">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button className="flex items-center gap-3 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 p-4 transition-all hover:bg-neon-cyan/10 glow-cyan">
              <Database className="h-6 w-6 text-neon-cyan" />
              <div className="text-left">
                <p className="font-medium text-foreground">Blockchain Verify</p>
                <p className="text-xs text-muted-foreground">Check transaction logs</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-neon-green/30 bg-neon-green/5 p-4 transition-all hover:bg-neon-green/10 glow-green">
              <Shield className="h-6 w-6 text-neon-green" />
              <div className="text-left">
                <p className="font-medium text-foreground">Deploy Patch</p>
                <p className="text-xs text-muted-foreground">Auto-heal devices</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-neon-purple/30 bg-neon-purple/5 p-4 transition-all hover:bg-neon-purple/10 glow-purple">
              <AlertTriangle className="h-6 w-6 text-neon-purple" />
              <div className="text-left">
                <p className="font-medium text-foreground">View Alerts</p>
                <p className="text-xs text-muted-foreground">12 pending alerts</p>
              </div>
            </button>
          </div>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
