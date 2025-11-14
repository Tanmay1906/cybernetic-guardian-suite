import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Activity, AlertTriangle, Package, Database, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { icon: Activity, label: "Dashboard", path: "/dashboard" },
    { icon: Shield, label: "Devices", path: "/devices" },
    { icon: AlertTriangle, label: "Alerts", path: "/alerts" },
    { icon: Package, label: "Patches", path: "/patches" },
    { icon: Database, label: "Blockchain", path: "/blockchain" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 border-r border-border bg-card/50 backdrop-blur-xl"
      >
        <div className="flex h-16 items-center justify-center border-b border-border px-4">
          <Shield className="h-8 w-8 text-neon-cyan" />
          <span className="ml-2 text-xl font-bold text-neon-cyan">IoT Shield</span>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary glow-cyan"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg border border-border bg-card/50 p-4">
            <p className="text-sm text-muted-foreground">Logged in as</p>
            <p className="font-medium text-foreground">{user?.name}</p>
            <button
              onClick={logout}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-destructive/20 px-3 py-2 text-sm text-destructive hover:bg-destructive/30"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="cyber-grid min-h-full p-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
