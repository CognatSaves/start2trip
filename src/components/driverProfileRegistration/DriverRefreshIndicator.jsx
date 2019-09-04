import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import loading from '../media/loading.svg'
import loupe from '../media/loupe.svg'
import azure from '../media/azure.svg'
import rainy from '../media/rainy.svg'
import sunny from '../media/sunny.svg'
import gearSet from '../media/gearSet.svg'
import coffee from '../media/coffee.svg'

export default class DriverRefreshIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loadings:[loupe,loading,azure,rainy,sunny,gearSet,coffee],
            randomNumber:2
        }
    }
    // componentDidMount(){
    //     let randomNumber = Math.random() * (this.state.loadings.length - 1) + 0;
    //     randomNumber = Math.round(randomNumber) 
    //     this.setState({randomNumber:randomNumber})
    // }
    render() {
        // const style = {
        //     refresh: {
        //         display: 'inline-block',
        //         position: 'relative',
        //     },
        // };
        
        return (
            <React.Fragment>
                {
                    this.props.isRefreshExist ?
                        <div className="refreshIndicatorModal" >
                            {/* <RefreshIndicator
                                size={70}
                                left={0}
                                top={0}
                                loadingColor="#f60"
                                color="#25ae88"
                                status="loading"
                                style={style.refresh}
                            /> */}
                            {this.props.isRefreshing ? <img src={this.state.loadings[this.state.randomNumber]} alt=""/>:<div />}
                            <i className={this.props.isRefreshing ? "" : (this.props.isGoodAnswer ? "refreshIndicatorSuccess" : "refreshIndicatorFail")}></i>
                        </div>
                        : <React.Fragment />
                }
            </React.Fragment>
        )
    }
}