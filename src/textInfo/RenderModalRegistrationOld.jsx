const pageTextInfo = {
    lang: ["RUS","ENG"],
    sitingInDarkBackgroundText: { 
        titleSitingIn: ["Войти в аккаунт","Log in"],
        sitingInFirstText: ["С возвращением!","Greetings"], 
        sitingInSecondText: ["Пожалуйста, введите логин и пароль, чтобы войти.","(Please, enter your login and password to enter)"], 
        buttonText: ["ВОЙТИ","LOG IN"] 
    },
    sitingInLightBackgroundText: { 
        titleSitingIn: ["Войти в аккаунт", "Log in"], 
        sitingInFirstText: ["Войти через социальные сети", "Enter with social networks"], 
        sitingInSecondText: ["или используйте Ваш email для входа","(or use your email to continue)"], 
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
        buttonText: ["РЕГИСТРАЦИЯ","REGISTRATION"] ,
        mobailbuttonText: ["Зарегистрироваться","To register"],
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
        ["Аккаунт имеет неопознанный статус",""],//imposible to find the root role 
        ["Слишком много знаков $ в пароле","Sending request"],
        ["Подтвердите ваш аккаунт",""],//отказались от подтверждения
        ["Регистрация временно запрещена",""],
        ["Аккаунта с такой почтой не существует","6 answer new"],
        ["По этой почте аккаунт уже создан","7 answer new"],
        ["Токен подтверждения некорректен",""],
        ["Данный оператор сейчас не доступен",""],//соцсети
        ["Пароль некорректен",""],
        ["Предоставлены некорректные параметры",""],//?
        ["Предоставле некорректный код",""],//?
        ["Почта или пароль некоррректны",""],
        ["Локальный пароль не создан. Авторизуйтесь через соцсеть",""],//пароль создается всегда
        ["Вы не администратор",""],//?
        ["Аккаунт заблокирован",""],
        ["Подтвердите ваш аккаунт",""],//отказались от подтверждения
        ["Вставьте пароль",""],//невозможно отправить без пароля
        ["Вставьте почту",""],//невозможно отправить без почты
    ],
    registrationProcess:[
        ["Запрос отправляется", "Request is sending"]
    ]
}
export default pageTextInfo;