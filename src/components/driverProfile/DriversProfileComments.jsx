import React from 'react';
import './DriversProfileComments.css';
import { connect } from 'react-redux'
import CreateComment from './CreateComment.jsx';
import ShowComments from './ShowComments.jsx';
class DriversProfileCommentsClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userName: "Заинтересованный посетитель",
        }
    }

    render(){
        function dateConversion(comments){
            for(let i=0; i<comments.length; i++){
                comments[i].date = new Date(comments[i].date);
            }
            return comments;
        }  
        //debugger;      
        //let comments = [...this.props.commentState.comments].reverse();
        
        //let selectedComments = comments.slice((this.props.page-this.props.showPages) * 5, (this.props.page) * 5);
        let createCommentString = this.state.userName+", как ты оцениваешь "+this.props.driver.name;


        let comments = this.props.driver.comments ? [...this.props.driver.comments].reverse() : [];
        let selectedComments = comments.slice((this.props.page-this.props.showPages) * 5, (this.props.page) * 5);
        selectedComments = dateConversion(selectedComments);
        return(
            <React.Fragment>               
                <div className="driverProfileComments_commentBlock d-flex flex-column">
                    {/* <CreateComment userName={this.state.userName} createCommentString={createCommentString}/>  */}
                    <ShowComments selectedComments={selectedComments}/>            
                </div>
            </React.Fragment>
        )
    }
}
const DriversProfileComments = connect(
    (state) =>({
      commentState: state.CommentReduser
    }),

  )(DriversProfileCommentsClass);
  
  export default DriversProfileComments;