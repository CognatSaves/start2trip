import React, { Component } from 'react';
import './DriversBlock.css'
import './InfoBlock.css'
import './TripBlock.css'
import DriversBlockManipulator from './components/DriversBlockManipulator.js';
export default class DriversBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state={
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
      page: 1,
    };
    this.setPage=this.setPage.bind(this);
  }
  setPage(page){
    console.log("setPage called");
    console.log(page);
    console.log("elements now");
    console.log(this.state.drivers.length);
    this.setState(
      {
        page:page
      }
    )
  }
  render() {
    console.log("DriversBlock render");
    console.log("elements now:");
    console.log(this.state.drivers.length);
    let ageStep="____";
    let langStep="___''''''";
    let driverStep="___";
    let positionArray = [15, 240,465,690];


    let selectedElements = this.state.drivers.slice((this.state.page-1)*4,(this.state.page)*4);
  

    return (
      <div className = "drivers_block">
          {selectedElements.map((element, index) => 
            <div className = "drivers_block_element" style={{top: positionArray[index]}}>
              <div className="block_element_photo"/>
              <div className="block_element_infoBlock">
                <div className="block_element_infoBlock_name">{element.name}</div>
                <div className="block_element_infoBlock_age">
                  <div className="infoString">Возраст:</div>
                  <div className="visibleString">{element.age}</div>
                  <div className="hiddenString">{ageStep}</div>
                </div>
                <div className="block_element_infoBlock_language">
                  <div className="infoString">Языки:</div>
                  <div className="visibleString">{element.language}</div>
                  <div className="hiddenString">{langStep}</div>
                </div>
                <div className="block_element_infoBlock_drivingAge">
                  <div className="infoString">За рулём:</div>
                  <div className="visibleString">{element.drivingAge}</div>
                  <div className="hiddenString">{driverStep}</div>
                </div>                
              </div>
              <div className="block_element_tripBlock">
                <div className="tripBlock_carInfo">
                  <div className="tripBlock_carInfo_carImage"/>
                  <div className="tripBlock_carInfo_carData">                   
                    <div className="carBrand_style">{element.carBrand},</div>
                    <div className="hidden_enter_carBrand">_</div>
                    <div className="fuelType_style">{element.fuelType}</div>
                    <div className="carProps_style">{element.carProps}</div>
                  </div>
                  
                </div>
                <div className="tripBlock_buttonBlock">
                  <div className="tripBlock_buttonBlock_value">{element.price}</div>
                  <div className="tripBlock_buttonBlock_button">ЗАБРОНИРОВАТЬ ПОЕЗДКУ</div>
                  <div className="tripBlock_buttonBlock_commentary">Стоимость окончательная. Топливо включено</div>
                </div>
                <div className="tripBlock_detailed">Подробнее</div>
              </div>
              
            </div>     
          )}
          <DriversBlockManipulator number = {this.state.drivers.length} page = {this.state.page} setPage = {this.setPage}/>
      </div>

    )
  }

}
