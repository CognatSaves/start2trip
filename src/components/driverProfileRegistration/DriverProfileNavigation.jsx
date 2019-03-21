import React, { Component } from 'react';
import './DriverProfileNavigation.css'
import { connect } from 'react-redux';



class DriverProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Основная информация", "Автомобиль", "Настройки поездок", "Календарь", "Настройки", "Отзывы"],
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="driverProfileNavigationBody d-flex align-items-center">
                    {this.state.navigationText.map((element, index) =>
                        <div>
                            <p className="mb-0">{element}</p>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const DriverProfileNavigation = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileNavigationClass);

export default DriverProfileNavigation;