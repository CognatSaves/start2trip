import React from 'react';
import './DriverProfileBasicInformation.css'
import { connect } from 'react-redux'



class DriverProfileBasicInformationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: {
                month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"],
            },
            dataNumber: [],
            dataYear: [],
            language: ["Грузинский", "Русский", "Корейский", "Хинди"],

        }
        this.getMassNumbers.bind(this);
        this.getMassYear.bind(this);
        this.addNum.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event) {
        debugger
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
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
        for (let i = num; i > 1919; i--) {
            number.push(i)
        }
        return number;
    }

    addNum() {
        let newDataNumber = this.getMassNumbers(32);
        let newdataYear = this.getMassYear(2019);
        this.setState({
            dataNumber: newDataNumber,
            dataYear: newdataYear,
        })
    }
    componentDidMount() {
        this.addNum();
    }

    render() {

        return (
            <div className="basicInformationBody d-flex flex-column">
                <div className="basicInformationBodyBottom d-flex flex-column mb-5 p-0">
                    <div className="basicInformationBodyBottomHeader d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <p>Редактировать профиль</p>
                    </div>
                    <div className="basicInformationBodyBottomContent d-flex">
                        <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none flex-column col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                            <p>Имя:</p>
                            <p>Фамилия:</p>
                            <p>Дата рождения:</p>
                            <p>Номер паспорта:</p>
                            <p>Дата выдачи:</p>
                            <p>Родной город:</p>
                            <p>Языки:</p>
                            <p>О себе:</p>
                        </div>
                        <form onSubmit={this.formSubmit} id="basicInformation" className="d-flex flex-column col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" >
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Lorem ipsum dolor sit 1.</p>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Имя:</p>
                            <input type="text" required />
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Фамилия:</p>
                            <input type="text" required />
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Lorem ipsum dolor sit 2.</p>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Дата рождения:</p>
                            <div className="d-flex justify-content-between">
                                <select className=" mr-1" name="number" >
                                    {this.state.dataNumber.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                                <select className=" mr-1" name="month" >
                                    {this.state.date.month.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                                <select className="" name="year" >
                                    {this.state.dataYear.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </div>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Lorem ipsum dolor sit 3.</p>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Номер паспорта:</p>
                            <input type="text" placeholder="12121215" required />
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Lorem ipsum dolor sit 4.</p>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Дата выдачи:</p>
                            <div className="d-flex justify-content-between">
                                <select className="mr-1" name="number" >
                                    {this.state.dataNumber.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                                <select className="mr-1" name="month" >
                                    {this.state.date.month.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                                <select className="" name="year" >
                                    {this.state.dataYear.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </div>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Lorem ipsum dolor sit amet 5.</p>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Страна проживания:</p>
                            <input className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0" type="text" required />
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Lorem ipsum dolor sit amet 6.</p>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Родной город:</p>
                            <div className="d-flex">
                                <select className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-6 mr-1" name="country" >
                                    <option value="Грузия">Грузия</option>
                                </select>
                                <input className="w-100" type="text" required />
                            </div>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Lorem ipsum dolor sit amet 7.</p>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Языки:</p>
                            <select className="w-100" name="language" required>
                                {this.state.language.map((element, index) =>
                                    <option value={element}>{element}</option>
                                )}
                            </select>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Lorem ipsum dolor sit amet 8.</p>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">О себе:</p>
                            <textarea name="" id="" cols="30" rows="3" required></textarea>
                            <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center ">
                                <button className="col-8 mb-5" htmlFor="basicInformation" type="submit">Сохранить Изменения</button>
                            </div>
                        </form>
                        <div className="bottomContentNote d-xl-flex d-lg-flex d-md-flex d-sm-none d-none flex-column col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">
                            <p className="mb-xl-5 mb-lg-5 mb-md-5">В вашем публичном профиле отображается только ваше имя. Когда вы запросите бронирование, водитель увидит ваши имя и фамилию.</p>
                            <p className="mt-xl-4 mt-lg-4 mb-mt-4">Мы используем эти данные только для анализа и никогда ни с кем ими не делимся.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cumque incidunt adipisci ullam omnis officia?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cumque incidunt adipisci ullam omnis officia?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cumque incidunt adipisci ullam omnis officia?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cumque incidunt adipisci ullam omnis officia?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cumque incidunt adipisci ullam omnis officia?</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileBasicInformation = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileBasicInformationClass);

export default DriverProfileBasicInformation;