import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SagarsoftLogo } from "./SagarsoftLogo";
import { ArrowLeft,Mail, CheckCircle2 } from "lucide-react";
import sagarsoftBuilding from "figma:asset/fa9eebd15dda20079679d5553e33bd622584070f.png";
import { toast, Toaster } from "sonner";
import api from "../services/interceptors";
import PASSWORD_ENDPOINTS from "../services/passwordEndpoints";




interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
//   const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const[isSent,setIsSent]   = useState(false);

  // const [systemPassword, setSystemPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showSystemPassword, setShowSystemPassword] = useState(false);
  // const [showNewPassword, setShowNewPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Simulate sending email with system generated password
    try{
            const response = await api.post(PASSWORD_ENDPOINTS.POST_EMAIL,{
            emailAddress: email
            });
            console.log("Password sent successfully",response)
            toast.success("System generated password has been sent to your email!");
                
            console.log("SUCCCESSSSSS")

            // reset not required for  forgot password
            // setTimeout(() => {
            //     setStep("reset");
            // }, 1000);
            
            setIsSent(true);//to get email sent popup
            
        }catch {
            toast.error("Please a registered email address.");
        }
  };

  // const handleResetSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   // Validation
  //   if (!systemPassword) {
  //     toast.error("Please enter system generated password");
  //     return;
  //   }
    
  //   if (newPassword.length < 8) {
  //     toast.error("New password must be at least 8 characters long");
  //     return;
  //   }
    
  //   if (newPassword !== confirmPassword) {
  //     toast.error("Passwords do not match");
  //     return;
  //   }
  //   try{
  //   const response = await api.post(FORGOT_PASSWORD_ENDPOINTS.POST_RESET,{
  //       username:email,
  //       oldPassword:systemPassword,
  //       password:newPassword  
  //   })
  //   console.log("Password changed successfully",response);
           
  //   }catch(error){
  //       console.log("Error changing password",error);
  //   }finally{

  //   }

    
  //    Success
  //   toast.success("Password reset successfully! Please login with your new password.");

    
  //    Redirect to login after a short delay
      // to go back to login page
            // setTimeout(() => {
            //         onBackToLogin();
            // }, 1500);
   
  // };

  return (
    <>
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
            <CardTitle className="text-primary">
              {/* {step === "email" ? "Forgot Password" : "Reset Password"} */}
              Forgot Password
            </CardTitle>
            <CardDescription>
              {/* {step === "email" 
                ? "Enter your email address to receive a system generated password"
                : "Enter your system generated password and create a new password"} */}
                Enter your email address to receive a system generated password
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* {step === "email" ? ( */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
        
              <div className="space-y-2">
                {!isSent && <>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10"
                        />
                    </div>
                 </>}

                {/* added this */}
                 {isSent &&
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                          <p className="text-sm text-green-800">
                            <span className="font-semibold">Email sent successfully!</span>
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            System generated password has been sent to <span className="font-semibold">{email}</span>
                          </p>
                      </div>
                      </div>}
              </div>
              
              <div className="space-y-3 pt-2">
                {!isSent && <Button type="submit" className="w-full">
                  Send Reset Password
                </Button>}
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={()=>{setIsSent(false);onBackToLogin()}}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Login
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Note:</span> A system generated password will be sent to your registered email address. Please check your inbox and spam folder.
                </p>
              </div>
            </form>
          {/* ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">Email sent successfully!</span>
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    System generated password has been sent to <span className="font-semibold">{email}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="systemPassword">System Generated Password</Label>
                <div className="relative">
                  <Input
                    id="systemPassword"
                    type={showSystemPassword ? "text" : "password"}
                    placeholder="Enter system generated password"
                    value={systemPassword}
                    onChange={(e) => setSystemPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSystemPassword(!showSystemPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showSystemPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
              
              <div className="space-y-3 pt-2">
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setStep("email");
                    setSystemPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Email
                </Button>
              </div>
            </form>
          )} */}
        </CardContent>
      </Card>
    </div>
    <Toaster/>
    </>
  );
}
