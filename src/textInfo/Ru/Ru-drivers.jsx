const drivers = {
    lang: 'RUS',
    mainPage: {
        routeText: ['Маршрут',', предложения водителей'],
        countryText: ', предложения водителей',
        loadingText: 'Ожидайте загрузки предложений водителей'
    },
    driversBlock:{
        title: "Карточка водителя и его авто, стоимость Вашей поездки",
        tripParams:{
            routeText: 'Ваш маршрут',
            timeParam: 'Время в пути',
            lengthParam: 'Длина пути'
        },
        detailed: 'Подробнее',
        languages: 'Языки',
        carCapacity: 'мест(а)',
        comments: 'отзыва(ов)',
        commentary: 'Стоимость окончательная. Топливо включено.',
        book: 'ЗАБРОНИРОВАТЬ'
    },
    driversProperties:{
        characteristic: 'Сортировать по',
        sortText: 'Сортировать',
        sortMenuVariants: ["Цене", "Популярности", "Рейтингу"],
        filterText: 'Фильтр',
        anyLanguage: 'Любой язык',
        anyCar: 'Любой автомобиль',
        person: 'человек',
        upTo: 'до',
        peopleMenu:{
            adults: 'Взрослые',
            children: 'Дети',
            childrenProps: 'от 2 до 12 лет',
            cancel: 'Отмена',
            done: 'Готово'
        }   
    },
    messageEror:{
        noElementsText: 'Мы искали даже на Марсе, но ничего не нашли.\n Попробуйте изменить условия поиска.'
    },
}

export default drivers;