import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Stars from '../../stars/Stars'

import './RenderFourEl.css'


class RenderFourElClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="d-flex flex-row align-items-center mb-4 p-0 col-12">
                {this.props.tours.map((element, index) =>
                    <div className="col-3">
                        <Card className="tourBody">
                            <Link to={element.link}>
                                <CardImg top width="100%" src={element.img} alt="Card image cap" />
                            </Link>
                            <CardBody>
                                <Link className="tourTitle" to={element.link}>
                                    <CardTitle className="tourTitle"  >{element.title}</CardTitle>
                                    <div className="tourStars">
                                        <Stars commentNumberDisplay={"block"} valueDisplay={"none"} commentNumber={element.reviews} />
                                    </div>
                                </Link>
                                <CardText className="tourText">{element.text}</CardText>
                                <Link to={element.link} className="tourLink">Подробнее</Link>
                            </CardBody>
                        </Card>
                    </div>
                )}
            </div>
        )
    }

}

const RenderFourEl = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(RenderFourElClass);

export default RenderFourEl;