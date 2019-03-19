

const initialState = {
    tours: [
        {
            country: "Imperii Romani Orientalis",
            tours: [
                {
                    rating: 3.1,
                    comments: 102,
                    id: 0,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 350, 
                },
                {
                    rating: 3.2,
                    comments: 100,
                    id: 1,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 323, 
                },
                {
                    rating: 3.3,
                    comments: 92,
                    id: 2,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 256, 
                },
                {
                    rating: 3.4,
                    comments: 18,
                    id: 3,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 567, 
                },
                {
                    rating: 3.5,
                    comments: 78,
                    id: 4,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 342, 
                },
                {
                    rating: 3.6,
                    comments: 58,
                    id: 5,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 155, 
                },
                {
                    rating: 3.7,
                    comments: 78,
                    id: 6,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 62, 
                },
                {
                    rating: 3.8,
                    comments: 38,
                    id: 7,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 432, 
                },
                {
                    rating: 3.8,
                    comments: 83,
                    id: 8,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 254, 
                },
                {
                    rating: 2.1,
                    comments: 112,
                    id: 9,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 841, 
                },
                {
                    rating: 2.2,
                    comments: 112,
                    id: 10,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 2.3,
                    comments: 112,
                    id: 11,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 2.4,
                    comments: 11,
                    id: 12,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 2.5,
                    comments: 15,
                    id: 13,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 2.6,
                    comments: 112,
                    id: 14,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 2.7,
                    comments: 112,
                    id: 15,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 2.8,
                    comments: 112,
                    id: 16,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 7,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 18,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 19,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 20,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id:21,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 22,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 23,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 24,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 25,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                {
                    rating: 3.1,
                    comments: 112,
                    id: 26,
                    departureDate: new Date(Date.now()),
                    info: "Новый тур по самым крупным центрам империи, олицетворяющим её богатство и мощь. Перемещение организовано на комфортабельном дромоне. По пути возможен заход в любой порт Средиземноморья. Каждый посещённый город оставит о себе незабываемые впечатления. В каждом из них для вас будет предоставлены верховые животные или паланкин для удобства перемещения по городу. Опытные гиды и тренированная охрана будут в вашем распоряжении в любое время дня и ночи.",
                    places: ["Konstantinopolis", "Antioch", "Alexandria Egyptian", "Carthage", "Roma"],
                    passengersAvailable: 10,
                    price: 300, 
                },
                


            ]
        }
    ]
}

export const ToursReduser = (state = initialState, action)=>{
    console.log("ToursReduser");
    switch (action.type){

        default: return state;
    }
    
}