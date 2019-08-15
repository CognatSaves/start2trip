const helmets /*helmetStorage - aka armory */ = {
    lang: 'RUS',
    driverConfirmation: {
        basic: {
            title: 'Подтверждение поездки',
            description: 'Подтверждение поездки'
        }
    },
    driverProfile: {
        basic: {
            title: "Tripfer driverProfile",
            description: "Tripfer driverProfile" 
        }
    },
    tripConfirmation: {
        basic: {
            title: "Подтверждение заказа",
            description: "Подтверждение заказа"
        }
    },
    drivers: {
        route: {//когда выбран маршрут
            title: ['Маршрут',', предложения водителей'],
            description: "Tripfer in drivers" 
        },
        country: {//выбрана только страна
            title: ', предложения водителей',
            description: "Tripfer in drivers"
        },
        loading: {
            title: 'Ожидайте загрузки предложений водителей',
            description: "Tripfer in drivers"
        }
    },
    aboutService: {
        basic: {
            title: 'О сервисе',
            description: "О сервисе tripfer.com"
        }
    },
    affiliateProgram: {
        basic: {
            title: 'Нашим партнёрам',
            description: "Нашим партнёрам"
        }
    },
    contacts: {
        basic: {
            title: 'Наши контакты',
            description: 'Наши контакты'
        }
    },
    licenseAgreement: {
        basic: {
            title: 'Лицензионное соглашение',
            description: 'Лицензионное соглашение'
        }
    },
    home: {
        country: {//когда страна загрузилась
            title: ", построение маршрутов",
            description: "Построение маршрутов на сайте tripfer.com"
        },
        basic: {
            title: "Tripfer, построение маршрутов",
            description: "Tripfer, построение маршрутов"
        }
    },
    homeBodyBottom: {
        basic: {
            title: ", маршруты, отзывы, оценки",
            description: ", маршруты, отзывы, оценки"
        }
    },
    placeDescription: {
        object: {//когда загружено
            title: ', описание, оценки, отзывы',
            description:', описание, оценки, отзывы'
        },
        loading: {//когда загружается
            title: "Ожидаем загрузку достопримечательности",
            description: "Ожидаем загрузку достопримечательности"
        },
    },
    places: {
        loading: {//когда загружается - до getLocals
            title: "Tripfer, достопримечательности, оценки",
            description: "Tripfer, достопримечательности, оценки"
        },
        direction: {//когда выбрано направление
            title: ', достопримечательности, оценки',
            description: ', достопримечательности, оценки'
        },
        country: {//стандартно - только страна
            title: ', достопримечательности, оценки',
            description: ', достопримечательности, оценки'
        },
    },
    accountRedirector: {
        object: {//когда загружено акк
            title: "Ваш аккаунт на Tripfer",
            description: "Ваш аккаунт на Tripfer"
        },
        loading: {//когда загружается акк
            title: "Загрузка Вашего аккаунта на Tripfer",
            description: "Загрузка Вашего аккаунта на Tripfer"
        },
    },
    authModalCountry: {
        basic: {
            title: "Выберите интересующий Вас регион",
            description: "Выберите интересующий Вас регион"
        }
    },
    authRedirect: {
        basic: {
            title: 'Авторизация',
            description: 'Авторизация'
        }
    },
    forgotPassword: {
        basic: {
            title: 'Восстановление пароля',
            description:'Восстановление пароля'
        }
    },
    registration: {
        basic: {
            title:'Регистрация',
            description: 'Регистрация'
        }
    },
    resetPassword: {
        basic: {
            title: 'Введите новый пароль',
            description: 'Введите новый пароль'
        }
    },
    routeDescription: {
        basic: {//загружено
            title: ', описание, оценки, отзывы',
            description: ', описание, оценки, отзывы'
        },
        loading: {//Ожидаем загрузку маршрута
            title: "Ожидаем загрузку маршрута",
            description: "Ожидаем загрузку маршрута"
        }
    },
}
export default helmets;