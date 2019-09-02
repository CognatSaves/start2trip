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
            "Unknown status of account", // imposible to find the root role
            "Sending request",
            "Confirm your account", // refused confirmation
            "Registration is prohibited temporarily",
            "There`s no an account with this email",
            "An account has already been created by this mail",
            "Confirmation token is incorrect",
            "Selected social network or operator is not available temporarily",//social network
            "Wrong password",
            "Incorrect parameters provided", //?
            "Incorrect code provided", //?
            "Email or password is incorrect",
            "Local password not created. Log in via social network.", // password is always created
            "You`re not an administrator", //?
            "Account blocked",
            "Confirm your account", // refused confirmation
            "Enter password", // cannot be sent without password
            "Enter email", // cannot be sent without mail
        ],
        registrationProcess: [
            "Registration is in progress"
        ]
    }
    export default pageTextInfo;