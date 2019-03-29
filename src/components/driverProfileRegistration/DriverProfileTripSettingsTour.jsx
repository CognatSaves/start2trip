import React, { Component } from 'react';
import './DriverProfileTripSettingsTour.css'
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';



class DriverProfileTripSettingsTourClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }



    render() {
        return (
            <div>
                <div style={{ opacity: this.state.collapse ? "0" : "1" }} className="col-12 d-flex justify-content-center p-0">
                    <button className="addTourShow" onClick={this.toggle}>Добавить Тур</button>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <div className="driverProfileTripSettingsBody">
                        <div className="driverProfileTripSettingsTourContent col-12">
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Добавление тура</p>
                            </div>
                            <div className="d-flex align-items-center mb-0">
                                <p className="col-3 pl-0">Название тура:</p>
                                <input type="text" />
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Маршрут</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center mb-0">
                                {
                                    <div className="mb-0">
                                        <div className="d-flex align-items-center">
                                            <p className="col-3 pl-0">Населённый пункт:</p>
                                            <input type="text" />
                                        </div>
                                        <div className="d-flex align-items-start mb-0">
                                            <p className="col-3 pl-0">Описание:</p>
                                            <textarea name="" id="" cols="30" rows="10"></textarea>
                                        </div>
                                    </div>
                                }
                                <div className="tourContentAdd d-flex justify-content-center col-9 pl-0 mb-0">
                                    <p className="pl-1">+ Добавить населённый пункт</p>
                                </div>
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Расписание</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <input type="checkbox" />
                                <span className="p-1">Нет конкретных дат</span><p>(индивидуальные даты или даты по запросу)</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center mb-0">
                                {
                                    <div className="d-flex align-items-center mb-0">
                                        <p className="col-3 pl-0">Дата отправления:</p>
                                        <input type="text" />
                                        <input type="text" />
                                        <input type="text" />
                                    </div>
                                }
                                <div className="tourContentAdd d-flex justify-content-center col-7 pl-5 mb-0">
                                    <p className="pl-2">+ Добавить даты</p>
                                </div>
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Дополнительная информация</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 pl-0">Стоимость тура:</p>
                                <input type="text" />
                                <input type="text" />
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 pl-0">Тип транспорта:</p>
                                <input type="text" />
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 pl-0">Количество мест:</p>
                                <input type="text" />
                            </div>
                            <div className="d-flex align-items-start">
                                <p className="col-3 pl-0">Дополнительное описание:</p>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 pl-0">Загрузить фото:</p>
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                            </div>
                            <button>ДОБАВИТЬ ТУР</button>
                        </div>
                    </div>
                </Collapse>
                <div className="driverProfileTripSettingsTourContent">
                    <div className="d-flex align-items-center">
                        <p>Ваши туры</p>
                    </div>
                    <div className="d-flex align-items-center"></div>
                </div>
            </div>
        );
    }
}

const DriverProfileTripSettingsTour = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTourClass);

export default DriverProfileTripSettingsTour;