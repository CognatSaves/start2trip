import React from 'react';
import './DriverProfileNavigation.css'
import { connect } from 'react-redux';
import { whichPageRender } from "../../redusers/ActionDriverProfileRegistration"



class DriverProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Профиль", "Автомобиль", "Поездки", "Туры", "Календарь", "Настройки", "Отзывы"],
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="navigationBody d-flex align-items-center">
                    {this.state.navigationText.map((element, index) =>
                        <div>
                            <p className={{ [index]: "navigationBodyActive", }[this.props.storeState.pageRender] + " mb-0"} onClick={() => { this.props.dispatch(whichPageRender(index)) }}>{element}</p>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const DriverProfileNavigation = connect(
    (state) => ({
        storeState: state.DriverProfileRegistrationtReduser,
    }),
)(DriverProfileNavigationClass);

export default DriverProfileNavigation;