const driverProfileRegistration = {

    DriverProfileNavigation: {
        navigationText: ["ჩემი  მოგზაურობები", "პროფილი", "ავტომობილის", "მგზავრობის პარამეტრები", //"Туры",
            "გამოხმაურებები", "პარამეტრები", "ბილინგი", "პარტნიორული პროგრამა"
        ],
        updatePhoto: "ფოტოს განახლება",
        totalTrips: {
            first: "სულ",
            last: "გამგზავრებების",
            full: "სულ გამგზავრებების რაოდენობა"
        },
        starsReviews: "გამოხმაურებების",
        upcomingTrips: {
            first: "მოსალოდნელი",
            last: "მგზავრობები",
            full: "მოსალოდნელი მგზავრობები"
        },
        penalty: {
            first: 'საჯარიმო',
            last: 'ქულები',
            full: 'საჯარიმო ქულები'
        }
    },
    DriverProfileBasicInformation: {
        telflag: "ru(GEO)",
        titlePage: "პროფილის რედაქტირება",
        firstName: {
            floatingLabelText: "სახელი",
            description: "თქვენს საჯარო პროფილში გამოისახება მხოლოდ თქვენი სახელი. როცა კლიენტი დაჯავშნის მოგზაურობას, მხოლოდ მაშინ დაინახავს თქვენს სახელსა და გვარს"
        },
        lastName: {
            floatingLabelText: "გვარი",
            description: ""
        },
        basicInfoBirthday: {
            floatingLabelText: "დაბადების თარიღი",
            description: "ჩვენ ვიყენებთ ამ მონაცემებს მხოლოდ ანალიზისათვის  და ვიცავთ მათ კონფედენციალურობას "
        },
        basicInfoNumber: {
            floatingLabelText: "პასპორტის ნომერი",
            description: "ვერასოდეს და ვერავინ მიიღებს თქვენი პასპორტის მონაცემებს. ის ჩვენ გვჭირდება გადახდების შესასრულებლად და ხელშეკრულების დასადებად"
        },
        basicInfoDay: {
            floatingLabelText: "პასპორტის გაცემის თარიღი",
            description: ""
        },
        basicInfoLocation: {
            label: "ქალაქი",
            description: "მიუთითეთ ქალაქი, სადაც თქვენ ცხოვრობთ. ეს დაგვეხმარება ჩვენ უფრო ეფექტურად გავანაწილოთ  შეკვეთები მოგზაურობებზე"
        },
        basicInfoTelNumber: {
            label: "სამსახურის ტელეფონი",
            description: "კლიენტები და Tripfer-ის წარმომადგენლები შეძლებენ დაგიკავშირდნენ ამ ნომერზე. ჩვენ გამოგიგზავნით ხოლმე მოთხოვნებს მოგზაურობებზე, შეხსენებებს და სხვა შეტყობინებებს"
        },
        basicInfoLanguage: {
            label: "ენები",
            description: "მიუთითეთ ენები, რომლებიც იცით. ეს ინფორმაცია დაგეხმარება თქვენ იპოვოთ საერთო ენა კლიენტთან"
        },
        MenuItem: {
            value: "აირჩიეთ ენები"
        },
        basicInfoMultiLine: {
            floatingLabelText: "ჩემს შესახებ",
            description: "მოგვიყევით თქვენი ინტერესების შესახებ: რომელი 5 ნივთის გარეშე არ შეგიძლიათ ცხოვრება? ან მოგწონთ, თუ არა სტუმრების მიღება? მოუყევით მათ თქვენ შესახებ: როგორია თქვენი ცხოვრებისეული პრინციპები? ეს დაეხმარება კლიენტს თქვენი პროფილისადმი დადებითი დამოკიდებულების ჩამოყალიბებაში"
        },
        buttonSubmit: {
            text: "ცვლილებების შენახვა"
        }

    },
    DriverProfileCar: {
        profileCarBrand: {
            floatingLabelText: "ავტომობილის მარკა"
        },
        profileCarYear: {
            floatingLabelText: "ავტომობილის (გამოშვების) წელი"
        },
        profileCarNumber: {
            floatingLabelText: "ავტომობილის ნომერი"
        },
        typeCar: {
            label: "ავტომობილის ტიპი"
        },
        carClass: {
            label: "ავტომობილის კლასი"
        },
        typeFuel: {
            label: "საწვავის ტიპი"
        },
        profileCarFuelConsumption: {
            label: 'საწვავის ტიპი l/100km'
        },
        profileCarNumberOfSeats: {
            label: "ადგილების რაოდენობა"
        },
        carAddNewCarComfort: {
            label: "კომპლექტაცია",
            comfort1: "კლიმატკონტროლი",
            comfort2: "ტყავის სალონი",
            comfort3: "უფასო Wi-Fi",
            comfort4: "სალონში მოწევა ნებადართულია",
            comfort5: "სალონში მოწევა აკრძალულია"
        },
        carAddNewCarButton: {
            button: "ავტომობილის დამატება",
            span: "გაუქმება"
        },
        filledCard: {
            button: "ავტომობილის დამატება"
        },
        filledCardInformationMenu: {
            deleteCar: "წაშლა",
            carEdit: "რედაქტირება",
            carDeactivate: "დეაქტივირება",
            carActivate: "გააქტიურება"
        },
        cardInformation: {
            span: "ადგილების"
        },
        noPhotoText: 'Вставьте фото вашего автомобиля.(GEO)',
        badDataText: 'Заполните корректно выделенные поля!(GEO)'
    },
    DriverProfileTripSettingsTrip: {
        titlePage: "საჭმლის რედაქტირება",
        changeOnWorkP: "თქვენ შეგიძლიათ შეაჩეროთ და განაახლოთ შეკვეთების მიღება",
        onWorkTrue: "სამუშაოს შეჩერება",
        onWorkFalse: "სამუშაოს განახლება",
        weekendSettings: 'არასამუშაო დღეების არჩევა',
        chooseWeekend: "აირჩიეთ დასვენების დღეები",
        selectDates: "აირჩიეთ თარიღები",
        addCityTitle: "დაამატეთ ქალაქი და რადიუსი, სადაც მზად ხართ მიიღოთ შეკვეთები",
        tripLocation: "საბაზო ქალაქი/რადიუსი, კმ",
        textField: {
            floatingLabelText: "რადიუსი კმ-ში",
            description: "თქვენ მიიღებთ განაცხადებს გადაზიდვაზე საბაზო ქალაქის მხოლოდ იმ რადიუსზე, რომელიც მიუთითეთ",
            title: "ქალაქის წაშლა",
            addCityBt: "+ ქალაქის დამატება"
        },
        maxDailyMileage: {
            floatingLabelText: "მაქსიმალური დღიური გარბენი",
            description: "მიუთითეთ მგზავრის გადაყვანის მარშრუტის მაქსიმალური კილომეტრაჟი"
        },
        tripSaveBt: "ცვლილებების შენახვა",
        badRequestText: 'Вы допустили ошибки. Поправьте их перед сохранением!(GEO)'
    },
    DriverProfileSettings: {
        settingsBodyTitle: "პროფილის პარამეტრები",
        sittingsEmail: {
            floatingLabelText: "Email",
            description: "ელექტრონული ფოსტის მისამართი წარმოადგენს ლოგინს სისტემაში და ემსახურება შეტყობინებებს შეკვეთების შესახებ, სიახლეებს. შეცვლა არ შეიძლება"
        },
        ContentPasswordText: "პაროლი",
        sittingsCurrentPassword: {
            floatingLabelText: "მიმდინარე პაროლი",
            description: "პაროლის ან ტელეფონის ნომრის შესაცვლელად საჭიროა თქვენი მიმდინარე პაროლის შეყვანა"
        },
        sittingsNewPassword: {
            floatingLabelText: "ახალი პაროლი",
            description: "უნდა იყოს არანაკლებ 6 სიმბოლო და შეიცავდეს ლათინურ ასოებს და ციფრებს"
        },
        sittingsConfirmPassword: {
            floatingLabelText: "დაადასტურეთ პაროლი",
            description: "შეიყვანეთ პაროლი კიდევ ერთხელ"
        },
        sittingsPhoneNumber: {
            label: "ტელეფონი",
            description: "მოცემული ტელეფონის ნომერი არავისთვისაა ხელმისაწვდომი და წარმოადგენს Tripfer -ის წარმომადგენელთან კავშირის სარეზერვო საშუალებას ",
            telflag: "ru"
        },
        sittingsSaveBt: "ცვლილებების შენახვა",
        infoText: 'Пароль будет проверяться и сохраняться только в случае заполнения всех трёх полей.(ENG)',
        unsubscribeButton: {
            mailing: {
                unsubscribe: "გამოწერა გაზეთებიდან",
                subscribe: "გამოიწერეთ ბიულეტენი"
            },
            message: "გაუქმების შემთხვევაში აღარ მიიღებთ შეტყობინებებს Tripfer-ისგან"
        }


    },
    DriverProfileAffiliateProgram: {
        affiliateProgramsTitle: "პარტნიორული პროგრამა",
        affiliateProgramsDescription: "ააგეთ თქვენი წარმატებული ბიზნესი და მიიღეთ პასიური შემოსავალი სისტემის კომისიისაგან ყოველი გამგზავრებიდან 14%-ის ოდენობით. გაუგზავნეთ მოსაწვევები თქვენს ნაცნობ ტურისტებს პირველ მოგზაურობაზე 15%-იანი ფასდაკლებით. ამისათვის დააწკაპუნეთ ღილაკს „მეგობრის მოწვევა“ ან გააგზავნეთ შვილობილი ბმული.  მოიწვიეთ მძღოლები მოგზაურობის სისტემაში მუშაობისთვის, რათა მათ მიიღონ შემოსავალი შესრულებული შეკვეთებდან. დაწერეთ სტატიები ჩვენს შესახებ, გაუკეთეთ კომენტარი სოციალურ ქსელებში ბლოგებსა და ფორუმებზე და მიიღეთ შემოსავალი. მთელი ცხოვრება. გადახდა ხდება ყოველკვირეულად საბანკო ბარათზე",
        affiliateLinks: {
            title: "თქვენი პარტნიორული ბმული",
            registrationLink: "რეგისტრაციის ბმული",
            linkToHomePage: "მთავარი გვერდის ბმული",
            spanLink: "დაკოპირება"
        },
        promotionalMaterials: "პრომო მასალა",
        questionicon: "დარიცხვა არასოდეს მთავრდება. რაც მეტი გყავთ რეფერალები, და რაც უფრო კარგად მუშაობენ ისინი, მით მეტია თქვენი ყოველდღიური შემოსავალი",
        peopleicon: "რეფერალების რაოდენობა სულ",
        percenticon: "ყოველი გადახდიდან",
        currencyicon: "სულ გამომუშავებულია",
        affiliateProgramTableHeader: ["EMAIL", "რეგისტრაციის თარიღი", "რეგისტრაციის წყარო", "დარიცხვა"]
    },
    DriverProfileTripSettingsTour: {
        directionsValue: "ყველა მიმართულებები",
        categoriesValue: "ყველა კატეგორიები",
        tagsValue: "ყველა თეგები",
        newTourEverydayTime: "აირჩიეთ დრო",
        newTourDatepickerTime: "აირჩიეთ დრო",
        tourContentTitle: "ტურის დამატება",
        nameNewTour: {
            floatingLabelText: "ტურის დასახელება",
            description: "შეიყვანეთ სახელწოდება თქვენი ტურისათვის"
        },
        newTourAttractions: {
            floatingLabelText: "გამგზავრების ადგილი",
            description: "მიუთითეთ ტურის გაგზავნის ადგილი"
        },
        attractionsAlongTheRoute: {
            floatingLabelText: "მარშრუტის ღირშესანიშნაობები",
            description: "აირჩიეთ ღირშეესანიშნაობები ტურის მარშრუტის მიხედვით"
        },
        newTourDescription: {
            floatingLabelText: "აღწერა",
            description: "შეიყვანეთ ტურის აღწერა, ასევე, რა შედის ტურის ღირეულებაში, რომელი დამატებითი მომსახურება არ შედის ტურის ღირებულებაში და ა.შ"
        },
        schedule: {
            title: "განრიგი",
            newTourEveryday: "ყოველდღიურად",
            newTourDatepicker: "განსაზღვრულ დღეებში",
            selectDates: "თარიღების არჩევა"
        },
        additionalInformation: {
            title: "დამატებითი ინფორმაცია",
            newTourPrice: {
                floatingLabelText: "ტურის ღირებულება"
            },
            directions: {
                floatingLabelText: "მიმართულებები",
                description: "ტურის რეგიონალური მიკუთვნება"
            },
            categories: {
                floatingLabelText: "კატეგორიები",
                description: "დასვენების სახე"
            },
            tags: {
                floatingLabelText: "თეგები",
                description: "შეიყვანეთ თეგები თქვენი ტურის ჩასანიშნად"
            },
            newTourPeople: "ადგილების რაოდენობა",
            uploadPhoto: "ფოტოს ჩატვირთვა",
            addTour: "ტურის დამატება",
            cancel: "გაუქმება",

        },
        filledCardInformationMenu: {
            deleteTour: "წაშლა",
            tourEdit: "რედაქტირება",
            tourDeactivate: "დეაქტივირება",
            tourActivate: "გააქტივება"
        },
        cardInformation: {
            emptySeats: "თავისუფალი ადგილების"
        }

    },
    DriverProfileTrevelHistory: {
        tripId: 'ID поездки(GEO)',
        customer: "კლიენტი",
        venue: "შეხვედრის ადგილი",
        costOfTravel: "მოგზაურობის ღირებულება",
        comment: "კომენტარი",
        car: "მანქანა",
        tripStart: 'Начало поездки(GEO)',
        noStart: 'Поездка не была начата(GEO)',
        tripEnd: 'Окончание поездки(GEO)',
        noEnd: 'Поездка не была закончена(GEO)',
        stateVariants: ['Закончить поездку(GEO)', 'Начать поездку(GEO)']
    },
    DriverProfileHistory: {
        upcoming: "მოსალოდნელი",
        story: "ისტორია",
    },
    DriverProfileBilling: {
        billingModalA: {
            header: 'Доступно к выводу(GEO)',
            summ: 'Сумма USD(GEO)',
            cardNumber: 'Номер карты(GEO)',
            cardType: 'Тип карты(GEO)',
            cancel: 'Отмена(GEO)',
            submit: 'Вывод средств(GEO)'
        },
        billingModalB: {
            header: 'Сумма к оплате(GEO)',
            summ: 'Сумма USD(GEO)',
            description: '(GEO)Оплата осуществляется с помощью банковской карты. После ввода суммы и подтверждения вы будете переадресованы в специализированный сервис.',
            cancel: 'Отмена(GEO)',
            submit: 'Оплатить(GEO)'
        },
        currentBalance: {
            currentBalanceText: 'მიმდინარე ბალანსი',
            personalAccount: 'პირადი ანგარიში',
            cardPayments: 'გადახდილია ბარათებით',
            partnerPayments: 'პარტნიორული დარიცხვები',
            withdrawnTotal: 'სულ მოხსნილია',
            accountTotal: 'სულ ანგარიშზე',
            fundsWithdrawal: 'თანხის განაღდება',
            receivedByCash: 'მიღებულია ნაღდი ანგარიშით'
        },
        systemPayments: {
            systemPaymentsText: 'სისტემით სარგებლობის ფასის გადახდა',
            cardCommission: 'ბარათების კომისია',
            cashCommission: 'ნაღდი ფულის კომისია',
            payedPart: 'გადახდილია',
            systemPaymentsTotal: 'სულ',
            payButtonText: 'გადახდა',
            systemPaymentInfo: 'სერვისის შრომისუნარიანობის ხელშესაწყობად ყოველი მოგზაურობიდან ამოიღება საკომისიო. სისტემით სარგებლობის გასაგრძელებლად აუცილებელია გადაიხადოთ ანგარიში ყოველი თვის 5 რიცხვამდე'
        },
        accountOperations: {
            accountOperationsText: 'ანგარიშის ოპერაციები',
            forPeriod: 'პერიოდში',
            searchButton: 'ნახვა',
            infoTableText: {
                payedByCash: 'ფულადი თანხის გადახდა',
                payedByCard: ',გადახდა ბარათებით',
                payedByPartners: ',პარტნიორული დარიცხვები',
                payedForPeriod: 'სულ პერიოდში'
            },
            valueTableText: [
                'გარიგების ID',
                'გადახდის ტიპი',
                'თანხა',
                'გადახდის თარიღი',
                'ID მოგზაურობები'
            ]
        }
    },
    DriverProfileRegistration: {
        loading: 'Загрузка(GEO)',

    }

}

export default driverProfileRegistration