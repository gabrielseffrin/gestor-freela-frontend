import {useState} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "./contexts/AuthContext";
import {Home, FolderKanban, BarChart3, LogOut, Clock, Menu} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "./components/ui/sidebar.tsx"
import {Button} from "@/components/ui/button.tsx";

import {logout as logoutService} from '@/services/authService.ts';

const items = [
    {title: "Home", path: "/dashboard", icon: Home},
    {title: "Registros de Horas", path: "/timeRecord", icon: Clock},
    {title: "Projetos", path: "/projects", icon: FolderKanban},
    {title: "Relatórios", path: "/reports", icon: BarChart3},
];

export default function Layout() {
    const {logout, token} = useAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = async () => {

        if (!token) return;

        try {
            await logoutService(token);
        } catch (error) {
            console.error("Falha ao fazer logout na API, mas deslogando localmente:", error);
        } finally {
            logout();
        }
    }

    return (
        <div className="flex min-h-screen grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block">
                <Sidebar className="sticky top-0 h-screen">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>TimeTracker Pro</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <Link to={item.path}>
                                                <SidebarMenuButton isActive={isActive(item.path)}>
                                                    <item.icon className="mr-2 h-4 w-4"/>
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </Link>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <div className="p-4 mt-auto">
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4"/>
                            Sair
                        </Button>
                    </div>
                </Sidebar>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsOpen(false)}>
                    <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-4"
                         onClick={(e) => e.stopPropagation()}>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>TimeTracker Pro</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <Link to={item.path} onClick={() => setIsOpen(false)}>
                                                    <SidebarMenuButton isActive={isActive(item.path)}>
                                                        <item.icon className="mr-2 h-4 w-4"/>
                                                        <span>{item.title}</span>
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                        <div className="p-4 mt-auto">
                            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4"/>
                                Sair
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col">
                <div className="p-2 md:hidden">
                    <Button variant="ghost" onClick={() => setIsOpen(true)}>
                        <Menu className="h-6 w-6"/>
                    </Button>
                </div>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
                    <Outlet key={location.pathname}/>
                </main>
            </div>
        </div>
    );
}
