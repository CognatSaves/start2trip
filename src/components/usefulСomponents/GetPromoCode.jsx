import React from 'react';
import './getPromoCode.css'
import { connect } from 'react-redux';
import requests from '../../config';
import axios from 'axios';

import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'
import Header from '../header/Header';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class GetPromoCodeClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "Выберите тип",
            country: "Выберите страну",
            symbol: "",
            wordNumber: null,
            howMuchPromo: null,
            discount: null
        }
    }

    creeatePromoFaill = (data, filename, type) => {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
    getPromoCode = () => {
        let wordNumber = this.state.wordNumber
        let discount = this.state.discount
        let arrayLength = this.state.howMuchPromo
        let staticPart = this.state.country + this.state.type + this.state.symbol
        startRefresherGlobal(this, true)
        let that = this
        axios.get(requests.getPromoCode + '?staticPart=' + staticPart + '&wordNumber=' + wordNumber + '&discount=' + discount + '&arrayLength=' + arrayLength, {
        })
            .then(response => {
                console.log('get answer');
                this.creeatePromoFaill(response.data, "promoArray", "txt")
                thenFuncGlobal(that)
            })
            .catch(error => {
                catchFuncGlobal(that)
            })
    }


    render() {

        let textInfo = this.props.storeState.languageTextMain.drivers.tripConfirmation;
        let windowImg = null;
        let coockisIso = cookies.get('country', { path: '/' })
        if (this.props.storeState.languages.length > 0) {


            let j;
            for (let i = 0; i < this.props.storeState.countries.length; i++) {
                if (this.props.storeState.countries[i].ISO === coockisIso) {
                    j = i
                    break;
                }
            }
            if (coockisIso === undefined) {
                j = 1
            }
            windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url
        }
        let renderEl = false
        let userId = cookies.get('userId', { path: "/" })
        if (("5d8c748f2af67f052213a249" === userId 
        || "5cc6b6bbab3b7e111009d58e" === userId 
        || "5d3015c437976716c39c488d" === userId
        || "5d654ed89523424ba6a6b333"=== userId)) {
            renderEl = true
        }

        return (
            <>
                <div className="home_window" style={{ background: "url(" + windowImg + ")no-repeat", minHeight: "93.5vh" }}>
                    <Header driver={true} history={this.props.history} />
                    {renderEl &&
                        <div className="getPromoCodeContent d-flex flex-column align-items-center col-md-8 col-12 mx-auto">
                            <div className="col-10">
                                <div className="d-flex align-items-center">
                                    <FormControl className="col p-1">
                                        <InputLabel htmlFor="select-multiple">{}</InputLabel>
                                        <Select
                                            value={this.state.country}
                                            input={<Input id="select-multiple" variant="outlined" />}
                                            onChange={(event) => { this.setState({ country: event.target.value }) }}
                                        >
                                            <MenuItem disabled value={"Выберите страну"}>{"Выберите страну"}</MenuItem>
                                            {["BY", "GE", "AM", "TR", "IL", "AZ", "ES",].map(name => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl className="col p-1">
                                        <InputLabel htmlFor="select-multiple">{}</InputLabel>
                                        <Select
                                            value={this.state.type}
                                            input={<Input id="select-multiple" variant="outlined" />}
                                            onChange={(event) => { this.setState({ type: event.target.value }) }}
                                        >
                                            <MenuItem disabled value={"Выберите тип"}>{"Выберите тип"}</MenuItem>
                                            {["Общепит", "Жилищные", "Турфирмы", "Люди"].map((name, index) => (
                                                <MenuItem key={name} value={index}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="d-flex">
                                    <TextField
                                        label={"Символ для конкретного места"}
                                        value={this.state.symbol}
                                        onChange={(event) => { if (event.target.value.length <= 3) { this.setState({ symbol: event.target.value }); } }}
                                        className="col p-1"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        label={"Количество символов в генерируемом коде"}
                                        value={this.state.wordNumber}
                                        onChange={(event) => { if (event.target.value <= 8 && event.target.value >= 0) { this.setState({ wordNumber: event.target.value }); } }}
                                        className="col p-1"
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <TextField
                                        label={"Сколько промокодов"}
                                        value={this.state.howMuchPromo}
                                        onChange={(event) => { if (event.target.value <= 1000 && event.target.value >= 0) { this.setState({ howMuchPromo: event.target.value }); } }}
                                        className="col p-1"
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                    <TextField
                                        label={"Процент скидки"}
                                        value={this.state.discount}
                                        onChange={(event) => { if (event.target.value <= 30 && event.target.value >= 0) { this.setState({ discount: event.target.value }); } }}
                                        className="col p-1"
                                        margin="normal"
                                        variant="outlined"
                                        type="number"
                                    />
                                </div>
                                <div className="col">
                                    <span>Результат:   {this.state.country + this.state.type + this.state.symbol}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12"
                                    onClick={() => { this.getPromoCode() }}>
                                    <span style={{ color: "#fff" }}>{"GetPromoCode"}</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }
}
const GetPromoCode = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser
    }),
)(GetPromoCodeClass);

export default GetPromoCode;