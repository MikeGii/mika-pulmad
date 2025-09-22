// src/types/Task.ts
export type TaskStatus = 'tegemata' | 'toos' | 'tehtud';

export interface Task {
    id: string;
    name: string;
    status: TaskStatus;
    description: string;
    monetaryRequirement?: number;
    taskManager: string; // email address
    extraInformation?: string; // company name or other info
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskFormData {
    name: string;
    status: TaskStatus;
    description: string;
    monetaryRequirement: number | '';
    taskManager: string;
    extraInformation: string;
}