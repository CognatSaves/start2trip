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
        driverConfirmation:{
            good:{
                header: 'Вы подтвердили заказ!(ENG)',
                header2: ['Всё прекрасно, вы подтвердили поездку(ENG)',
                'За неявку на подтвержденный заказ Вы получаете сразу 3 штрафных балла.(ENG)'],
                toStart: 'На главную(ENG)',
            },
            bad:{
                header: 'Вы действительно хотите отказаться от заказа?(ENG)',
                header2: ['В случае Вашего отказа от поездки Вам будет начислен 1 штрафной балл из 5 возможных.(ENG)',
                'За неявку на подтвержденный заказ Вы получаете сразу 3 штрафных балла.(ENG)'],
                variants: ['Да(ENG)','Нет(ENG)']
            },
            infoBlock: 'По достижении 5 баллов Вы будете навсегда отключены из системы.(ENG)'
        }
    }
    
    export default drivers;
