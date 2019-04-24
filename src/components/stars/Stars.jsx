import React from 'react';
import './Stars.css';
import { connect } from 'react-redux'
import { setCommentValue } from '../../redusers/ActionComments';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class StarsClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValue: this.props.value || this.props.commentState.commentValue,
      changable: this.props.changable || false
    }

  }

  onRate = (element) => {
    debugger
    this.props.dispatch(setCommentValue(element.rating));
    this.setState({ tempValue: element.rating });
  }
  render() {

    return (
      <div className="infoBlock_starsBlock d-flex  justify-content-start">
        <div className={this.props.valueDisplay ? "infoBlock_starsBlock_value" : "infoBlock_starsBlock_value d-none" }>{this.state.tempValue}</div>
        <div className="infoBlock_starsBlock_stars d-flex ">
          <Rater total={5} onRate={this.onRate} interactive={this.state.changable} rating={this.state.tempValue} />
        </div>
        <div className={this.props.commentNumberDisplay ? "infoBlock_starsBlock_number d-flex" : "infoBlock_starsBlock_number d-none" }>{this.props.commentNumber}</div>
      </div>
    )
  }
}

const Stars = connect(
  (state) => ({
    commentState: state.CommentReduser
  }),
)(StarsClass);

export default Stars;