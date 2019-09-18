const driverProfileRegistration = {

    DriverProfileNavigation: {
        navigationText: ["My trips", "Profile", "My Cars", "Travel settings", "Tours",
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
    DriverProfileBasicInformation: {
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
            description: "Nobody can access your passport number information except Tripfer. We need it to make payments and conclude an agreement"
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
    DriverProfileCar: {
        profileCarBrand: {
            floatingLabelText: "Car Brand"
        },
        profileCarYear: {
            floatingLabelText: "Car Year"
        },
        profileCarNumber: {
            floatingLabelText: "Car Number"
        },
        typeCar: {
            label: "Car Type"
        },
        carClass: {
            label: "Car class"
        },
        typeFuel: {
            label: "Fuel Type"
        },
        profileCarFuelConsumption: {
            label: 'Fuel Consumption l/100km'
        },
        profileCarNumberOfSeats: {
            label: "Seats"
        },
        carAddNewCarComfort: {
            label: "Facilities",
            comfort1: "Climate control",
            comfort2: "Leather seats",
            comfort3: "Free Wi-Fi",
            comfort4: "Smoking is allowed in the car",
            comfort5: "No smoking in the car"
        },
        carAddNewCarButton: {
            button: "Add Car",
            span: "Cancel"
        },
        filledCard: {
            button: "Add Car"
        },
        filledCardInformationMenu: {
            deleteCar: "Delete",
            carEdit: "Edit",
            carDeactivate: "Deactivate",
            carActivate: "Activate"
        },
        cardInformation: {
            span: "seats"
        },
        noPhotoText: 'Insert the photo of your car.',
        badDataText: 'Fill in the selected fields correctly.'
    },
    DriverProfileTripSettingsTrip: {
        titlePage: "Edit Trips",
        changeOnWorkP: "You can pause and resume accepting orders",
        onWorkTrue: "Pause Work",
        onWorkFalse: "Resume",
        weekendSettings: 'Set non-working days',
        chooseWeekend: "Select Weekend",
        selectDates: "Select Dates",
        addCityTitle: "Add the city and the radius where you are ready to take orders",
        tripLocation: "Base city / radius, km",
        textField: {
            floatingLabelText: "Radius in km",
            description: "You will receive orders for transfers only within the radius of the base cities that you entered",
            title: "Delete City",
            addCityBt: "+ Add city"
        },
        maxDailyMileage: {
            floatingLabelText: "Maximum daily mileage, km:",
            description: "Enter the maximum mileage, how far are you willing to make trips"
        },
        tripSaveBt: "SAVE CHANGES",
        badRequestText: 'You made the mistakes. Correct them before saving!'
    },
    DriverProfileSettings: {
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
        infoText: 'The password will be checked and saved only if all three fields are filled.',
        unsubscribeButton: {
            mailing: {
                unsubscribe: "Unsubscribe from the newsletter",
                subscribe: "Subscribe to the Newsletter"
            },
            message: "As a result of unsubscribing, you will no longer receive messages from Tripfer"
        }


    },
    DriverProfileAffiliateProgram: {
        affiliateProgramsTitle: "Affiliate Program",
        affiliateProgramsDescription: "Build your successful business and get passive income of 20% from the system commission of the trip. Send out invitations with a 10% discount on the first trip to your friends. Invite drivers work in Tripfer and get income from the orders they fulfill. Write articles about us, comment on social networks, blogs and forums, and earn money. For life. Payments to a bank card weekly. ",
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
    },
    DriverProfileTripSettingsTour: {
        directionsValue: "All directions",
        categoriesValue: "All Categories",
        tagsValue: "All Tags",
        newTourEverydayTime: "Choose a time",
        newTourDatepickerTime: "Choose a time",
        tourContentTitle: "Add Tour",
        nameNewTour: {
            floatingLabelText: "Tour Name",
            description: "Enter a name for your tour"
        },
        newTourAttractions: {
            floatingLabelText: "Departure Point",
            description: "Indicate the place of departure of the tour"
        },
        attractionsAlongTheRoute: {
            floatingLabelText: "Attractions along the route",
            description: "Choose points of interest along the route. This will help the client fully understand the tour’s route"
        },
        newTourDescription: {
            floatingLabelText: "Description",
            description: "Enter a description of the tour, as well as what is included in the price of the tour, what additional services are not included in the price, etc."
        },
        schedule: {
            title: "Schedule",
            newTourEveryday: "Daily",
            newTourDatepicker: "On certain days",
            selectDates: "Select Dates"
        },
        additionalInformation: {
            title: "Additional Information",
            newTourPrice: {
                floatingLabelText: "Tour Cost"
            },
            directions: {
                floatingLabelText: "Directions",
                description: "Regional Tour Affiliation"
            },
            categories: {
                floatingLabelText: "Categories",
                description: "Type of vacation"
            },
            tags: {
                floatingLabelText: "Tags",
                description: "Enter tags to tag your tour"
            },
            newTourPeople: "Seats",
            uploadPhoto: "Upload photo",
            addTour: "Add tour",
            cancel: "Cancel",

        },
        filledCardInformationMenu: {
            deleteTour: "Delete",
            tourEdit: "Edit",
            tourDeactivate: "Deactivate",
            tourActivate: "Activate"
        },
        cardInformation: {
            emptySeats: "Empty Seats"
        },
        photos:{
            imageLabelError: 'Вставьте сюда фотографии(ю)(ENG)',
            mainImageLabel: 'Это загрузка фонового фото(ENG)',
            mainImageInfo: 'Эта картинка будет использоваться как фон на странице Вашего тура(ENG)',
            blockListLabel: 'Это загрузка фото для блока в списке(ENG)',
            blockListImageInfo: 'Эта картинка будет использоваться в качестве оформления Вашего тура в списке(ENG)'
        }

    },
    DriverProfileTrevelHistory: {
        tripId: 'trip ID',
        customer: "Customer",
        venue: "Meeting Point",
        costOfTravel: "Trip Cost",
        comment: "Comment",
        car: "Car",
        tripStart: 'Trip Start',
        noStart: 'The trip has not been started',
        tripEnd: 'End of Trip',
        noEnd: 'The trip was not finished',
        stateVariants: ['End the trip', 'Start the trip']
    },
    DriverProfileHistory: {
        upcoming: "Upcoming",
        story: "History",
    },
    DriverProfileBilling: {
        billingModalA: {
            header: 'Withdraw funds available',
            summ: 'Amount USD',
            cardNumber: 'Card number',
            cardType: 'Card Type',
            cancel: 'Cancel',
            submit: 'Withdraw funds'
        },
        billingModalB: {
            header: 'Amount to be paid',
            summ: 'Amount USD',
            description: 'Payment is by credit card. After entering the amount and confirmation, you will be redirected to a specialized service. ',
            cancel: 'Cancel',
            submit: 'Pay'
        },
        currentBalance: {
            currentBalanceText: 'Current balance',
            personalAccount: 'Personal Account',
            cardPayments: 'Paid by cards',
            partnerPayments: 'Affiliate charges',
            withdrawnTotal: 'Total get',
            accountTotal: 'Total Account',
            fundsWithdrawal: 'Withdraw funds',
            receivedByCash: 'Received Cash All Time'
        },
        systemPayments: {
            systemPaymentsText: 'Payment for using the system (all the time)',
            cardCommission: 'License fee from cards',
            cashCommission: 'License fee from Cash',
            payedPart: 'Paid',
            systemPaymentsTotal: 'Total',
            payButtonText: 'Make Payment',
            systemPaymentInfo: 'To maintain the Tripfer service, a fee is charged from each trip. To continue using the system, you need to pay the bill by the 5th day of each month.'
        },
        accountOperations: {
            accountOperationsText: 'Account Transactions',
            forPeriod: 'Over the period',
            searchButton: 'View',
            infoTableText: {
                payedByCash: 'Paid in cash',
                payedByCard: 'Card payment',
                payedByPartners: 'License fee charges',
                payedForPeriod: 'Total for the period',
                datePickerStart: 'Дата начала(ENG)',
                datePickerEnd: 'Дата конца(ENG)'
            },
            valueTableText: [
                'Transaction ID',
                'Type of payment',
                'Amount',
                'Payment Date',
                'Trip ID'
            ]
        }
    },
    DriverProfileRegistration: {
        loading: 'Loading',
        
    }
}

export default driverProfileRegistration