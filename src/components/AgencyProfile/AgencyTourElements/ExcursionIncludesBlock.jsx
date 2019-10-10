import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import 'react-day-picker/lib/style.css';

export default class ExcursionIncludesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    changeExcursionIncludesData=(that, type)=> {

        let tourSave = that.state.tourSave;
        switch (type) {
            case "hotelMeeting": {
                tourSave.excursionIncludes.hotelMeeting = !tourSave.excursionIncludes.hotelMeeting;
                break;
            }
            case "hotelDelivery": {
                tourSave.excursionIncludes.hotelDelivery = !tourSave.excursionIncludes.hotelDelivery;
                break;
            }
            case "fare": {
                tourSave.excursionIncludes.fare = !tourSave.excursionIncludes.fare;
                break;
            }
            case "entryTickets": {
                tourSave.excursionIncludes.entryTickets = !tourSave.excursionIncludes.entryTickets;
                break;
            }
            case "food": {
                tourSave.excursionIncludes.food = !tourSave.excursionIncludes.food;
                break;
            }
            case "accommodation": {
                tourSave.excursionIncludes.accommodation = !tourSave.excursionIncludes.accommodation;
                break;
            }
            default:
        }
        that.setState({
            tourSave: tourSave
        })
    }
   

    render() {

        let { that, translation } = this.props;
        console.log(that);
        return (
            <div className="paddingL10 d-flex flex-md-row flex-column align-items-start">
            <label className="d-md-block d-none col-2 ">{translation.label + ":"}</label>
            <div className="d-flex flex-row col-md-6 col-12 p-0">
                <div className="d-flex flex-column" style={{ marginRight: '5px' }}>
                    <div className="d-flex flex-row">
                        <Checkbox id="hotelMeeting" checked={that.state.tourSave.excursionIncludes.hotelMeeting} onChange={() => this.changeExcursionIncludesData(that, 'hotelMeeting')} />
                        <label htmlFor={"hotelMeeting"} style={{ margin: 'auto 0' }}>{translation.hotelMeeting}</label>

                    </div>
                    <div className="d-flex flex-row">
                        <Checkbox id="hotelDelivery" checked={that.state.tourSave.excursionIncludes.hotelDelivery} onChange={() => this.changeExcursionIncludesData(that, 'hotelDelivery')} />
                        <label htmlFor={"hotelDelivery"} style={{ margin: 'auto 0' }}>{translation.hotelDelivery}</label>

                    </div>
                    <div className="d-flex flex-row">
                        <Checkbox id="fareId" checked={that.state.tourSave.excursionIncludes.fare} onChange={() => this.changeExcursionIncludesData(that, 'fare')} />
                        <label htmlFor={"fareId"} style={{ margin: 'auto 0' }}>{translation.fare}</label>

                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <Checkbox id="entryTickets" checked={that.state.tourSave.excursionIncludes.entryTickets} onChange={() => this.changeExcursionIncludesData(that, 'entryTickets')} />
                        <label htmlFor={"entryTickets"} style={{ margin: 'auto 0' }}>{translation.entryTickets}</label>

                    </div>
                    <div className="d-flex flex-row">
                        <Checkbox id="foodId" checked={that.state.tourSave.excursionIncludes.food} onChange={() => this.changeExcursionIncludesData(that, 'food')} />
                        <label htmlFor={"foodId"} style={{ margin: 'auto 0' }}>{translation.food}</label>

                    </div>
                    <div className="d-flex flex-row">
                        <Checkbox id="accommodation" checked={that.state.tourSave.excursionIncludes.accommodation} onChange={() => this.changeExcursionIncludesData(that, 'accommodation')} />
                        <label htmlFor={"accommodation"} style={{ margin: 'auto 0' }}>{translation.accommodation}</label>

                    </div>
                </div>
            </div>
        </div>

        )
    }
}
