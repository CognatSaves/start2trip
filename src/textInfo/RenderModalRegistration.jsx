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

    },

    registrationDarkBackgroundText: { 
        registrationTitle: ["Добро пожаловать!","Welcome!"], 
        registrationFirstText: ["Зарегистрируйтесь на сайте","Sign up with your login and password"], 
        registrationSecondText: ["и начинайте путешествие вместе с нами!","and start the journey with us!"], 
        buttonText: ["РЕГИСТРАЦИЯ","REGISTRATION"] 
    },
    registrationLightBackgroundText: { 
        registrationTitle: ["Создать аккаунт","Sign up for Tripfer"], 
        registrationFirstText: ["Регистрация через социальные сети","Continue with social networks"], 
        registrationSecondText: ["или используйте Ваш email для регистрации","(or use your email for registration)"], 
        thirdInputPlaceholderText: ["Пароль","Password"],  
    },
    registrationUserType:{
        userTypeText: ["Выберите тип аккаунта","Select account type"],
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
                userText: ["Партнер","Partner"]
            }
        ]
    },
    registrationAnswer:[
        ["Успешно","Success"],
        ["Почта уже занята","Email is already registered"],
        ["Аккаунт имеет неопознанный статус","Undifined Account status"],//imposible to find the root role 
        ["Слишком много знаков $ в пароле","Too much $ in password"],
        ["Подтвердите ваш аккаунт","Confirm your account"],//отказались от подтверждения
        ["Регистрация временно запрещена","Registration is temporally unavailable"],
        ["Аккаунта с такой почтой не существует","Email not exist"],
        ["По этой почте аккаунт уже создан","This email is already registered"],
        ["Токен подтверждения некорректен","Incorrect token"],
        ["Данный оператор сейчас не доступен","Social provider error"],//соцсети
        ["Логин или пароль введены неверно","Incorrect login or password"],
        ["Предоставлены некорректные параметры","Incorrect parameters"],//?
        ["Предоставле некорректный код","Incorrect code"],//?
        ["Почта или пароль введены неверно","Incorrect login or password"],
        ["Локальный пароль не создан. Авторизуйтесь через соцсеть","Registration error. Contunue with social networks"],//пароль создается всегда
        ["Вы не администратор","insufficient rights"],//?
        ["Аккаунт заблокирован","Account has been blocked"],
        ["Подтвердите ваш аккаунт","Confirm your email"],//отказались от подтверждения
        ["Вставьте пароль","Enter your password"],//невозможно отправить без пароля
        ["Вставьте почту","Enter your email"],//невозможно отправить без почты
    ],
    registrationProcess:[
        ["Регистрируем Вас", "Registration in process"]
    ]
}
export default pageTextInfo;

