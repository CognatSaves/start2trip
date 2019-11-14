import React from 'react';
import { connect } from 'react-redux';

import CreateComment from '../driverProfile/CreateComment';
import ShowComments from '../usefulСomponents/ShowComments';
import Manipulator from '../manipulator/Manipulator';

class CommentBlockClass extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {

        console.log("CommentBlock render");

        let selectedComments = this.props.comments.slice((this.props.page - this.props.showPages) * this.props.storeState.pagesMenuValue,
            (this.props.page) * this.props.storeState.pagesMenuValue);
        let textInfo = this.props.storeState.languageTextMain.tourDescription.commentBlock;

        return (
            <div className="placeDescription_block d-flex flex-column" style={{ marginBottom: '100px' }} id={this.props.id}>
                {
                    !this.props.noHeader &&
                        <div className="placeDescription_fragmentName">{textInfo.comments}</div>
                }               
                <div className="render_otherPlaces" style={{ marginTop: "15px" }}>
                    {this.props.targetId && (this.props.isSuperUser ||this.props.showCreateComment) ? <>
                        <CreateComment targetType={this.props.targetType} targetId={this.props.targetId} 
                        newComments={this.props.newComments}
                        createCommentString={textInfo.createCommentString}/>
                    </> : <React.Fragment />}

                    <ShowComments selectedComments={selectedComments} targetId={this.props.targetId} newComments={this.props.newComments} profile={this.props.profile} />

                </div>
                {
                    selectedComments.length > 0 ?
                        <Manipulator number={this.props.comments.length} page={this.props.page} elementsNumber={this.props.storeState.pagesMenuValue}
                            setPage={this.props.setPage} showMorePages={this.props.showMorePages} isCommentBlock={true} />
                        : <React.Fragment />
                }

            </div>
        )
    }
}

const CommentBlock = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),

)(CommentBlockClass);

export default CommentBlock;