import React from 'react';
import './DriverProfileAffiliateProgram.css'
import {
    TwitterShareButton,
    FacebookShareButton,
    VKShareButton,
    OKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    ViberShareButton,
    PinterestShareButton,

    TwitterIcon,
    FacebookIcon,
    VKIcon,
    OKIcon,
    TelegramIcon,
    WhatsappIcon,
    ViberIcon,
    PinterestIcon,
} from 'react-share';
import exampleImage from "../media/404.svg"
export default class ShareLinkElements extends React.Component {
    render() {
        const shareUrl = this.props.shareUrl;
        const title = this.props.title;
        return (
            <>
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
                {
                    !this.props.isAdmin && 
                    <>
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
                    </>
                }
                {
                    this.props.isAdmin &&
                    <>
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
                    </>
                }
                {
                    !this.props.isAdmin && 
                    <>
                        <div className="networkLink">
                            <PinterestShareButton
                                url={String(shareUrl)}
                                media={String("https://tripfer.com" + exampleImage)}
                                windowWidth={1000}
                                windowHeight={730}
                                className="networkLink__share-button">
                                <PinterestIcon size={32} round />
                            </PinterestShareButton>
                        </div>
                    </>
                }
            </>
        )
    }
}