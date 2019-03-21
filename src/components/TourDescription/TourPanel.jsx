import React from 'react';
import '../Places/PlacesPanel.css';
import './TourDescription.css';
import { connect } from 'react-redux';

//import {changePanelFixedClass} from '../../redusers/ActionTours';

class TourPanelClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            variantsArray:this.props.variantsArray
        }
        this.checkPanelFixed=this.checkPanelFixed.bind(this);
        window.onscroll = (e)=>this.checkPanelFixed(e);
    }
    shouldComponentUpdate(nextProps){ 
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    checkPanelFixed(){
        console.log("checkPanelFixed");
        if(document.getElementById(this.props.topBlockId)){
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            let headerHeight = document.getElementById(this.props.topBlockId).scrollHeight;
            if(headerHeight>scrolled)
            {
                if(this.props.panelFixedClass!==""){
                    this.props.dispatch(this.props.setPanelStateFunc/*changePanelFixedClass*/(""));
                }           
            }
            else{
                if(this.props.panelFixedClass!=="tourPanelFixed"){
                    this.props.dispatch(this.props.setPanelStateFunc/*changePanelFixedClass*/("tourPanelFixed"));
                }
            }
            
            let distanceTop = headerHeight;
            let selected = 0;
            for(let i=1; i<=this.state.variantsArray.length; i++){
                //console.log(i);
                
                let pageElement = document.getElementById(this.props.descriptionId+i);
                let elementHeight = pageElement.offsetHeight;
                
                if(distanceTop-scrolled<20 ){
                    
                    selected=i;
                }  
                distanceTop=distanceTop+elementHeight; 
            }
            console.log("scrolled");
            console.log(scrolled);
            console.log(selected+" element transport");
            //console.log(distanceTop);
        }
        else{
            console.log("Функция отработки скролла завершает работу. Внимание - очищает все обработчики onscroll. Ф-ция лежит в компоненте TourPanel.");
            window.onscroll = null;
        }
        
    }
    render(){
        
        return(
            <React.Fragment>
            <div className={"driverProfileComments_panel d-flex "+this.props.panelFixedClass}>
                {
                    this.state.variantsArray.map((element,index) =>                    
                        <a className={"driverProfileComments_panel_element tourPanel_element"} href={"#"+this.props.descriptionId+(index+1)}>{element}</a>
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