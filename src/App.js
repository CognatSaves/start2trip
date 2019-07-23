import React from 'react';
import { connect } from 'react-redux';
class AppClass extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div>
                    Hello, brave world!
                </div>
                
            </React.Fragment>
        )
    }
}

const App = connect(
    (state) => ({
      //storeState: state.AppReduser,
      //globalhistory: state.GlobalReduser,
      //placesState:state.PlacesReduser
    }),
)(AppClass);
  
export default App;