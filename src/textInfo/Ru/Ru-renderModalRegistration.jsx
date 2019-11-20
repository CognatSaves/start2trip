const pageTextInfo = {
    lang: "RUS",
    sitingInDarkBackgroundText: { 
        titleSitingIn: "Войти в аккаунт",
        sitingInFirstText: "С возвращением!", 
        sitingInSecondText: "Пожалуйста, введите свои данные.", 
        buttonText: "ВОЙТИ"
    },
    sitingInLightBackgroundText: { 
        titleSitingIn: "Войти в аккаунт", 
        sitingInFirstText: "Через социальные сети", 
        sitingInSecondText: "или используйте Ваш email для входа", 
        firstInputPlaceholderText: "Имя",
        secondInputPlaceholderText: "Email",
        linkText: "Забыли пароль?", 
        buttonText: "ВОЙТИ",
        mobailbuttonText: "Войти",
        mobailText:"Уже есть аккаунт?",
        agreementLabel:"Принимаю условия ",
        agreementLink:" соглашения",
    },

    registrationDarkBackgroundText: { 
        registrationTitle: "Добро пожаловать!", 
        registrationFirstText: "Введите свои персональные данные", 
        registrationSecondText: "и начинайте путешествие вместе с нами!",
        buttonText: "РЕГИСТРАЦИЯ",
        mobailbuttonText: "Зарегистрироваться",
        mobailText:"Нет аккаунта?" 
    },
    registrationLightBackgroundText: { 
        registrationTitle: "Создать аккаунт", 
        registrationFirstText: "Через социальные сети", 
        registrationSecondText: "или используйте Ваш email для регистрации", 
        thirdInputPlaceholderText: "Пароль",  
    },
    registrationUserType:{
        userTypeText: "Выберите тип пользователя",
        userTypeTextError: "Сделайте выбор",
        buttonNext:"Далее",
        buttonClose:"Закрыть",
        buttonReturn:"Назад",
        userTypes:[
            {
                userText: "Путешественник"
            },
            {
                userText: "Водитель/Гид"
            },
            {
                userText: "Автопарк/турагентство"
            }
        ]
    },
    registrationAnswer:[
        "Успешно",
        "Почта уже занята",
        "Аккаунт имеет неопознанный статус",//imposible to find the root role 
        "Слишком много знаков $ в пароле",
        "Подтвердите ваш аккаунт",//отказались от подтверждения
        "Регистрация временно запрещена",
        "Аккаунта с такой почтой не существует",
        "По этой почте аккаунт уже создан",
        "Токен подтверждения некорректен",
        "Данный оператор сейчас не доступен",//соцсети
        "Пароль некорректен",
        "Предоставлены некорректные параметры",//?
        "Предоставлен некорректный код",//?
        "Почта или пароль некоррректны",
        "Локальный пароль не создан. Авторизуйтесь через соцсеть",//пароль создается всегда
        "Вы не администратор",//?
        "Аккаунт заблокирован",
        "Подтвердите ваш аккаунт",//отказались от подтверждения
        "Вставьте пароль",//невозможно отправить без пароля
        "Вставьте почту",//невозможно отправить без почты
    ],
    registrationProcess:[
        "Запрос отправляется"
    ],
}
export default pageTextInfo;