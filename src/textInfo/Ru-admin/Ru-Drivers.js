const driverProfileRegistration = {

    DriverProfileNavigation: {
        navigationText: ["Мои поездки", "Профиль", "Автомобиль", "Настройки поездок", "Туры",
            "Отзывы", "Настройки", "Биллинг", "Партнерская программа"
        ],
        updatePhoto: "Обновить фотографию",
        totalTrips: {
            first: "Всего",
            last: "поездок",
            full: "Всего поездок"
        },
        starsReviews: "отзывов",
        upcomingTrips: {
            first: "Предстоящие",
            last: "поездки",
            full: "Предстоящие поездки"
        },
        penalty: {
            first: 'Штрафные',
            last: 'баллы',
            full: 'Штрафные баллы'
        }
    },
    DriverProfileBasicInformation: {
        telflag: "ru",
        titlePage: "Редактировать профиль",
        firstName: {
            floatingLabelText: "Имя",
            description: "В вашем публичном профиле отображается только Ваше имя. Когда клиент забронирует поездку, увидит Ваши имя и фамилию"
        },
        lastName: {
            floatingLabelText: "Фамилия",
            description: ""
        },
        basicInfoBirthday: {
            floatingLabelText: "Дата рождения",
            description: "Волшебный день, когда Вас нашли в капусте. Мы используем эти данные только для анализа и никогда ни с кем ими не делимся"
        },
        basicInfoNumber: {
            floatingLabelText: "Номер паспорта",
            description: "Никто и никогда кроме нас не получит данные Вашего номера паспорта. Он нужен нам для осуществления выплат и заключения договора"
        },
        basicInfoDay: {
            floatingLabelText: "Дата выдачи паспорта",
            description: ""
        },
        basicInfoLocation: {
            label: "Город",
            description: "Укажите город, где Вы проживаете. Это поможет нам более эффективно распределять заказы на поездки"
        },
        basicInfoTelNumber: {
            label: "Рабочий телефон",
            description: "Клиенты и представители Tripfer могли с Вами связаться по этому номеру. Мы будем отправлять вам запросы на поездки, напоминания и другие уведомления"
        },
        basicInfoLanguage: {
            label: "Языки",
            description: "Укажите языки, которыми владеете. Эта информация поможет Вам найти общий язык общения с клиентом"
        },
        MenuItem: {
            value: "Выберите языки"
        },
        basicInfoMultiLine: {
            floatingLabelText: "О себе",
            description: "Расскажите о своих интересах: без каких 5 вещей вы не можете жить?  Или как вам нравится принимать гостей? Расскажите им о себе: какие у вас жизненные принципы? Это поможет сформировать у клиента положительное отношение к Вашему профилю"
        },
        buttonSubmit: {
            text: "Сохранить Изменения"
        }

    },
    DriverProfileCar: {
        profileCarBrand: {
            floatingLabelText: "Марка автомобиля"
        },
        profileCarYear: {
            floatingLabelText: "Год автомобиля"
        },
        profileCarNumber: {
            floatingLabelText: "Номер автомобиля"
        },
        typeCar: {
            label: "Тип автомобиля"
        },
        carClass: {
            label: "Класс автомобиля"
        },
        typeFuel: {
            label: "Тип топлива"
        },
        profileCarFuelConsumption: {
            label: 'Потребление топлива'
        },
        profileCarNumberOfSeats: {
            label: "Количество мест"
        },
        carAddNewCarComfort: {
            label: "Удобства",
            comfort1: "Климат контроль",
            comfort2: "Кожаный салон",
            comfort3: "Бесплатный Wi-Fi",
            comfort4: "Курение в салоне разрешено",
            comfort5: "Курение в салоне запрещено"
        },
        carAddNewCarButton: {
            button: "Добавить Автомобиль",
            buttonUpdate: 'Сохранить изменения',
            span: "Отмена"
        },
        filledCard: {
            button: "Добавить Автомобиль",
            buttonUpdate: 'Сохранить изменения'
        },
        filledCardInformationMenu: {
            deleteCar: "Удалить",
            carEdit: "Редактировать",
            carDeactivate: "Деактивировать",
            carActivate: "Активировать"
        },
        cardInformation: {
            span: "мест(а)"
        },
        noPhotoText: 'Вставьте фото вашего автомобиля.',
        badDataText: 'Заполните корректно выделенные поля!',
        indexMainPhoto:["Главная","Сделать главной"],
        routePrice: 'Оплата работы за день',
        priceCurrency: 'Валюта оплаты'
    },
    DriverProfileTripSettingsTrip: {
        titlePage: "Редактировать поездки",
        changeOnWorkP: "Вы можете приостановить и возобновить приём заказов",
        onWorkTrue: "Приостановить работу",
        onWorkFalse: "Возобновить работу",
        weekendSettings: 'Настройка нерабочих дней',
        chooseWeekend: "Выберите выходные дни",
        selectDates: "Выбрать даты",
        addCityTitle: "Добавьте город и радиусы, где Вы готовы принимать заказы",
        tripLocation: "Базовый город/радиус, км",
        textField: {
            floatingLabelText: "Радиус в км",
            description: "Вы будете получать заявки на перевозку толлько в радиусе базовых городов, которые Вы указали",
            title: "Удалить город",
            addCityBt: "+ Добавить город"
        },
        maxDailyMileage: {
            floatingLabelText: "Максимальный дневной пробег, км:",
            description: "Укажите максимальный километраж, как далеко Вы готовы везти пассажира по маршруту"
        },
        tripSaveBt: "СОХРАНИТЬ ИЗМЕНЕНИЯ",
        badRequestText: 'Вы допустили ошибки. Поправьте их перед сохранением!'
    },
    DriverProfileSettings: {
        settingsBodyTitle: "Настройки профиля",
        sittingsEmail: {
            floatingLabelText: "Email",
            description: "Адрес электронной почты является логином в системе и служит для уведомлений о заказах, новостях. И является средством связи со службой поддержки. Изменить нельзя"
        },
        ContentPasswordText: "Пароль",
        sittingsCurrentPassword: {
            floatingLabelText: "Текущий пароль",
            description: "Для изменения пароля или номера телефона требуется ввести Ваш текущий пароль"
        },
        sittingsNewPassword: {
            floatingLabelText: "Новый пароль",
            description: "Должен быть не менее 6 символов и содержать латинские буквы и цифры"
        },
        sittingsConfirmPassword: {
            floatingLabelText: "Подтвердите пароль",
            description: "Введите пароль еще раз"
        },
        sittingsPhoneNumber: {
            label: "Телефон",
            description: "Данный телефон никому не доступен и служит резервным средством связи с представителями Tripfer",
            telflag: "ru"
        },
        sittingsSaveBt: "СОХРАНИТЬ ИЗМЕНЕНИЯ",
        infoText: 'Пароль будет проверяться и сохраняться только в случае заполнения всех трёх полей.',
        unsubscribeButton: {
            mailing: {
                unsubscribe: "Отписаться от рассылки",
                subscribe: "Подписаться на рассылку"
            },
            message: "В результате отписки Вы больше не будете получать сообщения от Tripfer"
        }
    },
    DriverProfileAffiliateProgram: {
        affiliateProgramsTitle: "Партнерская программа",
        affiliateProgramsDescription: "Постройте Ваш успешный бизнес и получайте пассивный доход в размере 20% с поездки от комиссии системы. Рассылайте приглашения со скидкой 10% на первую поездку знакомым-путешественникам, нажав на кнопку “Пригласить друга”, или отправляйте Вашу партнёрскую ссылку. Приглашайте водителей  работать в системе Tripfer, и получайте доход от выполненных ими заказов. Пишите о нас статьи, комментируйте в соцсетях, блогах и форумах, и зарабатывайте. Пожизненно. Выплаты на банковскую карту еженедельно. ",
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
    DriverProfileTripSettingsTour: {
        
        titlePage: "Редактировать Поездки",
        directionsValue: "Все направления",
        categoriesValue: "Все категории",
        tagsValue: "Все теги",
        newTourEverydayTime: "Выберите время",
        newTourDatepickerTime: "Выберите время",
        tourContentTitle: "Добавление тура",
        nameNewTour: {
            floatingLabelText: "Название тура",
            description: "Введите название для Вашего тура"
        },
        newTourAttractions: {
            floatingLabelText: "Место отправления",
            description: "Укажите место отправления тура"
        },
        attractionsAlongTheRoute: {
            floatingLabelText: "Достопримечательности по маршруту",
            description: "Выберите достопримечательности по маршруту. Это поможет клиенту полностью понять маршрут тура"
        },
        newTourDescription: {
            floatingLabelText: "Описание",
            description: "Введите описание тура, а так же что входит в стоимость тура, какие дополнительные услуги не входят в стоимость и тд"
        },
        schedule: {
            title: "Расписание",
            newTourEveryday: "Ежедневно",
            timePlaceholder: 'Время',
            newTourDatepicker: "По определенным дням",
            selectDates: "Выбрать даты"
        },
        additionalInformation: {
            title: "Дополнительная информация",
            newTourPrice: {
                floatingLabelText: "Стоимость тура"
            },
            directions: {
                floatingLabelText: "Направления",
                description: "Региональная принадложность тура"
            },
            categories: {
                floatingLabelText: "Категории",
                description: "Вид отдыха"
            },
            tags: {
                floatingLabelText: "Теги",
                description: "Введите теги для пометки Вашего тура"
            },
            newTourPeople: "Количество мест",
            uploadPhoto: "Загрузить фото",
            addTour: "Добавить тур",
            editTour: 'Сохранить изменения',
            cancel: "Отмена",

        },
        filledCardInformationMenu: {
            deleteTour: "Удалить",
            tourEdit: "Редактировать",
            tourDeactivate: "Деактивировать",
            tourActivate: "Активировать"
        },
        cardInformation: {
            emptySeats: "Свободных мест"
        },
        photos:{
            imageLabelError: 'Вставьте сюда фотографии(ю)',
            mainImageLabel: 'Это загрузка фонового фото',
            mainImageInfo: 'Эта картинка будет использоваться как фон на странице Вашего тура',
            blockListLabel: 'Это загрузка фото для блока в списке',
            blockListImageInfo: 'Эта картинка будет использоваться в качестве оформления Вашего тура в списке'
        },
        pageLabel: 'Настройки гида',
        guideLabel: 'Я гид',
        hourPrice: 'Стоимость часа работы',
        saveButton: 'Сохранить',
        info: {
            info1: 'Укажите стоимость работы гидом за час. При построении индивидуального маршрута пользователем на каждую достопримечательность отводится 2 часа.',
            info2: 'Стоимость работы за час будет добавлена к автоматическому расчету стоимости поездки.'
        },
        errorText: 'Проверьте заполнение полей тура, включая заполненные Вами языковые версии'

    },
    DriverProfileTrevelHistory: {
        tripId: 'ID поездки',
        customer: "Клиент",
        venue: "Место встречи",
        costOfTravel: "Стоимость поездки",
        comment: "Комментарий",
        car:"Автомобиль",
        tripStart: 'Начало поездки',
        noStart: 'Поездка не была начата',
        tripEnd: 'Окончание поездки',
        noEnd: 'Поездка не была закончена',
        stateVariants: ['Закончить поездку','Начать поездку'],
        historyBodyHeaderBtn:["Скрыть","Подробнее"],
        numberPersons:"Количество человек",
        placesLeft:"Осталось мест",
        users:"Пользователи",
        notConfirmed:"Не подтверждено",
        confirmed:"Подтверждено",
        isСonfirmed:"Подтвержден ?",
    },
    DriverProfileHistory: {
        upcoming: "Предстоящие",
        story: "История",
    },
    DriverProfileBilling: {
        billingModalA:{
            header: 'Доступно к выводу',
            summ: 'Сумма USD',
            cardNumber: 'Номер карты',
            cardType: 'Тип карты',
            cancel: 'Отмена',
            submit: 'Вывод средств'
        },
        billingModalB:{
            header: 'Сумма к оплате',
            summ: 'Сумма USD',
            description: 'Оплата осуществляется с помощью банковской карты. После ввода суммы и подтверждения вы будете переадресованы в специализированный сервис.',
            cancel: 'Отмена',
            submit: 'Оплатить'
        },
        currentBalance: {
            currentBalanceText: 'Текущий баланс',
            personalAccount: 'Лицевой счёт',
            cardPayments: 'Оплачено наличными',
            partnerPayments: 'Партнёрские начисления',
            withdrawnTotal: 'Всего снято',
            accountTotal: 'Всего на счету',
            fundsWithdrawal: 'Вывод средств',
            receivedByCash: 'Получено наличными за все время'
        },
        systemPayments: {
            systemPaymentsText: 'Оплата за пользование системой (всё время)',
            cardCommission: 'Комиссия с карт',
            cashCommission: 'Комиссия с наличных',
            payedPart: 'Оплачено',
            systemPaymentsTotal: 'Итого',
            payButtonText: 'Оплатить',
            systemPaymentInfo: 'Для поддержания работоспособности сервиса с каждой поездки взимается комиссия. Для продолжения пользования системой, Вам необходимо оплатить счет до 5 числа каждого месяца.'
        },
        accountOperations: {
            accountOperationsText: 'Операции по счёту',
            forPeriod: 'За период',
            searchButton: 'Просмотреть',
            infoTableText: {
                payedByCash: 'Оплачено наличными',
                payedByCard: 'Оплата по картам',
                payedByPartners: 'Партнёрские начисления',
                payedForPeriod: 'Всего за период',
                datePickerStart: 'Дата начала',
                datePickerEnd: 'Дата конца'
            },
            valueTableText: [
                'ID транзакции',
                'Тип оплаты',
                'Сумма',
                'Дата платежа',
                'ID поездки'
            ]
        }
    },
    DriverProfileRegistration:{
        loading: 'Загрузка',

    }
}

export default driverProfileRegistration