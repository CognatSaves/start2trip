const pageTextInfo = {
        lang: "ENG",
        sitingInDarkBackgroundText: {
            titleSitingIn: "Log in",
            sitingInFirstText: "Welcome",
            sitingInSecondText: "Enter your login and password",
            buttonText: "LOG IN"
        },
        sitingInLightBackgroundText: {
            titleSitingIn: "Log in",
            sitingInFirstText: "With social networks",
            sitingInSecondText: "or use your email to login",
            firstInputPlaceholderText: "Name",
            secondInputPlaceholderText: "Email",
            linkText: "Forgot your password?",
            buttonText: "Log in",
            mobailbuttonText: "Log in",
            mobailText: "Already have an account?",
            agreementLabel:"I accept the ",
            agreementLink:" terms",
        },
    
        registrationDarkBackgroundText: {
            registrationTitle: "Welcome!",
            registrationFirstText: "Sign up in 1 minute",
            registrationSecondText: "and start the journey with us!",
            buttonText: "Sign up",
            mobailbuttonText: "Sign up",
            mobailText: "Has no account?"
        },
        registrationLightBackgroundText: {
            registrationTitle: "Create an account",
            registrationFirstText: "With social networks",
            registrationSecondText: "or use your email for registration",
            thirdInputPlaceholderText: "Password",
        },
        registrationUserType: {
            userTypeText: "Select an account type",
            userTypeTextError: "Make a choice",
            buttonNext: "Next",
            buttonReturn: "Return",
            userTypes: [
                {
                    userText: "Traveler"
                },
                {
                    userText: "Driver"
                },
                /*{
                    userText: "Car park/Agency   "
                }*/
            ]
        },
        registrationAnswer: [
            "Success",
            "Email is already registered",
            "Аккаунт имеет неопознанный статус(ENG)", // imposible to find the root role
            "Sending request",
            "Подтвердите ваш аккаунт(ENG)", // refused confirmation
            "Регистрация временно запрещена(ENG)",
            "Аккаунта с такой почтой не существует(ENG)",
            "По этой почте аккаунт уже создан(ENG)",
            "Токен подтверждения некорректен(ENG)",
            "Данный оператор сейчас не доступен(ENG)",//social network
            "Пароль некорректен(ENG)",
            "Предоставлены некорректные параметры(ENG)", //?
            "Предоставлен некорректный код(ENG)", //?
            "Почта или пароль некорректны(ENG)",
            "Локальный пароль не создан. Авторизуйтесь через соцсеть(ENG)", // password is always created
            "Вы не администратор(ENG)", //?
            "Аккаунт заблокирован(ENG)",
            "Подтвердите ваш аккаунт(ENG)", // refused confirmation
            "Вставьте пароль(ENG)", // cannot be sent without password
            "Вставьте почту(ENG)", // cannot be sent without mail
        ],
        registrationProcess: [
            "Registration is in progress"
        ]
    }
    export default pageTextInfo;