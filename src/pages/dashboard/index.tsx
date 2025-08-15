import React, {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext.tsx";
//import Card from "../../components/Card.tsx";
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
                    Seja bem-vindo, {user?.email}!
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

            <div className="flex">
                <button
                    id="defaultModalButton"
                    data-modal-target="taskModal"
                    onClick={handleModalOpen}
                    className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-sm shadow"
                    type="button"
                >
                    Adicionar Task
                </button>
            </div>


            {/* Seção da Nova Tabela de Tarefas */}
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        {/* Futuramente, podemos conectar este input a um estado para filtrar as tarefas */}
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Buscar Tarefa</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Buscar" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Tarefa</th>
                            <th scope="col" className="px-4 py-3">Projeto</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} className="border-b dark:border-gray-700">
                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.title}
                                </th>
                                <td className="px-4 py-3">
                                    {/* Precisamos do nome do projeto aqui */}
                                    {task.description}
                                </td>
                                <td className="px-4 py-3 flex items-center justify-end">
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Iniciar Timer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && <div id="taskModal" aria-hidden="true"
                 className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div
                            className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Nova Task
                            </h3>
                            <button type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="taskModal"
                                    onClick={() => setModalOpen(false)}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Fechar</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                    <input type="text" name="name" id="name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                           placeholder="Nome da task"
                                           required=""
                                           value={taskName}
                                           onChange={(e) => setTaskName(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="category"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Projeto</label>
                                    <select
                                        id="category"
                                        className="..."
                                        value={taskProject}
                                        onChange={(e) => setTaskProject(e.target.value)}
                                    >
                                        <option value="">Selecione o Projeto</option>
                                        {
                                            projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição da Tarefa</label>
                                    <textarea id="description" rows="4"
                                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              placeholder="Breve descrição da task"
                                              value={taskText}
                                              onChange={e => setTaskText(e.target.value)}></textarea>
                                </div>
                            </div>
                            <button type="submit"
                                    className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                Adicionar
                            </button>
                        </form>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Dashboard;