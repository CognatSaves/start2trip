const pageTextInfo = {
    lang: ["RUS","ENG"],
    sitingInDarkBackgroundText: { 
        titleSitingIn: ["Войти в аккаунт","Log in"],
        sitingInFirstText: ["С возвращением!","Greetings"], 
        sitingInSecondText: ["Пожалуйста, введите свои данные.","?(Please, enter your data)"], 
        buttonText: ["ВОЙТИ","LOG IN"] 
    },
    sitingInLightBackgroundText: { 
        titleSitingIn: ["Войти в аккаунт", "Log in"], 
        sitingInFirstText: ["Через социальные сети", "Through social networks"], 
        sitingInSecondText: ["или используйте Ваш email для входа","????(or use your email to login)"], 
        firstInputPlaceholderText: ["Имя","Name"],
        secondInputPlaceholderText: ["Email","Email"],
        linkText: ["Забыли пароль?","Forgot your password?"], 
        buttonText: ["ВОЙТИ","LOG IN"],
        mobailbuttonText: ["Войти","Log in"],
        mobailText:["Уже есть аккаунт?","Already have an account?"]
    },

    registrationDarkBackgroundText: { 
        registrationTitle: ["Добро пожаловать!","Greetings!"], 
        registrationFirstText: ["Введите свои персональные данные","Enter your personal data"], 
        registrationSecondText: ["и начинайте путешествие вместе с нами!","and start the journey with us!"], 
        buttonText: ["РЕГИСТРАЦИЯ","REGISTRATION"],
        mobailbuttonText: ["Зарегистрироваться","Sign up"],
        mobailText:["Нет аккаунта?","No account?"] 
    },
    registrationLightBackgroundText: { 
        registrationTitle: ["Создать аккаунт","Create account"], 
        registrationFirstText: ["Через социальные сети","Through social networks"], 
        registrationSecondText: ["или используйте Ваш email для регистрации","????(or use your email for registration)"], 
        thirdInputPlaceholderText: ["Пароль","Password"],  
    },
    registrationUserType:{
        userTypeText: ["Выберите тип пользователя","Select user type"],
        userTypeTextError: ["Сделайте выбор","Make a choice"],
        buttonNext:["Далее","Next"],
        buttonReturn:["Назад","Return"],
        userTypes:[
            {
                userText: ["Путешественник","Traveller"]
            },
            {
                userText: ["Водитель","Driver"]
            },
            {
                userText: ["Автопарк/турагентство","Car park/travel agency"]
            }
        ]
    },
    registrationAnswer:[
        ["Успешно","Success"],
        ["Почта уже занята","Email is already occupied"],
        ["Аккаунт имеет неопознанный статус","Аккаунт имеет неопознанный статус(ENG)"],//imposible to find the root role 
        ["Слишком много знаков $ в пароле","Sending request"],
        ["Подтвердите ваш аккаунт","Подтвердите ваш аккаунт(ENG)"],//отказались от подтверждения
        ["Регистрация временно запрещена","Регистрация временно запрещена(ENG)"],
        ["Аккаунта с такой почтой не существует","Аккаунта с такой почтой не существует(ENG)"],
        ["По этой почте аккаунт уже создан","По этой почте аккаунт уже создан(ENG)"],
        ["Токен подтверждения некорректен","Токен подтверждения некорректен(ENG)"],
        ["Данный оператор сейчас не доступен","Данный оператор сейчас не доступен(ENG)"],//соцсети
        ["Пароль некорректен","Пароль некорректен(ENG)"],
        ["Предоставлены некорректные параметры","Предоставлены некорректные параметры(ENG)"],//?
        ["Предоставле некорректный код","Предоставле некорректный код(ENG)"],//?
        ["Почта или пароль некорректны","Почта или пароль некорректны(ENG)"],
        ["Локальный пароль не создан. Авторизуйтесь через соцсеть","Локальный пароль не создан. Авторизуйтесь через соцсеть(ENG)"],//пароль создается всегда
        ["Вы не администратор","Вы не администратор(ENG)"],//?
        ["Аккаунт заблокирован","Аккаунт заблокирован(ENG)"],
        ["Подтвердите ваш аккаунт","Подтвердите ваш аккаунт(ENG)"],//отказались от подтверждения
        ["Вставьте пароль","Вставьте пароль(ENG)"],//невозможно отправить без пароля
        ["Вставьте почту","Вставьте почту(ENG)"],//невозможно отправить без почты
    ],
    registrationProcess:[
        ["Запрос отправляется", "Request is sending"]
    ]
}
export default pageTextInfo;
