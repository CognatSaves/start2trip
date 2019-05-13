import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class DriverRefreshIndicator extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const style = {
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
        };
        return(
            <React.Fragment>
            {
                this.props.isRefreshExist ? 
                <div className="refreshIndicatorModal" >
                        <RefreshIndicator
                            size={70}
                            left={0}
                            top={0}
                            loadingColor="#f60"
                            color="#25ae88"
                            status="loading"
                            style={style.refresh}
                        />
                        <i className={this.props.isRefreshing ? "": (this.props.isGoodAnswer ? "refreshIndicatorSuccess" : "refreshIndicatorFail")}></i>  
                    </div>
                    :<React.Fragment/>
            }
            </React.Fragment>
        )
    }  
}