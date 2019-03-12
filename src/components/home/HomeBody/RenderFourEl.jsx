import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';


class RenderFourElClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        page: 1,
        //elementNumber: 10,
        showPages: 1
      };
      this.setPage = this.setPage.bind(this);
      this.showMorePages = this.showMorePages.bind(this);
    }
    render() {
        return (
          <div className="drivers_block">
            {selectedElements.map((element, index) =>
              <div className="drivers_block_element">
               
                  
              </div>
            )}
            
          </div>
    
        )
      }
    
    }
    
    const RenderFourEl = connect(
      (state) => ({
        storeState: state.AppReduser,
      }),
    )(RenderFourElClass);
    
    export default RenderFourEl;