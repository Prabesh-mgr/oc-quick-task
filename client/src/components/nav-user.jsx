"use client"
import { EditProfileDialog } from "../components/editUsers/index.jsx";
import { useNavigate } from "react-router-dom";
import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import user from "../assets/user.png"

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: ""
  });

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleUserCookieChange = () => {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        try {
          const parsedUser = JSON.parse(userCookie);
          setUserData(parsedUser);
        } catch (error) {
          console.error("Error parsing user cookie:", error);
        }
      }
    };

    if (!isProfileDialogOpen) {
      handleUserCookieChange();
    }
  }, [isProfileDialogOpen]);

  const handleLogOut = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('user', { path: '/' });
    navigate('/');
  };

  const getInitials = () => {
    const firstInitial = userData.firstName ? userData.firstName[0] : '';
    const lastInitial = userData.lastName ? userData.lastName[0] : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();

  return (
    <>
      <EditProfileDialog
        isOpen={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        userData={userData}
      />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userData.avatar} alt={fullName} />
                  <AvatarFallback className="rounded-lg">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{fullName}</span>
                  <span className="truncate text-xs">{userData.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData.avatar} alt={fullName} />
                    <AvatarFallback className="rounded-lg">{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{fullName}</span>
                    <span className="truncate text-xs">{userData.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)} className={"cursor-pointer"}>
                <Avatar className="h-5 w-5 mr-2 rounded-sm">
                  <AvatarImage src={user} alt={fullName} />
                </Avatar>
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}