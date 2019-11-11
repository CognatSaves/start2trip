import React from 'react';
import './TourInfo.css';
import { connect } from 'react-redux'
import requests from '../../config';
import Stars from '../stars/Stars'
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class TourGuideInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {


        return (
            <div className="placeDescription_author d-flex flex-md-row flex-column align-items-center justify-content-between col-12 p-0 mb-4">
                <div className="d-flex col-md-6 col-12 mb-md-0 mb-3">
                    <div>
                        <img src={requests.serverAddressImg + this.props.that.state.author.avatar.url} alt={this.props.that.state.author.firstName + " avatar"} />
                    </div>
                    <div className="d-flex flex-column justify-content-center pl-4">
                        <h5><Link to={"/" + cookies.get('country', { path: "/" }) + "-" + cookies.get('userLangISO', { path: "/" }) + "/guides/" + this.props.that.state.author.userSlug + "/"}>{this.props.that.state.author.firstName + " " + this.props.that.state.author.lastName}</Link></h5>
                        <Stars value={Math.ceil(this.props.that.state.author.rating*10)/10} commentNumber={this.props.that.state.author.comments ? this.props.that.state.author.comments.length + " отзывов" : 0} valueDisplay={true} commentNumberDisplay={true} />
                        <div className="d-flex align-items-center">
                            <span>{this.props.textInfo.language}</span>
                            {this.props.language.map((el, index) => (<i className="placesList_info_icons" style={{ background: "url(" + requests.serverAddressImg + el.icon.url + ")no-repeat" }} />))}
                        </div>
                        {this.props.cars.length > 0 &&
                            <div className="d-flex flex-wrap align-items-center">
                                <span>{this.props.textInfo.cars}&nbsp;</span>
                                {this.props.cars.map((el, index) => (<span style={{ color: "#686868", textTransform: "capitalize" }}>{el.carBrand + (this.props.cars.length - 1 === index ? " " : ",")}&nbsp;</span>))}
                            </div>
                        }

                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <p>{this.props.that.state.author.dataAbout}</p>
                </div>
            </div>
        )
    }
}

const TourGuideInfo = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        toursState: state.ToursReduser,
    })
)(TourGuideInfoClass);

export default TourGuideInfo;