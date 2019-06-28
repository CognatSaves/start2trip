const pageTextInfo = {
    lang: "ENG",
    sitingInDarkBackgroundText: { 
        titleSitingIn: "Log in",
        sitingInFirstText: "Greetings", 
        sitingInSecondText: "?(Please, enter your data)", 
        buttonText: "LOG IN" 
    },
    sitingInLightBackgroundText: { 
        titleSitingIn: "Log in", 
        sitingInFirstText: "Through social networks", 
        sitingInSecondText: "????(or use your email to login)", 
        firstInputPlaceholderText: "Name",
        secondInputPlaceholderText: "Email",
        linkText:"Forgot your password?", 
        buttonText: "LOG IN",
        mobailbuttonText: "Log in",
        mobailText:"Already have an account?"
    },

    registrationDarkBackgroundText: { 
        registrationTitle: "Greetings!", 
        registrationFirstText: "Enter your personal data", 
        registrationSecondText: "and start the journey with us!", 
        buttonText: "REGISTRATION",
        mobailbuttonText: "Sign up",
        mobailText:"No account?" 
    },
    registrationLightBackgroundText: { 
        registrationTitle: "Create account", 
        registrationFirstText: "Through social networks", 
        registrationSecondText: "????(or use your email for registration)", 
        thirdInputPlaceholderText: "Password",  
    },
    registrationUserType:{
        userTypeText: "Select user type",
        userTypeTextError: "Make a choice",
        buttonNext:"Next",
        buttonReturn:"Return",
        userTypes:[
            {
                userText: "Traveller"
            },
            {
                userText: "Driver"
            },
            {
                userText: "Car park/travel agency"
            }
        ]
    },
    registrationAnswer:[
        "Success",
        "Email is already occupied",
        "",//imposible to find the root role 
        "Sending request",
        "",//отказались от подтверждения
        "",
        "6 answer new",
        "7 answer new",
        "",
        "",//соцсети
        "",
        "",//?
        "",//?
        "",
        "",//пароль создается всегда
        "",//?
        "",
        "",//отказались от подтверждения
        "",//невозможно отправить без пароля
        "",//невозможно отправить без почты
    ],
    registrationProcess:[
        "Request is sending"
    ]
}
export default pageTextInfo;
