// src/translations/users.ts
import { Translations } from '../types/language';

export const userTranslations: Translations = {
    // User Management
    'userManagement.title': {
        et: 'Kasutajate Haldamine',
        ua: 'Управління Користувачами'
    },
    'userManagement.subtitle': {
        et: 'Halda kasutajate kontosid ja õiguseid',
        ua: 'Керуйте обліковими записами та правами користувачів'
    },
    'userManagement.addUser': {
        et: 'Lisa kasutaja',
        ua: 'Додати користувача'
    },
    'userManagement.confirmDeactivate': {
        et: 'Kas oled kindel, et soovid selle kasutaja deaktiveerida?',
        ua: 'Ви впевнені, що хочете деактивувати цього користувача?'
    },

    // User Form
    'userForm.email': {
        et: 'E-post',
        ua: 'Електронна пошта'
    },
    'userForm.emailPlaceholder': {
        et: 'Sisesta e-posti aadress...',
        ua: 'Введіть адресу електронної пошти...'
    },
    'userForm.firstName': {
        et: 'Eesnimi',
        ua: 'Ім\'я'
    },
    'userForm.firstNamePlaceholder': {
        et: 'Sisesta eesnimi...',
        ua: 'Введіть ім\'я...'
    },
    'userForm.lastName': {
        et: 'Perekonnanimi',
        ua: 'Прізвище'
    },
    'userForm.lastNamePlaceholder': {
        et: 'Sisesta perekonnanimi...',
        ua: 'Введіть прізвище...'
    },
    'userForm.role': {
        et: 'Roll',
        ua: 'Роль'
    },
    'userForm.phone': {
        et: 'Telefon',
        ua: 'Телефон'
    },
    'userForm.phonePlaceholder': {
        et: 'Sisesta telefoninumber...',
        ua: 'Введіть номер телефону...'
    },
    'userForm.permissions': {
        et: 'Õigused',
        ua: 'Права'
    },
    'userForm.save': {
        et: 'Salvesta',
        ua: 'Зберегти'
    },
    'userForm.cancel': {
        et: 'Tühista',
        ua: 'Скасувати'
    },

    // User Roles
    'userRole.admin': {
        et: 'Admin',
        ua: 'Адміністратор'
    },
    'userRole.planner': {
        et: 'Planeerija',
        ua: 'Планувальник'
    },
    'userRole.coordinator': {
        et: 'Koordinaator',
        ua: 'Координатор'
    },

    // Permissions
    'permission.taskManagement': {
        et: 'Ülesannete haldamine',
        ua: 'Управління завданнями'
    },
    'permission.accountManagement': {
        et: 'Kontohaldus',
        ua: 'Управління обліковими записами'
    },
    'permission.financialManagement': {
        et: 'Finantsihaldus',
        ua: 'Управління фінансами'
    },
    'permission.guestManagement': {
        et: 'Külaliste haldamine',
        ua: 'Управління гостями'
    },

    // User Table
    'userTable.user': {
        et: 'Kasutaja',
        ua: 'Користувач'
    },
    'userTable.role': {
        et: 'Roll',
        ua: 'Роль'
    },
    'userTable.status': {
        et: 'Staatus',
        ua: 'Статус'
    },
    'userTable.permissions': {
        et: 'Õigused',
        ua: 'Права'
    },
    'userTable.lastLogin': {
        et: 'Viimane sisselogimine',
        ua: 'Останній вхід'
    },
    'userTable.actions': {
        et: 'Tegevused',
        ua: 'Дії'
    },
    'userTable.noUsers': {
        et: 'Kasutajaid ei leitud',
        ua: 'Користувачів не знайдено'
    },
    'userTable.noUsersDescription': {
        et: 'Loo kasutajaid läbi kasutajahalduse süsteemi',
        ua: 'Створіть користувачів через систему управління користувачами'
    },
    'userTable.deactivate': {
        et: 'Deaktiveeri',
        ua: 'Деактивувати'
    },
    'userTable.currentUser': {
        et: 'Praegune kasutaja',
        ua: 'Поточний користувач'
    },

    // User Status
    'userStatus.active': {
        et: 'Aktiivne',
        ua: 'Активний'
    },
    'userStatus.inactive': {
        et: 'Mitteaktiivne',
        ua: 'Неактивний'
    },
};