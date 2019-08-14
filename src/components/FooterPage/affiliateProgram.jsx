import React from 'react';
import { connect } from 'react-redux';
import './affiliateProgram.css'
import income from '../media/income.svg'
import share from '../media/share.svg'
import invite from '../media/invite.svg'
import fn_moneybox from '../media/fn_moneybox.svg'
import IT_link from '../media/IT_link.svg'
import fn_stock from '../media/fn_stock.svg'

import Header from '../header/Header';
import {Helmet} from 'react-helmet';

class affiliateProgramClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayEl: [
                {
                    img: invite,
                    title: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayEl.firstEl.title,
                    text: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayEl.firstEl.text
                },
                {
                    img: income,
                    title: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayEl.secondEl.title,
                    text: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayEl.secondEl.text
                },
                {
                    img: share,
                    title: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayEl.thirdEl.title,
                    text: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayEl.thirdEl.text
                },
            ],
            arrayFooterEl: [
                {
                    img: IT_link,
                    title: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayFooterEl.firstEl.title,
                    text: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayFooterEl.firstEl.text
                },
                {
                    img: fn_stock,
                    title: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayFooterEl.secondEl.title,
                    text: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayFooterEl.secondEl.text
                },
                {
                    img: fn_moneybox,
                    title: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayFooterEl.thirdEl.title,
                    text: props.storeState.languageTextMain.footerPage.affiliateProgram.arrayFooterEl.thirdEl.text
                },
            ]

        }


    }

    render() {
        let text = this.props.storeState.languageTextMain.footerPage.affiliateProgram
        return (
            <React.Fragment>
                <Header driver={true} history={this.props.history} />
                <Helmet>
                    <title>{'Нашим партнёрам'}</title>
                    <meta name="description" content="Нашим партнёрам" />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={document.URL} />
                    <meta property="og:title" content="Нашим партнёрам" />
                    <meta property="og:description" content="Рекомендации партнёрам сервиса tripfer.com" /> 
                </Helmet>
                <div className="wrapper">
                    <div className="affiliateProgram" >
                        <div className="affiliateProgram_Title col-12 p-0">
                            <h2>{text.h2}</h2>
                            <p className="col-md-6 col-12 p-0">
                            {text.description1} <br /> {text.description2}
                            </p>
                            <div className="affiliateProgram_content d-flex flex-column col-md-8 col-12 p-0">
                                {
                                    this.state.arrayEl.map((element, index) =>
                                        <div className="d-flex flex-md-row flex-column align-items-center mb-md-5 mb-3">
                                            <i className="col-md-2 col-3 p-0" style={{ background: "url(" + element.img + ")no-repeat" }} />
                                            <div className="d-flex flex-column align-items-md-start align-items-center col-md-6 col-sm-11 col-12 p-0">
                                                <span>{element.title}</span>
                                                <p>{element.text}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="affiliateProgram_Footer">
                            <h3>{text.h3}</h3>
                            <div className="d-flex flex-md-row flex-column">
                                {this.state.arrayFooterEl.map((element, index) =>
                                    <div className="col-md-4 col-12 mb-md-2 mb-5">
                                        <div className="affiliateProgram_FooterContent  d-flex flex-column align-items-center">
                                            <div className="affiliateProgram_FooterCircle">
                                                <span>{index + 1}</span>
                                            </div>
                                            <span>{element.title}</span>
                                            <p>{element.text}</p>
                                            <i className="mt-auto mb-5" style={{ background: "url(" + element.img + ")no-repeat" }} />
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const affiliateProgram = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(affiliateProgramClass);
export default affiliateProgram;