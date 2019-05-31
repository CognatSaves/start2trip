import React from 'react';
import './SortMenu.css'
import { connect } from 'react-redux';
import { setSortMenu } from '../../../../../../redusers/Action'
import iconSortUp from './img/sortUp.svg'
import iconSortDown from './img/sortDown.svg'
import { isMobileOnly } from 'react-device-detect';


class SortMenuClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
        }
    }

    deleteClass = (e) => {
        let deleteClass = document.querySelectorAll(".sortMenu_element");
        let deleteClassIcon = document.querySelectorAll(".sortMenu_element_icon");
        for (let i = 0; i < deleteClass.length; i++) {
            deleteClass[i].classList.remove("sortMenu_element_active");
            deleteClassIcon[i].classList.remove("sortMenu_element_active");
        }
        e.currentTarget.classList.add("sortMenu_element_active")
        e.currentTarget.children[1].classList.add("sortMenu_element_active")
    }

    render() {
        return (
            <React.Fragment>
            {isMobileOnly ?
            <div className={this.props.isVisible ? "driver_sortMenu_mobail driver_sortMenu_mobail-active":"driver_sortMenu_mobail"}>
                {this.props.storeState.sortMenuVariantsMobail.map((element, index) =>
                    <div style={{border:"none"}} className={index ? "sortMenu_element" : "sortMenu_element sortMenu_element_active"} onClick={(e) => { this.props.dispatch(setSortMenu(element, !this.props.storeState.sortMenuWay)); this.deleteClass(e); this.props.click() }}>
                        <span>{element}</span>
                        <i className="sortMenu_element_icon sortMenu_element_active"/>
                    </div>
                )}
            </div>
            :
            <div className="drivers_properties_sortMenu">
                {this.props.storeState.sortMenuVariants.map((element, index) =>
                    <div className={index ? "sortMenu_element" : "sortMenu_element sortMenu_element_active"} onClick={(e) => { this.props.dispatch(setSortMenu(element, !this.props.storeState.sortMenuWay)); this.deleteClass(e) }}>
                        <span>{element}</span>
                        <i className="sortMenu_element_icon sortMenu_element_active" style={!index ? { background: this.props.storeState.sortMenuWay ? "url(" + iconSortDown + ") no-repeat" : "url(" + iconSortUp + ") no-repeat " } : { display: "none" }} />
                    </div>
                )}
            </div>
            }
            </React.Fragment>
        )
    }
}

const SortMenu = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(SortMenuClass);

export default SortMenu;
