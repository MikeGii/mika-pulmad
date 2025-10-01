// src/translations/common.ts
import { Translations } from '../types/language';

export const commonTranslations: Translations = {
    // Header
    'header.title': {
        et: 'Mike & Kateryna Pulmad',
        ua: 'Mike & Kateryna Pulmad'
    },
    'menu.dashboard': {
        et: 'Töölaud',
        ua: 'Панель керування'
    },
    'menu.userManagement': {
        et: 'Kasutajate haldus',
        ua: 'Управління користувачами'
    },
    'menu.taskManagement': {
        et: 'Ülesannete haldus',
        ua: 'Управління завданнями'
    },
    'menu.financialManagement': {
        et: 'Rahaline jälgimine',
        ua: 'Фінансове відстеження'
    },
    'menu.guestManagement': {
        et: 'Külaliste haldus',
        ua: 'Управління гостями'
    },
    'menu.logout': {
        et: 'Logi välja',
        ua: 'Вийти'
    },

    // Language selector
    'language.estonian': {
        et: 'Eesti',
        ua: 'Естонська'
    },
    'language.ukrainian': {
        et: 'Ukraina',
        ua: 'Українська'
    },

    // Dashboard
    'dashboard.title': {
        et: 'Administratiiv paneel',
        ua: 'Адміністративна панель'
    },

    'menu.invitationPreview': {
        et: 'Kutse eelvaade',
        ua: 'Попередній перегляд запрошення'
    },

    // Transportation page
    'menu.transportation': {
        et: 'Transport',
        ua: 'Транспорт'
    },
    'transportation.title': {
        et: 'Transport',
        ua: 'Транспорт'
    },
    'transportation.subtitle': {
        et: 'Külalised, kes vajavad transporti: {{count}}',
        ua: 'Гості, які потребують транспорту: {{count}}'
    },
    'transportation.loading': {
        et: 'Laadin...',
        ua: 'Завантаження...'
    },
    'transportation.noGuests': {
        et: 'Transporti vajadusi pole',
        ua: 'Немає потреб у транспорті'
    },
    'transportation.noGuestsDescription': {
        et: 'Ükski külaline pole märkinud, et vajab transporti',
        ua: 'Жоден гість не вказав, що потребує транспорту'
    },
    'transportation.name': {
        et: 'Nimi',
        ua: 'Ім\'я'
    },
    'transportation.phone': {
        et: 'Telefon',
        ua: 'Телефон'
    },
    'transportation.transportFrom': {
        et: 'Transport asukohast',
        ua: 'Транспорт з місця'
    },
    'transportation.type': {
        et: 'Tüüp',
        ua: 'Тип'
    },
    'transportation.tableNumber': {
        et: 'Laua nr',
        ua: 'Номер столу'
    },
    'transportation.invitationGetter': {
        et: 'Kutse saaja',
        ua: 'Отримувач запрошення'
    },
    'transportation.mainGuest': {
        et: 'Põhikülaline',
        ua: 'Основний гість'
    },
    'transportation.linkedGuest': {
        et: 'Seotud külaline',
        ua: 'Пов\'язаний гість'
    },
    'transportation.noLocation': {
        et: 'Asukoht määramata',
        ua: 'Місце не вказано'
    },
    'transportation.accessDenied': {
        et: 'Juurdepääs keelatud',
        ua: 'Доступ заборонено'
    },
    'transportation.noPermission': {
        et: 'Teil pole õigust vaadata transporti vajavaid külalisi',
        ua: 'У вас немає прав для перегляду гостей, які потребують транспорту'
    }
};