// src/types/Task.ts
export type TaskStatus = 'tegemata' | 'toos' | 'tehtud';
export type FinancialStatus = 'available' | 'active' | 'completed';

export interface TaskContent {
    et: string;
    ua: string;
}

export interface PriceOffer {
    company: string;
    amount: number;
    notes?: string;
    createdAt?: Date;
}

export interface Task {
    id: string;
    name: TaskContent;
    status: TaskStatus;
    description: TaskContent;
    monetaryRequirement?: number;
    taskManager: string;
    extraInformation?: TaskContent;
    financialStatus?: FinancialStatus;
    allocatedAmount?: number;
    priceOffers?: PriceOffer[];
    isFinanciallyActive?: boolean;
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

// New type for financial management
export interface FinancialTask {
    id: string;
    name: TaskContent;
    monetaryRequirement: number;
    allocatedAmount: number;
    remainingAmount: number;
    priceOffers: PriceOffer[];
    financialStatus: FinancialStatus;
    taskManager: string;
}