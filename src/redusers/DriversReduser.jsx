const initialState = {
    travelTime: '',
    travelLength: '',
    drivers: [//на данный момент адреса картинок не используются, всё прописано статически в css. Названия хранятся как декорации))))
    {
    name: "Валерий1",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский, Корейский, Хинди ",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,false,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники.",
    },
    {
    name: "Валерий2",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,false,true],
    selfInfo: "Меня зовут Валерий2, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники.",
    },
    {
    name: "Валерий3",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [false,true,true,true],
    selfInfo: "Меня зовут Валерий3, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники.",
    },
    {
    name: "Валерий4",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,false],
    selfInfo: "Меня зовут Валерий4, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники.",
    },
    {
    name: "Валерий5",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий5, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий6",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий6, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий7",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий7, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий8",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий8, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий9",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий9, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий10",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий10, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий11",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий12",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий13",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий14",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий15",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий16",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий17",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий18",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий19",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий20",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий21",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий22",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий23",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий24",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий25",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий26",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий27",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий28",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий29",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий30",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий31",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий32",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий33",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий34",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий35",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий36",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий37",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий38",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
    selfInfo: "Меня зовут Валерий1, но обычно я сам прихожу. По образованию журналист (ТГУ), историк литературы (Институт литературы АН Грузии). Интересуюсь архитектурой, историей Южного Кавказа, кулинарией. В ходе поездки Вы насладитесь духом грузинских старостей, увидите исторические и религиозные памятники."
    },
    {
    name: "Валерий39",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: 20, //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carType: "Седан",
    carCapacity: 4,
    price: 188,
    carComfort: [true,true,true,true],
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

        default: return state;
    }

}