// src/translations/guests.ts
import { Translations } from '../types/language';

export const guestTranslations: Translations = {
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
    'guestForm.invitationSettings': {
        et: 'Kutse seaded',
        ua: 'Налаштування запрошення'
    },
    'guestForm.isInvitationGetter': {
        et: 'See isik saab kutse (peamine kutsutud)',
        ua: 'Ця особа отримує запрошення (основний запрошений)'
    },
    'guestForm.invitationLanguage': {
        et: 'Kutse keel',
        ua: 'Мова запрошення'
    },
    'guestForm.linkedInvitationGetter': {
        et: 'Seotud kutse saajaga',
        ua: 'Пов\'язаний з отримувачем запрошення'
    },
    'guestForm.searchInvitationGetter': {
        et: 'Otsige kutse saajat...',
        ua: 'Шукайте отримувача запрошення...'
    },
    'guestForm.linkedGetterRequired': {
        et: 'Palun valige kutse saaja',
        ua: 'Будь ласка, виберіть отримувача запрошення'
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
    'guestTable.invitationInfo': {
        et: 'Kutse info',
        ua: 'Інформація про запрошення'
    },
    'guestTable.invitationGetter': {
        et: 'Kutse saaja',
        ua: 'Отримувач запрошення'
    },
    'guestTable.linkedGuest': {
        et: 'Seotud külaline',
        ua: 'Пов\'язаний гість'
    },
    'guestTable.linkedTo': {
        et: 'Seotud',
        ua: 'Пов\'язаний з'
    },
    'guestTable.generateInvitation': {
        et: 'Genereeri kutse link',
        ua: 'Згенерувати посилання на запрошення'
    },
    'guestTable.invitationUrlCopied': {
        et: 'Kutse link kopeeritud lõikelauale!',
        ua: 'Посилання на запрошення скопійовано!'
    },
    'guestTable.invitationUrlCopyFailed': {
        et: 'Viga lingi kopeerimisel',
        ua: 'Помилка копіювання посилання'
    },
    'guestTable.openedTime': {
        et: 'kord avatud',
        ua: 'раз відкрито'
    },
    'guestTable.openedTimes': {
        et: 'korda avatud',
        ua: 'разів відкрито'
    },
    'guestTable.needsAccommodation': {
        et: 'Vajab majutust',
        ua: 'Потребує розміщення'
    },
    'guestTable.needsTransport': {
        et: 'Vajab transporti',
        ua: 'Потребує транспорт'
    },
    'guestTable.hasDietaryRestrictions': {
        et: 'Toidupiirangud',
        ua: 'Дієтичні обмеження'
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
    'guestTable.unknownGetter': {
        et: '(tundmatu kutse saaja)',
        ua: '(невідомий отримувач запрошення)'
    },
    'guestForm.tableNumberAutoAssigned': {
        et: 'Laua number määratakse automaatselt kutse saaja järgi',
        ua: 'Номер столу призначається автоматично за отримувачем запрошення'
    },
    'guestManagement.tableUpdatedWithLinkedGuests': {
        et: 'Laua number uuendatud. Kõik seotud külalised viidi samale lauale.',
        ua: 'Номер столу оновлено. Усіх пов\'язаних гостей переведено за той самий стіл.'
    },
    'guestForm.tableNumberCascadeWarning': {
        et: 'Laua numbri muutmisel viiakse kõik seotud külalised samale lauale',
        ua: 'При зміні номера столу всі пов\'язані гості переводяться за той самий стіл'
    },

    // Search bar
    'guestTable.searchPlaceholder': {
        et: 'Otsi külalisi nime järgi...',
        ua: 'Шукати гостей за іменем...'
    },
    'guestTable.searchClear': {
        et: 'Tühjenda otsing',
        ua: 'Очистити пошук'
    },
    'guestTable.noSearchResults': {
        et: 'Otsingu tulemusi ei leitud',
        ua: 'Результатів пошуку не знайдено'
    },
    'guestTable.searchResults': {
        et: 'otsingu tulemus',
        ua: 'результат пошуку'
    },
    'guestTable.searchResultsPlural': {
        et: 'otsingu tulemust',
        ua: 'результатів пошуку'
    },

    // Add these to the guestTranslations object in guests.ts
    'guestTable.expandTable': {
        et: 'Laienda laud',
        ua: 'Розгорнути стіл'
    },
    'guestTable.collapseTable': {
        et: 'Ahenda laud',
        ua: 'Згорнути стіл'
    },
    'guestTable.clickToExpand': {
        et: 'Klõpsa laienamiseks',
        ua: 'Клікніть для розгортання'
    },
    'guestTable.clickToCollapse': {
        et: 'Klõpsa ahendamiseks',
        ua: 'Клікніть для згортання'
    },



    // RSVP Form details
    'guestTable.rsvpDetails': {
        et: 'RSVP üksikasjad',
        ua: 'Деталі RSVP'
    },
    'guestTable.showRsvpDetails': {
        et: 'Kuva RSVP üksikasju',
        ua: 'Показати деталі RSVP'
    },
    'guestTable.hideRsvpDetails': {
        et: 'Peida RSVP üksikasjad',
        ua: 'Сховати деталі RSVP'
    },
    'guestTable.rsvpDetailsTitle': {
        et: 'RSVP vastuse üksikasjad',
        ua: 'Деталі відповіді RSVP'
    },
    'guestTable.dietaryNote': {
        et: 'Toitumismärkus',
        ua: 'Дієтична примітка'
    },
    'guestTable.invitationCopied': {
        et: 'Kutse link kopeeritud!',
        ua: 'Посилання скопійовано!'
    },
    'guestTable.invitationCopyError': {
        et: 'Viga lingi kopeerimisel',
        ua: 'Помилка копіювання посилання'
    },

    // RSVP Details in Table
    'guestTable.rsvpDetails.needsAccommodation': {
        et: 'Vajab majutust',
        ua: 'Потребує розміщення'
    },
    'guestTable.rsvpDetails.needsTransport': {
        et: 'Vajab transporti',
        ua: 'Потребує транспорт'
    },
    'guestTable.rsvpDetails.hasDietaryRestrictions': {
        et: 'Toidupiirangud',
        ua: 'Дієтичні обмеження'
    },
    'guestTable.rsvpDetails.dietaryNote': {
        et: 'Toitumismärkus',
        ua: 'Дієтична примітка'
    },
    'guestTable.rsvpDetails.transportFrom': {
        et: 'Transport',
        ua: 'Транспорт'
    },
    'guestTable.rsvpDetails.transportEstonia': {
        et: 'Eestis',
        ua: 'В Естонії'
    },
    'guestTable.rsvpDetails.transportUkraine': {
        et: 'Ukrainast',
        ua: 'З України'
    },
};