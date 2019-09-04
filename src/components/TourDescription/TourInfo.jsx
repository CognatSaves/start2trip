import React from 'react';
import './TourInfo.css';
import { connect } from 'react-redux'



class TourInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
       
       
        return (
            <div className="col-12 py-5">
                <div className="d-flex justify-content-center align-items-center">
                    <p className="m-0">Подобрать тур:</p>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <span>Найти</span>
                </div>
            </div>
        )
    }
}

const TourInfo = connect(
    (state) => ({
        globalReduser: state.GlobalReduser
    })
)(TourInfoClass);

export default TourInfo;