import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SagarsoftLogo } from "./SagarsoftLogo";
import sagarsoftBuilding from "../assets/fa9eebd15dda20079679d5553e33bd622584070f.png";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess,setPermissions } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/interceptors";
import PERMISSIONS_ENDPOINTS from "../services/permissionsEndPoints";
import { ForgotPassword } from "./ForgotPassword";
export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  // dispatch(login({ id: '1', name: 'Dheemanth', email: 'dheemanth@sagarsoft.com' }));
  // dispatch(logout());
 const [loading, setLoading] = useState(false);

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
     const response = await api.post("auth/signin", { username:username.toUpperCase(), password });
      const { id, username: userName, email, token, refreshToken, role, roleId,employeeId,userId } = response.data;

      console.log("✅ Login successful:", response.data);


      dispatch(loginSuccess({
        username: userName,
        token: token,
        refreshToken: refreshToken,
        role: role,
        rolePermissions: {} ,
        roleId:roleId,
        managerLevels: response.data.managerLevels,
        employeeId:employeeId,
        userId:userId
      }));

    // Step 3: Fetch permissions dynamically using roleId
      const permissionsResponse = await api.get(
        PERMISSIONS_ENDPOINTS.GET_PRIVILEGES(roleId),
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ ensure token attached
          },
        }
      );

     
      // ✅ Step 4: Store permissions in Redux properly
      const privilegesDataRaw = permissionsResponse.data?.data?.[0]?.rolePermissions;
console.log("privilegesDataRaw",privilegesDataRaw)
      let privilegesData = {};
      try {
        privilegesData = privilegesDataRaw ? JSON.parse(privilegesDataRaw) : {};
      } catch (err) {
        console.error("❌ Error parsing rolePermissions JSON:", err);
        privilegesData = {};
      }

      console.log("✅ Permissions stored:", privilegesData);

      dispatch(setPermissions(privilegesData));
   
    
    if(role != "" ){
      navigate("/dashboard");
    }
    // }else if(role === "HR"){
    //   navigate("/dashboard");
    // }else if(role === "MANAGER"){
    //   navigate("/dashboard");
    // }else{
    //   navigate("/dashboard");
    // }
    setLoading(false);
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};

  if (showForgotPassword) {
    return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
  }

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
               <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
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