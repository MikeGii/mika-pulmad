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
    'todo.empty.title': {
        et: 'Ülesandeid pole veel lisatud',
        ua: 'Завдання ще не додані'
    },
    'todo.empty.description': {
        et: 'Kui ülesandeid lisatakse, kuvatakse need siin koos kõigi detailidega',
        ua: 'Коли завдання будуть додані, вони відображатимуться тут з усіма деталями'
    },
    'todo.stats.total': {
        et: 'Kokku',
        ua: 'Всього'
    },
    'todo.stats.completed': {
        et: 'Tehtud',
        ua: 'Виконано'
    },
    'todo.stats.inProgress': {
        et: 'Töös',
        ua: 'В роботі'
    },
    'todo.stats.pending': {
        et: 'Ootel',
        ua: 'Очікує'
    },
    'todo.manager': {
        et: 'Vastutaja',
        ua: 'Відповідальний'
    },
    'todo.created': {
        et: 'Loodud',
        ua: 'Створено'
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

    // Financial Status
    'financial.title': {
        et: 'Rahaline Seisukord',
        ua: 'Фінансовий Стан'
    },
    'financial.subtitle': {
        et: 'Jälgi pulmade kulude ja eraldatud raha',
        ua: 'Відстежуйте витрати на весілля та виділені кошти'
    },
    'financial.totalRequired': {
        et: 'Kokku vaja',
        ua: 'Всього потрібно'
    },
    'financial.totalAllocated': {
        et: 'Eraldatud',
        ua: 'Виділено'
    },
    'financial.remaining': {
        et: 'Puudu',
        ua: 'Залишається'
    },
    'financial.potentialSavings': {
        et: 'Võimalik kokkuhoid',
        ua: 'Можлива економія'
    },
    'financial.bestOffer': {
        et: 'Parim pakkumine',
        ua: 'Найкраща пропозиція'
    },
    'financial.allocated': {
        et: 'Eraldatud',
        ua: 'Виділено'
    },
    'financial.needed': {
        et: 'Vaja veel',
        ua: 'Ще потрібно'
    },
    'financial.fullyFunded': {
        et: 'Täielikult rahastatud',
        ua: 'Повністю профінансовано'
    },
    'financial.priceOffers': {
        et: 'Hinnapakkumised',
        ua: 'Цінові пропозиції'
    },
    'financial.more': {
        et: 'veel',
        ua: 'ще'
    },
    'financial.empty.title': {
        et: 'Finantsülesandeid pole veel aktiveeritud',
        ua: 'Фінансові завдання ще не активовані'
    },
    'financial.empty.description': {
        et: 'Aktiveeri ülesandeid rahalise jälgimise jaoks finantshalduslehel',
        ua: 'Активуйте завдання для фінансового відстеження на сторінці управління фінансами'
    },
    'financialManagement.title': {
        et: 'Rahalise Jälgimise Haldus',
        ua: 'Управління Фінансовим Відстеженням'
    },
    'financialManagement.subtitle': {
        et: 'Halda ülesannete rahalist jälgimist, eraldatud summasid ja hinnapakkumisi',
        ua: 'Керуйте фінансовим відстеженням завдань, виділеними сумами та ціновими пропозиціями'
    },
    'financialManagement.totalTasks': {
        et: 'Rahalised ülesanded',
        ua: 'Фінансові завдання'
    },
    'financialManagement.activeTasks': {
        et: 'Aktiivsed',
        ua: 'Активні'
    },
    'financialManagement.totalRequired': {
        et: 'Kokku vaja',
        ua: 'Всього потрібно'
    },
    'financialManagement.totalAllocated': {
        et: 'Kokku eraldatud',
        ua: 'Всього виділено'
    },
    'financialManagement.remaining': {
        et: 'Puudu',
        ua: 'Залишається'
    },
    'financialManagement.active': {
        et: 'Aktiivne',
        ua: 'Активний'
    },
    'financialManagement.inactive': {
        et: 'Mitteaktiivne',
        ua: 'Неактивний'
    },
    'financialManagement.required': {
        et: 'Vaja',
        ua: 'Потрібно'
    },
    'financialManagement.allocated': {
        et: 'Eraldatud',
        ua: 'Виділено'
    },
    'financialManagement.funded': {
        et: 'rahastatud',
        ua: 'профінансовано'
    },
    'financialManagement.bestOffer': {
        et: 'Parim pakkumine',
        ua: 'Найкраща пропозиція'
    },
    'financialManagement.save': {
        et: 'kokkuhoid',
        ua: 'економія'
    },
    'financialManagement.priceOffers': {
        et: 'Hinnapakkumised',
        ua: 'Цінові пропозиції'
    },
    'financialManagement.addOffer': {
        et: 'Lisa pakkumine',
        ua: 'Додати пропозицію'
    },
    'financialManagement.removeOffer': {
        et: 'Eemalda pakkumine',
        ua: 'Видалити пропозицію'
    },
    'financialManagement.noOffers': {
        et: 'Hinnapakkumisi pole veel lisatud',
        ua: 'Цінові пропозиції ще не додані'
    },
    'financialManagement.addPriceOffer': {
        et: 'Lisa hinnapakkumine',
        ua: 'Додати цінову пропозицію'
    },
    'financialManagement.companyName': {
        et: 'Ettevõtte nimi',
        ua: 'Назва компанії'
    },
    'financialManagement.companyPlaceholder': {
        et: 'Sisesta ettevõtte nimi...',
        ua: 'Введіть назву компанії...'
    },
    'financialManagement.offerAmount': {
        et: 'Pakkumise summa',
        ua: 'Сума пропозиції'
    },
    'financialManagement.notes': {
        et: 'Märkused',
        ua: 'Примітки'
    },
    'financialManagement.notesPlaceholder': {
        et: 'Lisainfo pakkumise kohta...',
        ua: 'Додаткова інформація про пропозицію...'
    },
    'financialManagement.cancel': {
        et: 'Tühista',
        ua: 'Скасувати'
    },
    'financialManagement.saveOffer': {
        et: 'Salvesta pakkumine',
        ua: 'Зберегти пропозицію'
    },
    'financialManagement.empty.title': {
        et: 'Rahalisi ülesandeid pole leitud',
        ua: 'Фінансові завдання не знайдені'
    },
    'financialManagement.empty.description': {
        et: 'Loo ülesandeid rahaliste vajadustega ülesannete halduslehel',
        ua: 'Створіть завдання з грошовими потребами на сторінці управління завданнями'
    },
    'menu.financialManagement': {
        et: 'Rahaline jälgimine',
        ua: 'Фінансове відстеження'
    },

    // Guest Status Dashboard
    'guests.title': {
        et: 'Külaliste Ülevaade',
        ua: 'Огляд Гостей'
    },
    'guests.subtitle': {
        et: 'Kutsutud külaliste arv ja jaotus',
        ua: 'Кількість запрошених гостей та їх розподіл'
    },
    'guests.totalGuests': {
        et: 'Kokku külalisi',
        ua: 'Всього гостей'
    },
    'guests.totalAdults': {
        et: 'Täiskasvanuid',
        ua: 'Дорослих'
    },
    'guests.totalChildren': {
        et: 'Lapsi',
        ua: 'Дітей'
    },
    'guests.totalTables': {
        et: 'Laudu',
        ua: 'Столів'
    },
    'guests.invitedGuests': {
        et: 'Kutsutud külalisi',
        ua: 'Запрошено гостей'
    },
    'guests.adults': {
        et: 'täiskasvanud',
        ua: 'дорослі'
    },
    'guests.children': {
        et: 'lapsed',
        ua: 'діти'
    },
    'guests.distributedAcross': {
        et: 'jaotatud',
        ua: 'розподілено по'
    },
    'guests.table': {
        et: 'laua vahel',
        ua: 'столу'
    },
    'guests.tables': {
        et: 'laua vahel',
        ua: 'столах'
    },
    'guests.empty.title': {
        et: 'Külalisi pole veel lisatud',
        ua: 'Гостей ще не додано'
    },
    'guests.empty.description': {
        et: 'Kui külalised lisatakse, kuvatakse nende statistika siin',
        ua: 'Коли гості будуть додані, їх статистика відображатиметься тут'
    },

    // Guest Management
    'guestManagement.title': {
        et: 'Külaliste Haldamine',
        ua: 'Управління Гостями'
    },
    'guestManagement.subtitle': {
        et: 'Halda kõiki pulma külalisi ja jaota nad lauagruppidesse',
        ua: 'Керуйте всіма гостями весілля та розподіляйте їх по столах'
    },
    'guestManagement.addGuest': {
        et: 'Lisa külaline',
        ua: 'Додати гостя'
    },
    'guestManagement.editGuest': {
        et: 'Muuda külalist',
        ua: 'Редагувати гостя'
    },
    'guestManagement.totalGuests': {
        et: 'Kokku külalisi',
        ua: 'Всього гостей'
    },
    'guestManagement.totalAdults': {
        et: 'Täiskasvanuid',
        ua: 'Дорослих'
    },
    'guestManagement.totalChildren': {
        et: 'Lapsi',
        ua: 'Дітей'
    },
    'guestManagement.totalTables': {
        et: 'Laudu',
        ua: 'Столів'
    },
    'guestManagement.errorCreating': {
        et: 'Viga külalise loomisel',
        ua: 'Помилка при створенні гостя'
    },
    'guestManagement.errorUpdating': {
        et: 'Viga külalise uuendamisel',
        ua: 'Помилка при оновленні гостя'
    },
    'guestManagement.errorDeleting': {
        et: 'Viga külalise kustutamisel',
        ua: 'Помилка при видаленні гостя'
    },

    // Guest Form
    'guestForm.firstName': {
        et: 'Eesnimi',
        ua: 'Ім\'я'
    },
    'guestForm.firstNamePlaceholder': {
        et: 'Sisesta eesnimi...',
        ua: 'Введіть ім\'я...'
    },
    'guestForm.lastName': {
        et: 'Perekonnanimi',
        ua: 'Прізвище'
    },
    'guestForm.lastNamePlaceholder': {
        et: 'Sisesta perekonnanimi...',
        ua: 'Введіть прізвище...'
    },
    'guestForm.phoneNumber': {
        et: 'Telefoninumber',
        ua: 'Номер телефону'
    },
    'guestForm.phoneNumberPlaceholder': {
        et: '+372 5XXX XXXX',
        ua: '+380 XX XXX XX XX'
    },
    'guestForm.email': {
        et: 'E-post',
        ua: 'Електронна пошта'
    },
    'guestForm.emailPlaceholder': {
        et: 'nimi@email.com',
        ua: 'ім\'я@email.com'
    },
    'guestForm.location': {
        et: 'Asukoht',
        ua: 'Місцезнаходження'
    },
    'guestForm.locationPlaceholder': {
        et: 'Maakond ja riik (nt: Harjumaa, Eesti)',
        ua: 'Область та країна (напр.: Київська область, Україна)'
    },
    'guestForm.tableNumber': {
        et: 'Laua number',
        ua: 'Номер столу'
    },
    'guestForm.tableNumberPlaceholder': {
        et: 'Sisesta laua number...',
        ua: 'Введіть номер столу...'
    },
    'guestForm.isChild': {
        et: 'See on laps (4+ aastat)',
        ua: 'Це дитина (4+ роки)'
    },
    'guestForm.childrenNotice': {
        et: 'Tähtis! Lapsed alates 4. eluaastast loetakse eraldi isikuteks ja tuleb registreerida eraldi, mitte vanema nime alla.',
        ua: 'Важливо! Діти віком від 4 років вважаються окремими особами і повинні бути зареєстровані окремо, а не під іменем батьків.'
    },
    'guestForm.requiredFields': {
        et: 'Palun täida kõik kohustuslikud väljad',
        ua: 'Будь ласка, заповніть всі обов\'язкові поля'
    },
    'guestForm.validTableNumber': {
        et: 'Palun sisesta kehtiv laua number',
        ua: 'Будь ласка, введіть дійсний номер столу'
    },
    'guestForm.validEmail': {
        et: 'Palun sisesta kehtiv e-posti aadress',
        ua: 'Будь ласка, введіть дійсну адресу електронної пошти'
    },
    'guestForm.save': {
        et: 'Salvesta',
        ua: 'Зберегти'
    },
    'guestForm.cancel': {
        et: 'Tühista',
        ua: 'Скасувати'
    },

    // Guest Table
    'guestTable.noGuests': {
        et: 'Külalisi pole veel lisatud',
        ua: 'Гості ще не додані'
    },
    'guestTable.table': {
        et: 'Laud',
        ua: 'Стіл'
    },
    'guestTable.guest': {
        et: 'külaline',
        ua: 'гість'
    },
    'guestTable.guests': {
        et: 'külalist',
        ua: 'гостей'
    },
    'guestTable.name': {
        et: 'Nimi',
        ua: 'Ім\'я'
    },
    'guestTable.contact': {
        et: 'Kontaktandmed',
        ua: 'Контактні дані'
    },
    'guestTable.location': {
        et: 'Asukoht',
        ua: 'Місцезнаходження'
    },
    'guestTable.actions': {
        et: 'Tegevused',
        ua: 'Дії'
    },
    'guestTable.child': {
        et: 'Laps',
        ua: 'Дитина'
    },
    'guestTable.phone': {
        et: 'Tel',
        ua: 'Тел'
    },
    'guestTable.email': {
        et: 'E-post',
        ua: 'Email'
    },
    'guestTable.edit': {
        et: 'Muuda',
        ua: 'Редагувати'
    },
    'guestTable.delete': {
        et: 'Kustuta',
        ua: 'Видалити'
    },

    // Guest Delete
    'guestDelete.title': {
        et: 'Kustuta külaline',
        ua: 'Видалити гостя'
    },
    'guestDelete.message': {
        et: 'Kas oled kindel, et soovid selle külalise kustutada? Seda tegevust ei saa tagasi võtta.',
        ua: 'Ви впевнені, що хочете видалити цього гостя? Цю дію неможливо скасувати.'
    },
    'guestDelete.confirm': {
        et: 'Jah, kustuta',
        ua: 'Так, видалити'
    },
    'guestDelete.cancel': {
        et: 'Tühista',
        ua: 'Скасувати'
    },

    // Menu
    'menu.guestManagement': {
        et: 'Külaliste haldus',
        ua: 'Управління гостями'
    },
};