import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import {
    Home,
    FolderKanban,
    BarChart3,
    LogOut, Clock
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./components/ui/sidebar.tsx"
import {Button} from "@/components/ui/button.tsx";

const items = [
    { title: "Home", path: "/dashboard", icon: Home },
    { title: "Registros de Horas", path: "/timeRecord", icon: Clock },
    { title: "Projetos", path: "/projects", icon: FolderKanban },
    { title: "Relatórios", path: "/reports", icon: BarChart3 },
];

export default function Layout() {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>TimeTracker Pro</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <Link to={item.path}>
                                            <SidebarMenuButton
                                                // Aplicamos o estilo 'secondary' se o link estiver ativo
                                                //variant={isActive(item.path) ? "secondary" : "ghost"}
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>



                {/* Botão sair no final */}
                <div className="p-4 mt-auto">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={logout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                    </Button>
                </div>
            </Sidebar>

            {/* Conteúdo */}
            <main className="flex flex-col p-4 lg:p-6 gap-4 lg:gap-6">
                <Outlet key={location.pathname} />
            </main>
        </div>
    );
}
