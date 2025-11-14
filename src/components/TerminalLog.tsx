import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";

interface LogEntry {
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  message: string;
}

const mockLogs: LogEntry[] = [
  { timestamp: "14:32:18", level: "success", message: "Device IoT-5F2A authenticated successfully" },
  { timestamp: "14:32:21", level: "info", message: "Firmware update v2.4.1 applied to IoT-7B3C" },
  { timestamp: "14:32:25", level: "warning", message: "Anomaly detected in network traffic pattern" },
  { timestamp: "14:32:28", level: "error", message: "Failed connection attempt from unknown device" },
  { timestamp: "14:32:32", level: "success", message: "Self-healing protocol activated on IoT-2D8F" },
  { timestamp: "14:32:36", level: "info", message: "Blockchain transaction 0x7f3... confirmed" },
];

const levelColors = {
  info: "text-neon-cyan",
  warning: "text-yellow-400",
  error: "text-destructive",
  success: "text-neon-green",
};

export const TerminalLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < mockLogs.length) {
        setLogs((prev) => [...prev, mockLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border border-neon-cyan/30 bg-card/50 backdrop-blur-xl p-6">
      <h3 className="mb-4 text-lg font-semibold text-neon-cyan">System Terminal</h3>
      <div className="h-64 overflow-auto rounded-lg bg-background/80 p-4 terminal-text">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2 text-sm"
          >
            <span className="text-muted-foreground">[{log.timestamp}]</span>{" "}
            <span className={levelColors[log.level]}>[{log.level.toUpperCase()}]</span>{" "}
            <span className="text-foreground">{log.message}</span>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="inline-block h-4 w-2 bg-neon-cyan"
        />
      </div>
    </Card>
  );
};
