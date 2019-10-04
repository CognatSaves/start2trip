let userProfile = {
    lang: 'RUS',
    userProfileNavigation: {
        navigationText: ["Мои поездки", "Профиль", "Настройки", "Биллинг", "Партнерская программа"
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
    userProfileBasicInformation: {
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
    userProfileBilling: {
        billingModalHeader: 'Доступно к выводу',
        billingModalContent:{
            summLabel: 'Сумма USD',
            cardNumber: 'Номер карты',
            cardType: 'Тип карты',
            cancel: 'Отмена',
            submit: 'Вывод средств'
        },
        billingBody:{
            title: 'Текущий баланс (Лицевой счет № ',
            partnersProfit: 'Партнерские начисления',
            payedprofit: 'Выведено всего',
            summary: 'Всего на счету',
            submit: 'Вывод средств'
        },       
    },
    userProfileRegistration: {
        loading: 'Загрузка'
    },
    userProfileTravelHistory: {
        drivercar: 'Водитель и автомобиль',
        comments: 'отзывов',
        passengerNumber: 'Количество человек',
        startPlace: 'Место встречи',
        price: 'Стоимость поездки',
        startFact: 'Начало поездки',
        notStart: 'Поездка не была начата',
        endFact: 'Окончание поездки',
        notEnd: 'Поездка не была закончена',
        emptyTrips: 'Предстоящие поездки отсутствуют.',
        emptyHistory: 'История поездок чиста.'
    },
    userProfileSettings: {
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
    userProfileAffiliateProgram: {
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
    userProfileHistory: {
        upcoming: "Предстоящие",
        story: "История",
    }
}

export default userProfile;