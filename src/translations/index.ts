// src/translations/index.ts
import { Translations } from '../types/language';
import { commonTranslations } from './common';
import { dashboardTranslations } from './dashboard';
import { taskTranslations } from './tasks';
import { userTranslations } from './users';
import { financialTranslations } from './financial';
import { guestTranslations } from './guests';
import { invitationTranslations } from './invitations';

// Merge all translation objects into one
export const translations: Translations = {
    ...commonTranslations,
    ...dashboardTranslations,
    ...taskTranslations,
    ...userTranslations,
    ...financialTranslations,
    ...guestTranslations,
    ...invitationTranslations,
};