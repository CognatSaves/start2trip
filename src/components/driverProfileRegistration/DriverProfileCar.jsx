import React from 'react';
import './DriverProfileCar.css'
import { connect } from 'react-redux';
import imgCar from './img/images.jpeg'
import q from './img/q.jpg'
import w from './img/w.jpg'
import e from './img/e.jpg'
import r from './img/r.jpg'
import t from './img/t.jpg'
import sedanIcon from './img/sedan.svg'
import no_smokingIcon from './img/no-smoking.svg'
import seatIcon from './img/seat.svg'
import snowflakeIcon from './img/snowflake.svg'
import wifiIcon from './img/wifi.svg'
import { Collapse } from 'reactstrap';
import { isMobile } from 'react-device-detect';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';



class DriverProfileCarClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            car: [q, imgCar, e, r, t,]
        }
        this.toggle = this.toggle.bind(this);
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
        if (isMobile) {
            window.scroll(0, 300);
        } else {
            window.scroll(0, 322);
        }

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

    handleChange = (event, index, value) => {
        if (value == "petrol" || value == "diesel" || value == "gas") {
            this.setState({
                newCarCard: { ...this.state.newCarCard, flueType: value }
            })
        } else {
            this.setState({
                newCarCard: { ...this.state.newCarCard, typeCar: value }
            })
        }

    };


    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="carAddNewCarPhotoCarImg" alt="add_car" />);
        }

        return (
            <div className="_ThisTagIsNeeded">
                <Collapse isOpen={this.state.collapse}>
                    <div className="carAddNewCar d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-start align-items-lg-start align-items-md-start align-items-sm-center align-items-center">
                        <div className="carAddNewCarPhotoCar col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " >
                            {$imagePreview}
                            <label htmlFor="addCarFile" >+Добавить фото автомобиля</label>
                            <input type="file" id="addCarFile" style={{ display: "none" }} onChange={this._handleImageChange} required />
                        </div>
                        <form onSubmit={this.handleSubmit} id="newCar" className="carAddNewCarInformation d-flex flex-column col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11 p-0">
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mt-2">
                                <label htmlFor="profileCarBrend" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Марка автомобиля:</label>
                                <input id="profileCarBrend" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.nameCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, nameCar: e.currentTarget.value }
                                    })
                                }} type="text" />
                                <TextField
                                    value={this.state.newCarCard.nameCar}
                                    onChange={(e) => {
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, nameCar: e.currentTarget.value }
                                        })
                                    }}
                                    hintText="Напишите марку автомобиля"
                                    floatingLabelText="Марка автомобиля"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}

                                />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="profileCarYaer" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Год автомобиля:</label>
                                <input id="profileCarYaer" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.yearCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, yearCar: e.currentTarget.value }
                                    })
                                }} type="text" />
                                <TextField
                                    value={this.state.newCarCard.yearCar}
                                    onChange={(e) => {
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, yearCar: e.currentTarget.value }
                                        })
                                    }}
                                    hintText="Напишите год автомобиля"
                                    floatingLabelText="Год автомобиля"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}

                                />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="profileCarNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Номер автомобиля:</label>
                                <input id="profileCarNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.plateNumberCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, plateNumberCar: e.currentTarget.value }
                                    })
                                }} type="text" required />
                                <TextField
                                    value={this.state.newCarCard.plateNumberCar}
                                    onChange={(e) => {
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, plateNumberCar: e.currentTarget.value }
                                        })
                                    }}
                                    hintText="Напишите номер автомобиля"
                                    floatingLabelText="Номер автомобиля"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}

                                />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flsex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Тип автомобиля:</label>
                                <DropDownMenu
                                    value={this.state.newCarCard.typeCar}
                                    textColor= "#fff"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                                    className=""
                                    onChange={this.handleChange}
                                    style={{ width: "100%" }}
                                    className="dropdownClass"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                    name="typeCar"
                                >
                                    <MenuItem value={"sedan"} primaryText={"Седан"} />
                                    <MenuItem value={"microbus"} primaryText={"Микроавтобус"} />
                                    <MenuItem value={"minivan"} primaryText={"Минивэн"} />
                                    <MenuItem value={"jeep"} primaryText={"Внедорожник"} />

                                </DropDownMenu>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Тип топлива:</label>
                                <DropDownMenu
                                    value={this.state.newCarCard.flueType}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                                    className=""
                                    onChange={this.handleChange}
                                    style={{ width: "100%" }}
                                    className="dropdownClass"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                    name="typeFuel"
                                >
                                    <MenuItem value={"petrol"} primaryText={"Бензин"} />
                                    <MenuItem value={"diesel"} primaryText={"Дизель"} />
                                    <MenuItem value={"gas"} primaryText={"Газ"} />

                                </DropDownMenu>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start mt-2 mb-3">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-4 p-0">Удобства:</label>
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
                            <div className="carAddNewCarButton d-flex align-items-center mb-5">
                                <span className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-4 p-0" />
                                <button htmlFor="newCar" type="submit">Добавить Автомобиль</button>
                                <span className="ml-3" onClick={this.toggle}>Отмена</span>
                            </div>
                        </form>
                    </div>
                </Collapse>

                <div className="filledCardBody p-0 d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 " >
                    <div style={{ display: this.state.collapse ? "none" : "block" }} onClick={this.toggle} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" >
                        <div className="filledCard d-flex flex-column p-0">
                            <div className="filledCardImgAdd d-flex justify-content-center align-items-center">
                                <div className="filledCardImgAddBg">
                                    <span />
                                </div>
                            </div>
                            <div className="cardInformationType d-flex flex-column align-items-center justify-content-center">
                                <p>Добавить автомобиль</p>
                            </div>
                        </div>
                    </div>
                    {this.state.car.map((element, index) =>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
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
                                    <img src={element} className="img-fluid" alt="imgCar" width="100%" height="100%" />
                                </div>
                                <div className="cardInformationType d-flex flex-column">
                                    <p>Toyota Land Cruiser Prado 3.0d</p>
                                    <div className="cardInformation d-flex">
                                        <p>Внедорожник</p>
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