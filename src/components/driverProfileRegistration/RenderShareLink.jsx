import React from 'react';
import './DriverProfileAffiliateProgram.css'
import { connect } from 'react-redux';
import {

    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    LineShareButton,
    WeiboShareButton,
    PocketShareButton,
    InstapaperShareButton,

    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    MailruIcon,
    EmailIcon,
    LivejournalIcon,
    ViberIcon,
    WorkplaceIcon,
    LineIcon,
    PocketIcon,
    InstapaperIcon,
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
            <React.Fragment>
                <div className={"d-flex flex-column align-items-center shareLink " + this.props.classNameDiv}>
                    <spantext>
                        {this.props.textTitle}
                    </spantext>
                    <div className="d-flex flex-md-row flex-column affiliateProgramInput">
                        <input id={this.props.idInput} placeholder="Ссылка 1" value={this.props.valueInput} />
                        <spanlink onClick={() => this.copyValue(this.props.idInput)} className="copyElement" >{this.props.buttonCopyText}</spanlink>
                    </div>
                    <div className="d-flex  affiliateProgramIconsMass">
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
                            <TwitterShareButton
                                url={shareUrl}
                                title={title}
                                className="networkLink__share-button">
                                <TwitterIcon
                                    size={32}
                                    round />
                            </TwitterShareButton>

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
                            <LinkedinShareButton
                                url={shareUrl}
                                windowWidth={750}
                                windowHeight={600}
                                className="networkLink__share-button">
                                <LinkedinIcon
                                    size={32}
                                    round />
                            </LinkedinShareButton>
                        </div>

                        <div className="networkLink">
                            <PinterestShareButton
                                url={String(window.location)}
                                media={String("https://tripfer.com"+exampleImage)}
                                windowWidth={1000}
                                windowHeight={730}
                                className="networkLink__share-button">
                                <PinterestIcon size={32} round />
                            </PinterestShareButton>

                        </div>

                        <div className="networkLink">
                            <VKShareButton
                                url={shareUrl}
                                image={String("https://tripfer.com"+exampleImage)}
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
                                image={String("https://tripfer.com"+exampleImage)}
                                className="networkLink__share-button">
                                <OKIcon
                                    size={32}
                                    round />
                            </OKShareButton>

                            
                        </div>

                        <div className="networkLink">
                            <RedditShareButton
                                url={shareUrl}
                                title={title}
                                windowWidth={660}
                                windowHeight={460}
                                className="networkLink__share-button">
                                <RedditIcon
                                    size={32}
                                    round />
                            </RedditShareButton>
                        </div>

                        <div className="networkLink">
                            <TumblrShareButton
                                url={shareUrl}
                                title={title}
                                windowWidth={660}
                                windowHeight={460}
                                className="networkLink__share-button">
                                <TumblrIcon
                                    size={32}
                                    round />
                            </TumblrShareButton>
                        </div>

                        <div className="networkLink">
                            <LivejournalShareButton
                                url={shareUrl}
                                title={title}
                                description={shareUrl}
                                className="networkLink__share-button"
                            >
                                <LivejournalIcon size={32} round />
                            </LivejournalShareButton>
                        </div>

                        <div className="networkLink">
                            <MailruShareButton
                                url={shareUrl}
                                title={title}
                                className="networkLink__share-button">
                                <MailruIcon
                                    size={32}
                                    round />
                            </MailruShareButton>
                        </div>

                        <div className="networkLink">
                            <EmailShareButton
                                url={shareUrl}
                                subject={title}
                                body="body"
                                className="networkLink__share-button">
                                <EmailIcon
                                    size={32}
                                    round />
                            </EmailShareButton>
                        </div>
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
                            <WorkplaceShareButton
                                url={shareUrl}
                                quote={title}
                                className="networkLink__share-button">
                                <WorkplaceIcon
                                    size={32}
                                    round />
                            </WorkplaceShareButton>
                        </div>

                        <div className="networkLink">
                            <LineShareButton
                                url={shareUrl}
                                title={title}
                                className="networkLink__share-button">
                                <LineIcon
                                    size={32}
                                    round />
                            </LineShareButton>
                        </div>

                        <div className="networkLink">
                            <WeiboShareButton
                                url={shareUrl}
                                title={title}
                                image={String("https://tripfer.com"+exampleImage)}
                                className="networkLink__share-button">
                                <img className="networkLink__custom-icon" width="31px" height="31px" src="http://icons.iconarchive.com/icons/martz90/circle-addon2/512/weibo-icon.png" alt="Weibo share button" />
                            </WeiboShareButton>
                        </div>

                        <div className="networkLink">
                            <PocketShareButton
                                url={shareUrl}
                                title={title}
                                className="networkLink__share-button">
                                <PocketIcon
                                    size={32}
                                    round />
                            </PocketShareButton>
                        </div>

                        <div className="networkLink">
                            <InstapaperShareButton
                                url={shareUrl}
                                title={title}
                                className="networkLink__share-button">
                                <InstapaperIcon
                                    size={32}
                                    round />
                            </InstapaperShareButton>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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