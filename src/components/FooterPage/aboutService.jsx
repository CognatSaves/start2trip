import React from 'react';
import { connect } from 'react-redux';
import './aboutService.css'
import illustrationUser from '../media/illustration_user_1.svg'
import illustrationCar from '../media/illustration_user_2.svg'
import illustrationPhone from '../media/illustration_user_4.svg'
import Header from '../header/Header';
import {Helmet} from 'react-helmet';

class aboutServiceClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayEl: [
                {
                    img: illustrationUser,
                    title: props.storeState.languageTextMain.footerPage.aboutService.firstEl.title,
                    text: props.storeState.languageTextMain.footerPage.aboutService.firstEl.text
                },
                {
                    img: illustrationCar,
                    title: props.storeState.languageTextMain.footerPage.aboutService.secondEl.title,
                    text: props.storeState.languageTextMain.footerPage.aboutService.secondEl.text
                },
                {
                    img: illustrationPhone,
                    title: props.storeState.languageTextMain.footerPage.aboutService.thirdEl.title,
                    text: props.storeState.languageTextMain.footerPage.aboutService.thirdEl.text
                },
            ]

        }


    }

    render() {
        let text = this.props.storeState.languageTextMain.footerPage.aboutService;
        let helmet = this.props.storeState.languageTextMain.helmets.aboutService;
    
        return (
            <React.Fragment>
                <Header driver={true} history={this.props.history} />
                <Helmet>
                    <title>{helmet.basic.title}</title>
                    <meta name="description" content={helmet.basic.description} />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={document.URL}/>
                    <meta property="og:title" content={helmet.basic.title} />
                    <meta property="og:description" content={helmet.basic.description} /> 
                </Helmet>
                <div className="wrapper">
                    <div className="aboutService d-flex" >
                        <div className="aboutService_Title col-12 p-0">
                            <h2>{text.h2}</h2>
                            <p className="col-md-9 col-12">{text.description}</p>
                            <div className="aboutService_content d-flex flex-column col-md-8 col-12 p-0">
                                {
                                    this.state.arrayEl.map((element, index) =>
                                        <div className="d-flex flex-md-row flex-column align-items-center mb-5">
                                            <i className="col-md-3 col-8 p-0" style={{ background: "url(" + element.img + ")no-repeat" }} />
                                            <div className="d-flex flex-column align-items-md-start align-items-center col-md-8 col-sm-11 col-12">
                                                <span>{element.title}</span>
                                                <p>{element.text}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const aboutService = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(aboutServiceClass);
export default aboutService;