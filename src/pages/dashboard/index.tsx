import React, {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {Clock, DollarSign, Folder} from "lucide-react";
import {getDashboardData} from "../../services/dashboardService.ts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";

type Task = {
    id: string;
    title: string;
    description: string;
    projectID: string;
}

const recentActivities = [
    {
        project: "Website E-commerce",
        hours: "3h 45m",
        date: "Hoje",
        description: "Desenvolvimento do checkout"
    },
    {
        project: "App Mobile",
        hours: "2h 15m",
        date: "Hoje",
        description: "Implementação da tela de login"
    },
    {
        project: "Sistema CRM",
        hours: "4h 30m",
        date: "Ontem",
        description: "Criação de relatórios"
    },
    {
        project: "Landing Page",
        hours: "1h 20m",
        date: "Ontem",
        description: "Ajustes de responsividade"
    },
    {
        project: "API REST",
        hours: "5h 10m",
        date: "Segunda-feira",
        description: "Desenvolvimento de endpoints"
    }
]


function Dashboard() {

    const { user } = useAuth();
    const [hours, setHours] = useState(0);
    const [projects, setProjects] = useState([]);
    const [hoursValue, setHoursValue] = useState(0);

    const [isModalOpen, setModalOpen] = useState(false);

    const [taskName,  setTaskName] = useState('');
    const [taskText, setTaskText] = useState('');
    const [taskProject, setTaskProject] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event?.preventDefault();
        console.log("valores do modal", {taskName, taskText, taskProject});

        const newTask: Task = {
            id: Date.now().toString(),
            title: taskName,
            description: taskText,
            projectID: taskProject,
        };

        setTasks(tasks => [...tasks, newTask]);
        resetModal();
    }

    const resetModal = () => {
        setModalOpen(false);
        setTaskText('');
        setTaskProject('');
        setTaskName('');
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await getDashboardData();
            setHours(response['hoursToday']);
            setProjects(response['activeProjects']);
            setHoursValue(response['monthRevenue']);
        }

        void fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <p className="text-2xl font-semibold">
                    {user?.email}!
                </p>
                <p className="text-muted-foreground">
                    Seja bem-vindo, ao seu sistema de controle de horas
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Horas da Semana
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{hours}</div>
                        <p className="text-xs text-muted-foreground">
                            adicionar função
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Projetos Ativos
                        </CardTitle>
                        <Folder className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{projects.length}</div>
                        <p className="text-xs text-muted-foreground">
                            adicionar função
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total a Faturar
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{hoursValue}</div>
                        <p className="text-xs text-muted-foreground">
                            adicionar função
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-7"}>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Atividades Recentes</CardTitle>
                        <CardDescription>
                            Suas últimas horas registradas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-primary rounded-full mr-4" />
                                    <div className="space-y-1 flex-1">
                                        <p className="text-sm font-medium leading-none">
                                            {activity.project}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{activity.hours}</p>
                                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default Dashboard;