import React from 'react';
import './PopularPlaces.css';
import { connect } from 'react-redux';
// import requests from '../../config';
import { setSelectedTag } from '../../redusers/ActionPlaces';

class PlacesTagListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShortTags: true
        };
    }
    onTagClick = (id) => {
        console.log('onTagClick', id);
        this.props.dispatch(setSelectedTag(id));
    }
    render() {
        function isTagSelected(tagId, selectedTags) {
            for (let i = 0; i < selectedTags.length; i++) {
                if (selectedTags[i] === tagId) {
                    return true;
                }
            }
            return false;
        }


        let tempWidth = document.getElementById("tagLine");
        var widthSum = 0;
        var mapStop = false;
        let textInfo = this.props.storeState.languageTextMain.places;

        console.log(this.props.placesState.tags);
        return (
            <div className={(this.props.placesState.tags.length>0 ? "popularPlacesBody d-flex flex-md-row flex-column col-12 py-md-4 py-2" : 'd-none')} >
                <div className="d-flex align-items-center justify-md-content-start justify-content-center mr-md-5 mr-0">
                    <span className="popularPlacesTitleTagList">{textInfo.placesTagList.placesTagListTitle + ':'}</span>
                </div>
                <div id="tagLine" className="d-flex flex-md-row flex-column flex-wrap placesTagList_tagLine" key={this.state.tags + this.state.isShortTags}>
                    {
                        this.props.placesState.tags.map((element, index) => {
                            if (this.state.isShortTags) {
                                if (mapStop) {
                                    return (<React.Fragment />)
                                }
                                else {
                                    if (index > 0) {
                                        let indexTemp = index - 1
                                        let temp = document.getElementById("tagno" + indexTemp);
                                        if (temp) {
                                            widthSum += temp.offsetWidth;
                                            let w = tempWidth.offsetWidth * 2 - 200
                                            if (w - widthSum < 120) {
                                                widthSum -= temp.offsetWidth;
                                                //console.log('temp',temp);
                                                temp.classList.remove('d-flex');
                                                temp.style.display = 'none';
                                                //temp.remove();
                                                let step = 2
                                                while (w - widthSum < 120) {
                                                    temp = document.getElementById("tagno" + (index - step));
                                                    widthSum -= temp.offsetWidth;
                                                    //console.log('temp',temp);
                                                    temp.classList.remove('d-flex');
                                                    temp.style.display = 'none';
                                                    //temp.remove();

                                                    step++;
                                                }
                                                //console.log('widthSum',widthSum);                                
                                                mapStop = true;
                                                return (
                                                    <div className="d-flex justify-content-center placesTagList_stateBlock ">
                                                        <span onClick={() => this.setState({ isShortTags: false })}>{textInfo.placesTagList.moreButton}</span>
                                                    </div>
                                                )
                                            }
                                        }
                                        //console.log('temp',temp ? temp.offsetWidth : '');
                                    }
                                    return (
                                        <div key={index + Date.now()} id={"tagno" + index} className={"d-flex justify-content-center align-items-center placesTagList_tagBlock "
                                            + (isTagSelected(element.id, this.props.placesState.selectedTags) ? ' placesTagList_tagBlock_selected' : '')} onClick={() => this.onTagClick(element.id)}>
                                            <span style={{}}>{element.tagLoc.name}</span>
                                        </div>
                                    )
                                }
                            }
                            else {
                                return (
                                    <React.Fragment>
                                        <div key={index + Date.now()} id={"tagno" + index} className={"d-flex justify-content-center align-items-center placesTagList_tagBlock"
                                            + (isTagSelected(element.id, this.props.placesState.selectedTags) ? ' placesTagList_tagBlock_selected' : '')} onClick={() => this.onTagClick(element.id)}>
                                            <span>{element.tagLoc.name}</span>
                                        </div>
                                        {
                                            (index === this.props.placesState.tags.length - 1) ?
                                                <div className="d-flex justify-content-center placesTagList_stateBlock">
                                                    <span onClick={() => this.setState({ isShortTags: true })}>{textInfo.placesTagList.hideButton}</span>
                                                </div>
                                                :
                                                <React.Fragment />
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