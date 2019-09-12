import React from 'react';
import './PagesMenu.css'
import { connect } from 'react-redux';

class PagesMenuClass extends React.Component {
    /*constructor(props){
        super(props);
    }*/

    render() {
        if (this.props.isVisible) {
            return (
                <div className="drivers_properties_pagesMenu">
                    {this.props.storeState.pagesMenuVariants.map((element, index) =>
                        <div className="pagesMenu_element" key={element}>
                            <div className="pagesMenu_element_text" onClick={() => this.props.dispatch(this.props.setPages(element))}>
                                <div className="pagesMenu_element_text_value">{element}</div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
        else {
            return (
                <React.Fragment />
            )
        }
    }
}

const PagesMenu = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(PagesMenuClass);

export default PagesMenu;