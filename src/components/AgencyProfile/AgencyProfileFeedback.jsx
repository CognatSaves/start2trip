import React from 'react';
import {connect} from 'react-redux';

import ShowComments from '../driverProfile/ShowComments';

class AgencyProfileFeedbackClass extends React.Component{
    constructor(props){
        super(props);
        let profile = this.props.globalReduser.profile;
        this.state={
            comments: profile.comments
        }

        
    }

    render(){

        // TODO добавить кнопку показать еще и пагинацию
        return(
            <React.Fragment>
            <div className="d-flex flex-wrap">
            <ShowComments selectedComments={this.state.comments} />
            </div> 
            
            </React.Fragment>
             
        )
     }
}
const AgencyProfileFeedback = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileFeedbackClass);

export default AgencyProfileFeedback;