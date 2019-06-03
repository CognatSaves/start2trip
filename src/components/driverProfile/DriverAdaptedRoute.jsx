import React from 'react';

export default class DriverAdaptedRoute extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {
        const { element, date, cities, travelLength, travelTime, goToDrivers, changeTravelVisibility } = this.props;
        let isVisibleArray = Array(cities.length).fill("visible");
        isVisibleArray[isVisibleArray.length - 1] = "hidden";

        return (
            <div className="drivers_route col-12 p-0 d-flex flex-column" >
                <div className="d-flex col-12">
                    <div className="route_date_text">Дата отправления: {date}</div>
                </div>
                <div className="d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-center col-12" >
                    <div className="col-12">
                        <div className="driverAdaptedRoute d-flex flex-sm-row flex-column justify-content-center align-items-center " >
                            {cities.map((element, index) =>
                                <React.Fragment>
                                    <div className="route_show_Line" style={{ display: index ? "block" : "none" }} />
                                    <span className="route_show_text" >{cities[index].point}</span>
                                </React.Fragment>
                            )}
                        </div>

                        <div className="col-12 p-0 d-flex flex-md-row flex-column-reverse justify-content-between align-items-md-center align-items-end">
                            <div className="route_bottomBlock driverAdaptedRoute_bottomBlock col-md-6 col-12">
                                <div className="route_time_text">Время в пути без остановок:
                            <p1>{travelTime}</p1><p2>{travelLength}</p2>
                                </div>
                                <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
                            </div>
                            <div className="d-flex flex-column align-items-center pb-4 ">
                                <div className="driverAdaptedPrice">{"$" + element.price}</div>
                                <div className="driverAdaptedBt">
                                    <span onClick={() => changeTravelVisibility('block')}>ЗАБРОНИРОВАТЬ ПОЕЗДКУ</span>
                                </div>
                                <div className="route_comment">Стоимость окончательная. Топливо включено</div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}