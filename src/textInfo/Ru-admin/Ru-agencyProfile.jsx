const agencyProfile = {
    lang: 'RUS',
    agencyProfile: {
        loading: 'Загрузка'
    },
    agencyProfileBasicInformation:{
        header: 'Редактировать профиль',
        organizationData: {
            header: 'Данные организации',
            organizationName: 'Название организации',
            registrationNumber: 'Регистрационный номер',
            legalAddress: 'Юридический адрес',
            bankAccount: 'Расчётный счёт',
            bankCode: 'Код банка',
            bankAddress: 'Адрес банка',
            dataAbout: 'О себе',
        },
        contactPerson: {
            header: 'Данные контактного лица',
            firstName: 'Имя',
            lastName: 'Фамилия',
            workPhone: 'Рабочий телефон',
            basicInfoLanguageText: 'Выберите языки',
        },
        saveText: 'Сохранить Изменения'
    },
    agencyProfileAffiliateProgramm: {
        affiliateProgramsTitle: "Партнерская программа",
        affiliateProgramsDescription: "Постройте Ваш успешный бизнес и получайте пассивный доход в размере 20% с поездки от комиссии системы. Рассылайте приглашения со скидкой 10% на первую поездку знакомым-путешественникам, нажав на кнопку “Пригласить друга”, или отправляйте Вашу партнёрскую ссылку. Пишите о нас статьи, комментируйте в соцсетях, блогах и форумах, и зарабатывайте. Пожизненно. Выплаты на банковскую карту еженедельно. ",
        affiliateLinks: {
            title: "Ваши партнёрские ссылки",
            registrationLink: "Ссылка на регистрацию",
            linkToHomePage: "Ссылка на главную страницу",
            spanLink: "Копировать"
        },
        promotionalMaterials: "Промо материалы",
        questionicon: "Начисления никогда не заканчиваются. Чем больше у вас рефералов, и чем лучше они работают - тем больше вы получаете каждый день",
        peopleicon: "Всего рефералов",
        percenticon: "С каждой оплаты",
        currencyicon: "Заработано Всего",
        affiliateProgramTableHeader: ["EMAIL", "Дата регистрации", "Источник регистрации", "Начисления"]
    },
    agencyProfileDrivers: {
        driversText: 'Подключённые водители',
        linkTitle: 'Ваша ссылка на регистрацию нового водителя в автопарк',
        linkButton: 'Копировать',
        headerTable: ["Водитель", "Автомобили", "Число поездок",
            "Рейтинг", "Штрафные баллы", "Действия"]
    },
    agencyProfileNavigation: {
        navigationText: ["Мои поездки", "Профиль", "Водители", "Туры", "Отзывы",
            "Настройки", "Биллинг", "Партнерская программа"],
        updatePhoto: "Обновить фотографию",
        totalTrips: {
            first: "Всего",
            last: "поездок",
            full: "Всего поездок"
        },
        starsReviews: "отзывов",
        totalDrivers: {
            first: 'Всего',
            last: 'водителей',
            full: 'Всего водителей'
        }
    },
    agencyProfileHistory: {
        upcoming: "Предстоящие",
        story: "История",
        emptyUpcoming: 'Предстоящие поездки отсутствуют.',
        emptyHistory: 'История поездок чиста.'
    },
    agencyProfileTrevelHistory: {
        tripId: 'ID поездки',
        drivercar: "Водитель и автомобиль",
        comments: 'отзывов',
        client: 'Клиент',
        costOfTravel: "Стоимость поездки",
        tripStart: 'Начало поездки',
        notStarted: 'Поездка не была начата',
        tripEnd: 'Окончание поездки',
        notEnded: 'Поездка не была закончена'
    },
    agencyProfileTour:{
        tourSeatsModalContent: {
            tour: 'Тур',
            headerArray: ['День', 'Mест свободно', 'Mecт зaнятo'],
            calendaryInfo: 'В этом календаре кликабельными будут только выбранные Вами в настройках тура дни, при нажатии на любые другие ничего происходить не будет. Если их число ограничено, то они будут выбраны изначально.',
            saveChangesButton: 'Сохранить',
            closeWindow: 'Закрыть'
        },
        excursionIncludesBlock: {
            label: 'Стоимость экскурсии включает',
            hotelMeeting: 'Встреча в отеле',
            hotelDelivery: 'Доставка в отель',
            fare: 'Транспортные расходы',
            entryTickets: 'Входные билеты',
            food: 'Еда и напитки',
            accommodation: 'Проживание'
        },
        daysNumber: 'Количество дней',
        tourClassification: 'Классификация тура',
        imagesLabel: 'Изображения',
        seatsModalLabel: 'Таблица мест',
        comments: 'отзывов',
        tourOnSite: 'Тур на сайте',
        seatsTable: 'Таблица мест',

        departurePointPlaceholder: 'Точка отправления',
        pointsPlaceholder: 'Выберите точки маршрута',
        currencyPlaceholder: 'Валюта',
        pricePerPersonPlaceholder: 'Цена за место',
        pricePerPersonInfo: 'Если не выбрано, то предполагается цена за весь тур.',
        tourLanguagesPlaceholder: 'Языки туров',
        directionPlaceholder: 'Направление (Регион)'
    }
}
export default agencyProfile;