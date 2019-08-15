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
                {
                    userText: "Car park/Agency   "
                }
            ]
        },
        registrationAnswer: [
            "Success",
            "Email is already registered",
            "", // imposible to find the root role
            "Sending request",
            "", // refused confirmation
            "",
            "6 answer new",
            "7 answer new",
            "",
            "",//social network
            "",
            "", //?
            "", //?
            "",
            "", // password is always created
            "", //?
            "",
            "", // refused confirmation
            "", // cannot be sent without password
            "", // cannot be sent without mail
        ],
        registrationProcess: [
            "Registration is in progress"
        ]
    }
    export default pageTextInfo;