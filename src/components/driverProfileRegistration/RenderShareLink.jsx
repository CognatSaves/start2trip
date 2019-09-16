import React from 'react';
import './DriverProfileAffiliateProgram.css'
import { connect } from 'react-redux';
import {

    FacebookShareButton,
    VKShareButton,
    OKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    ViberShareButton,

    FacebookIcon,
    VKIcon,
    OKIcon,
    TelegramIcon,
    WhatsappIcon,
    ViberIcon,
} from 'react-share';

import exampleImage from "../media/404.svg"
class RenderShareLinkClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconsArray: this.props.iconsArray,
            howMuchRender: 4,
        };


    }
    copyValue = (id) => {
        let selectedInput = document.getElementById(id);
        selectedInput.select();
        document.execCommand("copy");
    }
    render() {

        const shareUrl = this.props.valueInput;
        const title = 'Tripfer.com';
        return (
            <>
                <div className={"d-flex flex-column align-items-center shareLink " + this.props.classNameDiv}>
                    <spantext>
                        {this.props.textTitle}
                    </spantext>
                    <div className="d-flex flex-md-row flex-column affiliateProgramInput">
                        <input id={this.props.idInput} placeholder="Ссылка 1" value={this.props.valueInput} />
                        <spanlink onClick={() => this.copyValue(this.props.idInput)} className="copyElement" >{this.props.buttonCopyText}</spanlink>
                    </div>
                    <div className="d-flex justify-content-center  affiliateProgramIconsMass">

                        <div className="networkLink">
                            <ViberShareButton
                                url={shareUrl}
                                title={title}
                                className="networkLink__share-button">
                                <ViberIcon
                                    size={32}
                                    round />
                            </ViberShareButton>
                        </div>
                        <div className="networkLink">
                            <TelegramShareButton
                                url={shareUrl}
                                title={title}
                                className="networkLink__share-button">
                                <TelegramIcon size={32} round />
                            </TelegramShareButton>
                        </div>

                        <div className="networkLink">
                            <WhatsappShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                                className="networkLink__share-button">
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>

                        <div className="networkLink">
                            <FacebookShareButton
                                url={shareUrl}
                                quote={title}
                                className="networkLink__share-button">
                                <FacebookIcon
                                    size={32}
                                    round />
                            </FacebookShareButton>
                        </div>

                        <div className="networkLink">
                            <VKShareButton
                                url={shareUrl}
                                image={String("https://tripfer.com" + exampleImage)}
                                windowWidth={660}
                                windowHeight={460}
                                className="networkLink__share-button">
                                <VKIcon
                                    size={32}
                                    round />
                            </VKShareButton>
                        </div>

                        <div className="networkLink">
                            <OKShareButton
                                url={shareUrl}
                                image={String("https://tripfer.com" + exampleImage)}
                                className="networkLink__share-button">
                                <OKIcon
                                    size={32}
                                    round />
                            </OKShareButton>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

const RenderShareLink = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(RenderShareLinkClass);

export default RenderShareLink;