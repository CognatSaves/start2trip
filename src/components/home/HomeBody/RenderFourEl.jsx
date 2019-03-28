import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
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
            <div className="d-flex flex-row align-items-center justify-content-center mb-4 p-0 col-12">
                {this.props.tours.map((element, index) =>
                    <div className="tourCard col-3 p-0">
                        <Card className="tourBody">
                            <Link to={element.link}>
                                <CardImg top width="100%" src={element.img} alt="Card image cap" />
                            </Link>
                            <CardBody>
                                <Link className="tourTitle" to={element.link}>
                                    <CardTitle className="tourTitle mb-0"  >{element.title}</CardTitle>
                                    <div className="mb-2">
                                        <Stars commentNumberDisplay={"block"} valueDisplay={"none"} commentNumber={element.reviews} />
                                    </div>
                                </Link>
                                <CardText className="tourText">{element.text}</CardText>
                                <div className="d-flex flex-row justify-content-end align-items-end col-12" style={{padding: "0"}}>
                                    <p className="tourPrise col-9 mb-0" style={{ display: this.props.priseDisplay }}>от <span>{element.prise}</span></p>
                                    <Link to={element.link} className="tourLink">Подробнее</Link>
                                </div>
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