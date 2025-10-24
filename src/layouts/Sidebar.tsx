import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { routes } from "../config/permittedRoutes";
import { SagarsoftLogo } from "../components/SagarsoftLogo";
import { cn } from "../components/ui/utils";
import { ChevronDown } from "lucide-react";
import { toggleSidebar } from "../store/uiSlice";
import { useDispatch } from "react-redux";

type NavItemProps = {
  path: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  collapsed?: boolean;
  isChild?: boolean;
};

const NavItem = ({ path, name, icon: Icon, collapsed, isChild }: NavItemProps) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
        isChild ? "ml-4 py-2" : "",
        isActive
          ? "text-[#f38883]"
          : "text-white/80 hover:bg-white/5 hover:text-white"
      )
    }
  >
    {Icon && <Icon className={cn("flex-shrink-0", isChild ? "size-4" : "size-5")} />}
    {!collapsed && <span className="truncate">{name}</span>}
  </NavLink>
);

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const collapsed = useAppSelector(state => state.ui.sidebarCollapsed);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (path: string) => {
    if (collapsed) {
      dispatch(toggleSidebar());
    }
    setExpandedMenus(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <aside className={cn(
      "flex flex-col bg-[#2d2d58] text-white transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo */}
      <div className="h-16 border-b border-white/10 flex items-center justify-center">
        {collapsed ? (
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
        ) : (
          <div className="bg-primary w-full h-full flex items-center justify-center">
            <SagarsoftLogo className="h-10 w-auto" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {routes.map((route) => {
            if (route.children) {
              const isExpanded = expandedMenus.includes(route.path);
              const isActive = location.pathname.startsWith(route.path);
              
              return (
                <div key={route.path} className="space-y-1">
                  <button
                    onClick={() => toggleMenu(route.path)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors",
                      isActive ? "text-[#f38883]" : "text-white/80 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {route.icon && <route.icon className="size-5 flex-shrink-0" />}
                      {!collapsed && <span>{route.name}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronDown className={cn(
                        "size-4 transition-transform",
                        isExpanded && "rotate-180"
                      )} />
                    )}
                  </button>
                  
                  {!collapsed && isExpanded && (
                    <div className="mt-1 ml-4 space-y-1 border-l-2 border-white/20 pl-4">
                                    {route.children.map(child => {
                // Build the full URL used by NavLink:
                // if child.path already starts with '/', use it as-is; otherwise join parent + child
                const childFullPath = child.path.startsWith("/")
                    ? child.path
                    : `${route.path.replace(/\/$/, "")}/${child.path.replace(/^\//, "")}`;

                return (
                    <NavItem
                    key={childFullPath}
                    {...child}
                    path={childFullPath}
                    isChild
                    />
                );
                })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavItem
                key={route.path}
                {...route}
                collapsed={collapsed}
              />
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
