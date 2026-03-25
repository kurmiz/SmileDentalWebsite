import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, EyeOff, AlertCircle, Sparkles, Building2 } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    if (password === correctPassword) {
      localStorage.setItem("adminAuthenticated", "true");
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password. Please try again.");
      toast.error("Login failed");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Panel: Branding / Visuals */}
      <div className="hidden lg:flex flex-col justify-between bg-primary relative overflow-hidden text-primary-foreground p-10">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-300 blur-3xl opacity-50" />
        </div>
        
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 font-bold leading-none">
            <Sparkles className="h-6 w-6" />
            <span className="text-xl tracking-tight">Smile Connect</span>
          </div>
        </motion.div>

        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <blockquote className="space-y-4">
            <p className="text-4xl font-normal tracking-tight">
              Manage your clinic's appointments and patient requests smoothly from one centralized hub.
            </p>
            <footer className="text-sm opacity-80 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Butwal, Nepal
            </footer>
          </blockquote>
        </motion.div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile Branding Fallback */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <span className="font-bold tracking-tight">Smile Connect</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner border border-primary/20">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Enter your administrative credentials to access the dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <Alert variant="destructive" className="bg-destructive/10 text-destructive border-none">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <div className="space-y-2 relative">
              <Label htmlFor="password">Administrator Password</Label>
              <div className="relative group shadow-sm transition-shadow rounded-md focus-within:shadow-md">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="pr-12 h-12 text-base transition-colors focus-visible:ring-1 focus-visible:ring-primary/50"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold shadow-md active:scale-[0.98] transition-transform" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            For demonstration purposes, try <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">admin123</code>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;