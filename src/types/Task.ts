// src/types/Task.ts
export type TaskStatus = 'tegemata' | 'toos' | 'tehtud';

export interface TaskContent {
    et: string;
    ua: string;
}

export interface Task {
    id: string;
    name: TaskContent;
    status: TaskStatus;
    description: TaskContent;
    monetaryRequirement?: number;
    taskManager: string;
    extraInformation?: TaskContent;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskFormData {
    name: TaskContent;
    status: TaskStatus;
    description: TaskContent;
    monetaryRequirement: number | '';
    taskManager: string;
    extraInformation: TaskContent;
}