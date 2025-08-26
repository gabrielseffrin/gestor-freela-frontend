const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

type RegisterData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const registerUser = async (userData: RegisterData) => {
    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao registrar usuário.');
    }

    return data;
};


export const login = async (email: string, password: string) => {
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login.');
    }

    return data;
};

export const logout = async (token: string) => {
    const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    if (!response.ok) {
        throw new Error('Erro ao logout.');
    }
}


// deletar
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