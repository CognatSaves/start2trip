import React from 'react';
import { connect } from 'react-redux'

import ShowComments from '../driverProfile/ShowComments';

class DriverProfileFeedbackClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.globalReduser.profile;
        this.state = {
            comments: profile.comments
        }
    }

    render() {
        return (
            <div className="profileFeedbackBlock_comments d-flex flex-column">
                <ShowComments selectedComments={this.state.comments} />
            </div>
        )
    }
}

const DriverProfileFeedback = connect(
    (state) => ({
        commentState: state.CommentReduser,
        globalReduser: state.GlobalReduser
    }),

)(DriverProfileFeedbackClass);

export default DriverProfileFeedback;