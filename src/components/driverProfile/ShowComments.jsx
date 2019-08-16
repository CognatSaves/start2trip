import React from 'react';
import './DriversProfileComments.css';
import { isMobileOnly } from 'react-device-detect';
import { connect } from 'react-redux';
import requests from '../../config';

import Stars from '../stars/Stars';
import Dialog from '@material-ui/core/Dialog';

class ShowCommentsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            element: null,
            date: null,
        }
    }


    render() {
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeProgramm;
        function getMonthName(number) {
            let monthArray = textInfo.monthArray;
            return monthArray[number];
        }
        if (this.props.selectedComments.length > 0) {
            return (
                <React.Fragment>
                    <Dialog
                        open={this.state.openModal}
                        onClose={() => { this.setState({ openModal: !this.state.openModal }) }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        {this.state.openModal ? <React.Fragment>
                            <div className="commentBlock_element" >
                                <i className="commentBlock_elementIconCross" onClick={() => { this.setState({ openModal: !this.state.openModal }) }} />
                                <div className="commentBlock_valueBlock d-flex flex-column">
                                    <div className="commentBlock_picture d-flex pb-2">
                                        <img src={requests.serverAddressImg + this.state.element.avatar.url} width="auto" height="100%" alt=""></img>
                                        <div className="d-flex flex-column justify-content-center col pr-0">
                                            <div className="valueBlock_firstElement_name">{this.state.element.name}</div>
                                            <Stars value={this.state.element.rating} valueDisplay={true} commentNumberDisplay={false} />
                                            <div className="valueBlock_firstElement_date">{this.state.date.getDate() + " " + getMonthName(this.state.date.getMonth()) + " " + this.state.date.getFullYear()}</div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label>{this.state.element.value}</label>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment> : <React.Fragment></React.Fragment>}



                    </Dialog>
                    <div className="d-flex flex-wrap">
                        {this.props.selectedComments.map((element, index) => {
                            //let obj = element.name || element.createdAt ? element : {name: element.user.name} 
                            // let openModal = false

                            let date = element.date ? new Date(element.date) : new Date(element.createdAt);

                            return (
                                <div className="col-lg-3 col-md-6 col-12 pl-0">
                                    <div className="commentBlock_comments  commentBlock_element" key={element + "/" + index} onClick={(e) => { if (!isMobileOnly) { this.setState({ element: element, date: date, openModal: true }) } }} >
                                        <div className="commentBlock_valueBlock d-flex flex-column">
                                            <div className="commentBlock_picture d-flex pb-2">
                                                <img src={requests.serverAddressImg + element.avatar.url} width="auto" height="100%" alt=""></img>
                                                <div className="d-flex flex-column justify-content-center col pr-0">
                                                    <div className="valueBlock_firstElement_name">{element.name}</div>

                                                    <Stars key={element.rating + "/" + element.index} value={element.rating} valueDisplay={true} commentNumberDisplay={false} />
                                                    <div className="valueBlock_firstElement_date">{date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear()}</div>

                                                </div>
                                            </div>
                                            <input className="put" id={"put" + element + index} type="checkbox"></input>
                                            <div className="news">
                                                <label htmlFor={"put" + element + index}>{element.value}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                        )}
                        {
                            this.props.selectedComments.length === 0 ?
                                <React.Fragment>
                                    {/* TODO Need same better  */}
                                    <div>Ничего не найдено</div>
                                </React.Fragment>
                                : <React.Fragment />
                        }
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <div className="commentBlock_comments d-flex flex-column">
                    <div className="commentBlock_noCommentsText d-flex">
                        {this.props.noCommentsText}
                    </div>
                </div>
            )
        }

    }
}

const ShowComments = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(ShowCommentsClass);

export default ShowComments;