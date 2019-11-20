import React from 'react';
import { connect } from 'react-redux';
import './aboutService.css'
import illustrationUser from '../media/illustration_user_1.svg'
import illustrationCar from '../media/illustration_user_2.svg'
import illustrationPhone from '../media/illustration_user_4.svg'
import Header from '../header/Header';
import { Helmet } from 'react-helmet';
import phone_en from "../media/phone-eng.png"
import phone_ru from "../media/phone_ru.png"
import { Link } from 'react-router-dom';
import ReactstrapCarousel from '../usefulСomponents/ReactstrapCarousel'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class HelpPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        }


    }

    render() {
        let text = this.props.storeState.languageTextMain.footerPage.help;
        let helmet = this.props.storeState.languageTextMain.helmets.help;

        let typeUrl = this.props.match.params.type;
        let typeIndex;
        let indexUrl = this.props.match.params.index ? this.props.match.params.index : 0;
        let arrayElements = [text.driverAndGuide, text.travelers, text.travelAgency]

        switch (typeUrl) {
            case "driverAndGuide": typeIndex = 0;
                break;
            case "travelers": typeIndex = 1;
                break;
            case "travelAgency": typeIndex = 2;
                break;
            default: typeIndex = 0;

        }

        return (
            <>
                <Header driver={true} history={this.props.history} />
                <Helmet>
                    <title>{helmet.basic.title}</title>
                    <meta name="description" content={helmet.basic.description} />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={document.URL} />
                    <meta property="og:title" content={helmet.basic.title} />
                    <meta property="og:description" content={helmet.basic.description} />
                </Helmet>
                <div className="wrapper" style={{ minHeight: "79vh" }}>
                    <div className="aboutService">
                        <div className="aboutService_Title pb-5">
                            <h2>{text.h2}</h2>
                            <p className="col-md-6 col-12">{text.description}</p>
                        </div>
                        <div className="d-flex col-12 p-0">
                            {arrayElements.map((element, index) =>
                                <div className="col-4 d-flex align-items-center">
                                    <div className="helpCard d-flex justify-content-center">
                                        <div className="d-flex flex-column col-12 px-4">
                                            <h5>{element.headerText}</h5>
                                            {element.title.map((el, number) =>
                                                <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + el.url}>{el.text}</Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div >
                            {arrayElements[typeIndex].data[indexUrl].map((element, index) =>
                                <div className="d-flex flex-column align-items-center">
                                    <h5>{element.title}</h5>
                                    <p className="text-center">{element.text}</p>
                                    <div className="col">
                                    <ReactstrapCarousel items={[{src:illustrationUser},{src:illustrationCar},{src:illustrationPhone}]} />
                                    </div>
                                   
                                </div>
                            )}
                             
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const HelpPage = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(HelpPageClass);
export default HelpPage;