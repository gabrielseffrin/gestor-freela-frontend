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
    {id: 1, name: "VN Freela"},
    {id: 2, name: "Projeto Alpha"},
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

export const finishTimer = (projectId: number, task: string, description: string, time: number): void => {
    setTimeout(() => {
        console.log('dados recebidos!', projectId, task, description, time);
    }, 1500);
}

export const getTasks = async (projectId: number): Promise<string[]> => {

}