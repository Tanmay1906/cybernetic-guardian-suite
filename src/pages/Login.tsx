import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, mockLogin } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to IoT Shield",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockLogin = () => {
    mockLogin();
    toast({
      title: "Demo Access Granted",
      description: "Logged in as SIH Judge",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="cyber-grid absolute inset-0 opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-2 border-neon-cyan/30 bg-card/80 backdrop-blur-2xl p-8 glow-cyan">
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", duration: 1 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon-cyan/10"
            >
              <Shield className="h-10 w-10 text-neon-cyan" />
            </motion.div>
            <h1 className="text-3xl font-bold text-neon-cyan">IoT Shield</h1>
            <p className="mt-2 text-muted-foreground">Blockchain-Powered Security Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@iotshield.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-neon-cyan/30 bg-background/50 pl-10 focus:border-neon-cyan"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-neon-cyan/30 bg-background/50 pl-10 focus:border-neon-cyan"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neon-cyan text-primary-foreground hover:bg-neon-cyan/90 glow-cyan"
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            onClick={handleMockLogin}
            variant="outline"
            className="w-full border-neon-green/30 text-neon-green hover:bg-neon-green/10 glow-green"
          >
            <Zap className="mr-2 h-4 w-4" />
            Quick Demo Login (For Judges)
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-neon-cyan hover:underline">
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
