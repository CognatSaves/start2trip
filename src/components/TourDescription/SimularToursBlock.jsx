import React from 'react';
import RenderFourEl from '../home/HomeBody/RenderFourEl.jsx';
import ToursListElement from '../Tours/ToursListElement';
export default class SimularToursBlock extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {
        function findTagName(tagId, that) {
            if (that.props.tags.length > 0) {
                let tags = that.props.tags;
                let id = -1;

                for (let i = 0; i < that.props.tags.length; i++) {
                    if (that.props.tags[i].id === tagId) {
                        id = i;
                        break;
                    }
                }
                if (id === -1) {
                    return '';
                }
                return tags[id].tagLoc.name;
            }
            return '';
        }
        let tours = this.props.tours;
        let outerBlock = document.getElementById(this.props.outerBlock);
        
        console.log('outerBlock', outerBlock ? outerBlock.offsetWidth : 0);
        return (
            <React.Fragment>
                <div className="placeDescription_fragmentName">{this.props.fragmentName}</div>
                <div className="d-flex col-12 flex-md-wrap flex-nowrap p-0 popularPlacesRender" >
                    {/*
                        tours.map((element, index) => {
                            if (index > 0) {
                                let temp = document.getElementById("addPlace" + (index - 1));
                                console.log('temp', temp ? temp.offsetWidth : 0);
                            }
                            return (
                                <ToursListElement element={element} index={'addPlace' + index} findTagName={(tagId) => findTagName(tagId, this)}
                                    placeListElementClass={"col-xl-3 col-lg-3 col-md-4 col-sm-6 col-10 p-2 pb-3"}
                                />
                            )
                        })
                        */
                    }
                    <text>Нужно закончить работу над ToursListElement, чтобы открыть это</text>
                </div>
            </React.Fragment>
        )
    }
}