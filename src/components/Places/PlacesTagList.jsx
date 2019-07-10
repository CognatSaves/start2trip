import React from 'react';
import './PopularPlaces.css';
import { connect } from 'react-redux';
import requests from '../../config';
import {setSelectedTag} from '../../redusers/ActionPlaces';

class PlacesTagListClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            /*tags: ["Церькви и саборы","CCSDFSD","sdfsdfsdfsd sdfsd","sadfadsfadsfadf","123123","123","123esdfdsf","dsaf vcxvxc",
            "dsafbdfgb","ghjymgm","tyutjghmgh","cvxbzdsfaf","erthfgnjty","wer3dsf54","vxzrfgz",
            "asdfa vcx","afwefsz  dsf ads asd ","asdfasd sadf sda fa","asdfsdf sf sd fsdsd","sdf ewrwefrdds",
            "a123dsfsw ","sdfa dsaf 2","sadfsdaf sd ds","dsfasdfa sd fsd"," asdfadsfsad 23 23  2",
            "hdhdsahhdsahsah dsfs","jsjdhjsjdsnjsd","ksankjdsankjdsanj","ujsajdscbhdsc","bjdscdjjd",
            "jndscjdsanjds","jdscanjdsjndsjn","dscajdsajdsnj","jdsjdsjndsv","dsdsnjdsds","dscajdsadsa",
            "dsjnjndsadsds","jdsvjdsvnjds","dsalkdslkdsk","dsdscokdsnkdsk","jndsajdsjndsa"],*/
            //howMuchRender:15,
            isShortTags: true
        };
    }
    onTagClick=(id)=>{
        console.log('onTagClick', id);
        this.props.dispatch(setSelectedTag(id));
    }
    render(){
        function isTagSelected(tagId, selectedTags){
            for(let i=0; i<selectedTags.length; i++){
                if(selectedTags[i]===tagId){
                    return true;
                }
            }
            return false;
        }
        /*let placeRender = [];

        if (this.state.tags.length > this.state.howMuchRender) {

            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    placeRender.push(this.state.tags[i]);
                }
            }
        } else {
            placeRender = this.state.tags;
        }*/
        //let that = this;
        let tagBlockWidth; let tempWidth;
        tagBlockWidth= document.getElementById("placesMainBlock");
        tempWidth = document.getElementById("tagLine");
        //console.log('tagBlockWidth',tagBlockWidth ? tagBlockWidth.offsetWidth: '');
        //console.log('tempWidth',tempWidth ? tempWidth.offsetWidth : '');
        var widthSum=0;var mapStop=false;
        let textInfo = this.props.storeState.languageTextMain.places;
        
        console.log(this.props.placesState.tags);
        return(
            <div className="popularPlacesBody d-flex flex-row">
                <div className="d-flex justify-content-center" style={{width: '10%'}}>
                    <div style={{margin: 'auto'}}>{textInfo.placesTagList.placesTagListTitle +':'}</div>
                </div>
                <div id="tagLine" className="d-flex flex-wrap placesTagList_tagLine" key={this.state.tags+this.state.isShortTags}>
                
                {    
                    this.props.placesState.tags.map((element,index)=>{                   
                        if(this.state.isShortTags){
                            if(mapStop){
                                return(<React.Fragment/>)
                            }
                            else{
                                if(index>0){                           
                                    let temp = document.getElementById("tagno"+(index-1));
                                    if(temp){                                      
                                        widthSum+=temp.offsetWidth;
                                        let w = tempWidth.offsetWidth*2-200
                                        if(w-widthSum<150){                                       
                                            widthSum-=temp.offsetWidth;
                                            //console.log('temp',temp);
                                            temp.classList.remove('d-flex');
                                            temp.style.display='none';
                                            //temp.remove();
                                            let step = 2
                                            while(w-widthSum<150){
                                                temp = document.getElementById("tagno"+(index-step));
                                                widthSum-=temp.offsetWidth;
                                                //console.log('temp',temp);
                                                temp.classList.remove('d-flex');
                                                temp.style.display='none';
                                                //temp.remove();
                                                
                                                step++;
                                            }
                                            //console.log('widthSum',widthSum);                                
                                            mapStop=true;
                                            return(
                                                <div className="d-flex justify-content-top placesTagList_stateBlock">             
                                                    <div style={{margin: 'auto'}} onClick={()=>this.setState({isShortTags: false})}>{textInfo.placesTagList.moreButton}</div>
                                                </div>                  
                                            )
                                        }
                                    }
                                    //console.log('temp',temp ? temp.offsetWidth : '');
                                }
                                return(
                                <div key={index+Date.now()} id={"tagno"+index} className={"d-flex justify-content-center align-items-center placesTagList_tagBlock "
                                 + (isTagSelected(element.id, this.props.placesState.selectedTags) ? 'placesTagList_tagBlock_selected' : '')} onClick={()=>this.onTagClick(element.id)}>
                                    <div style={{}}>{element.tagLoc.name}</div>
                                </div>
                            )}
                        }
                        else{
                            return(
                                <React.Fragment>
                                    <div key={index+Date.now()} id={"tagno"+index} className={"d-flex justify-content-center align-items-center placesTagList_tagBlock"
                                        + (isTagSelected(element.id, this.props.placesState.selectedTags) ? 'placesTagList_tagBlock_selected' : '')} onClick={()=>this.onTagClick(element.id)}>
                                        <div style={{}}>{element.tagLoc.name}</div>
                                    </div>
                                    {
                                        (index===this.state.tags.length-1) ? 
                                        <div className="d-flex justify-content-top placesTagList_stateBlock">             
                                            <div style={{margin: 'auto'}} onClick={()=>this.setState({isShortTags: true})}>{textInfo.placesTagList.hideButton}</div>
                                        </div> 
                                        :
                                        <React.Fragment/>
                                    }
                                </React.Fragment>
                            )
                        }
                    })
                }

                
                
                </div>
            </div>
        )
    }
}
const PlacesTagList = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser
    }),
)(PlacesTagListClass);

export default PlacesTagList;