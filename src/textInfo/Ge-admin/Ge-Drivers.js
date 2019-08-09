const driverProfileRegistration = {

    DriverProfileNavigation: {
        navigationText: ["ჩემი  მოგზაურობები", "პროფილი", "ავტომობილის", "მგზავრობის პარამეტრები", //"Туры",
            "გამოხმაურებები", "პარამეტრები", "ბილინგი", "პარტნიორული პროგრამა"
        ],
        updatePhoto: "ფოტოს განახლება",
        totalTrips: {
            first: "სულ",
            last: "გამგზავრებების",
            full: "სულ გამგზავრებების რაოდენობა"
        },
        starsReviews: "გამოხმაურებების",
        upcomingTrips: {
            first: "მოსალოდნელი",
            last: "მგზავრობები",
            full: "მოსალოდნელი მგზავრობები"
        },
        penalty: {
            first: 'საჯარიმო',
            last: 'ქულები',
            full: 'საჯარიმო ქულები'
        }
    },
    DriverProfileBasicInformation: {
        telflag: "ru(GEO)",
        titlePage: "პროფილის რედაქტირება",
        firstName: {
            floatingLabelText: "სახელი",
            description: "თქვენს საჯარო პროფილში გამოისახება მხოლოდ თქვენი სახელი. როცა კლიენტი დაჯავშნის მოგზაურობას, მხოლოდ მაშინ დაინახავს თქვენს სახელსა და გვარს"
        },
        lastName: {
            floatingLabelText: "გვარი",
            description: ""
        },
        basicInfoBirthday: {
            floatingLabelText: "დაბადების თარიღი",
            description: "ჩვენ ვიყენებთ ამ მონაცემებს მხოლოდ ანალიზისათვის  და ვიცავთ მათ კონფედენციალურობას "
        },
        basicInfoNumber: {
            floatingLabelText: "პასპორტის ნომერი",
            description: "ვერასოდეს და ვერავინ მიიღებს თქვენი პასპორტის მონაცემებს. ის ჩვენ გვჭირდება გადახდების შესასრულებლად და ხელშეკრულების დასადებად"
        },
        basicInfoDay: {
            floatingLabelText: "პასპორტის გაცემის თარიღი",
            description: ""
        },
        basicInfoLocation: {
            label: "ქალაქი",
            description: "მიუთითეთ ქალაქი, სადაც თქვენ ცხოვრობთ. ეს დაგვეხმარება ჩვენ უფრო ეფექტურად გავანაწილოთ  შეკვეთები მოგზაურობებზე"
        },
        basicInfoTelNumber: {
            label: "სამსახურის ტელეფონი",
            description: "კლიენტები და Tripfer-ის წარმომადგენლები შეძლებენ დაგიკავშირდნენ ამ ნომერზე. ჩვენ გამოგიგზავნით ხოლმე მოთხოვნებს მოგზაურობებზე, შეხსენებებს და სხვა შეტყობინებებს"
        },
        basicInfoLanguage: {
            label: "ენები",
            description: "მიუთითეთ ენები, რომლებიც იცით. ეს ინფორმაცია დაგეხმარება თქვენ იპოვოთ საერთო ენა კლიენტთან"
        },
        MenuItem: {
            value: "აირჩიეთ ენები"
        },
        basicInfoMultiLine: {
            floatingLabelText: "ჩემს შესახებ",
            description: "მოგვიყევით თქვენი ინტერესების შესახებ: რომელი 5 ნივთის გარეშე არ შეგიძლიათ ცხოვრება? ან მოგწონთ, თუ არა სტუმრების მიღება? მოუყევით მათ თქვენ შესახებ: როგორია თქვენი ცხოვრებისეული პრინციპები? ეს დაეხმარება კლიენტს თქვენი პროფილისადმი დადებითი დამოკიდებულების ჩამოყალიბებაში"
        },
        buttonSubmit: {
            text: "ცვლილებების შენახვა"
        }

    },
    DriverProfileCar: {
        profileCarBrand: {
            floatingLabelText: "Марка автомобиля(GEO)"
        },
        profileCarYear: {
            floatingLabelText: "Год автомобиля(GEO)"
        },
        profileCarNumber: {
            floatingLabelText: "Номер автомобиля(GEO)"
        },
        typeCar: {
            label: "Тип автомобиля(GEO)"
        },
        carClass: {
            label: "Класс автомобиля(GEO)"
        },
        typeFuel: {
            label: "Тип топлива(GEO)"
        },
        profileCarFuelConsumption: {
            label: 'Потребление топлива(GEO)'
        },
        profileCarNumberOfSeats: {
            label: "Количество мест(GEO)"
        },
        carAddNewCarComfort: {
            label: "Удобства(GEO)",
            comfort1: "Климат контроль(GEO)",
            comfort2: "Кожаный салон(GEO)",
            comfort3: "Бесплатный Wi-Fi(GEO)",
            comfort4: "Курение в салоне разрешено(GEO)",
            comfort5: "Курение в салоне запрещено(GEO)"
        },
        carAddNewCarButton: {
            button: "Добавить Автомобиль(GEO)",
            span: "Отмена(GEO)"
        },
        filledCard: {
            button: "Добавить Автомобиль(GEO)"
        },
        filledCardInformationMenu: {
            deleteCar: "Удалить(GEO)",
            carEdit: "Редактировать(GEO)",
            carDeactivate: "Деактивировать(GEO)",
            carActivate: "Активировать(GEO)"
        },
        cardInformation: {
            span: "мест(а)(GEO)"
        }
    },
    DriverProfileTripSettingsTrip: {
        titlePage: "Редактировать поездки (GEO)",
        changeOnWorkP: "Вы можете приостановить и возобновить приём заказов(GEO)",
        onWorkTrue: "Приостановить работу(GEO)",
        onWorkFalse: "Возобновить работу(GEO)",
        weekendSettings: 'Настройка нерабочих дней(GEO)',
        chooseWeekend: "Выберите выходные дни(GEO)",
        selectDates: "Выбрать даты(GEO)",
        addCityTitle: "Добавьте город и радиусы, где Вы готовы принимать заказы(GEO)",
        tripLocation: "Базовый город/радиус, км(GEO)",
        textField: {
            floatingLabelText: "Радиус в км(GEO)",
            description: "Вы будете получать заявки на перевозку толлько в радиусе базовых городов, которые Вы указали(GEO)",
            title: "Удалить город(GEO)",
            addCityBt: "+ Добавить город(GEO)"
        },
        maxDailyMileage: {
            floatingLabelText: "Максимальный дневной пробег, км:(GEO)",
            description: "Укажите максимальный километраж, как далеко Вы готовы везти пассажира по маршруту(GEO)"
        },
        tripSaveBt: "СОХРАНИТЬ ИЗМЕНЕНИЯ(GEO)"
    },
    DriverProfileSettings: {
        settingsBodyTitle: "Настройки профиля(GEO)",
        sittingsEmail: {
            floatingLabelText: "Email(GEO)",
            description: "Адрес электронной почты является логином в системе и служит для уведомлений о заказах, новостях. И является средством связи со службой поддержки. Изменить нельзя(GEO)"
        },
        ContentPasswordText: "Пароль(GEO)",
        sittingsCurrentPassword: {
            floatingLabelText: "Текущий пароль(GEO)",
            description: "Для изменения пароля или номера телефона требуется ввести Ваш текущий пароль(GEO)"
        },
        sittingsNewPassword: {
            floatingLabelText: "Новый пароль(GEO)",
            description: "Должен быть не менее 6 символов и содержать латинские буквы и цифры(GEO)"
        },
        sittingsConfirmPassword: {
            floatingLabelText: "Подтвердите пароль(GEO)",
            description: "Введите пароль еще раз(GEO)"
        },
        sittingsPhoneNumber: {
            label: "Телефон(GEO)",
            description: "Данный телефон никому не доступен и служит резервным средством связи с представителями Tripfer(GEO)",
            telflag: "ru(GEO)"
        },
        sittingsSaveBt: "СОХРАНИТЬ ИЗМЕНЕНИЯ(GEO)",
        unsubscribeButton: {
            mailing: {
                unsubscribe: "Отписаться от рассылки(GEO)",
                subscribe: "Подписаться на рассылку(GEO)"
            },
            message: "В результате отписки Вы больше не будете получать сообщения от Tripfer(GEO)"
        }


    },
    DriverProfileAffiliateProgram: {
        affiliateProgramsTitle: "Партнерская программа(GEO)",
        affiliateProgramsDescription: "Постройте Ваш успешный бизнес и получайте пассивный доход в размере 14% с поездки от комиссии системы. Рассылайте приглашения со скидкой 15% на первую поездку знакомым-путешественникам, нажав на кнопку “Пригласить друга”, или отправляйте Вашу партнёрскую ссылку. Приглашайте водителей  работать в системе Tripfer, и получайте доход от выполненных ими заказов. Пишите о нас статьи, комментируйте в соцсетях, блогах и форумах, и зарабатывайте. Пожизненно. Выплаты на банковскую карту еженедельно. (GEO)",
        affiliateLinks: {
            title: "Ваши партнёрские ссылки(GEO)",
            registrationLink: "Ссылка на регистрацию(GEO)",
            linkToHomePage: "Ссылка на главную страницу(GEO)",
            spanLink: "Копировать(GEO)"
        },
        promotionalMaterials: "Промо материалы(GEO)",
        questionicon: "Начисления никогда не заканчиваются. Чем больше у вас рефералов, и чем лучше они работают - тем больше вы получаете каждый день(GEO)",
        peopleicon: "Всего рефералов(GEO)",
        percenticon: "С каждой оплаты(GEO)",
        currencyicon: "Заработанно Всего(GEO)",
        affiliateProgramTableHeader: ["EMAIL(GEO)", "Дата регистрации(GEO)", "Источник регистрации(GEO)", "Начисления(GEO)"]
    },
    DriverProfileTripSettingsTour: {
        directionsValue: "Все направления(GEO)",
        categoriesValue: "Все категории(GEO)",
        tagsValue: "Все теги(GEO)",
        newTourEverydayTime: "Выберите время(GEO)",
        newTourDatepickerTime: "Выберите время(GEO)",
        tourContentTitle: "Добавление тура(GEO)",
        nameNewTour: {
            floatingLabelText: "Название тура(GEO)",
            description: "Введите название для Вашего тура(GEO)"
        },
        newTourAttractions: {
            floatingLabelText: "Место отправления(GEO)",
            description: "Укажите место отправления тура(GEO)"
        },
        attractionsAlongTheRoute: {
            floatingLabelText: "Достопримечательности по маршруту(GEO)",
            description: "Выберите достопримечательности по маршруту. Это поможет клиенту полностью понять маршрут тура(GEO)"
        },
        newTourDescription: {
            floatingLabelText: "Описание(GEO)",
            description: "Введите описание тура, а так же что входит в стоимость тура, какие дополнительные услуги не входят в стоимость и тд(GEO)"
        },
        schedule: {
            title: "Расписание(GEO)",
            newTourEveryday: "Ежедневно(GEO)",
            newTourDatepicker: "По определенным дням(GEO)",
            selectDates: "Выбрать даты(GEO)"
        },
        additionalInformation: {
            title: "Дополнительная информация(GEO)",
            newTourPrice: {
                floatingLabelText: "Стоимость тура(GEO)"
            },
            directions: {
                floatingLabelText: "Направления(GEO)",
                description: "Региональная принадложность тура(GEO)"
            },
            categories: {
                floatingLabelText: "Категории(GEO)",
                description: "Вид отдыха(GEO)"
            },
            tags: {
                floatingLabelText: "Теги(GEO)",
                description: "Введите теги для пометки Вашего тура(GEO)"
            },
            newTourPeople: "Количество мест(GEO)",
            uploadPhoto: "Загрузить фото(GEO)",
            addTour: "Добавить тур(GEO)",
            cancel: "Отмена(GEO)",

        },
        filledCardInformationMenu: {
            deleteTour: "Удалить(GEO)",
            tourEdit: "Редактировать(GEO)",
            tourDeactivate: "Деактивировать(GEO)",
            tourActivate: "Активировать(GEO)"
        },
        cardInformation: {
            emptySeats: "Свободных мест(GEO)"
        }

    },
    DriverProfileTrevelHistory: {
        customer: "Клиент(GEO)",
        venue: "Место встречи(GEO)",
        costOfTravel: "Стоимость поездки(GEO)",
        comment: "Комментарий(GEO)",
    },
    DriverProfileHistory: {
        upcoming: "Предстоящие(GEO)",
        story: "История(GEO)",
    },
    DriverProfileBilling: {
        currentBalance: {
            currentBalanceText: 'Текущий баланс(GEO)',
            personalAccount: 'Лицевой счёт(GEO)',
            cardPayments: 'Оплачено картами(GEO)',
            partnerPayments: 'Партнёрские начисления(GEO)',
            withdrawnTotal: 'Всего снято(GEO)',
            accountTotal: 'Всего на счету(GEO)',
            fundsWithdrawal: 'Вывод средств(GEO)',
            receivedByCash: 'Получено наличными за все время(GEO)'
        },
        systemPayments: {
            systemPaymentsText: 'Оплата за пользование системой (всё время)(GEO)',
            cardCommission: 'Комиссия с карт(GEO)',
            cashCommission: 'Комиссия с наличных(GEO)',
            payedPart: 'Оплачено(GEO)',
            systemPaymentsTotal: 'Итого(GEO)',
            payButtonText: 'Оплатить(GEO)',
            systemPaymentInfo: 'Для поддержания работоспособности сервиса с каждой поездки взимается комиссия. Для продолжения пользования системой, Вам необходимо оплатить счет до 5 числа каждого месяца.(GEO)'
        },
        accountOperations: {
            accountOperationsText: 'Операции по счёту(GEO)',
            forPeriod: 'За период(GEO)',
            searchButton: 'Просмотреть(GEO)',
            infoTableText: {
                payedByCash: 'Оплачено картами(GEO)',
                payedByCard: 'Оплата по картам(GEO)',
                payedByPartners: 'Партнёрские начисления(GEO)',
                payedForPeriod: 'Всего за период(GEO)'
            },
            valueTableText: [
                'ID транзакции(GEO)',
                'Тип оплаты(GEO)',
                'Сумма(GEO)',
                'Дата платежа(GEO)',
                'ID поездки(GEO)'
            ]
        }
    }
}

export default driverProfileRegistration