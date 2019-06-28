import React from 'react';
import Carousel from '../driverProfile/Carousel';
import requests from '../../config';

export default class PlacePhotos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShortPhotos:true,
            update:0
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps)) || JSON.stringify(nextState)!==JSON.stringify(this.state);
    }
    
    photoStateChange = (value) => {
        this.setState({
            isShortPhotos: value
        });
    }
    render(){
        
        console.log('placePhotos render');
        console.log(this.state.update);
        console.log(this.props.photoArray);
        var isOver=false;
        let photoBlock = document.getElementById("photoBlock");
        var widthSum = 0;
        let maxWidth = photoBlock ? photoBlock.offsetWidth*2 : 0;
        //alert('start render');
        return (
            <React.Fragment>
                {
                    /*

                    <Carousel photoArray={this.props.photoArray} width={this.props.width} height={this.props.height}
                        widthCarouselEl={this.props.width/this.props.number}
                        heightCarouselEl={this.props.height/this.props.number} type={"horisontal"}
                    />

                    */
                }
                
                <div id="photoBlock" className="d-flex flex-wrap col-12">
                {
                    this.props.photoArray.map((element, index)=>{
                       
                        photoBlock = document.getElementById("photoBlock");
                        maxWidth = photoBlock ? photoBlock.offsetWidth*2 : 0;
                        console.log('maxWidth', maxWidth);
                        if(maxWidth===0 && index===0){
                            this.setState({
                                update: this.state.update+1
                            })
                        }
                        /*
                        if(index===0){
                            
                        }
                        */
                        if(!this.state.isShortPhotos || maxWidth===0){
                            return(
                                <React.Fragment>
                                    <div className="col-3 col-lg-2 placePhotos_elementBlock" id={"photono"+index}>
                                        <img style={{borderRadius: '10px'}} src={requests.serverAddress+element.url} width="100%" height="100%" alt={"/picture " + index} onClick={()=>this.props.showMask(index)}/>
                                    </div>
                                </React.Fragment>
                            )
                        }
                        else{
                            if(isOver){
                                return(<React.Fragment/>);
                            }
                            else{
                                if(index>0){
                                    let temp = document.getElementById("photono"+(index-1));
                                    if(temp){
                                        widthSum+=temp.offsetWidth;
                                        if(maxWidth-widthSum<2*temp.offsetWidth && index!==this.props.photoArray.length-1){
                                            isOver=true;
                                            return(
                                                <div className="col-3 col-lg-2 placePhotos_elementBlock" id={"photono"+index} >
                                                    <img className="placePhotos_imageStyle" src={requests.serverAddress+element.url} width="100%" height="100%" alt={"/picture " + index} />
                                                    <div className="col-12 placePhotos_maskBlock" onClick={()=>this.photoStateChange(false)}>                               
                                                        <div className="d-flex placePhotos_maskBlock_inner">
                                                            <div className="placePhotos_maskBlock_innerText">Ещё</div>
                                                        </div>                                                    
                                                    </div>        
                                                </div> 
                                            )
                                        }
                                    }
                                }
                                return(
                                    <div className="col-3 col-lg-2 placePhoto_imageContainer" id={"photono"+index}>
                                        <img style={{borderRadius: '10px'}} src={requests.serverAddress+element.url} width="100%" height="100%" alt={"/picture " + index} onClick={()=>this.props.showMask(index)}/>
                                    </div> 
                                )                            
                            }
                        }
                    })
                }
                </div>   
            </React.Fragment>
        )
    }
}