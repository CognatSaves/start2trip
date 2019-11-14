import React from 'react';
import '../driverProfileRegistration/DriverProfileAffiliateProgram.css'
import ShareLinkElements from './ShareLinkElements.jsx';
import { connect } from 'react-redux';

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
                    {
                        
                        <ShareLinkElements shareUrl={shareUrl} title={title} isAdmin={true}/>
                        
                    }
                        

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