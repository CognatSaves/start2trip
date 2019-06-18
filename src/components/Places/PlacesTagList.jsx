import React from 'react';
import './PopularPlaces.css';
import { connect } from 'react-redux';
import requests from '../../config';


class PlacesTagListClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tags: ["AAAAAAA","CCSDFSD","sdfsdf","sadfadsfadsfadf","123esdfdsf","dsaf vcxvxc",
            "dsafbdfgb","ghjymgm","tyutjghmgh","cvxbzdsfaf","erthfgnjty","wer3dsf54","vxzrfgz",
            "asdfa vcx","afwefsz  dsf ads asd ","asdfasd sadf sda fa","asdfsdf sf sd fsdsd","sdf ewrwefrdds",
            "a123dsfsw ","sdfa dsaf 2","sadfsdaf sd ds","dsfasdfa sd fsd"," asdfadsfsad 23 23  2",
            "hdhdsahhdsahsah dsfs","jsjdhjsjdsnjsd","ksankjdsankjdsanj","ujsajdscbhdsc","bjdscdjjd",
            "jndscjdsanjds","jdscanjdsjndsjn","dscajdsajdsnj","jdsjdsjndsv","dsdsnjdsds","dscajdsadsa",
            "dsjnjndsadsds","jdsvjdsvnjds","dsalkdslkdsk","dsdscokdsnkdsk","jndsajdsjndsa"]
        };
    }
    render(){
        let tagBlockWidth; let tempWidth;
        tagBlockWidth= document.getElementById("placesMainBlock");
        console.log('tagBlockWidth',tagBlockWidth ? tagBlockWidth.style.width : '');
        return(
            <div className="popularPlacesBody d-flex flex-row">
                <div className="d-flex justify-content-center" style={{width: '10%'}}>
                    <div style={{margin: 'auto'}}>Категории:</div>
                </div>
                <div id="tagLine" className="d-flex flex-wrap" style={{width: '85%', overflow: 'hidden', textOveflow: 'ellipsis', height: '100px'}}>{
                    
                    <React.Fragment>{
                        this.state.tags.map((element,index)=>{
                            //debugger;
                            
                            return(
                            <div style={{border: '2px solid #ff6600', borderRadius: '25px', margin: '5px',padding: '5px'}}>
                                <div style={{}}>{element}</div>
                            </div>
                            )}
                        )
                    }
                        
                    </React.Fragment>
                }</div>
                <div className="d-flex justify-content-top" style={{width: '5%', margin: '5px',padding: '5px', textDecoration: 'underline'}}>             
                    <div style={{margin: 'auto'}}>Исчо</div>
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