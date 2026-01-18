import api from './api.ts';

// Define the shape of a Project object
export interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    liveLink?: string;
    githubLink?: string;
    imageUrl?: string;
    category: string;
    featured: boolean;
}

// Fetch all projects
export const fetchProjects = async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
};

// (Future Admin Use) Create Project
export const createProject = async (projectData: Partial<Project>) => {
    const response = await api.post('/projects', projectData);
    return response.data;
};