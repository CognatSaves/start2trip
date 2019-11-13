const helmets  = {
        lang: 'ENG',
        driverConfirmation: {
            basic: {
                title: 'Trip confirmation',
                description: 'Trip confirmation'
            }
        },
        driverProfile: {
            basic: {
                title: ['Driver', '| Car ',' | Travel Information '],
               
                description: "Tripfer driver rofile"
            }
        },
        guideProfile:{
            guide: {
                title: ['Guide ', ', profile data, cars, list of tours.'],
                description: ['Guide page ', ', profile, cars, list of tours']
            },
            driver: {
                title: ['Driver ', ', profile data, cars.'],
                description: ['Driver page ', ', profile, cars, comments']
            },
            agency: {
                title: ['Agency ', ', organization description, list of tours.'],
                description: ['Agency page ', ', description, list of tours']
            }
        },
        tripConfirmation: {
            basic: {
                title: "Order Confirmation",
                description: "Order Confirmation"
            }
        },
        drivers: {
            route: {// when the route is selected
                title: ['How to get from ', '| Order a transfer online, benefit up to 40% '],
                description: "Tripfer in drivers"
            },
            country: {// only country selected
                title: ', offers of drivers',
                description: "Tripfer in drivers"
            }
        },
        aboutService: {
            basic: {
                title: 'About the service',
                description: "About tripfer.com"
            }
        },
        affiliateProgram: {
            basic: {
                title: 'To our partners',
                description: "To our partners"
            }
        },
        contacts: {
            basic: {
                title: 'Our contacts',
                description: 'Our contacts'
            }
        },
        licenseAgreement: {
            basic: {
                title: 'License Agreement',
                description: 'License Agreement'
            }
        },
        home: {
            country: {// when the country loaded
                title: ['Excursions, transfers in ', ' | Trip Planner, prices online'],
                description: ['Order transfer in ', '. Plan your trip. Free stops along the route for photos and visits. No prepayment. Cheaper than a taxi '],
            }
           
        },
        homeBodyBottom: {
            basic: {
                title: ['Excursions from ', ' | Trip Planner, prices online'],
                description: ['Transfers from ', ' to interesting places along the route. Online trip planner. No prepayment. Free stops on the route for photos and visits'],
            }
        },
        placeDescription: {
            object: {// when loaded
                title: ' how to get | Opening hours, ticket prices | Tourist reviews',
                description: ', tourist information. Opening hours and ticket prices, photos. How to get from anywhere in the country. Build your trip online '
            }
        },
        places: {
            direction: {// when direction is selected
                title: ['Attractions in ',' how to get | Book a trip online '],
                description: ['Travel guide ', '. Interesting places, attractions. Transportation in ',' from local drivers. Custom Trip Planner '],
            },
            country: {// standard - only country
                title: ['Attractions in ',' how to get | Book a trip online '],
                description: ['Travel guide ', '. Interesting places, attractions. Transportation in ',' from local drivers. Custom Trip Planner '],
            },
        },
        accountRedirector: {
            object: {// when the acc is loaded
                title: "Your Tripfer Account",
                description: "Your Tripfer Account"
            }
        },
        guides:{
            country:{
                title: ['Guides ', ', ratings, the number of tours provided.'],
                description: ['Guides in ','. List of guides, ratings, number of reviews.']
            }
        },
        driverPage:{
            country: {
                title: ['Drivers ', ', rating, the number of cars provided.'],
                description: ['Drivers in ', '. List of drivers, ratings, number of reviews.']
            }
        },
        authModalCountry: {
            basic: {
                title: "Choose your region of interest",
                description: "Choose your region of interest"
            }
        },
        authRedirect: {
            basic: {
                title: 'Login to tripfer.com',
                description: 'Login'
            }
        },
        forgotPassword: {
            basic: {
                title: 'Password recovery to your personal account',
                description: 'Password recovery'
            }
        },
        registration: {
            basic: {
                title: 'Registration on tripfer.com',
                description: 'Registration'
            }
        },
        resetPassword: {
            basic: {
                title: 'Enter new password',
                description: 'Enter new password'
            }
        },
        routeDescription: {
            basic: {// uploaded
                title: ' | Book a trip online ',
                description: '. Offers from local drivers. Order without prepayment. Free stops along the route for photos and visits'
            }
        
        },
        feedback:{
            title: "Leave a review about your trip",
            description: "Leave a review about your trip"
        },
        customerCancel: {
            title: "Are you sure you want to cancel your trip?",
            description: "Are you sure you want to cancel your trip?",
        }
    }
    export default helmets;