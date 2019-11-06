import React from 'react';
import requests from '../../config';
import './GuideDescription.css';
class GuideCarSelector extends React.Component {
    render() {
        //задача данного компонента - отображение 1й из картинок машин гида,
        //дабы нажав на любую из них можно было отобразить в вышестоящем блоке
        //машину во всей красе)))
        let cars = this.props.cars;
        return (
            <div className="d-flex justify-content-left col-12 p-0 mt-1">
                {
                    cars.length > 1 ?
                        <>
                            {

                                cars.map((element, index) => {
                                    return (
                                        <div className="d-flex flex-column col p-0 guideCarSelectorBlock"
                                            onClick={() => this.props.carSelection(index)}>
                                            <div className="col-12 p-0"
                                                style={{ background: 'url(' + requests.serverAddressImg + cars[index].carImages[0] + ') no-repeat', backgroundSize: 'cover', backgroundPosition:"center", minHeight: '70px' }} />
                                            <text className="guideCarSelectorText" style={{ color: (this.props.selectedCar === index) ? '#f60' : '#304269' }}>
                                                {cars[index].carBrand}
                                            </text>
                                        </div>
                                    )
                                })
                            }
                        </> : <React.Fragment />
                }
            </div>
        )
    }
}

export default GuideCarSelector;