import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SagarsoftLogo } from "./SagarsoftLogo";
import sagarsoftBuilding from "figma:asset/fa9eebd15dda20079679d5553e33bd622584070f.png";

interface LoginPageProps {
  onLogin: (role: "employee" | "manager" | "hr" | "superadmin") => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - assign role based on username
    if (username.includes("super") || username === "superadmin") {
      onLogin("superadmin");
    } else if (username.includes("hr") || username.includes("admin")) {
      onLogin("hr");
    } else if (username.includes("manager")) {
      onLogin("manager");
    } else {
      onLogin("employee");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with Full Width Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sagarsoftBuilding})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/50"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <Card className="w-full max-w-md shadow-2xl relative z-10 backdrop-blur-sm bg-white/98 animate-scale-in border-l-border/60">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SagarsoftLogo className="h-16 w-auto" />
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-primary">HRMS Portal</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-6 p-4 pnb-gradient-accent/10 border-l-4 border-primary rounded-lg space-y-2">
            <p className="text-sm font-semibold text-primary">Demo Credentials:</p>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">👤 Employee: <span className="font-medium text-foreground">employee</span> / password</p>
              <p className="text-xs text-muted-foreground">👔 Manager: <span className="font-medium text-foreground">manager</span> / password</p>
              <p className="text-xs text-muted-foreground">⚙️ HR Admin: <span className="font-medium text-foreground">hradmin</span> / password</p>
              <p className="text-xs text-muted-foreground">🔧 Super Admin: <span className="font-medium text-foreground">superadmin</span> / password</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}