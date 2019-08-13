const drivers = {
        lang: 'ENG',
        mainPage: {
            routeText: ['Маршрут(ENG)',', предложения водителей(ENG)'],
            countryText: ', предложения водителей(ENG)',
            loadingText: 'Ожидайте загрузки предложений водителей(ENG)'
        },
        driversBlock: {
            title: "Карточка водителя и его авто, стоимость Вашей поездки(ENG)",
            tripParams:{
                routeText: 'Ваш маршрут(ENG)',
                timeParam: 'Время в пути(ENG)',
                lengthParam: 'Длина пути(ENG)'
            },
            detailed: 'More',
            languages: 'Languages ​',
            carCapacity: 'places',
            comments: 'review (s)',
            commentary: 'The cost is final. Fuel included.',
            book: 'BOOK'
        },
        driversProperties: {
            characteristic: 'Sort by',
            sortText: 'Sort',
            sortMenuVariants: ["Price", "Popularity", "Rating"],
            filterText: 'Filter',
            anyLanguage: 'Any language',
            anyCar: 'Any car',
            person: 'person',
            upTo: 'up to',
            peopleMenu: {
                adults: 'Adults',
                children: 'Children',
                childrenProps: 'from 2 to 12 years',
                cancel: 'Cancel',
                done: 'Done'
            }
        },
        messageEror:{
            noElementsText: 'Мы искали даже на Марсе, но ничего не нашли.\n Попробуйте изменить условия поиска.'
        },
    }
    
    export default drivers;
