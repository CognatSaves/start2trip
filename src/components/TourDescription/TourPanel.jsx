import React from 'react';
import '../Places/PlacesPanel.css';
import './TourDescription.css';
import { connect } from 'react-redux';
import checkBtUp from '../../redusers/GlobalFunction'

//import {changePanelFixedClass} from '../../redusers/ActionTours';

class TourPanelClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previousPageYOffset: null,
        }
         window.onscroll = (e) => {this.checkPanelFixed(e);checkBtUp(e,this)};
    }
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    componentDidMount() {
        this.checkPanelFixed();
    }
    checkPanelFixed = () => {
        console.log("checkPanelFixed");
        if (document.getElementById(this.props.topBlockId)) {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            let headerHeight = document.getElementById(this.props.topBlockId).scrollHeight;
            if (headerHeight > scrolled) {
                if (this.props.panelFixedClass !== "") {
                    this.props.dispatch(this.props.setPanelStateFunc/*changePanelFixedClass*/(""));
                }
            }
            else {
                if (this.props.panelFixedClass !== "tourPanelFixed") {
                    this.props.dispatch(this.props.setPanelStateFunc/*changePanelFixedClass*/("tourPanelFixed"));
                }
            }

            let distanceTop = headerHeight;
            let selected = -1;
            for (let i = 0; i < this.props.variantsArray.length; i++) {

                let pageElement = document.getElementById(this.props.descriptionId + (i + 1));
                let elementHeight = pageElement.offsetHeight;

                if (distanceTop - scrolled < 50) {
                    selected = i;
                }
                distanceTop = distanceTop + elementHeight;
            }
            if (/*this.state.selectedElement*/null !== selected) {
                this.props.dispatch(this.props.setPanelSelectedElement(selected));
            }
        }
        else {
            console.log("Функция отработки скролла завершает работу. Внимание - очищает все обработчики onscroll. Ф-ция лежит в компоненте TourPanel.");
            // window.onscroll = null;
        }

    }
    render() {
        console.log("TourPanel render");
        return (
            <React.Fragment>
                <div className={"tourPanel_panel driverProfileComments_panel d-flex "}>
                    {
                        this.props.variantsArray.map((element, index) => {
                            let indexOfRemovedElement;
                            let elementId = this.props.descriptionId + (index + 1);
                            if (this.props.removeElements && this.props.removeElements.length > 0) {
                                indexOfRemovedElement = this.props.removeElements.indexOf(elementId);
                            }
                            else {
                                indexOfRemovedElement = -1;
                            }
                            return (indexOfRemovedElement === -1 ?
                                <a className={this.props.panelSelectedElement === index ? "descriptionPanel_element tourPanel_element tourPanelSelected" :
                                    "descriptionPanel_element tourPanel_element"} href={"#" + elementId}>{element}</a>
                                :
                                <React.Fragment />)

                        }
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}
const TourPanel = connect(
)(TourPanelClass);

export default TourPanel;