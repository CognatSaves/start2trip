import React from 'react';
import './DriverProfileAffiliateProgram.css'
import { connect } from 'react-redux';




class RenderShareLinkClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconsArray: this.props.iconsArray,
            howMuchRender: 4,
        };


    }
    copyValue = (id) =>{
        let selectedInput = document.getElementById(id);
        selectedInput.select();
        document.execCommand("copy");
    }
    render() {

        let iconsRenderArray = [];
        if (this.state.iconsArray.length > this.state.howMuchRender) {

            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    iconsRenderArray.push(this.state.iconsArray[i]);
                }
            }
        } else {
            iconsRenderArray = this.state.iconsArray;
        }

        return (
            <React.Fragment>
                <div className={"d-flex flex-column align-items-center shareLink " + this.props.classNameDiv}>
                    <spantext>
                        {this.props.textTitle}
                    </spantext>
                    <div className="d-flex flex-row affiliateProgramInput">
                        <input id={this.props.idInput} placeholder="Ссылка 1" value={this.props.valueInput} />
                        <spanlink onClick={() => this.copyValue(this.props.idInput)} className="copyElement" >{this.props.buttonCopyText}</spanlink>
                    </div>
                    <div className="d-flex align-items-center flex-wrap affiliateProgramIconsMass">
                        {iconsRenderArray.map((element, index) =>
                            <i style={{ background: "url(" + element + ")" }} />
                        )}
                        <span onClick={() => {
                            if (this.state.howMuchRender === this.state.iconsArray.length) {
                                this.setState({ howMuchRender: 4 })
                            } else {
                                this.setState({ howMuchRender: this.state.howMuchRender + 4 })
                            }
                        }} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const RenderShareLink = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationReduser,
        globalReduser: state.GlobalReduser
    }),
)(RenderShareLinkClass);

export default RenderShareLink;