import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import 'react-day-picker/lib/style.css';

export default class TourSeatsModalContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    dateLineConverter = (value) => {
        let elems = value.split('-'); //value = year-month-day
        return elems[2] + "." + elems[1] + "." + elems[0];
    }

    monthMove = (that, value) => {
        let month = that.state.selectedMonth;
        let year = that.state.selectedYear;
        month = month + value;
        if (month > 11) {
            while (month > 11) {
                month = month - 11;
                year = year + 1;
            }
        }
        if (month < 0) {
            while (month < 0) {
                month = month + 11;
                year = year - 1;
            }
        }
        that.setState({
            selectedMonth: month,
            selectedYear: year
        })
    }

    render() {

        if (this.props.that.state.tourSeatsModal) {
            this.props.selectActiveDays(this.props.that.state.selectedMonth, this.props.that.state.selectedYear);
        }
        return (
            <div className="d-flex flex-column col-12" style={{ maxHeight: isMobileOnly ? '500px' : '2000px'/*, ma*/ }}>
                <div className="d-flex flex-row tourSeatsModalHeader">
                    <div className="tourSeatsModalName">
                        {/*translation.tour + " " + */(this.props.that.state.tourSeatsModalSelectedElement ? this.props.that.selectTourName(this.props.that.state.tourSeatsModalSelectedElement) : 'Error!')}
                    </div>
                    <div className="d-flex flex-row" style={{ marginLeft: 'auto' }}>
                        <text className="seatsModalMonthText seatsModalMonthMove" onClick={() => this.monthMove(this.props.that, -1)}>{'<'}</text>
                        <div className="seatsModalMonthText">
                            {this.props.textPageMonthArray[this.props.that.state.selectedMonth] + " " + this.props.that.state.selectedYear}
                        </div>
                        <text className="seatsModalMonthText seatsModalMonthMove" onClick={() => this.monthMove(this.props.that, 1)}>{'>'}</text>
                    </div>
                </div>
                <div className="d-flex flex-column tableBlock tourSeatsModalTable">

                    <div className="d-flex flex-column" style={{ textAlign: 'center' }}>
                        <div className="d-flex flex-row">
                            {
                                this.props.pseudoTableHeaderArray.map((element, index) => {
                                    return (
                                        <div style={{ width: this.props.tableElementsWidth[index] }}>{this.props.translation.headerArray[index]}</div>
                                    )
                                })
                            }
                        </div>
                        {
                            this.props.that.state.tourSeatsBlocks.map((element, index) => {
                                return (
                                    <>
                                        <div className="d-flex flex-row" style={{ backgroundColor: this.props.isErrorBlock(element.id, this.props.that) ? 'red' : 'transparent' }}>
                                            <div style={{ width: this.props.tableElementsWidth[0] }}>{this.dateLineConverter(this.props.that.props.globalReduser.createDateTimeString(new Date(element.date), true))}</div>
                                            <div style={{ width: this.props.tableElementsWidth[1] }}>
                                                <input className="tourSeatsModalInput" type="number" value={element.freeSeats}
                                                    onChange={(e) => {
                                                        let value = e.target.value;
                                                        if (value >= 0) {
                                                            let tourBlocks = this.props.that.state.tourSeatsBlocks;
                                                            tourBlocks[index].freeSeats = parseInt(value, 10);
                                                            this.props.that.setState({
                                                                tourSeatsBlocks: tourBlocks
                                                            })
                                                        }
                                                    }} />
                                            </div>
                                            <div style={{ width: this.props.tableElementsWidth[2] }}>{element.reservedSeats}</div>
                                        </div>
                                    </>
                                )
                            })

                        }
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end">

                    <button className="saveButtonTourSeatsModal buttonTourSeatsModal" onClick={() => this.props.that.tourSeatsApplyChanges()}>{this.props.translation.saveChangesButton}</button>
                    <button className="closeButtonTourSeatsModal buttonTourSeatsModal" onClick={() => this.props.that.tourSeatsModalShow()}>{this.props.translation.closeWindow}</button>
                </div>

            </div>

        )
    }
}
