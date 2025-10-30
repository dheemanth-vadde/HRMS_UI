// src/layouts/Header.tsx
import { useState, useEffect } from "react";
import { Menu, Bell } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/uiSlice";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { UserCircle, Settings, LogOut } from "lucide-react";
import { Search } from "lucide-react";
type UserRole = "employee" | "manager" | "hr" | "superadmin" | null;
type ActiveModule = "dashboard" | "employees" | "hr" | "settings";
const Header: React.FC = () => {
 const [userRole, setUserRole] = useState<UserRole>(null);
   const [activeModule, setActiveModule] = useState<ActiveModule>("dashboard");
    const getUserName = () => {
    switch (userRole) {
      case "employee":
        return "Sanjay Kumar";
      case "manager":
        return "Pradeep Singh";
      case "superadmin":
        return "Super Admin";
      default:
        return "Admin User";
    }
  };
    const getUserRole = () => {
    switch (userRole) {
      case "employee":
        return "Officer - Emp ID: PNB12345";
      case "manager":
        return "Senior Manager";
      case "superadmin":
        return "System Administrator";
      default:
        return "HR Administrator";
    }
  };
    const handleLogout = () => {
    setUserRole(null);
    setActiveModule("dashboard");
  };
  const dispatch = useDispatch();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
   <header className="h-16 bg-white dark:bg-card border-b border-border flex items-center justify-between px-6 shadow-md backdrop-blur-sm animate-slide-in-right">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-accent transition-zynix hover:text-primary"
            >
              <Menu className="size-5" />
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-accent/50 to-blue-50 rounded-lg px-3 py-1.5 w-64 border border-primary/10 transition-zynix hover:border-primary/30">
              <Search className="size-4 text-primary" />
              <Input
                placeholder="Search..."
                className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm placeholder:text-muted-foreground/70"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-accent transition-zynix hover:text-primary">
              <Bell className="size-5" />
              <span className="absolute top-1 right-1 size-2 bg-gradient-to-r from-secondary to-[#e55a2b] rounded-full animate-pulse shadow-lg"></span>
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent transition-zynix">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-[#2171b5] text-white">
                      {getUserName().split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{getUserName()}</div>
                    <div className="text-xs text-muted-foreground">{getUserRole()}</div>
                  </div>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="mr-2 size-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

  );
};

export default Header;
