let userProfile = {
    lang: 'ENG',
    userProfileNavigation: {
        navigationText: ["My trips", "Profile", "My Cars", "Travel settings", // "Tours",
            "Reviews", "Settings", "Billing", "Affiliate program"
        ],
        updatePhoto: "Upload Photo",
        totalTrips: {
            first: "Total",
            last: "Trips",
            full: "Total Trips"
        },
        starsReviews: "reviews",
        upcomingTrips: {
            first: "Upcoming",
            last: "trips",
            full: "Upcoming Trips"
        },
        penalty: {
            first: 'Penalty',
            last: 'points',
            full: 'Penalty Points'
        }
    },
    userProfileBasicInformation: {
        telflag: "en",
        titlePage: "Edit Profile",
        firstName: {
            floatingLabelText: "Name",
            description: "Yor name displaying in your public profile. When a client makes a trip, they will see your first and last name"
        },
        lastName: {
            floatingLabelText: "Last Name",
            description: "<empty>"
        },
        basicInfoBirthday: {
            floatingLabelText: "Date of birth",
            description: "We use this data for analysis only and never share it with anyone"
        },
        basicInfoNumber: {
            floatingLabelText: "Passport number",
            description: "Nbody can access your passport number information except Tripfer. We need it to make payments and conclude an agreement"
        },
        basicInfoDay: {
            floatingLabelText: "Passport Issue Date",
            description: ""
        },
        basicInfoLocation: {
            label: "City",
            description: "Indicate the city where you live. This will help us more efficiently distribute travel orders"
        },
        basicInfoTelNumber: {
            label: "Work Phone",
            description: "Customers and Tripfer representatives could contact you at this number. We will send you travel requests, reminders and other notifications"
        },
        basicInfoLanguage: {
            label: "Languages",
            description: "Choose the languages ​​you speak. This information will help you find a common language for communication with the customer"
        },
        MenuItem: {
            value: "Select Languages"
        },
        basicInfoMultiLine: {
            floatingLabelText: "About Me",
            description: "Tell us about your interests: what 5 things you can’t live without? Or how do you like to receive guests? etc."
        },
        buttonSubmit: {
            text: "Save Changes"
        }

    },
    userProfileBilling: {
        billingModalHeader: 'Доступно к выводу(ENG)',
        billingModalContent:{
            summLabel: 'Сумма USD(ENG)',
            cardNumber: 'Номер карты(ENG)',
            cardType: 'Тип карты(ENG)',
            cancel: 'Отмена(ENG)',
            submit: 'Вывод средств(ENG)'
        },
        billingBody:{
            title: 'Текущий баланс (Лицевой счет № (ENG)',
            partnersProfit: 'Партнерские начисления(ENG)',
            payedprofit: 'Выведено всего(ENG)',
            summary: 'Всего на счету(ENG)',
            submit: 'Вывод средств(ENG)'
        },       
    },
    userProfileRegistration: {
        loading: 'Загрузка(ENG)'
    },
    userProfileTravelHistory: {
        drivercar: 'Водитель и автомобиль(ENG)',
        comments: 'отзывов(ENG)',
        passengerNumber: 'Количество человек(ENG)',
        startPlace: 'Место встречи(ENG)',
        price: 'Стоимость поездки(ENG)',
        startFact: 'Начало поездки(ENG)',
        notStart: 'Поездка не была начата(ENG)',
        endFact: 'Окончание поездки(ENG)',
        notEnd: 'Поездка не была закончена(ENG)'
    },
    userProfileSettings: {
        settingsBodyTitle: "Profile Settings",
        sittingsEmail: {
            floatingLabelText: "Email",
            description: "The email address is the login in the system and need to recieve notifications of orders, news. And is a means of contacting customer support. Cannot be changed"
        },
        ContentPasswordText: "Password",
        sittingsCurrentPassword: {
            floatingLabelText: "Current password",
            description: "To change the password or phone number, you must enter your current password"
        },
        sittingsNewPassword: {
            floatingLabelText: "New password",
            description: "Must be at least 6 characters and contain latin letters and numbers"
        },
        sittingsConfirmPassword: {
            floatingLabelText: "Confirm Password",
            description: "Enter the password again"
        },
        sittingsPhoneNumber: {
            label: "Phone",
            description: "This phone is not accessible to anyone and serves as a backup means of communication with Tripfer Administrations",
            telflag: "ru"
        },
        sittingsSaveBt: "SAVE CHANGES",
        unsubscribeButton: {
            mailing: {
                unsubscribe: "Unsubscribe from the newsletter",
                subscribe: "Subscribe to the Newsletter"
            },
            message: "As a result of unsubscribing, you will no longer receive messages from Tripfer"
        } 
    },
    userProfileAffiliateProgram: {
        affiliateProgramsTitle: "Affiliate Program",
        affiliateProgramsDescription: "Build your successful business and get passive income of 14% from the system commission of the trip. Send out invitations with a 15% discount on the first trip to your friends. Invite drivers work in Tripfer and get income from the orders they fulfill. Write articles about us, comment on social networks, blogs and forums, and earn money. For life. Payments to a bank card weekly. ",
        affiliateLinks: {
            title: "Your affiliate links",
            registrationLink: "Registration Link",
            linkToHomePage: "Link to the home page",
            spanLink: "Copy"
        },
        promotionalMaterials: "Promotional Materials",
        questionicon: "Charges never end. The more referrals you have, and the better they work - the more you get every day",
        peopleicon: "Total Referrals",
        percenticon: "From every payment",
        currencyicon: "Total Earned",
        affiliateProgramTableHeader: ["EMAIL", "Registration Date", "Registration Source", "Charges"]
    }
}

export default userProfile;