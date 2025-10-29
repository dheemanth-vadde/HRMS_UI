import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SagarsoftLogo } from "./SagarsoftLogo";
import sagarsoftBuilding from "../assets/fa9eebd15dda20079679d5553e33bd622584070f.png";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/interceptors";
import PERMISSIONS_ENDPOINTS from "../services/permissionsEndPoints";

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // dispatch(login({ id: '1', name: 'Dheemanth', email: 'dheemanth@sagarsoft.com' }));
  // dispatch(logout());

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await api.post("auth/signin", { username, password });
    const { id, username: userName, email, token, refreshToken,role,roleId } = response.data;
   // const permissionsResponse =  await api.get(PERMISSIONS_ENDPOINTS.GET_PRIVILEGES(roleId));
//console.log('Login Response:', permissionsResponse.data);
    console.log('Login Response:', response.data);

response.data.rolePermissions  ={
  "menuname": "default",
  "/superadmin/organization/info": {
    "all": true,
    "view": true,
    "create": false,
    "edit": true,
    "delete": true
  },
  "/superadmin/organization/units": {
    "all": true,
    "view": true,
    "create": true,
    "edit": true,
    "delete": true
  },
  "/superadmin/organization/departments": {
    "all": true,
    "view": true,
    "create": true,
    "edit": true,
    "delete": true
  },
  "/superadmin/organization/announcements": {
    "all": true,
    "view": true,
    "create": true,
    "edit": true,
    "delete": true
  },
  "/dashboard": {
    "all": true,
    "view": true,
    "create": true,
    "edit": true,
    "delete": true
  },
  "/hr/recruitment": {
    "all": true,
    "view": true,
    "create": true,
    "edit": true,
    "delete": true
  },
  "/superadmin/access-control":
  
  {
    "all": true,
    "view": true,
    "create": true,
    "edit": true,
    "delete": true
  },
  "/superadmin/access-control/roles":
  {
    "all": true,
    "view": true,
    "create": true,
    "edit": true,
    "delete": true
  },
  "/superadmin/access-control/permissions":
  {
    "all": true,
    "view": true,
    "create": true,
    "edit": true,
    "delete": true
  },
  
};
    dispatch(loginSuccess({
  user: response.data.username,
  token: response.data.token,
  refreshToken: response.data.refreshToken,
  role: response.data.role,
  rolePermissions: response.data.rolePermissions ,
  roleId:response.data.roleId
}));


    // // Role-based login routing
    // if (userName.includes("super") || userName === "superadmin") {
    //   onLogin("superadmin");
    // } else if (userName.includes("hr") || userName.includes("admin")) {
    //   onLogin("hr");
    // } else if (userName.includes("manager")) {
    //   onLogin("manager");
    // } else {
    //   onLogin("employee");
    // }
    if(role === "SUPER ADMIN"){
      console.log("sadsa")
      navigate("/dashboard");
    }else if(role === "HR"){
      navigate("/organization");
    }else if(role === "MANAGER"){
      navigate("/organization");
    }else{
      navigate("/organization");
    }

  } catch (error) {
    console.error(error);
    alert("Login failed");
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