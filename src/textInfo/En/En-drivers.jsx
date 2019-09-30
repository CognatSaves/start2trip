const drivers = {
        lang: 'ENG',
        mainPage: {
            routeText: ['Route', ', driver offers'],
            countryText: ', driver offers',
            loadingText: 'Expect to download driver offers'
        },
        driversBlock: {
            title: "Card of the driver and his car, the cost of your trip",
            tripParams: {
                routeText: 'Your route',
                timeParam: 'Travel time',
                lengthParam: 'Path length'
            },
            detailed: 'More',
            languages: 'Languages',
            carCapacity: 'places',
            comments: 'review (s)',
            commentary: 'The cost is final. Fuel included. ',
            guide: 'Guide',
            book: 'BOOK'
        },
        driversProperties: {
            characteristic: 'Sort by',
            sortText: 'Sort',
            sortMenuVariants: ["Price", "Popularity", "Rating"],
            sortMenuVariantsMobail:["low price first", "high price first", "Popularity", "Rating"],
            filterText: 'Filter',
            anyLanguage: 'Any language',
            anyCar: 'Any car',
            person: 'person',
            upTo: 'up to',
            departureDate:"Departure date",
            menuItemValue: 'All tours',
            peopleMenu: {
                adults: 'Adults',
                children: 'Children',
                childrenProps: 'from 2 to 12 years',
                cancel: 'Cancel',
                priceWord: 'Before', //например, до 400$
                done: 'Done'
            },
            from: 'from',
            price: 'price'
        },
        driverConfirmation: {
            good: {
                header: 'You have confirmed the order!',
                header2: ['Everything is fine, you have confirmed the trip',
                'For failure to appear on the confirmed order, you will immediately receive 3 penalty points.'],
                toStart: 'Home',
            },
            bad: {
                header: 'Do you really want to cancel the order?',
                header2: ['In case of your refusal to travel, you will be awarded 1 penalty point out of 5 possible.',
                'For failure to appear on the confirmed order, you will immediately receive 3 penalty points.'],
                variants: ['Yes', 'No']
            },
            notFound:{
                header: 'Have some troubles!',
                value: ["Order has already been confirmed or does not exist",
                ""],
                toStart: 'Home',
            },
            infoBlock: 'Upon reaching 5 points you will be permanently disconnected from the system.'
        },
        tripConfirmation: {
            good: {
                title: 'Your order is confirmed!',
                buttonText: 'Home',
                info: 'You can see information about the trip in your personal account on our website.'
            },
            bad: {
                title: 'Have some troubles!',
                info: "Order has already been confirmed or does not exist",
                buttonText: 'Home'
            }
        },
        driverInfo: {
            seats: 'seats',
            languages: 'Languages'
        }
    }
        
        export default drivers;