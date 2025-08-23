import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {DataTable} from "@/components/DataTable.tsx";
import {Badge} from "lucide-react";

type ProjectStatus = "ativo" | "finalizado" | "pausado" | "planejamento";

const statusConfig = {
    ativo: { label: "Ativo", variant: "default" as const, color: "bg-green-500" },
    finalizado: { label: "Finalizado", variant: "secondary" as const, color: "bg-blue-500" },
    pausado: { label: "Pausado", variant: "destructive" as const, color: "bg-yellow-500" },
    planejamento: { label: "Planejamento", variant: "outline" as const, color: "bg-gray-500" }
};

const columns = [
    {accessorKey: "name", header: "Projeto"},
    {accessorKey: "client", header: "Cliente"},
    {
        accessorKey: "status", header: "Status", cell: ({ row }) => {
            const status = row.getValue("status") as ProjectStatus;
            const statusInfo = statusConfig[status] ?? { label: status, variant: "outline", color: "bg-gray-300" };

            return (
                <span  className={statusInfo.color}>
                    {statusInfo.label}
                </span>
            );
        },
    }
];

const mockProjects = [
    {
        id: "1",
        name: "Website E-commerce",
        client: "TechCorp Ltda",
        status: "ativo",
        hoursWorked: 85,
        totalHours: 100,
        billing: 12000,
        billingType: "fixed",
        startDate: "2024-01-15",
        endDate: "2024-03-15",
        description: "Desenvolvimento de plataforma de e-commerce completa"
    },
    {
        id: "2",
        name: "App Mobile",
        client: "StartupXYZ",
        status: "ativo",
        hoursWorked: 120,
        totalHours: 200,
        billing: 24000,
        billingType: "hourly",
        hourlyRate: 100,
        startDate: "2024-02-01",
        description: "Aplicativo mobile para iOS e Android"
    },
    {
        id: "3",
        name: "Sistema CRM",
        client: "Empresa ABC",
        status: "pausado",
        hoursWorked: 45,
        totalHours: 150,
        billing: 18000,
        billingType: "fixed",
        startDate: "2024-01-10",
        description: "Sistema de gestão de relacionamento com cliente"
    },
    {
        id: "4",
        name: "Landing Page",
        client: "Marketing Pro",
        status: "finalizado",
        hoursWorked: 25,
        totalHours: 25,
        billing: 3500,
        billingType: "fixed",
        startDate: "2023-12-01",
        endDate: "2023-12-15",
        description: "Landing page para campanha de marketing"
    },
    {
        id: "5",
        name: "Redesign Website",
        client: "Consultoria 123",
        status: "planejamento",
        hoursWorked: 0,
        totalHours: 80,
        billing: 8000,
        billingType: "hourly",
        hourlyRate: 90,
        startDate: "2024-03-01",
        description: "Redesign completo do website institucional"
    }
]


function ProjectsPage() {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <p className="text-2xl font-bold">Projetos</p>
                <p className="text-muted-foreground">Registre e gerencie seus projetos</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            4 ativos
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Horas Trabalhadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            Em todos os projetos
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ 4.500,00</div>
                        <p className="text-xs text-muted-foreground">
                            Valor dos projetos
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            ativos
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div>
                <DataTable columns={columns} data={mockProjects}/>
            </div>


        </div>
    );
}

export default ProjectsPage;