const home = {
    lang: "RUS",
    loading: 'Загрузка',
    home:{
        homeTextFirstLine: "Cпланируйте свою поездку",
        homeTextSecondLine: ["Предложения от местных водителей и гидов по вашему индивидуальному маршруту. "," Стоимость будет ниже средней по рынку на 30-40%"],
        changeBodyBlock:{
            left: "СПИСОК",
            right: "КАРТА"
        },
        homeBottomNewText:{
            h3:["Собираетесь в путешествие, но не знаете куда поехать?","Где найти туры и экскурсии по выгодным ценам?"],
            p:[
            "Постройте свой собственный маршрут по стране согласно Вашему индивидуальному маршруту.",
            "Укажите любое количество остановок, выбирайте дату и смотрите предложения от местных водителей и гидов.",
            "Если вы не смогли определиться с маршрутом, не переживайте!",
            "Мы отобрали для Вас ",
            "готовые идеи маршрутов по стране",
            " туры от профессиональных гидов",
            " и ",
            "интересные места.",
        ]
        },
        look:"Смотреть",
        renderArray:{
            first:{
                title:"Готовые идеи маршрутов",
                text:"Готовые однодневные маршруты для самостоятельных путешествий."
            },
            second:{
                title:"Туры от профессиональных гидов",
                text:"Выбирайте готовые спланированные туры по стране вместе с профессиональным гидом"
            },
            third:{
                title:"Гиды",
                text:"База профессиональных гидов, говорящих с Вами на одном языке."
            },
            fourth:{
                title:"Интересные места",
                text:"Рейтинг основан на мнениях путешественников и местных жителей."
            }
        }
    },
    homeBottom:{
        homePopularPlaces: {
            popularPlacesTitle: 'Готовые маршруты из',
            cancel: 'Отменить',
            morePics: 'ещё'
        },
        routeListElement: {
            detailed: 'Подробнее',
            comments: 'отзывов',
            from: 'Из',
            excursions: 'Экскурсий'
        }
    },
    homeBodyBottom:{
        homeBottomHeader: 'ПУТЕШЕСТВИЯ С TRIPFER',
        homeBottomTitle: [
            "Маршрут",
            'Дата отправления',
            'Предложения',
            'Наслаждайтесь поездкой'
        ],
        homeBodyText:[
            'Стройте свой собственный маршрут путешествия, с возможностью включить в него известные достопримечательности.',
            'Подбирайте удобную для Вас дату поездки.',
            'Выбирайте из предложенного списка местного водителя-гида, который охотно познакомит Вас со страной изнутри.',
            'По Вашему запросу водитель сделает остановку в любом месте для фото или видео съемки, посещения достопримечательности.'
        ],
        homeBottomLinks:[
            {
                title:"ПОПУЛЯРНЫЕ МЕСТА",
                link:"ПЕРЕЙТИ К МЕСТАМ"
            },
            {
                title:"ОРГАНИЗОВАННЫЕ ТУРЫ",
                link:"ПЕРЕЙТИ К ТУРАМ"
            },
        ],
        homeSubscribe:{
            newsletter:"Новостная рассылка",
            newsletterInfo:"Новости, скидки, распродажи, конкурсы и немного искусства:",
            subscribe: "ПОДПИСАТЬСЯ",
            subscribeInfo:[
                "Нажимая 'Подписаться', Вы соглашаетесь с правилами",
                'использования сервиса',
                'и',
                'обработки персональных данных.',
            ]
        }
    },
    firstEnterModal:{
        skipButton: "Пропустить",
        slides:[
            {
                name: "Маршрут",
                info:"Стройте свой собственный маршрут путешествия, с возможностью включить в него известные достопримечательности."
            },
            {
                name:"Дата отправления",
                info:"Подберите удобную для Вас дату поездки.",
            },
            {
                name: "Предложения",
                info:"Выберите из предложенного списка местного водителя-гида, который охотно познакомит Вас со страной."
            },
            {
                name:"Наслаждайтесь поездкой",
                info:"По Вашему запросу водитель сделает остановку в любом месте для фото или видео съемки, посещения достопримечательностей.",
            },
        ]
    },
    homeBody:{
        mobileRouteMenuTitle: "Cпланируйте свою поездку",
        mobileRouteMenuText:{
            firstLine: "Предложения от местных водителей и гидов",
            secondLine:"по вашему индивидуальному маршруту",
            thirdLine:"Стоимость будет ниже средней по рынку на 30-40%"
        },
        changeMapList:{
            first: "Список",
            second: "Карта"
        }
    },
    renderFourEl:{
        from:"от",
        moreInfo:"Подробнее"
    },
    routeMenu:{
        locationSearchPlaceholder:{
            first: "Куда, выберите место",
            second: "Откуда, выберите место"
        },
        removePointText:"Удалить этот пункт назначения",
        addPointText:"Добавить пункт назначения",
        datePickerText:"Дата отправления",
        bookTripText:"ЗАБРОНИРОВАТЬ ПОЕЗДКУ",
        searchText:"ПОИСК",
        infoText:{
            first:"*Возврат в точку отправления в этот же день бесплатно",
            second:"Стоимость окончательная. Топливо включено"
        },
        km: 'км',
        days: 'дн.',
        hours: 'ч.',
        minutes: 'мин.'
    },
    pageNotFound:{
        title:"Страница не найдена",
        text1:"Мы искали даже на Марсе,",
        text2:"но ничего не нашли.",
        text3:'Попробуйте изменить условия поиска.',
        link:"Вернуться на главную.",
        loading:"Идёт загрузка",
    },

};

export default home;