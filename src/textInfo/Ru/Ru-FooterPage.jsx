
import addCarInDriver from '../../components/media/ru/addCarInDriver.jpg'
import addCarInDriver2 from '../../components/media/ru/addCarInDriver2.jpg'
import addCarInDriver3 from '../../components/media/ru/addCarInDriver3.jpg'
import addDriverInAgency from '../../components/media/ru/addDriverInAgency.jpg'
import addTourInDriver from '../../components/media/ru/addTourInDriver.jpg'
import addTourInDriver2 from '../../components/media/ru/addTourInDriver2.jpg'
import addTourInDriver3 from '../../components/media/ru/addTourInDriver3.jpg'
import addTourInDriver4 from '../../components/media/ru/addTourInDriver4.jpg'
import addTourInDriver5 from '../../components/media/ru/addTourInDriver5.jpg'
import addToursInAgency from '../../components/media/ru/addToursInAgency.jpg'
import addToursInAgency2 from '../../components/media/ru/addToursInAgency2.jpg'
import addToursInAgency3 from '../../components/media/ru/addToursInAgency3.jpg'
import addToursInAgency4 from '../../components/media/ru/addToursInAgency4.jpg'
import addToursInAgency5 from '../../components/media/ru/addToursInAgency5.jpg'
import affiliateProgramInDriver from '../../components/media/ru/affiliateProgramInDriver.jpg'
import billingAgency from '../../components/media/ru/billingAgency.jpg'
import billingDriver from '../../components/media/ru/billingDriver.jpg'
import bookCarUser from '../../components/media/ru/bookCarUser.jpg'
import bookCarUser2 from '../../components/media/ru/bookCarUser2.jpg'
import bookCarUser3 from '../../components/media/ru/bookCarUser3.jpg'
import cancelBookUser from '../../components/media/ru/cancelBookUser.jpg'
import createProfileInDriver from '../../components/media/ru/createProfileInDriver.jpg'
import createProfileInDriver2 from '../../components/media/ru/createProfileInDriver2.jpg'
import driverContactUser from '../../components/media/ru/driverContactUser.jpg'
import makeRouteUser from '../../components/media/ru/makeRouteUser.jpg'
import makeRouteUser2 from '../../components/media/ru/makeRouteUser2.jpg'
import registationAgency from '../../components/media/ru/registationAgency.jpg'
import registrationDriver from '../../components/media/ru/registrationDriver.jpg'
import tripsettingInDriver from '../../components/media/ru/tripsettingInDriver.jpg'
import tripsettingInDriver2 from '../../components/media/ru/tripsettingInDriver2.jpg'

const FooterPage = {
    aboutService: {
        h2: "О сервисе",
        description: `Сервис tripfer.com позволяет взаимодействовать с местными водителями и турагентами
        туристам, которые хотят получить услугу трнсфера. Таким образом, формируется масса предложеий, из которых
        Вы можете выбрать что-то особенное и индивидуально подходящее. Наша цель-создание качественных информационных продуктов
        для данного сектора услуг.
    Ключевыми особенностями сервиса являются:`,

        firstEl: {
            title: "Индивидуальный подбор маршрута",
            text: "Планируйте собственный маршрут путешествия,\n с возможностью включить в него любое количество\n пунктов, совершая остановки в интересных местах."
        },
        secondEl: {
            title: "Свобода выбора",
            text: "Выбирайте автомобиль с водителем, исходя \n из заданных критериев. Местный водитель-гид \n познакомит Вас с историей и культурой страны."
        },
        thirdEl: {
            title: "Гибкая система оплаты",
            text: "Стоимость поездки расчитывается в зависимости \n от расстояния, типа транспорта и типа топлива.\n Оплата производится по окончанию поездки \n удобным для Вас способом."
        }

    },
    help: {
        h2: "Помощь",
        description: `Общее представление об интерфейсе: для водителей и гидов, путешественников и автопарковю`,

        driverAndGuide: {
            headerText: "Водители и гиды",
            title: [{ text: "Регистрация/поездки/туры", url: "/help-driverAndGuide-0/" }, { text: "Биллинг", url: "/help-driverAndGuide-1/" }, { text: "Партнерская программа", url: "/help-driverAndGuide-2/" }],
            data: [
                [
                    {
                        title: "Регистрация",
                        text: 'Чтобы зарегистрироваться в качестве водителя,\n при регистрации выберите тип пользователя "Водитель". ',
                        src: [{url:registrationDriver}]
                    },
                    {
                        title: "Заполнение профиля",
                        text: 'Войдите в свой профиль. Загрузите фотографию\n и заполните данные о себе.',
                        src: [{url:createProfileInDriver}, {url:createProfileInDriver2}]
                    },
                    {
                        title: "Добавление автомобиля",
                        text: 'В личном кабинете выберите раздел "Автомобиль."\n Добавьте свой автомобиль, заполните данные об автомобиле.',
                        src: [{url:addCarInDriver}, {url:addCarInDriver2}, {url:addCarInDriver3}]
                    },
                    {
                        title: "Настройки поездок",
                        text: 'Укажите город и радиусы, где Вы готовы принимать заказы.\n Составьте свой график приема заказов.',
                        src: [{url:tripsettingInDriver}, {url:tripsettingInDriver2}]
                    },
                    {
                        title: "Добавление туров",
                        text: 'Если Вы являетесь гидом, Вы можете добавить собственные туры.\n Заполните информацию о туре и загрузите фотографи тура.',
                        src: [{url:addTourInDriver}, {url:addTourInDriver2}, {url:addTourInDriver3}, {url:addTourInDriver4}, {url:addTourInDriver5}]
                    }
                ],
                [
                    {
                        title: "Биллинг",
                        text: 'Система биллинга позволяет следить за текущим балансом, Вашего \n лицевого счёта, а также контролировать оплату за пользование системой.',
                        src: [{url:billingDriver}]
                    },
                ],
                [
                    {
                        title: "Партнерская программа",
                        text: ' Текст о партнерской программе и зачем она нужна.\n ',
                        src: [{url:affiliateProgramInDriver}]
                    },
                ]
            ]
        },
        travelers: {
            headerText: "Путешественники",
            title: [{ text: "Как составить маршрут?", url: "/help-travelers-0/" }, { text: "Как забронировать поездку?", url: "/help-travelers-1/" }, { text: "Как связаться с водителем?", url: "/help-travelers-2/" }, { text: "Как отменить бронь?", url: "/help-travelers-3/" }, { text: "Как проходит оплата?", url: "/help-travelers-4/" }],
            data: [
                [
                    { 
                        title: "Как составить маршрут?", 
                        text: 'Укажите маршрут с любым количеством пунктов,\n затем укажите дату отправления',
                        src: [{url:makeRouteUser},{url:makeRouteUser2}]
                    },
                ],
                [
                    { 
                        title: "Как забронировать поездку?", 
                        text: 'Выберите автомобиль с водителем или гидом. Заполните данные в окне заказа.\n Подтвердите Ваш заказ в письме, которое придет Вам на эл. почту.',
                        src: [{url:bookCarUser},{url:bookCarUser2},{url:bookCarUser3}]
                    },
                ],
                [
                    { 
                        title: "Как связаться с водителем?", 
                        text: ' После подтверждения заказа от водителя, Вы получите письмо на эл. почту\n с контактам водителя. Вы сможете связаться с водителем по (Viber, Whatsapp, Telegram, E-mail) ',
                        src: [{url:driverContactUser}]
                    },
                ],
                [
                    { 
                        title: "Как отменить бронь?", 
                        text: 'После заполнения заказа к вам придет письмо на почту,\n где будет две ссылки (детали заказа и кнопка отмены заказа). ',
                        src: [{url:cancelBookUser}]
                    },

                ],
                [
                    { 
                        title: "Как проходит оплата?", 
                        text: 'Оплата происходит с водителе наличными по местной валюте,\n после завершения поездки.',
                        src: [{url:""}]
                    },

                ]
            ]
        },
        travelAgency: {
            headerText: "Автопарки/Турагентство",
            title: [{ text: "Регистрация", url: "/help-travelAgency-0/" }, { text: "Добавление туров", url: "/help-travelAgency-1/" }, { text: "Добавление водителей", url: "/help-travelAgency-2/" }, { text: "Биллинг", url: "/help-travelAgency-3/" }],
            data: [
                [
                    {
                        title: "Регистрация",
                        text: 'Чтобы зарегистрироваться в качестве автопарка/турагентства,\n при регистрации выберите тип пользователя "Автопарки/турагенство". ',
                        src: [{url:registationAgency}]
                    },
                ],
                [
                    {
                        title: "Добавление туров",
                        text: 'Добавляйте свои собственные туры по выбранному вами маршруту.\n Заполните информацию о туре и загрузите фотографии тура.',
                        src: [{url:addToursInAgency}, {url:addToursInAgency2}, {url:addToursInAgency3}, {url:addToursInAgency4}, {url:addToursInAgency5}]
                    },

                ],
                [
                    {
                        title: "Добавление водителей",
                        text: 'Заключайте договоры с водителями и подключайте их в систему. Подключенные водители\n выполняют заказы, которые пришли через сервис. Вы получаете за это оплату на расчетный счет. ',
                        src: [{url:addDriverInAgency}]
                    },
                ],
                [
                    {
                        title: "Билинг",
                        text: 'Система биллинга позволяет следить за текущим балансом, Вашего\n лицевого счета, а также контролировать оплату за пользование системой.',
                        src: [{url:billingAgency}]
                    },
                ]
            ]
        }

    },
    affiliateProgram: {
        h2: "Партнерская программа",
        description1: "Постройте Ваш успешный бизнес и получайте пассивный доход",
        description2: "в размере 20% с поездки от комиссии системы.",
        h3: "Как это работает?",
        arrayEl: {
            firstEl: {
                title: "Приглашайте",
                text: "Рассылайте приглашения со скидкой 10% \n на первую поездку знакомым-путешественникам,\n нажав на кнопку 'Пригласить друга',\n или отправляйте Вашу партнёрскую ссылку."
            },
            secondEl: {
                title: "Получайте доход",
                text: "Приглашайте водителей работать в системе Tripfer, \n и получайте доход от выполненных ими заказов."
            },
            thirdEl: {
                title: "Делитесь",
                text: "Пишите о нас статьи, коментируйте в соц.сетях,\n блогах и форумах, и зарабатывайте. Пожизненно.\n Выплаты на банковскую карту еженедельно."
            }
        },
        arrayFooterEl: {
            firstEl: {
                title: "Ссылка",
                text: "Когда пользователь переходит по Вашей \n ссылке, мы помечаем его устройство \n специальной меткой сроком на 1 год, чтобы \n понять, что он пришел по Вашей рекомендации."
            },
            secondEl: {
                title: "Водитель / Партнер",
                text: "Зарегистрировавшись в системе как водитель или \n партнер, пользователь начнет приносить\n Вам пассивный доход со своей прибыли. \n Чем лучше он работает и чем больше привлекает \n в систему, тем больше Вы получаете."
            },
            thirdEl: {
                title: "Путешественник",
                text: "Зарегистрировавшись как путешественник,\n пользователь приносит Вам доход с каждой \n поездки. Если в течение 1 года был сделан\n заказ без регистрации, Вы также получите\n отчисления на Ваш счёт."
            }
        }
    },
    LicenseAgreement: {
        users: "Пользователи",
        partners: "Партнёры"
    },
    contacts: {
        h2: "Контакты",
        h4: "Обратная связь",
        text: "Оставьте свое сообщение в этой форме, и мы получим его на email и обязательно ответим!",
        firstNamePlaceholder: "Имя",
        messege: "Ваше сообщение",
        buttonSubmit: "Отправить сообщение",
        nameFirm: 'ООО "Трипферком", УНП 193278785',
        h5: "Контакты",
        labelPhone: "Тел:",
        labelSocialNetwork: "Соц.Сети:",
        labelAddress: "Адрес:",
        addressText1: "220015, г.Минск, ул.Янки Мавра,",
        addressText2: "д. 41, офис.410"
    }
}

export default FooterPage;