import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap'
import './aboutService.css'

import Header from '../header/Header';
import ReactstrapCarousel from '../usefulСomponents/ReactstrapCarousel'
import Cookies from 'universal-cookie';
import { isMobile } from 'react-device-detect';

const cookies = new Cookies();

class HelpPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsedArray: [false, false, false],

        }


    }

    changeCollapse = (index) => {
        this.setState({ collapsedArray: [index === 0, index === 1, index === 2] })
    }
    componentWillMount(){
        switch (this.props.match.params.type) {
            case "driverAndGuide": this.setState({collapsedArray:[true,false,false]});
                break;
            case "travelers": this.setState({collapsedArray:[false,true,false]});
                break;
            case "travelAgency": this.setState({collapsedArray:[false,false,true]});
                break;
            default: this.setState({collapsedArray:[true,false,false]});

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
                <div className="wrapper" style={{ minHeight: "82.1vh" }}>
                    <div className="aboutService">
                        <div className="aboutService_Title pb-5">
                            <h2>{text.h2}</h2>
                            <p className="col-md-6 col-12">{text.description}</p>
                        </div>
                        <div className={(isMobile ? "flex-column" : "") + " d-flex col-12 p-0"}>
                            {arrayElements.map((element, index) =>
                                <div className="d-flex align-items-center col-md-4 col-12 my-2">
                                    <div className="helpCard d-flex justify-content-center">
                                        <div className="d-flex flex-column col-12  px-4">
                                            <h5 onClick={() => this.changeCollapse(index)}>{element.headerText}</h5>
                                            {isMobile &&
                                                <Collapse isOpen={this.state.collapsedArray[index]}>
                                                    <div className="d-flex flex-column">
                                                        {element.title.map((el, number) => {
                                                            let arrayUrl;
                                                            if (this.props.globalReduser.history.location) {
                                                                arrayUrl = this.props.globalReduser.history.location.pathname
                                                                arrayUrl = arrayUrl.split("/")
                                                                arrayUrl = arrayUrl[2]
                                                            }
                                                            return (
                                                                <Link className={("/" + arrayUrl + "/") === el.url ? "activeLink" : ((arrayUrl === "help" && number === 0 && index === 0) ? "activeLink" : '')} to={"/" + cookies.get('userLangISO', { path: "/" }) + el.url}>{el.text}</Link>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </Collapse>
                                            }
                                            {!isMobile &&
                                                <>
                                                    {element.title.map((el, number) => {
                                                        let arrayUrl;
                                                        if (this.props.globalReduser.history.location) {
                                                            arrayUrl = this.props.globalReduser.history.location.pathname
                                                            arrayUrl = arrayUrl.split("/")
                                                            arrayUrl = arrayUrl[2]
                                                        }
                                                        return (
                                                            <Link className={("/" + arrayUrl + "/") === el.url ? "activeLink" : ((arrayUrl === "help" && number === 0 && index === 0) ? "activeLink" : '')} to={"/" + cookies.get('userLangISO', { path: "/" }) + el.url}>{el.text}</Link>
                                                        )
                                                    }

                                                    )}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div >
                            {arrayElements[typeIndex].data[indexUrl].map((element, index) =>
                                <div className="helpCardContent d-flex flex-column align-items-center pt-5 mt-5">
                                    <h5>{element.title}</h5>
                                    <p className="text-center">{element.text}</p>
                                    <div className="col">
                                        <ReactstrapCarousel items={element.src} />
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
        globalReduser: state.GlobalReduser,
    }),
)(HelpPageClass);
export default HelpPage;