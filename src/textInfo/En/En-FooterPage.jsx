
import addCarInDriver from '../../components/media/ru/addCarInDriver.jpg'
import addCarInDriver2 from '../../components/media/ru/addCarInDriver2.jpg'
import addCarInDriver3 from '../../components/media/ru/addCarInDriver3.jpg'
import addDriverInAgency from '../../components/media/ru/addDriverInAgency.jpg'
import addTourInDriver from '../../components/media/ru/addTourInDriver.jpg'
import addTourInDriver2 from '../../components/media/ru/addTourInDriver2.jpg'
import addTourInDriver3 from '../../components/media/ru/addTourInDriver3.jpg'
import addTourInDriver4 from '../../components/media/ru/addTourInDriver4.jpg'
import addTourInDriver5 from '../../components/media/ru/addTourInDriver5.jpg'
import addToursInAgency from '../../components/media/ru/addToursInAgency.jpg'
import addToursInAgency2 from '../../components/media/ru/addToursInAgency2.jpg'
import addToursInAgency3 from '../../components/media/ru/addToursInAgency3.jpg'
import addToursInAgency4 from '../../components/media/ru/addToursInAgency4.jpg'
import addToursInAgency5 from '../../components/media/ru/addToursInAgency5.jpg'
import affiliateProgramInDriver from '../../components/media/ru/affiliateProgramInDriver.jpg'
import billingAgency from '../../components/media/ru/billingAgency.jpg'
import billingDriver from '../../components/media/ru/billingDriver.jpg'
import bookCarUser from '../../components/media/ru/bookCarUser.jpg'
import bookCarUser2 from '../../components/media/ru/bookCarUser2.jpg'
import bookCarUser3 from '../../components/media/ru/bookCarUser3.jpg'
import cancelBookUser from '../../components/media/ru/cancelBookUser.jpg'
import createProfileInDriver from '../../components/media/ru/createProfileInDriver.jpg'
import createProfileInDriver2 from '../../components/media/ru/createProfileInDriver2.jpg'
import driverContactUser from '../../components/media/ru/driverContactUser.jpg'
import makeRouteUser from '../../components/media/ru/makeRouteUser.jpg'
import makeRouteUser2 from '../../components/media/ru/makeRouteUser2.jpg'
import registationAgency from '../../components/media/ru/registationAgency.jpg'
import registrationDriver from '../../components/media/ru/registrationDriver.jpg'
import tripsettingInDriver from '../../components/media/ru/tripsettingInDriver.jpg'
import tripsettingInDriver2 from '../../components/media/ru/tripsettingInDriver2.jpg'

const FooterPage = {
    aboutService: {
        h2: "About the service",
        description: `tripfer.com allows you to interact with local drivers and travel agents.
    Tourists who want to receive the service of transport. Thus, a mass of proposals is formed, of which You can choose something special and individually suitable. Our goal is to create quality information products for this sector of services.Key features of the service are: `,
        firstEl: {
            title: "Individual route selection",
            text: "Plan your own travel route, \n with the ability to include any number of \n points in it, making stops in interesting places."
        },
        secondEl: {
            title: "Freedom of Choice",
            text: "Choose a car with a driver based on \n from the given criteria. The local driver-guide \n will introduce you to the history and culture of the country."
        },
        thirdEl: {
            title: "Flexible payment system",
            text: "The cost of the trip is calculated according to \n the distance, type of transport and type of fuel. \n Payment is made at the end of the trip \n in a way convenient for you."
        }

    },

    help: {
        h2: "Help",
        description: `Overview of the interface: for drivers and guides, travelers and the car park`,

        driverAndGuide: {
            headerText: "Drivers and Guides",
            title: [{ text: "Registration / trips / tours", url: "/help-driverAndGuide-0/" }, { text: "Billing", url: "/help-driverAndGuide-1/" }, { text: "Affiliate program", url: "/help-driverAndGuide-2/" }],
            data: [
                [
                    {
                        title: "Check in",
                        text: 'To register as a driver, during registration, \n select the type of user "Driver".',
                        src: [{ url: registrationDriver }]
                    },
                    {
                        title: "Profile Filling",
                        text: 'Log in to your profile. Upload a photo \n and fill in the details about yourself.',
                        src: [{ url: createProfileInDriver }, { url: createProfileInDriver2 }]
                    },
                    {
                        title: "Adding a car",
                        text: 'In your account, select the "Car."\n Add your car, fill in the data about the car.',
                        src: [{ url: addCarInDriver }, { url: addCarInDriver2 }, { url: addCarInDriver3 }]
                    },
                    {
                        title: "Travel Settings",
                        text: 'Indicate the city and the radius where you are ready to take orders.\n Set up your schedule for receiving orders.',
                        src: [{ url: tripsettingInDriver }, { url: tripsettingInDriver2 }]
                    },
                    {
                        title: "Adding Tours",
                        text: 'If you are a guide, you can add your own tours.\n Fill in the tour information and upload the tour photos.',
                        src: [{ url: addTourInDriver }, { url: addTourInDriver2 }, { url: addTourInDriver3 }, { url: addTourInDriver4 }, { url: addTourInDriver5 }]
                    }
                ],
                [
                    {
                        title: "Billing",
                        text: 'The billing system allows you to monitor the current balance of your  \n personal account, as well as control the payment for using the system.',
                        src: [{ url: billingDriver }]
                    },
                ],
                [
                    {
                        title: "Affiliate program",
                        text: ' Текст о партнерской программе и зачем она нужна.\n ',
                        src: [{ url: affiliateProgramInDriver }]
                    },
                ]
            ]
        },
        travelers: {
            headerText: "Travelers",
            title: [{ text: "How to make a route?", url: "/help-travelers-0/" }, { text: "How to book a trip?", url: "/help-travelers-1/" }, { text: "How to contact the driver?", url: "/help-travelers-2/" }, { text: "How to cancel a reservation?", url: "/help-travelers-3/" }, { text: "How does the payment go?", url: "/help-travelers-4/" }],
            data: [
                [
                    {
                        title: "How to make a route?",
                        text: 'Indicate the route with any number of points,\n then indicate the date of departure',
                        src: [{ url: makeRouteUser }, { url: makeRouteUser2 }]
                    },
                ],
                [
                    {
                        title: "How to book a trip?",
                        text: 'Choose a car with a driver or guide. Fill in the data in the order window.\n Confirm your order in a letter that will be sent to your email. mail.',
                        src: [{ url: bookCarUser }, { url: bookCarUser2 }, { url: bookCarUser3 }]
                    },
                ],
                [
                    {
                        title: "How to contact the driver?",
                        text: ' After order confirmation from the driver, you will receive an email. mail with driver contacts.\n You can contact the driver via (Viber, Whatsapp, Telegram, E-mail) ',
                        src: [{ url: driverContactUser }]
                    },
                ],
                [
                    {
                        title: "How to cancel a reservation?",
                        text: 'After filling out the order, you will receive a letter in the mail\n where there will be two links (order details and an order cancellation button). ',
                        src: [{ url: cancelBookUser }]
                    },

                ],
                [
                    {
                        title: "How does the payment go?",
                        text: 'Payment is made with the driver in cash in local currency \n  after the trip.',
                        src: [{ url: "" }]
                    },

                ]
            ]
        },
        travelAgency: {
            headerText: "Car parks / Travel agency",
            title: [{ text: "Check in", url: "/help-travelAgency-0/" }, { text: "Adding Tours", url: "/help-travelAgency-1/" }, { text: "Adding Drivers", url: "/help-travelAgency-2/" }, { text: "Billing", url: "/help-travelAgency-3/" }],
            data: [
                [
                    {
                        title: "Check in",
                        text: 'To register as a fleet / travel agency, during registration,\n select the user type "Fleets / travel agency". ',
                        src: [{ url: registationAgency }]
                    },
                ],
                [
                    {
                        title: "Adding Tours",
                        text: 'Add your own tours on your chosen route. \n Fill in the tour information and upload the tour photos.',
                        src: [{ url: addToursInAgency }, { url: addToursInAgency2 }, { url: addToursInAgency3 }, { url: addToursInAgency4 }, { url: addToursInAgency5 }]
                    },

                ],
                [
                    {
                        title: "Adding Drivers",
                        text: 'Conclude agreements with drivers and connect them to the system. Connected drivers\n fulfill orders that came through the service. You get paid for this in the current account. ',
                        src: [{ url: addDriverInAgency }]
                    },
                ],
                [
                    {
                        title: "Billing",
                        text: 'The billing system allows you to monitor the current balance of your personal account,\n as well as control the payment for using the system.',
                        src: [{ url: billingAgency }]
                    },
                ]
            ]
        }

    },
    
    affiliateProgram: {
        h2: "Affiliate Program",
        description1: "Build your successful business and earn money",
        description2: "in the amount of 20% of the trip from the commission of the system.",
        h3: "How does it work?",
        arrayEl: {
            firstEl: {
                title: "Invite",
                text: "Send invitations with a 10% discount \n on your first trip to familiar travelers, \n by clicking on the 'Invite a Friend' button, \n or send your affiliate link."
            },
            secondEl: {
                title: "Get paid,",
                text: "Invite drivers to work in Tripfer, \n and get income from their orders."
            },
            thirdEl: {
                title: "Share",
                text: "Write articles about us, comment on social networks, \n blogs and forums, and earn money. For life. \n Payments to a bank card weekly."
            }
        },
        arrayFooterEl: {
            firstEl: {
                title: "Link",
                text: "When a user follow your \n link, we mark his device \n with a special label for a period of 1 year to \n understand that he came by your recommendation."
            },
            secondEl: {
                title: "Driver / Partner",
                text: "By registering as a driver or \n partner in the system, the user will begin to generate passive income \n to you from his profit. \n The better it works and the more it attracts \n to the system, the more you get."
            },
            thirdEl: {
                title: "Traveler",
                text: "By registering as a traveler, \n the user brings you income from each \n trip. If within 1 year \n an order was made without registration, you will also receive \n deductions to your account."
            }
        }
    },
    LicenseAgreement: {
        users: "Users",
        partners: "Partners"
    },
    contacts: {
        h2: "Contacts",
        h4: "Feedback",
        text: "Leave your message in this form, and we will receive it by email and will definitely reply!",
        firstNamePlaceholder: "Name",
        messege: "your message",
        buttonSubmit: "Send message",
        nameFirm: 'Tripfercom LLC, Reg 193278785',
        h5: "Contacts",
        labelPhone: "Tel:",
        labelSocialNetwork: "Social Networks:",
        labelAddress: "Address:",
        addressText1: "220015, Minsk, Yanki Mavra St.,",
        addressText2: "41, office 410"
    }
}

export default FooterPage;