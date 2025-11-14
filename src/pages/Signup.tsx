import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(email, password, name);
      toast({
        title: "Account created!",
        description: "Welcome to IoT Shield",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
        <Card className="border-2 border-neon-green/30 bg-card/80 backdrop-blur-2xl p-8 glow-green">
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", duration: 1 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon-green/10"
            >
              <Shield className="h-10 w-10 text-neon-green" />
            </motion.div>
            <h1 className="text-3xl font-bold text-neon-green">Create Account</h1>
            <p className="mt-2 text-muted-foreground">Join the IoT Shield Network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-neon-green/30 bg-background/50 pl-10 focus:border-neon-green"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@iotshield.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-neon-green/30 bg-background/50 pl-10 focus:border-neon-green"
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
                  className="border-neon-green/30 bg-background/50 pl-10 focus:border-neon-green"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neon-green text-primary-foreground hover:bg-neon-green/90 glow-green"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-neon-green hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
