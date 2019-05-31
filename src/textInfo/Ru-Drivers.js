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
        }
    },
    DriverProfileBasicInformation: {
        telflag: "ru",
        titlePage: "Редактировать профиль",
        firstName: {
            floatingLabelText: "Имя",
            description: ""
        },
        lastName: {
            floatingLabelText: "Фамилия",
            description: ""
        },
        basicInfoBirthday: {
            floatingLabelText: "Дата рождения",
            description: ""
        },
        basicInfoNumber: {
            floatingLabelText: "Номер паспорта",
            description: ""
        },
        basicInfoDay: {
            floatingLabelText: "Дата выдачи паспорта",
            description: ""
        },
        basicInfoLocation: {
            label: "Город",
            description: ""
        },
        basicInfoTelNumber: {
            label: "Рабочий телефон",
            description: ""
        },
        basicInfoLanguage: {
            label: "Языки",
            description: ""
        },
        MenuItem: {
            value: "Выберите языки"
        },
        basicInfoMultiLine: {
            floatingLabelText: "О себе",
            description: ""
        },
        buttonSubmit: {
            text: "Сохранить Изменения"
        }

    },
    DriverProfileCar: {
        carContentTitle: "Добавление автомобиля",
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
            span: "Отмена"
        },
        filledCard: {
            button: "Добавить Автомобиль"
        },
        filledCardInformationMenu: {
            deleteCar: "Удалить",
            carEdit: "Редактировать",
            carDeactivate: "Деактивировать",
            carActivate: "Активировать"
        },
        cardInformation: {
            span: "мест(а)"
        }
    },
    DriverProfileTripSettingsTrip: {
        changeOnWorkP: "Здесь вы можете приостановить и возобновить приём заказов",
        onWorkTrue: "Приостановить работу",
        onWorkFalse: "Возобновить работу",
        chooseWeekend: "Выберите выходные дни",
        selectDates: "Выбрать даты",
        addCityTitle: "Добавьте город и радиусы, где Вы готовы принимать заказы",
        tripLocation: "Базовый город/радиус, км",
        textField: {
            floatingLabelText: "Радиус в км",
            description: "",
            title: "Удалить город",
            addCityBt: "+ Добавить город"
        },
        maxDailyMileage: {
            floatingLabelText: "Максимальный дневной пробег, км:",
            description: ""
        },
        tripSaveBt: "СОХРАНИТЬ ИЗМЕНЕНИЯ"
    },
    DriverProfileSettings: {
        settingsBodyTitle: "Настройки профиля",
        sittingsEmail: {
            floatingLabelText: "Email",
            description: ""
        },
        ContentPasswordText: "Пароль",
        sittingsCurrentPassword: {
            floatingLabelText: "Текущий пароль",
            description: ""
        },
        sittingsNewPassword: {
            floatingLabelText: "Новый пароль",
            description: ""
        },
        sittingsConfirmPassword: {
            floatingLabelText: "Подтвердите пароль",
            description: ""
        },
        sittingsPhoneNumber: {
            label: "Телефон",
            description: "",
            telflag: "ru"
        },
        sittingsSaveBt: "СОХРАНИТЬ ИЗМЕНЕНИЯ",
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
        affiliateProgramsDescription: "",
        affiliateLinks: {
            title: "Ваши партнёрские ссылки",
            registrationLink: "Ссылка на регистрацию",
            linkToHomePage: "Ссылка на главную"
        },
        promotionalMaterials: "Промо материалы",
        questionicon: "Начисления никогда не заканчиваются. Чем больше у вас рефералов, и чем лучше они работают - тем больше вы получаете каждый день",
        peopleicon: "Всего рефералов",
        percenticon: "С каждой оплаты",
        currencyicon: "Заработанно Всего",
        affiliateProgramTableHeader: ["EMAIL", "Дата регистрации", "Источник регистрации", "Начисления"]
    },
    DriverProfileTripSettingsTour: {
        directionsValue: "Все направления",
        categoriesValue: "Все категории",
        tagsValue: "Все теги",
        newTourEverydayTime: "Выберите время",
        newTourDatepickerTime: "Выберите время",
        tourContentTitle: "Добавление тура",
        nameNewTour: {
            floatingLabelText: "Название тура",
            description: ""
        },
        newTourAttractions: {
            floatingLabelText: "Место отправления",
            description: ""
        },
        attractionsAlongTheRoute: {
            floatingLabelText: "Достопримечательности по маршруту",
            description: ""
        },
        newTourDescription: {
            floatingLabelText: "Описание",
            description: ""
        },
        schedule: {
            title: "Расписание",
            newTourEveryday: "Ежедневно",
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
                description: ""
            },
            categories: {
                floatingLabelText: "Категории",
                description: ""
            },
            tags: {
                floatingLabelText: "Теги",
                description: ""
            },
            newTourPeople: "Количество мест",
            uploadPhoto: "Загрузить фото",
            addTour: "Добавить тур",
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
        }

    },
    DriverProfileTrevelHistory: {
        customer: "Клиент",
        venue: "Место встречи",
        costOfTravel: "Стоимость поездки",
        comment: "Комментарий",
    },
    DriverProfileHistory: {
        upcoming: "Предстоящие",
        story: "История",
    }

}

export default driverProfileRegistration