import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class HeaderLinkRenderClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blurMore:false,
        };
    }



    render() {

        let returnEl = this.props.array.map((element, index) => {
            let myClass = "";
            let url = this.props.history.location.pathname.split("/");
            let result = url[2]
            if (result === undefined) {
                myClass = "buttonMassLink align-self-stretch"
            } else {
                result = result.split("-")
                if (("/" + result[0] + "/") === element.to) {
                    myClass = "buttonMassLink align-self-stretch buttonMassLink_active"
                } else {
                    if (element.to === "/" && result[0] === "") {
                        myClass = "buttonMassLink align-self-stretch buttonMassLink_active"
                    } else {
                        myClass = "buttonMassLink align-self-stretch"
                    }

                }
            }
                return (
                    <Link to={"/" + cookies.get('country', { path: "/" }) + "-" + cookies.get('userLangISO', { path: "/" }) + element.to}
                        className={myClass}>{element.value}</Link>
                )

        }
        
        )
        return (
            <>
            {returnEl.slice(0,3)}
            <div className="buttonMassLink moreLink">
                <span>{this.props.more}</span>
                <div className="moreBlock">
                     {returnEl.slice(3)}
                </div>
            </div>
            
            </>
            
            )
    }
}
