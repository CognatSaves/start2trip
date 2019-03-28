import {SET_DRIVERS_ROUTE_CHANGE, SET_PAGE, SET_MORE_PAGES_SHOW} from './ActionDrivers';

const initialState = {
    travelTime: '',
    travelLength: '',
    driversRouteChange: false,
    page: 1,
    showPages: 1,
    drivers: [//на данный момент адреса картинок не используются, всё прописано статически в css. Названия хранятся как декорации))))
    {
    name: "Валерий1",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 0,
    language: [2,1,0,3],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.6,
    comments: 101,
    price: 188,
    carComfort: [4,1],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники.",
    },
    {
    name: "Валерий2",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 1,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.7,
    comments: 102,
    price: 189,
    carComfort: [3],
    selfInfo: "Меня зовут Валерий2, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники.",
    },
    {
    name: "Валерий3",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 2,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.8,
    comments: 107,
    price: 190,
    carComfort: [0,2,3],
    selfInfo: "Меня зовут Валерий3, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники.",
    },
    {
    name: "Валерий4",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 3,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.9,
    comments: 109,
    price: 187,
    carComfort: [0,1,4],
    selfInfo: "Меня зовут Валерий4, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники.",
    },
    {
    name: "Валерий5",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id:4,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 1.5,
    comments: 160,
    price: 186,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий5, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий6",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 5,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 1.5,
    comments: 103,
    price: 185,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий6, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий7",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 6,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.1,
    comments: 90,
    price: 184,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий7, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий8",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 7,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 0.5,
    comments: 10,
    price: 183,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий8, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий9",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 8,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 0.5,
    comments: 11,
    price: 182,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий9, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий10",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 9,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 0.1,
    comments: 1,
    price: 181,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий10, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий11",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 10,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 180,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий12",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 11,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 179,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий13",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 12,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 178,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий14",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 13,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий15",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 14,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий16",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 15,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий17",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 16,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий18",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 17,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий19",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 18,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий20",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 19,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий21",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 20,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий22",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 21,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий23",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 22,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий24",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 23,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий25",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 24,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 88,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий26",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 25,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 78,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий27",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 26,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 68,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий28",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 27,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 58,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий29",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 28,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 40,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий30",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 29,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 49,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий31",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 30,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 10,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий32",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 31,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий33",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 32,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий34",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 33,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий35",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 34,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий36",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 35,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий37",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 36,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий38",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 37,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий39",
    picture: "pictures/driver1/drivers_body_photo.png",
    
    age: 53,
    id: 38,
    language: [2,0],
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    rating: 2.5,
    comments: 100,
    price: 188,
    carComfort: [0,1,3],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },

      ],
}

export const DriversReduser = (state=initialState, action)=>{
    switch(action.type){
        case "SET_LENGTH_TIME":
        let newStateLT = {...state};
        newStateLT.travelTime=action.travelTime;
        newStateLT.travelLength=action.travelLength;
        return newStateLT;
        
        case SET_DRIVERS_ROUTE_CHANGE:{
            let newStateSDRC = {...state};
            newStateSDRC.driversRouteChange = action.driversRouteChange;
            return newStateSDRC;
        }
        case SET_PAGE:{
            let newState={...state};
            newState.page=action.page;
            newState.showPages=1;
            return newState;
        }
        case SET_MORE_PAGES_SHOW:{
            let newState={...state};
            newState.showPages=newState.showPages+1;
            newState.page=newState.page+1;
            return newState;
        }
        
        default: return state;
    }

}