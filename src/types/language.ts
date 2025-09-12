// src/types/language.ts
export type Language = 'et' | 'ua';

export interface Translations {
    [key: string]: {
        et: string;
        ua: string;
    };
}