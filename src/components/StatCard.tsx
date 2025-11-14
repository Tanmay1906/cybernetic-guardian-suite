import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  color: "cyan" | "green" | "purple" | "red";
}

const colorClasses = {
  cyan: "text-neon-cyan border-neon-cyan/30 glow-cyan",
  green: "text-neon-green border-neon-green/30 glow-green",
  purple: "text-neon-purple border-neon-purple/30 glow-purple",
  red: "text-destructive border-destructive/30",
};

export const StatCard = ({ icon: Icon, label, value, trend, trendUp, color }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`border-2 ${colorClasses[color]} bg-card/50 backdrop-blur-xl p-6`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`mt-2 text-3xl font-bold ${colorClasses[color].split(' ')[0]}`}
            >
              {value}
            </motion.p>
            {trend && (
              <p className={`mt-1 text-xs ${trendUp ? "text-neon-green" : "text-destructive"}`}>
                {trendUp ? "↑" : "↓"} {trend}
              </p>
            )}
          </div>
          <Icon className={`h-10 w-10 ${colorClasses[color].split(' ')[0]}`} />
        </div>
      </Card>
    </motion.div>
  );
};
