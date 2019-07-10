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
      tempValue: this.props.value,
      changable: this.props.changable || false
    }

  }

  onRate = (element) => {

    this.props.dispatch(setCommentValue(element.rating));
    this.setState({ tempValue: element.rating });
  }
  render() {
    if(this.props.changeStarsBlock){
      
    }
    
    console.log(this.props);
    let classString = "infoBlock_starsBlock_stars d-flex flex-row "+(this.props.changeStarsBlock ? this.props.changeStarsBlock+' ' : '');
    
    return (
      <div className={"infoBlock_starsBlock d-flex align-items-center justify-content-start " }>
        <div className={this.props.valueDisplay && this.props.commentNumber>0 ? "infoBlock_starsBlock_value" : "infoBlock_starsBlock_value d-none" }>{this.state.tempValue}</div>
        <div className={classString}>
          <Rater total={5} onRate={this.onRate} interactive={this.state.changable} rating={this.state.tempValue} />
        </div>
        <div className={(this.props.commentNumberDisplay ? "infoBlock_starsBlock_number d-flex " : "infoBlock_starsBlock_number d-none ")+(this.props.commentTextStilizated ? this.props.commentTextStilizated : '' ) }>{this.props.commentNumber}</div>
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