import React from 'react';
import '../Places/PlacesPanel.css';
import './TourDescription.css';
import { connect } from 'react-redux';
import {checkBtUp} from '../../redusers/GlobalFunction'
import requests from '../../config';
import Stars from '../stars/Stars'

//import {changePanelFixedClass} from '../../redusers/ActionTours';

class TourPanelClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previousPageYOffset: null,
        }
        window.onscroll = (e) => { this.checkPanelFixed(e); checkBtUp(e, this) };
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

            let  eventObj =  document.getElementsByClassName("tourPanel_panel")
            eventObj = eventObj[0]
            
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
                if(selected===1){
                    eventObj.scrollLeft = 0
                }
                if(selected===2 && this.props.panelSelectedElement !== 2){
                    eventObj.scrollLeft = eventObj.offsetWidth/3
                }
                if(selected===3 && this.props.panelSelectedElement !== 3){
                    this.props.isTour ?
                    eventObj.scrollLeft = eventObj.offsetWidth/2
                    :
                    eventObj.scrollLeft = eventObj.offsetWidth+55
                }
                if(selected===4 && this.props.panelSelectedElement !== 4){
                    this.props.isTour ?
                    eventObj.scrollLeft = eventObj.offsetWidth+95
                    :
                    eventObj.scrollLeft = eventObj.offsetWidth*2
                }
                if(selected===5 && this.props.panelSelectedElement !== 5){
                    eventObj.scrollLeft = eventObj.offsetWidth*2
                }
                this.props.dispatch(this.props.setPanelSelectedElement(selected));
                
                
                //  эксперементы прокрутки TODO
                // let aasdsadsa = document.querySelector(".tourPanel_panel")
                // console.log(aasdsadsa)

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
            <>
                <div className="tourPanel_panel driverProfileComments_panel d-flex ">
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
                                    "descriptionPanel_element tourPanel_element"} href={"#" + elementId}>{this.props.isTour?(index===2?element[this.props.isGuide?0:1]:element):element}</a>
                                :
                                <React.Fragment />)

                        }
                        )
                    }
                    
                </div>
            </>
        )
    }
}
const TourPanel = connect(
)(TourPanelClass);

export default TourPanel;