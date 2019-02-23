const initialState = {
    travelTime: '',
    travelLength: '',
    drivers: [//на данный момент адреса картинок не используются, всё прописано статически в css. Названия хранятся как декорации))))
        {
            name: "Валерий1",
            picture: "pictures/driver1/drivers_body_photo.png",
            age: 53,
            language: "Грузинский, Русский",
            drivingAge: "Более 20 лет", //как хранить?
            carImage: "pictures/driver1/drivers_car_image.png",
            carBrand: "Toyota Prius",
            fuelType: "бензин",
            carProps: "Седан, 4 места",
            price: "$188"
        },
        {
          name: "Валерий2",
            picture: "pictures/driver1/drivers_body_photo.png",
            age: 53,
            language: "Грузинский, Русский",
            drivingAge: "Более 20 лет", //как хранить?
            carImage: "pictures/driver1/drivers_car_image.png",
            carBrand: "Toyota Prius",
            fuelType: "бензин",
            carProps: "Седан, 4 места",
            price: "$188"
        },
        {
          name: "Валерий3",
            picture: "pictures/driver1/drivers_body_photo.png",
            age: 53,
            language: "Грузинский, Русский",
            drivingAge: "Более 20 лет", //как хранить?
            carImage: "pictures/driver1/drivers_car_image.png",
            carBrand: "Toyota Prius",
            fuelType: "бензин",
            carProps: "Седан, 4 места",
            price: "$188"
        },
        {
          name: "Валерий4",
            picture: "pictures/driver1/drivers_body_photo.png",
            age: 53,
            language: "Грузинский, Русский",
            drivingAge: "Более 20 лет", //как хранить?
            carImage: "pictures/driver1/drivers_car_image.png",
            carBrand: "Toyota Prius",
            fuelType: "бензин",
            carProps: "Седан, 4 места",
            price: "$188"
        },
        {
          name: "Валерий5",
          picture: "pictures/driver1/drivers_body_photo.png",
          age: 53,
          language: "Грузинский, Русский",
          drivingAge: "Более 20 лет", //как хранить?
          carImage: "pictures/driver1/drivers_car_image.png",
          carBrand: "Toyota Prius",
          fuelType: "бензин",
          carProps: "Седан, 4 места",
          price: "$188"
      },
      {
        name: "Валерий6",
          picture: "pictures/driver1/drivers_body_photo.png",
          age: 53,
          language: "Грузинский, Русский",
          drivingAge: "Более 20 лет", //как хранить?
          carImage: "pictures/driver1/drivers_car_image.png",
          carBrand: "Toyota Prius",
          fuelType: "бензин",
          carProps: "Седан, 4 места",
          price: "$188"
      },
      {
        name: "Валерий7",
          picture: "pictures/driver1/drivers_body_photo.png",
          age: 53,
          language: "Грузинский, Русский",
          drivingAge: "Более 20 лет", //как хранить?
          carImage: "pictures/driver1/drivers_car_image.png",
          carBrand: "Toyota Prius",
          fuelType: "бензин",
          carProps: "Седан, 4 места",
          price: "$188"
      },
      {
        name: "Валерий8",
          picture: "pictures/driver1/drivers_body_photo.png",
          age: 53,
          language: "Грузинский, Русский",
          drivingAge: "Более 20 лет", //как хранить?
          carImage: "pictures/driver1/drivers_car_image.png",
          carBrand: "Toyota Prius",
          fuelType: "бензин",
          carProps: "Седан, 4 места",
          price: "$188"
      },
      {
        name: "Валерий9",
        picture: "pictures/driver1/drivers_body_photo.png",
        age: 53,
        language: "Грузинский, Русский",
        drivingAge: "Более 20 лет", //как хранить?
        carImage: "pictures/driver1/drivers_car_image.png",
        carBrand: "Toyota Prius",
        fuelType: "бензин",
        carProps: "Седан, 4 места",
        price: "$188"
    },
    {
      name: "Валерий10",
        picture: "pictures/driver1/drivers_body_photo.png",
        age: 53,
        language: "Грузинский, Русский",
        drivingAge: "Более 20 лет", //как хранить?
        carImage: "pictures/driver1/drivers_car_image.png",
        carBrand: "Toyota Prius",
        fuelType: "бензин",
        carProps: "Седан, 4 места",
        price: "$188"
    },
    {
      name: "Валерий11",
        picture: "pictures/driver1/drivers_body_photo.png",
        age: 53,
        language: "Грузинский, Русский",
        drivingAge: "Более 20 лет", //как хранить?
        carImage: "pictures/driver1/drivers_car_image.png",
        carBrand: "Toyota Prius",
        fuelType: "бензин",
        carProps: "Седан, 4 места",
        price: "$188"
    },
    {
      name: "Валерий12",
        picture: "pictures/driver1/drivers_body_photo.png",
        age: 53,
        language: "Грузинский, Русский",
        drivingAge: "Более 20 лет", //как хранить?
        carImage: "pictures/driver1/drivers_car_image.png",
        carBrand: "Toyota Prius",
        fuelType: "бензин",
        carProps: "Седан, 4 места",
        price: "$188"
    },
    {
      name: "Валерий13",
      picture: "pictures/driver1/drivers_body_photo.png",
      age: 53,
      language: "Грузинский, Русский",
      drivingAge: "Более 20 лет", //как хранить?
      carImage: "pictures/driver1/drivers_car_image.png",
      carBrand: "Toyota Prius",
      fuelType: "бензин",
      carProps: "Седан, 4 места",
      price: "$188"
  },
  {
    name: "Валерий14",
      picture: "pictures/driver1/drivers_body_photo.png",
      age: 53,
      language: "Грузинский, Русский",
      drivingAge: "Более 20 лет", //как хранить?
      carImage: "pictures/driver1/drivers_car_image.png",
      carBrand: "Toyota Prius",
      fuelType: "бензин",
      carProps: "Седан, 4 места",
      price: "$188"
  },
  {
    name: "Валерий15",
      picture: "pictures/driver1/drivers_body_photo.png",
      age: 53,
      language: "Грузинский, Русский",
      drivingAge: "Более 20 лет", //как хранить?
      carImage: "pictures/driver1/drivers_car_image.png",
      carBrand: "Toyota Prius",
      fuelType: "бензин",
      carProps: "Седан, 4 места",
      price: "$188"
  },
  {
    name: "Валерий16",
      picture: "pictures/driver1/drivers_body_photo.png",
      age: 53,
      language: "Грузинский, Русский",
      drivingAge: "Более 20 лет", //как хранить?
      carImage: "pictures/driver1/drivers_car_image.png",
      carBrand: "Toyota Prius",
      fuelType: "бензин",
      carProps: "Седан, 4 места",
      price: "$188"
  },
  {
    name: "Валерий17",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: "Более 20 лет", //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carProps: "Седан, 4 места",
    price: "$188"
},
{
  name: "Валерий18",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: "Более 20 лет", //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carProps: "Седан, 4 места",
    price: "$188"
},
{
  name: "Валерий19",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: "Более 20 лет", //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carProps: "Седан, 4 места",
    price: "$188"
},
{
  name: "Валерий20",
    picture: "pictures/driver1/drivers_body_photo.png",
    age: 53,
    language: "Грузинский, Русский",
    drivingAge: "Более 20 лет", //как хранить?
    carImage: "pictures/driver1/drivers_car_image.png",
    carBrand: "Toyota Prius",
    fuelType: "бензин",
    carProps: "Седан, 4 места",
    price: "$188"
},
{
  name: "Валерий21",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий22",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий23",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий24",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий25",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий26",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий27",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий28",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий29",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий30",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий31",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий32",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий33",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий34",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий35",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий36",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий37",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий38",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},
{
name: "Валерий39",
  picture: "pictures/driver1/drivers_body_photo.png",
  age: 53,
  language: "Грузинский, Русский",
  drivingAge: "Более 20 лет", //как хранить?
  carImage: "pictures/driver1/drivers_car_image.png",
  carBrand: "Toyota Prius",
  fuelType: "бензин",
  carProps: "Седан, 4 места",
  price: "$188"
},

      ],
}

export const DriversReduser = (state=initialState, action)=>{
    switch(action.type){
        case "SET_LENGTH_TIME":
        let newStateLT = JSON.parse(JSON.stringify(state));
        newStateLT.travelTime=action.travelTime;
        newStateLT.travelLength=action.travelLength;
        return newStateLT;

        default: return state;
    }

}