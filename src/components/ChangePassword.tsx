import {useState,useEffect} from 'react'
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Eye, EyeOff} from "lucide-react";
import { toast} from "sonner";
import FORGOT_PASSWORD_ENDPOINTS from '../services/passwordEndpoints';
import api from '../services/interceptors';
import {selectAuth} from '../store/authSlice';
import {useAppSelector}  from '../store/hooks';
import { useNavigate} from 'react-router-dom';
import {getValidationError} from '../utils/validations';
import SITE_CONFIG_ENDPOINTS from '../services/siteConfigEndpoints';




const ChangePassword = () => {
      //   const[user,setUser] = useState({   
      //     "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2OTk2YTY2My1mNDE2LTQ3MGQtOTExZS03OWYyODMwMTRlNWQiLCJyb2xlIjoiTUFOQUdFTUVOVCIsImlhdCI6MTc2MTY1NzA3NSwiZXhwIjoxNzYxNjU3OTc1fQ.CitZnuTEqTzYyNL1bJr7Q8RiEKRybVbhh8IB1nbRgX0",
      //     "type": null,
      //     "refreshToken": "ecb06fe3-6967-49bb-8224-1b4578ed2b12",
      //     "id": 7608451568716106000,
      //     "username": "DIL-0011",
      //     "email": "sumanth.sangam@sagarsoft.in",
      //     "role": "MANAGEMENT",
      //     "roleId": "fa25445c-1ea4-4dcc-b56f-9e31a7bf801c"
      // })
      const navigate = useNavigate();
      const user = useAppSelector(selectAuth);
      // const businessUnitId1 = "9c4a75fe-7063-415c-934a-9def4023c647";//this gives user name from redux,existing site config
      const businessUnitId = "33d0c29c-0447-42ec-b0ca-8cf310283136";//this gives user name from redux,no existing site config
      const [oldPassword, setOldPassword] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [showOldPassword, setShowOldPassword] = useState(false);
      const [showNewPassword, setShowNewPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [errors,setErrors] = useState<{ [key: string]: string | null }>({});
      const [passwordPolicy,setPasswordPolicy] = useState({
        minLength:8,
        requireUppercase:true,
        requireNumber:true,
        requireSpecial:true
      })

      // to fetch password policy
      useEffect(() => {
        const fetchPasswordPolicy = async () => {
          try{
            const response = await api.get(SITE_CONFIG_ENDPOINTS.GET_SITE_CONFIG_BY_BU_ID(businessUnitId));
            const {passwordPolicyDTO} = response?.data?.data || {} ;
            console.log("password policy data :",passwordPolicyDTO);
            if(!passwordPolicyDTO) return; //to defaults

            setPasswordPolicy((prev)=>{
              return {...prev,
                minLength:passwordPolicyDTO.minLength,
                requireUppercase:passwordPolicyDTO.requireUppercase,
                requireNumber:passwordPolicyDTO.requireNumber,
                requireSpecial:passwordPolicyDTO.requireSpecial
              }
            })
              
          }catch(error){
              console.log("Error fetching roles",error);
          }finally{
            
          }
        }
        fetchPasswordPolicy();
      },[businessUnitId]);
       

      const handleResetSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            
            // Validation
            if (!oldPassword) {
              toast.error("Please enter your old password");
              return;
            }
            
            const isValid = validateNewPassword();
            if(!isValid){
              toast.error("Please fix validation errors before submitting");
              setConfirmPassword("");
              return;
            }
            
            if (newPassword !== confirmPassword) {
              toast.error("Passwords do not match");
              setConfirmPassword("");
              return;
            }
            
            try{
            const response = await api.post(FORGOT_PASSWORD_ENDPOINTS.POST_RESET,{
                username:user.username,
                oldPassword,
                newPassword  
            })
            console.log("Password changed successfully",response);
            toast.success("Password changed successfully!");
                  
            }catch(error){
                console.log("Error changing password",error);
                if(error.status === 401){
                  toast.warning("Old password is incorrect")
                }else{
                  toast.error("Error changing password")
                }
              }finally{
                handleReset();
              }
            }

          const handleReset=()=>{
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowOldPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            setErrors({});
          }
        


        const validateNewPassword = (): boolean => {
            const newErrors: Record<string, string|null> = {};
            let error:string|null = null;

            const requiredFields:string[] = Object.keys(passwordPolicy).filter((field)=>( passwordPolicy[field]));
            requiredFields.forEach((field)=>{
                switch(field){
                    case "minLength":
                      error = newPassword.length >= passwordPolicy.minLength ? null : `Password must be at least ${passwordPolicy.minLength} characters long`;
                      break;
                    case "requireUppercase":
                      error = getValidationError("uppercase",newPassword);
                      break;
                    case "requireNumber":
                      error = getValidationError("number",newPassword);
                      break;
                    case "requireSpecial":
                      error = getValidationError("specialcharacter",newPassword);
                      break;
                    default:
                      break;
                }
                newErrors[field] = error;
              })

            setErrors(newErrors);
            return !Object.values(newErrors).some(v => v !== null);
            
      }

  return (
     <form onSubmit={handleResetSubmit} className="space-y-4">
              {/* <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">Email sent successfully!</span>
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    System generated password has been sent to <span className="font-semibold">{user.email}</span>
                  </p>
                </div>
              </div> */}
              <div>
          <h1>Change Password</h1>
          <p className="text-muted-foreground mt-1">
           Change your account password to protect your access and information.
          </p>
        </div>

              <div className="space-y-2">
                <Label htmlFor="oldPassword">Old Password</Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter system generated password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showOldPassword ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
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
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </button>
              </div>
              { Object.values(errors).some(v => v !== null) &&
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <div className="text-red-600">
                    {errors.minLength && <p className="text-sm mt-1 text-red-600">{errors.minLength}</p>}
                    {errors.requireUppercase && <p className="text-sm mt-1 text-red-600">{errors.requireUppercase}</p>}
                    {errors.requireNumber && <p className="text-sm mt-1 text-red-600">{errors.requireNumber}</p>}
                    {errors.requireSpecial && <p className="text-sm mt-1 text-red-600">{errors.requireSpecial}</p>}
                  </div>
                </div>
              }
                
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
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
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
                  onClick={()=>{navigate("/dashboard");handleReset()}}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </form>
  )
}

export default ChangePassword