const agencyProfile = {
    lang: 'ENG',
    agencyProfile: {
        loading: 'Loading'
    },
    agencyProfileBasicInformation:{
        header: 'Edit profile',
        organizationData: {
            header: 'Organization Data',
            organizationName: 'Organization Name',
            registrationNumber: 'Registration number',
            legalAddress: 'Legal address',
            bankAccount: 'Payment account',
            bankCode: 'Bank code',
            bankAddress: 'Address of the bank',
            dataAbout: 'About myself',
        },
        contactPerson: {
            header: 'Contact Details',
            firstName: 'First name',
            lastName: 'last name',
            workPhone: 'Work phone',
            basicInfoLanguageText: 'Choose languages',
        },
        saveText: 'Save Changes'
    },
    agencyProfileAffiliateProgramm: {
        affiliateProgramsTitle: "Affiliate Program",
        affiliateProgramsDescription: "Build your successful business and get passive income of 20% from the system commission of the trip. Send out invitations with a 10% discount on the first trip to your friends. Write articles about us, comment on social networks, blogs and forums, and earn money. For life. Payments to a bank card weekly. ",
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
    agencyProfileDrivers: {
        driversText: 'Connected drivers',
        linkTitle: 'Your link to register a new driver to a company',
        linkButton: 'Copy',
        headerTable: ["Driver", "Cars", "Number of rides",
            "Rating", "Penalty Points", "Actions"]
    },
    agencyProfileNavigation: {
        navigationText: ["My trips", "Profile", "Drivers", "Tours", "Reviews",
            "Settings", "Billing", "Affiliate program"],
        updatePhoto: "Upload Photo",
        totalTrips: {
            first: "Total",
            last: "Trips",
            full: "Total Trips"
        },
        starsReviews: "reviews",
        totalDrivers: {
            first: 'Total',
            last: 'Drivers',
            full: 'Total Drivers'
        }
    },
    agencyProfileHistory: {
        upcoming: "Upcoming",
        story: "History",
    },
    agencyProfileTrevelHistory: {
        tripId: 'trip ID',
        drivercar: "Driver and Car",
        comments: 'reviews',
        client: 'Client',
        costOfTravel: "Trip Cost",
        tripStart: 'Trip Start',
        notStarted: 'Trip was not started',
        tripEnd: 'End of Trip',
        notEnded: 'The trip was not finished'
    },
    agencyProfileTour:{
        tourSeatsModalContent: {
            tour: 'Tour',
            headerArray: ['Day', 'Free place', 'Place Occupied'],
            calendaryInfo: 'In this calendar, only the days selected by you in the tour settings will be clickable, nothing will happen when you click on any others. If their number is limited, they will be selected initially.',
            saveChangesButton: 'Save',
            closeWindow: 'Close'
        },
        excursionIncludesBlock: {
            label: 'Tour price includes',
            hotelMeeting: 'Meeting at the hotel',
            hotelDelivery: 'Hotel delivery',
            fare: 'Fare',
            entryTickets: 'Entry tickets',
            food: 'Food and drink',
            accommodation: 'Accommodation'
        },
        daysNumber: 'Number of days',
        tourClassification: 'Tour classification',
        imagesLabel: 'Images',
        seatsModalLabel: 'Table of places',
        comments: 'comments',
        tourOnSite: 'Tour on the site',
        seatsTable: 'Table of seats',

        departurePointPlaceholder: 'Point of departure',
        pointsPlaceholder: 'Select Waypoints',
        currencyPlaceholder: 'Currency',
        pricePerPersonPlaceholder: 'Price per place',
        pricePerPersonInfo: 'If not selected, then the price for the entire tour is assumed.',
        tourLanguagesPlaceholder: 'Tour languages',
        directionPlaceholder: 'Destination (Region)'
    }
}
export default agencyProfile;