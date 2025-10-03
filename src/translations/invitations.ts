// src/translations/invitations.ts
import { Translations } from '../types/language';

export const invitationTranslations: Translations = {
    // Invitation Status
    'invitationStatus.not_sent': {
        et: 'Saatmata',
        ua: 'Не надіслано'
    },
    'invitationStatus.sent': {
        et: 'Saadetud',
        ua: 'Надіслано'
    },
    'invitationStatus.opened': {
        et: 'Avatud',
        ua: 'Відкрито'
    },
    'invitationStatus.responded': {
        et: 'Vastatud',
        ua: 'Відповів'
    },
    'invitationStatus.declined': {
        et: 'Keeldus',
        ua: 'Відмовився'
    },

    // RSVP Status
    'rsvpStatus.pending': {
        et: 'Ootel',
        ua: 'Очікує'
    },
    'rsvpStatus.attending': {
        et: 'Osaleb',
        ua: 'Буде присутній'
    },
    'rsvpStatus.not_attending': {
        et: 'Ei osale',
        ua: 'Не буде присутній'
    },

    // Invitation Page Content
    'invitation.subtitle': {
        et: 'Meil on rõõm jagada teiega erilist uudist — me abiellume!\n' +
            'Olete südamest oodatud meiega seda päeva tähistama Põhjala Resortis.',
        ua: 'Ми раді поділитися з вами особливою новиною — ми одружуємось!\n' +
            'Запрошуємо вас розділити цей день із нами у Põhjala Resort.'
    },
    'invitation.may': {
        et: 'Mai',
        ua: 'Травень'
    },
    'invitation.venue': {
        et: 'Koht',
        ua: 'Місце'
    },
    'invitation.address': {
        et: 'Kata küla, Kose vald, Harjumaa, 75103',
        ua: 'Kata küla, Kose vald, Harjumaa, 75103'
    },
    'invitation.dearGuest': {
        et: 'Kallis',
        ua: 'Дорогий'
    },
    'invitation.dearGuests': {
        et: 'Kallid',
        ua: 'Дорогі'
    },
    'invitation.tableNumber': {
        et: 'Laua number',
        ua: 'Номер столу'
    },
    'invitation.message': {
        et: 'Täpsem info ja peokava tulevad peagi.\n' +
            'Palun hoidke kuupäev vaba — teie kohalolek on meile väga tähtis!\n' +
            ' (NB! Palun hoidke selle kutse link endal alles)',
        ua: 'Деталі та план святкування ми повідомимо трохи пізніше.\n' +
            'Збережіть дату — нам буде дуже важливо бачити вас поруч!'
    },
    'invitation.rsvp.title': {
        et: 'Palume kinnitada osalemist',
        ua: 'Будь ласка, підтвердіть участь'
    },
    'invitation.rsvp.deadline': {
        et: 'Hiljemalt 15. aprilliks 2026',
        ua: 'До 15 квітня 2026 року'
    },
    'invitation.contact': {
        et: 'Kontakt',
        ua: 'Контакт'
    },
    'invitation.footer': {
        et: 'Ootame teid suure rõõmuga!',
        ua: 'Чекаємо на вас з великою радістю!'
    },

// RSVP Form translations
    'rsvp.title': {
        et: 'Palume kinnitada osalemist',
        ua: 'Будь ласка, підтвердіть участь'
    },
    'rsvp.forYou': {
        et: 'Teie jaoks',
        ua: 'Для вас'
    },
    'rsvp.forYourGroup': {
        et: 'Teie grupi jaoks',
        ua: 'Для вашої групи'
    },
    'rsvp.questions.attending': {
        et: 'Kas tulete pulmadele?',
        ua: 'Чи прийдете ви на весілля?'
    },
    'rsvp.questions.accommodation': {
        et: 'Kas vajate majutust?',
        ua: 'Чи потрібне вам розміщення?'
    },
    'rsvp.questions.transport': {
        et: 'Kas vajate transporti?',
        ua: 'Чи потрібен вам транспорт?'
    },
    'rsvp.questions.dietary': {
        et: 'Kas teil on toidupiirangud?',
        ua: 'Чи є у вас дієтичні обмеження?'
    },
    'rsvp.questions.dietaryNote': {
        et: 'Palun täpsustage oma toidupiiranguid...',
        ua: 'Будь ласка, уточніть свої дієтичні обмеження...'
    },
    'rsvp.answers.yes': {
        et: 'Jah, tulen!',
        ua: 'Так, прийду!'
    },
    'rsvp.answers.no': {
        et: 'Ei, ei saa tulla',
        ua: 'Ні, не можу прийти'
    },
    'rsvp.answers.needAccommodation': {
        et: 'Jah, vajan majutust',
        ua: 'Так, потрібне розміщення'
    },
    'rsvp.answers.needTransport': {
        et: 'Jah, vajan transporti',
        ua: 'Так, потрібен транспорт'
    },
    'rsvp.answers.hasDietary': {
        et: 'Jah, on toidupiirangud - kellel ja milline?',
        ua: 'Так, у мене є дієтичні обмеження'
    },
    'rsvp.submit': {
        et: 'Saada vastus',
        ua: 'Надіслати відповідь'
    },
    'rsvp.submitting': {
        et: 'Saadan...',
        ua: 'Надсилаю...'
    },
    'rsvp.pleaseSelectAttending': {
        et: 'Palun valige, kas tulete või mitte',
        ua: 'Будь ласка, виберіть, чи прийдете ви чи ні'
    },
    'rsvp.submissionError': {
        et: 'Viga vastuse saatmisel. Palun proovige uuesti.',
        ua: 'Помилка надсилання відповіді. Спробуйте ще раз.'
    },
    'rsvp.decliningMessage': {
        et: 'Kahju, et ei saa tulla! Loodame teid näha järgmisel korral.',
        ua: 'Шкода, що не можете прийти! Сподіваємось побачити вас наступного разу.'
    },
    'rsvp.thankYou.title': {
        et: 'Aitäh!',
        ua: 'Дякую!'
    },
    'rsvp.thankYou.message': {
        et: 'Teie vastus on vastu võetud. Ootame teid suure rõõmuga!',
        ua: 'Вашу відповідь отримано. Чекаємо на вас з великою радістю!'
    },
    'rsvp.respondNow': {
        et: 'Vasta kohe',
        ua: 'Відповісти зараз'
    },
    'rsvp.responseReceived': {
        et: 'Teie vastus on saadud',
        ua: 'Вашу відповідь отримано'
    },
    'rsvp.seeYouThere': {
        et: 'Näeme pulmas!',
        ua: 'Побачимося на весіллі!'
    },
    'rsvp.sorryToMissYou': {
        et: 'Kahju, et ei saa osaleda.',
        ua: 'Шкода, що не зможете взяти участь.'
    },

    // Transport specific translations
    'rsvp.transport.inEstonia': {
        et: 'Eestis',
        ua: 'В Естонії'
    },
    'rsvp.transport.fromUkraine': {
        et: 'Ukrainast',
        ua: 'З України'
    },
    'rsvp.transport.estoniaPlaceholder': {
        et: 'Näiteks: Lennujaamast, bussijaamast või muu asukoht...',
        ua: 'Наприклад: З аеропорту, автовокзалу або інше місце...'
    },
    'rsvp.transport.ukrainePlaceholder': {
        et: 'Näiteks: Piirist või muu konkreetne asukoht...',
        ua: 'Наприклад: З кордону або інше конкретне місце...'
    },
    'rsvp.transport.locationHint': {
        et: 'Valikuline: täpsustage lähtepunkt',
        ua: 'Необов\'язково: вкажіть місце відправлення'
    },
    'rsvp.pleaseSelectTransportType': {
        et: 'Palun valige transpordi tüüp',
        ua: 'Будь ласка, виберіть тип транспорту'
    },

    'rsvp.selectWhoIsAttending': {
        et: 'Palun valige, kes tulevad',
        ua: 'Будь ласка, оберіть, хто прийде'
    },
    'rsvp.questions.whoIsAttending': {
        et: 'Kes tulevad?',
        ua: 'Хто прийде?'
    },
    'rsvp.pleaseSelectAtLeastOneGuest': {
        et: 'Palun valige vähemalt üks külastaja',
        ua: 'Будь ласка, оберіть хоча б одного гостя'
    },
    'rsvp.nobodyAttending': {
        et: 'Kahjuks ei saa keegi tulla. Täname teate eest!',
        ua: 'На жаль, ніхто не зможе прийти. Дякуємо за повідомлення!'
    },
    'rsvp.yourResponse': {
        et: 'Teie vastus',
        ua: 'Ваша відповідь'
    },
    'rsvp.submittedOn': {
        et: 'Esitatud',
        ua: 'Подано'
    },
    'rsvp.attending': {
        et: 'Tulevad',
        ua: 'Прийдуть'
    },
    'rsvp.notAttending': {
        et: 'Ei tule',
        ua: 'Не прийдуть'
    },
    'rsvp.editResponse': {
        et: 'Muuda vastust',
        ua: 'Змінити відповідь'
    },
    'rsvp.editYourResponse': {
        et: 'Muuda oma vastust',
        ua: 'Змінити свою відповідь'
    },
    'rsvp.updateResponse': {
        et: 'Uuenda vastust',
        ua: 'Оновити відповідь'
    },
    'rsvp.errorSubmitting': {
        et: 'Viga vastuse esitamisel. Palun proovi uuesti.',
        ua: 'Помилка під час відправки відповіді. Спробуйте ще раз.'
    },
    'rsvp.transport.fromEstonia': {
        et: 'Eestist',
        ua: 'З Естонії'
    },
    'rsvp.transport.locationPlaceholder': {
        et: 'Täpsustage asukoht (nt Tallinn Lennujaam)',
        ua: 'Вкажіть місце (напр. Аеропорт Таллінн)'
    },
    'invitation.child': {
        et: '(laps)',
        ua: '(дитина)'
    },
};