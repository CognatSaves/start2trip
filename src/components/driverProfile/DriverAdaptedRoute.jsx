import React from 'react';

export default class DriverAdaptedRoute extends React.Component{
    shouldComponentUpdate(nextProps){ 
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        const { element, date, cities, travelLength, travelTime, goToDrivers, changeTravelVisibility } = this.props;
        let isVisibleArray = Array(cities.length).fill("visible");
        isVisibleArray[isVisibleArray.length - 1] = "hidden";

        return(
            <div className="drivers_route col-12 d-flex flex-column" style={{marginTop: 0}}>
                <div className="route_date d-flex " style={{ margin: 0 }}>
                    <div className="route_date_text">Ваш индивидуальный маршрут на: {date}</div>
                    <div className="d-flex " to="/drivers" onClick={() => goToDrivers()}>
                        <div className="route_change_text">Изменить маршрут</div>
                        <div className="route_change_emblem" />
                    </div>
                </div>
                <div className="driversAdaptedRoute_routeBlock" >
                    <div class="col-8" style={{ display: "flex", flexDirection: "column", marginRight: "auto", padding: 0, marginTop: "2%" }}>
                        <div className="route_show d-flex " >
                            {cities.map((element, index) =>
                                <div className="route_show_element driverAdaptedRoute_show_element" style={{/*width: routeElementWidth*/ }}>
                                    <div className="route_show_icon" style={{ marginTop: "4px", height: "36px", width: "36px", backgroundSize: "36px 36px" }} />
                                    <div className="route_show_text driverAdaptedRoute_show_text" >{cities[index]}</div>
                                    <div className="route_show_line driverAdaptedRoute_show_line" style={{ visibility: isVisibleArray[index] }}></div>
                                </div>
                            )}
                        </div>
                        <div className="route_bottomBlock driverAdaptedRoute_bottomBlock">
                            <div className="route_time_text ">Время в пути без остановок:
                            <p1>{travelTime}</p1><p2>{travelLength}</p2>
                            </div>
                            <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
                        </div>
                    </div>
                    <div class="col-4" style={{ display: "flex", flexDirection: "column", marginLeft: "auto" }}>
                        <div className="driversAdaptedRoute_price">{"$" + element.price}</div>
                        <button className="driversAdaptedRoute_sendRequest" onClick={() => changeTravelVisibility('block')}>ЗАБРОНИРОВАТЬ ПОЕЗДКУ</button>
                        <div className="driversAdaptedRoute_requestCommentary">Стоимость окончательная. Топливо включено</div>
                    </div>
                </div>

            </div>  
        )
    }
}