import React from 'react';
import { connect } from 'react-redux';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import loading from '../media/loading.svg'
import loupe from '../media/loupe.svg'
import azure from '../media/azure.svg'
import rainy from '../media/rainy.svg'
import sunny from '../media/sunny.svg'
import gearSet from '../media/gearSet.svg'
import coffee from '../media/coffee.svg'

class DriverRefreshIndicatorClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadings: [loupe, loading, azure, rainy, sunny, gearSet, coffee],
            randomNumber: 2,
        }
    }

    // componentDidMount(){
    //     let randomNumber = Math.random() * (this.state.loadings.length - 1) + 0;
    //     randomNumber = Math.round(randomNumber) 
    //     this.setState({randomNumber:randomNumber})
    // }
    render() {

        return (
            <>
                {
                    this.props.storeState.isRefreshExist ?
                        <>
                        {!this.props.storeState.isNeedRefreshIndicator &&
                            <div className="refreshIndicatorModal" style={{background:"none"}} >
                                {this.props.storeState.isRefreshing ? <img src={this.state.loadings[this.state.randomNumber]} alt="" /> : <div />}
                            </div>
                        }
                            
                            <div className={this.props.storeState.isNeedRefreshIndicator ?"refreshIndicatorModal":""} >
                                {this.props.storeState.isNeedRefreshIndicator && this.props.storeState.isRefreshing ? <img src={this.state.loadings[this.state.randomNumber]} alt="" /> : <div />}
                                <i className={!this.props.storeState.isRefreshing && this.props.storeState.isNeedRefreshIndicator ? (this.props.storeState.isGoodAnswer ? "refreshIndicatorSuccess" : "refreshIndicatorFail") : ""}></i>
                            </div>
                        </>
                        : <React.Fragment />
                }
            </>
        )
    }
}

const DriverRefreshIndicator = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverRefreshIndicatorClass);

export default DriverRefreshIndicator;