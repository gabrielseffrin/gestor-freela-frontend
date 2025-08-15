// Em src/services/dashboardService.ts

export type Project = {
    id: number;
    name: string;
};

export type DashboardData = {
    hoursToday: number;
    activeProjects: Project[];
    monthRevenue: string;
};

const mockProjects: Project[] = [
    { id: 1, name: "VN Freela" },
    { id: 2, name: "Projeto Alpha" },
];

export const getDashboardData = (): Promise<DashboardData> => {
    console.log('Buscando dados simulados do dashboard...');

    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData: DashboardData = {
                hoursToday: 4,
                activeProjects: mockProjects,
                monthRevenue: 'R$ 1.250,00',
            };

            console.log('Dados recebidos!', mockData);
            resolve(mockData);
        }, 1500);
    });
};