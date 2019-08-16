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
            title: ['Водитель ',' | Автомобиль ','| Информация о поездке'],
           
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
            title: ['Как добраться из',' | Заказать трансфер онлайн, выгода до 40%'],
            description: "Tripfer in drivers" 
        },
        country: {//выбрана только страна
            title: ', предложения водителей',
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
            title: ['Экскурсии, идеи маршрутов по ', ' | Трансферы по Вашему индивидаульному маршруту'],
            description: "Построение маршрутов на сайте tripfer.com"
        }
        /*,
        это как loading, но по другому называется
        basic: {
            title: ['Экскурсии из ', ' | Трансферы от местных жителей к достопримечательностям'],
            description: "Tripfer, построение маршрутов"
        }*/
    },
    homeBodyBottom: {
        basic: {
            title: ['Экскурсии из ',' | Трансферы от местных жителей к достопримечательностям'],
            description: ", маршруты, отзывы, оценки"
        }
    },
    placeDescription: {
        object: {//когда загружено
            title: ', как добраться | Режим работы, стоимость билетов | Отзывы туристов',
            description:', описание, оценки, отзывы'
        }
    },
    places: {
        direction: {//когда выбрано направление
            title: ': достопримечательности | Интересные места и отзывы туристов | Заказ трансферов онлайн',
            description: ', достопримечательности, оценки'
        },
        country: {//стандартно - только страна
            title: ': достопримечательности, отзвывы туристов | Заказ трансферов онлайн',
            description: ', достопримечательности, оценки'
        },
    },
    accountRedirector: {
        object: {//когда загружено акк
            title: "Ваш аккаунт на Tripfer",
            description: "Ваш аккаунт на Tripfer"
        }
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
            title: ' | Заказать трансфер онлайн, описание и отзывы туристов',
            description: ', описание, оценки, отзывы'
        }
    },
}
export default helmets;