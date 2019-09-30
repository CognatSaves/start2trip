import React from 'react';
import requests from '../../config';
class GuideCarSelector extends React.Component{
    render(){
        //задача данного компонента - отображение 1й из картинок машин гида,
        //дабы нажав на любую из них можно было отобразить в вышестоящем блоке
        //машину во всей красе)))
        let cars = this.props.cars;
        return(
            <div className="d-flex justify-content-left col-12 p-0 mt-1"/* style={{marginTop: '10px'}}*/>
                {
                  cars.map((element, index)=>{
                      return(
                        <div className="d-flex flex-column col p-0"  style={{height: '100%', marginRight: '15px', maxWidth: '100px'}} 
                            onClick={()=>this.props.carSelection(index)}>
                            <div className="col-12 p-0" style={{background: 'url('+requests.serverAddressImg+cars[index].carImages[0]+') no-repeat',
                             backgroundSize: '100% 100%', minHeight: '70px'}}/>
                            <text style={{fontSize: '12px', paddingTop: '4px', color: (this.props.selectedCar===index) ? '#f60' : '#304269', height: '20px',
                             overflow: 'hidden'}}>{cars[index].carBrand}</text>
                        </div>
                      )
                  })  
                }
            </div>

        )
    }
}

export default GuideCarSelector;