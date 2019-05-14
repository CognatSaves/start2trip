import React from 'react';
import './SortMenu.css'
import { connect } from 'react-redux';
import { setSortMenu } from '../../../../../../redusers/Action'


class SortMenuClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
        }
    }

    deleteClass = (e) => {
        let deleteClass = document.querySelectorAll(".sortMenu_element");
        for (let i = 0; i < deleteClass.length; i++) {
            deleteClass[i].classList.remove("sortMenu_element_active");
        }
        e.currentTarget.classList.add("sortMenu_element_active")
    }

    render() {
        return (
            <div className="drivers_properties_sortMenu">
                {this.props.storeState.sortMenuVariants.map((element, index) =>
                    <div className="sortMenu_element" onClick={(e) => { this.props.dispatch(setSortMenu(element)); this.deleteClass(e) }}>
                        <span>{element}</span>
                    </div>
                )}
            </div>
        )
    }
}

const SortMenu = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(SortMenuClass);

export default SortMenu;
