import React from 'react';
import './DriverProfileCar.css'
import { connect } from 'react-redux';
import imgCar from './img/images.jpeg'
import sedanIcon from './img/sedan.svg'
import no_smokingIcon from './img/no-smoking.svg'
import seatIcon from './img/seat.svg'
import snowflakeIcon from './img/snowflake.svg'
import wifiIcon from './img/wifi.svg'
import { Collapse } from 'reactstrap';



class DriverProfileCarClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: {
                month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"],
            },
            dataNumber: [],
            dataYear: [],
            language: ["Грузинский", "Русский", "Корейский", "Хинди"],
            seat: { icon: seatIcon, title: "Кожаный салон" },
            snowflake: { icon: snowflakeIcon, title: "Климот контроль" },
            wifi: { icon: wifiIcon, title: "Бесплатный Wi-Fi" },
            no_smoking: { icon: no_smokingIcon, title: "Курение в салоне запрещено" },
            smoking: { icon: no_smokingIcon, title: "Курение в салоне разрешено" },
            comfort: [],
            carImg: [],
            file: '',
            imagePreviewUrl: '',
            collapse: false,
            newCarCard: { nameCar: "", yearCar: "", plateNumberCar: "", typeCar: "", flueType: "" },
            car: ["", "", "", "", "",]
        }
        this.toggle = this.toggle.bind(this);
        this.getMassNumbers.bind(this);
        this.getMassYear.bind(this);
        this.addNum = this.addNum.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event) {
        debugger
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse, imagePreviewUrl: '', newCarCard: { nameCar: "", yearCar: "", plateNumberCar: "", typeCar: "", flueType: "" }, comfort: [], carImg: [], }));
    }

    getMassNumbers(num) {
        let number = [];
        for (let i = 1; i < num; i++) {
            number.push(i)
        }
        return number;
    }

    getMassYear(num) {
        let number = [];
        for (let i = num; i < 2019; i++) {
            number.push(i)
        }
        return number;
    }

    addNum() {
        let newDataNumber = this.getMassNumbers(31);
        let newdataYear = this.getMassYear(1919);
        this.setState({
            dataNumber: newDataNumber,
            dataYear: newdataYear,
        })
    }
    componentDidMount() {
        this.addNum();
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
            this.setState(state => { const carImg = state.carImg.push(reader.result); return carImg });
        }

        reader.readAsDataURL(file)
    }


    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="carAddNewCarPhotoCarImg" alt="add_car" />);
        }

        return (
            <div >
                <div style={{ opacity: this.state.collapse ? "0" : "1" }} className="col-12 d-flex justify-content-center mt-md-0 mt-sm-4 mt-4">
                    <button className="carShowButton" onClick={this.toggle}>Добавить Автомобиль</button>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <div className="carAddNewCar d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-start align-items-lg-start align-items-md-start align-items-sm-center align-items-center">
                        <div className="carAddNewCarPhotoCar col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " >
                            {$imagePreview}
                            <label htmlFor="addCarFile" >+Добавить фото автомобиля</label>
                            <input type="file" id="addCarFile" style={{ display: "none" }} onChange={this._handleImageChange} required/>
                        </div>
                        <form onSubmit={this.handleSubmit} id="newCar" className="carAddNewCarInformation d-flex flex-column col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11 p-0">
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-3 mt-2">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Марка автомобиля:</p>
                                <input value={this.state.newCarCard.nameCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, nameCar: e.currentTarget.value }
                                    })
                                }} type="text" required/>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-3">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Год автомобиля:</p>
                                <input value={this.state.newCarCard.yearCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, yearCar: e.currentTarget.value }
                                    })
                                }} type="text" required/>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-3">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Номер автомобиля:</p>
                                <input value={this.state.newCarCard.plateNumberCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, plateNumberCar: e.currentTarget.value }
                                    })
                                }} type="text" required/>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-3">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Тип автомобиля:</p>
                                <select value={this.state.newCarCard.typeCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, typeCar: e.currentTarget.value }
                                    })
                                }} name="typeCar">
                                    <option value="sedan">Седан</option>
                                    <option value="microbus">Микроавтобус</option>
                                    <option value="minivan">Минивэн</option>
                                    <option value="jeep">Внедорожник</option>
                                </select>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-3">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Тип топлива:</p>
                                <select value={this.state.newCarCard.flueType} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, flueType: e.currentTarget.value }
                                    }); console.log(this.state.carImg)
                                }} name="typeFuel">
                                    <option value="petrol">Бензин</option>
                                    <option value="diesel">Дизель</option>
                                    <option value="gas">Газ</option>
                                    <option value="hybrid">Гибрид</option>
                                </select>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start mb-3">
                                <p className="col-4 p-0">Удобства:</p>
                                <div className="carAddNewCarComfortCheckBox d-flex flex-column pt-1">
                                    <label htmlFor="comfort1">Климат контроль
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.snowflake); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.snowflake), 1); return comfort })
                                        }} type="checkbox" id="comfort1" />
                                        <span />
                                    </label>
                                    <label htmlFor="comfort2">Кожаный салон
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.seat); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.seat), 1); return comfort })
                                        }} type="checkbox" id="comfort2" />
                                        <span />
                                    </label>
                                    <label htmlFor="comfort3">Бесплатный Wi-Fi
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.wifi); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.wifi), 1); return comfort })
                                        }} type="checkbox" id="comfort3" />
                                        <span />
                                    </label>
                                    <label htmlFor="comfort4">Курение в салоне запрещено
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.no_smoking); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.no_smoking), 1); return comfort })
                                        }} type="checkbox" id="comfort4" />
                                        <span />
                                    </label>
                                    <label htmlFor="comfort5">Курение в салоне разрешено
                                <input onClick={(e) => {
                                            e.currentTarget.checked
                                                ? this.setState(state => { const comfort = state.comfort.push(this.state.smoking); return comfort })
                                                : this.setState(state => { const comfort = state.comfort.splice(state.comfort.indexOf(this.state.smoking), 1); return comfort })
                                        }} type="checkbox" id="comfort5" />
                                        <span />
                                    </label>
                                </div>
                            </div>
                            <div className="carAddNewCarButton d-flex align-items-end mb-5">
                                <p className="col-4 p-0"></p>
                                <button htmlFor="newCar" type="submit">Добавить Автомобиль</button>
                                <p className="ml-3" onClick={this.toggle}>Отмена</p>
                            </div>
                        </form>
                    </div>
                </Collapse>

                <div className="filledCardBody p-0 d-flex flex-wrap col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                    {this.state.car.map((element, index) =>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 p-2">
                            <div className="filledCard d-flex flex-column p-0">
                                <div className="filledCardInformation d-flex flex-column">
                                    <div className="filledCardInformationNameCar d-flex justify-content-end w-100 align-items-center">
                                        <label className="cardInformationNameCarIcon"></label>
                                        <div className="filledCardInformationMenu">
                                            <p className="filledCardInformationDeleteCar">Удалить</p>
                                            <p className="filledCardInformationNameCarEdit">Редактировать</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="filledCardImg">
                                    <img src={imgCar} className="img-fluid" alt="imgCar" width="100%" height="100%" />
                                </div>
                                <div className="cardInformationType d-flex flex-column">
                                    <p>Toyota Land Cruiser Prado 3.0d</p>
                                    <div className="cardInformation d-flex">
                                        <p style={{ backgroundImage: `url(${sedanIcon})` }} >Внедорожник</p>
                                        <span>, 4 места</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }
}

const DriverProfileCar = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileCarClass);

export default DriverProfileCar;



{/* <div className="filledCardInformationComfortImg d-flex align-items-center">
                                    {this.state.comfort.map((element, index) =>
                                        <img src={element.icon} width="18px" height="18px" title={element.title} alt="icon" />
                                    )}
                                </div> */}