import React from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header'
import './feedback.css';
import CreateComment from '../driverProfile/CreateComment';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import { Helmet } from 'react-helmet';




class feedbackClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshExist: false,
            isRefreshing: false,
            isGoodAnswer: false,
        };
    }
    startRolling = () => {
        
        this.setState({
            isRefreshExist: true,
            isRefreshing:true
        });
    }
    endRolling = (result) => {
        
        let that = this;
        this.setState({
            isRefreshing: false,
            isGoodAnswer: result
        });
        setTimeout(
            function () {
                that.setState({ isRefreshExist: false, isRefreshing: true })
            }, 2000
        )
    }



    render() {
        let id = this.props.match.params.id;
        let clientId = this.props.match.params.clientId;
        let textInfo = this.props.storeState.languageTextMain.driverProfile.createComment;
        return (
            <React.Fragment>
                <Header history={this.props.history} />
                <div className="home_window d-flex justify-content-center align-items-center" style={{ minHeight: "87.5vh" }}>

                    <Helmet>
                        <title>{"Оставте отзыв о Вашей поездке"}</title>
                        <meta name="description" content={"Оставте отзыв о Вашей поездке"} />
                        <meta property="og:site_name" content="Tripfer" />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content="https://tripfer.com/feedback" />
                        <meta property="og:title" content={"Оставте отзыв о Вашей поездке"} />
                        <meta property="og:description" content={"Оставте отзыв о Вашей поездке"} />
                    </Helmet>
                    <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                    <div className="col-md-6 col-12">
                        <CreateComment targetType={"driver"} myclass={"feedbackbackground"} clientId={clientId} targetId={id} createCommentString={textInfo.createCommentString} 
                        startRolling={()=>this.startRolling() } endRolling={(result)=>this.endRolling(result)}/>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
const feedback = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,

    }),
)(feedbackClass);

export default feedback;