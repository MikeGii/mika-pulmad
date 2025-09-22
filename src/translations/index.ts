// src/translations/index.ts
import { Translations } from '../types/language';

export const translations: Translations = {
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
    'menu.logout': {
        et: 'Logi välja',
        ua: 'Вийти'
    },

    // Dashboard
    'dashboard.title': {
        et: 'Administratiiv paneel',
        ua: 'Адміністративна панель'
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

    // ToDo Dashboard
    'todo.title': {
        et: 'Pulmade Korraldamise Ülesanded',
        ua: 'Завдання з Організації Весілля'
    },
    'todo.subtitle': {
        et: 'Jälgi ja halda kõiki pulmadega seotud ülesandeid ja tähtaegu',
        ua: 'Відстежуйте та керуйте всіма завданнями та термінами, пов\'язаними з весіллям'
    },
    'todo.empty.title': {
        et: 'Ülesandeid pole veel lisatud',
        ua: 'Завдання ще не додані'
    },
    'todo.empty.description': {
        et: 'Kui ülesandeid lisatakse, kuvatakse need siin koos kõigi detailidega',
        ua: 'Коли завдання будуть додані, вони відображатимуться тут з усіма деталями'
    },

    // Task Management
    'taskManagement.title': {
        et: 'Ülesannete Haldamine',
        ua: 'Управління Завданнями'
    },
    'taskManagement.subtitle': {
        et: 'Loo ja halda kõiki pulmadega seotud ülesandeid ühest kohast',
        ua: 'Створюйте та керуйте всіма завданнями, пов\'язаними з весіллям, з одного місця'
    },
    'taskManagement.addTask': {
        et: 'Lisa uus ülesanne',
        ua: 'Додати нове завдання'
    },
    'taskManagement.editTask': {
        et: 'Muuda ülesannet',
        ua: 'Редагувати завдання'
    },
    'taskManagement.deleteTask': {
        et: 'Kustuta ülesanne',
        ua: 'Видалити завдання'
    },

    // Task Form
    'taskForm.name': {
        et: 'Ülesande nimi',
        ua: 'Назва завдання'
    },
    'taskForm.namePlaceholder': {
        et: 'Sisesta ülesande nimi...',
        ua: 'Введіть назву завдання...'
    },
    'taskForm.status': {
        et: 'Staatus',
        ua: 'Статус'
    },
    'taskForm.description': {
        et: 'Kirjeldus',
        ua: 'Опис'
    },
    'taskForm.descriptionPlaceholder': {
        et: 'Sisesta ülesande kirjeldus (kuni 300 tähemärki)...',
        ua: 'Введіть опис завдання (до 300 символів)...'
    },
    'taskForm.monetaryRequirement': {
        et: 'Rahaline vajadus (€)',
        ua: 'Грошова потреба (€)'
    },
    'taskForm.monetaryPlaceholder': {
        et: '0.00',
        ua: '0.00'
    },
    'taskForm.taskManager': {
        et: 'Vastutaja',
        ua: 'Відповідальний'
    },
    'taskForm.taskManagerPlaceholder': {
        et: 'Vali vastutaja...',
        ua: 'Виберіть відповідального...'
    },
    'taskForm.extraInformation': {
        et: 'Lisainfo',
        ua: 'Додаткова інформація'
    },
    'taskForm.extraPlaceholder': {
        et: 'Ettevõtte nimi või muu info...',
        ua: 'Назва компанії або інша інформація...'
    },
    'taskForm.save': {
        et: 'Salvesta',
        ua: 'Зберегти'
    },
    'taskForm.cancel': {
        et: 'Tühista',
        ua: 'Скасувати'
    },

    // Task Status
    'taskStatus.tegemata': {
        et: 'Tegemata',
        ua: 'Не зроблено'
    },
    'taskStatus.toos': {
        et: 'Töös',
        ua: 'В роботі'
    },
    'taskStatus.tehtud': {
        et: 'Tehtud',
        ua: 'Зроблено'
    },

    // Task Table
    'taskTable.name': {
        et: 'Nimi',
        ua: 'Назва'
    },
    'taskTable.status': {
        et: 'Staatus',
        ua: 'Статус'
    },
    'taskTable.manager': {
        et: 'Vastutaja',
        ua: 'Відповідальний'
    },
    'taskTable.monetary': {
        et: 'Summa',
        ua: 'Сума'
    },
    'taskTable.actions': {
        et: 'Tegevused',
        ua: 'Дії'
    },
    'taskTable.noTasks': {
        et: 'Ülesandeid pole veel lisatud',
        ua: 'Завдання ще не додані'
    },
    'taskTable.edit': {
        et: 'Muuda',
        ua: 'Редагувати'
    },
    'taskTable.delete': {
        et: 'Kustuta',
        ua: 'Видалити'
    },

    // Delete confirmation
    'taskDelete.title': {
        et: 'Kustuta ülesanne',
        ua: 'Видалити завдання'
    },
    'taskDelete.message': {
        et: 'Kas oled kindel, et soovid selle ülesande kustutada? Seda tegevust ei saa tagasi võtta.',
        ua: 'Ви впевнені, що хочете видалити це завдання? Цю дію неможливо скасувати.'
    },
    'taskDelete.confirm': {
        et: 'Jah, kustuta',
        ua: 'Так, видалити'
    },
    'taskDelete.cancel': {
        et: 'Tühista',
        ua: 'Скасувати'
    },
    'menu.taskManagement': {
        et: 'Ülesannete haldus',
        ua: 'Управління завданнями'
    },

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

