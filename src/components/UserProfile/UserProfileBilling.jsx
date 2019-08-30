import React from 'react';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from '@material-ui/core/TextField';

class UserProfileBillingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            withdrawalOfFundsModal: false,
            toPayModal: false,
            typeCardValue: "Выберите тип",
            typeCardArray: ["visa", "mastercard"],
            toPayPersonalAccountValue: true,
            toPayCardValue: false,
        };
    }
    handleClose = (name, value) => {
        switch (name) {
            case 'withdrawal':
                this.setState({ withdrawalOfFundsModal: !this.state.withdrawalOfFundsModal });
                break
            case 'toPay':
                this.setState({ toPayModal: !this.state.toPayModal });
                break
            case 'typeCard':
                this.setState({ typeCardValue: value });
                break
            default:
        }

    };

    render() {
        let profile = this.props.globalReduser.profile;
        function findCurrencyEl(that, iso) {
            for (let i = 0; i < that.props.globalReduser.profile.currencies.length; i++) {
                if (iso === that.props.globalReduser.profile.currencies[i].ISO) {
                    return i;
                }
            }
        }
        function dateStringConversion(datestr) {
            let date = new Date(datestr);
            let day = date.getUTCDate();
            let month = date.getUTCMonth() + 1;
            let year = date.getUTCFullYear();
            let hours = date.getUTCHours();
            let minutes = date.getMinutes();
            return (day < 10 ? '0' + day : day) + "." + (month < 10 ? '0' + month : month) + "." + year + ", " + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes);
        }
        let that = this;
        console.log('DriverProfileBilling render');
        console.log(this.state);
        
        let textInfo = this.props.storeState.languageTextMain.userProfile.userProfileBilling;
        let billing = this.props.globalReduser.profile.billing;
        return (
            <React.Fragment>
                <Dialog
                    contentClassName='billingModal'
                    paperClassName='billingModalDiv'
                    contentStyle={{ width: isMobileOnly ? "" : "100%" }}
                    // actions={actionsWithdrawal}
                    modal={false}
                    open={this.state.withdrawalOfFundsModal}
                    onRequestClose={() => { this.handleClose('withdrawal') }}
                >
                    <div className="billingModalHeder">
                        <span>{textInfo.billingModalHeader+':'}$</span>
                    </div>
                    <form action="" className="billingModalContent">
                        <div className="d-flex align-items-center mt-1">
                            <TextField
                                label={textInfo.billingModalContent.summLabel}
                                value={this.state.summ}
                                onChange={(e) => this.setState({ summ: e.target.value })}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <label htmlFor="withdrawalSum" className="col-3">Sum</label>
                            <input id="withdrawalSum" className="col-md-9 col-sm-9" type="text" required /> */}
                        </div>
                        <div className="d-flex align-items-center mt-1">
                            <TextField
                                label={textInfo.billingModalContent.cardNumber}
                                value={this.state.cardNumber}
                                onChange={(e) => this.setState({ cardNumber: e.target.value })}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <label htmlFor="NumberCard" className="col-3">Number</label>
                            <input id="NumberCard" className="col-md-9 col-sm-9" type="text" required /> */}
                        </div>

                        <DropDownMenu
                            value={this.state.typeCardValue}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                            className="billingModalContentDropDown w-100"
                            onChange={(event, index, value) => { this.handleClose('typeCard', value) }}
                            style={{ width: "100%" }}
                            autoWidth={false}
                            selectedMenuItemStyle={{ color: "#f60" }}
                        >
                            <MenuItem value={textInfo.billingModalContent.cardType}
                            disabled={true} primaryText={textInfo.billingModalContent.cardType} />
                            {this.state.typeCardArray.map((element, index) =>
                                <MenuItem value={element} primaryText={element} />
                            )}
                        </DropDownMenu>

                        <div className="billingModalFooter d-flex justify-content-end mt-2">
                            <FlatButton
                                label={textInfo.billingModalContent.cancel}
                                primary={true}
                                onClick={() => { this.handleClose('withdrawal') }}
                            />
                            <button className="billingBtSubmit" type="submit">{textInfo.billingModalContent.submit}</button>
                        </div>

                    </form>
                </Dialog>
                <div className="billingBody">
                    <div className="d-flex flex-md-row flex-sm-column flex-column">
                        <div className=" col-12">
                            <div className="d-flex  flex-sm-row flex-column align-items-md-end align-items-sm-center align-items-center  justify-content-between">
                                <div className="billingText col-md-10 col-12 p-0">
                                    <div className="billingTextTitle col-12 p-0">
                                        <span>{textInfo.billingBody.title+"20456787"+")"}</span>
                                    </div>
                                    <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                        <span className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">{textInfo.billingBody.partnersProfit+":"}</span>
                                        <span>{'$'+billing.partnersProfit}</span>
                                    </div>
                                    <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                        <span className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">{textInfo.billingBody.payedprofit+":"}</span>
                                        <span>{'$'+billing.payedprofit}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="specialText col-xl-7 col-lg-7 col-md-8 col-sm-9 col-8 p-0 py-2">{textInfo.billingBody.summary+":"}</span>
                                        <span className="specialText">{'$'+(billing.partnersProfit-billing.payedprofit)}</span>
                                    </div>
                                </div>
                                <div className="billingButton d-flex justify-content-end  align-items-end">
                                    <span onClick={() => { this.handleClose('withdrawal') }}>{textInfo.billingBody.submit}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {
                   
                }
                 </React.Fragment>
        );
    }
}


const UserProfileBilling = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(UserProfileBillingClass);

export default UserProfileBilling;