import React from 'react';
import './PopularPlaces.css';
import { connect } from 'react-redux';
import requests from '../../config';


class PlacesTagListClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tags: ["Церькви и саборы","CCSDFSD","sdfsdfsdfsd sdfsd","sadfadsfadsfadf","123123","123","123esdfdsf","dsaf vcxvxc",
            "dsafbdfgb","ghjymgm","tyutjghmgh","cvxbzdsfaf","erthfgnjty","wer3dsf54","vxzrfgz",
            "asdfa vcx","afwefsz  dsf ads asd ","asdfasd sadf sda fa","asdfsdf sf sd fsdsd","sdf ewrwefrdds",
            "a123dsfsw ","sdfa dsaf 2","sadfsdaf sd ds","dsfasdfa sd fsd"," asdfadsfsad 23 23  2",
            "hdhdsahhdsahsah dsfs","jsjdhjsjdsnjsd","ksankjdsankjdsanj","ujsajdscbhdsc","bjdscdjjd",
            "jndscjdsanjds","jdscanjdsjndsjn","dscajdsajdsnj","jdsjdsjndsv","dsdsnjdsds","dscajdsadsa",
            "dsjnjndsadsds","jdsvjdsvnjds","dsalkdslkdsk","dsdscokdsnkdsk","jndsajdsjndsa"],
        };
    }
    render(){
        let placeRender = [];

        if (this.state.tags.length > this.state.howMuchRender) {

            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    placeRender.push(this.state.tags[i]);
                }
            }
        } else {
            placeRender = this.state.tags;
        }
        let tagBlockWidth; let tempWidth;
        tagBlockWidth= document.getElementById("placesMainBlock");
        tempWidth = document.getElementById("tagLine");
        console.log('tagBlockWidth',tagBlockWidth ? tagBlockWidth.offsetWidth: '');
        console.log('tempWidth',tempWidth ? tempWidth.offsetWidth : '');
        return(
            <div className="popularPlacesBody d-flex flex-row">
                <div className="d-flex justify-content-center" style={{width: '10%'}}>
                    <div style={{margin: 'auto'}}>Категории:</div>
                </div>
                <div id="tagLine" className="d-flex flex-wrap flex-wrap-reverse flex-row-reverse" style={{width: '85%',overflow: 'hidden', textOveflow: 'ellipsis', height: '100px'}}>
                    <div className="d-flex justify-content-top" style={{width: '5%', margin: '5px',padding: '5px', textDecoration: 'underline'}}>             
                        <div style={{margin: 'auto'}} /*onClick={() => { this.setState({ howMuchRender: this.state.howMuchRender + 6 }) }}*/>Исчо</div>
                    </div>
                {    
                    <React.Fragment>{
                        placeRender.map((element,index)=>{
                            //debugger;
                            if(index>0){
                                let temp = document.getElementById("tagno"+(index-1));
                                console.log('temp',temp ? temp.offsetWidth : '');
                            }
                            return(
                            <div className="d-flex justify-content-center align-items-center " style={{border: '2px solid #ff6600', borderRadius: '25px', margin: '5px',padding: '5px', flexBasis:"auto", flexGrow:"0.6"}}>
                                <div style={{}}>{element}</div>
                            </div>
                            )}
                        )
                    }
                        
                    </React.Fragment>
                }</div>
                
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