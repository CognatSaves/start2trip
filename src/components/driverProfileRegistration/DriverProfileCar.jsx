import React from 'react'
import './DriverProfileCar.css'
import 'react-telephone-input/lib/withStyles'
import { connect } from 'react-redux'
import { Collapse } from 'reactstrap'
import { isMobileOnly } from 'react-device-detect'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import config from '../../config';
import requests from '../../config';

class DriverProfileCarClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.profileReduser.profile;
        console.log('DriverProfileCarClass constructor');
        console.log(profile);
        this.state = {
            comfort: [false,false,false,false],
            carImg: [],
            imgFiles:[],
            file: '',
            imagePreviewUrl: '',
            collapse: false,
            newCarCard: { nameCar: "", yearCar: "", plateNumberCar: "", typeCar: "", fuelType: "", carClass: "", onWork: true },
            car:{}
        }
        this.toggle = this.toggle.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.applyChanges=this.applyChanges.bind(this);
        this.destroy = this.destroy.bind(this);
        this.changeActive = this.changeActive.bind(this);
    }
    applyChanges(type){
        let jwt = this.props.globalReduser.readCookie('jwt');       
        if(jwt && jwt!=="-"){
            var carForm = new FormData();
            carForm.append('carBrand',this.state.newCarCard.nameCar);
            carForm.append('manufactureYear', this.state.newCarCard.yearCar);
            carForm.append('carNumber',this.state.newCarCard.plateNumberCar);
            carForm.append('seats',this.state.newCarCard.numberOfSeats);
            carForm.append('fueltype', this.state.newCarCard.fuelType);
            carForm.append('cartype',this.state.newCarCard.typeCar);
            carForm.append('carclass',this.state.newCarCard.carClass);

            carForm.append('onWork',true);
            let comfort = this.state.comfort;
            carForm.append('climatControl',comfort[0]);
            carForm.append('leatherInterior',comfort[1]);
            carForm.append('freeWiFi',comfort[2]);
            carForm.append('smokingPermit',comfort[3]);
            for(let i=0; i<this.state.imgFiles.length;i++){
                carForm.append('image',this.state.imgFiles[i]);
            }
            const request = new XMLHttpRequest();
            if(type){      
                request.onreadystatechange = function(){
                    console.log(request.status);
                    console.log(request.statusText);
                    console.log(request.responseText);
                }
                request.open('PUT', requests.userCarsCreateRequest);
                request.setRequestHeader('Authorization',`Bearer ${jwt}`);
                request.send(carForm);
            }
            else{
                let fileTypeArray = [];
                for(let i=0; i<this.state.imgFiles.length;i++){
                    if(this.state.imgFiles[i].name==="filename"){
                        fileTypeArray[i]="old";
                        carForm.append('fileType', 'old');
                        carForm.append('address', this.state.carImg[i]);
                    }
                    else{
                        fileTypeArray[i]="new";
                        carForm.append('fileType', 'new');
                        carForm.append('address', 'check new file');
                    }
                }
                request.open('PUT',requests.userCarUpdateRequest+'/'+this.state.car.id);
                request.setRequestHeader('Authorization',`Bearer ${jwt}`);
                request.send(carForm);
            }
            document.location.reload(true);
        }  
        
    } 
    formSubmit(event) {
        console.log('formSubmit');
        if(!this.state.car.id){
            this.applyChanges(true);//если новый, то true
        }
        else{
            this.applyChanges(false);
        }      
        event.preventDefault();
    }

    toggle(element) {
        if(!element){
            this.setState(state => ({ collapse: !state.collapse, imagePreviewUrl: '',
            newCarCard: { nameCar: "", yearCar: "", plateNumberCar: "", typeCar: "", fuelType: "", numberOfSeats: "" , carClass: ""},
            comfort: [false,false,false,false], carImg: [], imgFiles:[], car:{} }));       
        }
        else{
            let carImg = [];let imgFiles=[];
            for(let i=0; i<element.image.length; i++){
                carImg[i]=requests.serverAddress+element.image[i].url;
                imgFiles[i]=new File([""], "filename");
            }
            this.setState(state => ({ collapse: true, imagePreviewUrl: carImg[0] ? carImg[0] : '',
            newCarCard: { nameCar: element.carBrand, yearCar: element.manufactureYear, plateNumberCar: element.carNumber,
            typeCar: element.cartype, fuelType: element.fueltype, numberOfSeats: element.seats , carClass: element.carclass},
            comfort: [...element.conveniences], carImg: carImg, imgFiles:imgFiles, car:element }));
        }
        if (isMobileOnly) {
            window.scroll(0, 300);
        } else {
            window.scroll(0, 322);
        }
    }
    changeActive(element){
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt!=="-"){
            var carForm = new FormData();
            carForm.append('onWork',!element.onWork);
            const request = new XMLHttpRequest();
            request.open('PUT',requests.userCarActivateRequest+'/'+element.id);
            request.setRequestHeader('Authorization',`Bearer ${jwt}`);
            request.send(carForm);
            document.location.reload(true);
        }
    }
    destroy(element){
        let jwt = this.props.globalReduser.readCookie('jwt');     
        if(jwt && jwt!=="-"){
            console.log('try to destroy a car');
            const request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                console.log(request.status);
                console.log(request.statusText);
                console.log(request.responseText);
            }
            request.open('DELETE', requests.userCarDestroyRequest+"/"+element.id);
            request.setRequestHeader('Authorization',`Bearer ${jwt}`);
            request.send();
            document.location.reload(true);
        }
    }

    _handleImageChange(e) {
        e.preventDefault();
        let fullfile = e.target.files;

        for (let i = 0; i < fullfile.length; i++) {
            let file = fullfile[i]

            if (!file.type.match('image')) continue;

            let reader = new FileReader();
            reader.onloadend = () => {
                var img = reader.result;
                let imgFiles = this.state.imgFiles;
                imgFiles.push(file);
                this.setState({
                    file: file,
                    imagePreviewUrl: img,
                    imgFiles: imgFiles
                });
                this.setState(state => { const carImg = this.state.carImg.push(img); return carImg });
            }
            reader.readAsDataURL(file)
        }
    }

    handleChange = (event, index, value, key) => {
        if (key==='fuelTypes') {
            this.setState({
                newCarCard: { ...this.state.newCarCard, fuelType: value }
            })
        } 
        if(key==='carTypes') {
            this.setState({
                newCarCard: { ...this.state.newCarCard, typeCar: value }
            })
        }
        if(key==='carClasses'){
            this.setState({
                newCarCard: { ...this.state.newCarCard, carClass: value }
            })
        }
    }

    render() {
        function findCarTypeNames(cars, carTypes){
            let res = [];
            for(let i=0; i<cars.length; i++){
                for(let j=0;j<carTypes.length; j++){
                    if(cars[i].cartype===carTypes[j].id){
                        res[i]=carTypes[j].name_ru;
                    }
                }
            }
            return res;
        }
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="carAddNewCarPhotoCarImg" alt="add_car" />);
        }
        let cars = this.props.profileReduser.profile.cars;
        console.log("DriverProfileCar render");
        //выдаёт значения строго на русском - впоследствие будет переделана
        let carTypes = findCarTypeNames(cars, this.props.profileReduser.profile.carTypes);
        /*console.log(config.serverAddress+cars[0].url);*/
        return (
            <div className="_ThisTagIsNeeded">
                <Collapse isOpen={this.state.collapse}>
                    <div className="carAddNewCar d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-start align-items-lg-start align-items-md-start align-items-sm-center align-items-center">
                        <div className="carAddNewCarPhotoCar col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 pt-5" >
                            <div style={ this.state.imagePreviewUrl ? {}:{background:"#686868",  height:"300px" ,borderRadius:"5px"}}>
                                {$imagePreview}
                            </div>    
                            <label htmlFor="addCarFile" ></label>
                            <input type="file" id="addCarFile" style={{ display: "none" }} multiple onChange={this._handleImageChange} required />
                            <div className="carPhotoMiniContainer d-flex overflow-auto">
                                {this.state.carImg.map((element, index) =>
                                    <div className="position-relative">
                                     <img src={element} className="carPhotoMini" alt="add_car" onClick={() => { this.setState({ imagePreviewUrl: this.state.carImg[index] }) }} />
                                        <span onClick={() => { this.state.carImg.splice(index, 1); this.state.imgFiles.splice(index,1); this.setState({ imgFiles: this.state.imgFiles, carImg: this.state.carImg, imagePreviewUrl: this.state.carImg[0] }) }}></span>
                                    </div>
                                )}
                            </div>

                        </div>
                        <form onSubmit={this.formSubmit} id="newCar" className="carAddNewCarInformation d-flex flex-column col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11 p-0">
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mt-2">
                                <label htmlFor="profileCarBrend" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Марка автомобиля:</label>
                                <input id="profileCarBrend" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.nameCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, nameCar: e.currentTarget.value }
                                    })
                                }} type="text" />
                                <TextField
                                    value={this.state.newCarCard.nameCar}
                                    onChange={(e) => {
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, nameCar: e.currentTarget.value }
                                        })
                                    }}
                                    floatingLabelText="Марка автомобиля"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}

                                />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="profileCarYaer" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Год автомобиля:</label>
                                <input id="profileCarYaer" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.yearCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, yearCar: e.currentTarget.value }
                                    })
                                }} type="text" />
                                <TextField
                                    value={this.state.newCarCard.yearCar}
                                    onChange={(e) => {
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, yearCar: e.currentTarget.value }
                                        })
                                    }}
                                    floatingLabelText="Год автомобиля"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}

                                />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="profileCarNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Номер автомобиля:</label>
                                <input id="profileCarNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.plateNumberCar} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, plateNumberCar: e.currentTarget.value }
                                    })
                                }} type="text" required />
                                <TextField
                                    value={this.state.newCarCard.plateNumberCar}
                                    onChange={(e) => {
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, plateNumberCar: e.currentTarget.value }
                                        })
                                    }}
                                    floatingLabelText="Номер автомобиля"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}

                                />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flsex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Тип автомобиля:</label>
                                <DropDownMenu
                                    value={this.state.newCarCard.typeCar}
                                    textColor="#fff"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                    //className=""
                                    onChange={(event, index, value)=> this.handleChange(event, index, value,'carTypes')}
                                    style={{ width: "100%" }}
                                    className="dropdownClass"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                    name="typeCar"
                                >
                                {
                                    this.props.profileReduser.profile.carTypes.map((element,index)=>
                                        <MenuItem value={element.id} primaryText={element.name_ru} />
                                    )
                                }
                                </DropDownMenu>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flsex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Класс автомобиля:</label>
                                <DropDownMenu
                                    value={this.state.newCarCard.carClass}
                                    textColor="#fff"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                    //className=""
                                    onChange={(event, index, value)=> this.handleChange(event, index, value,'carClasses')}
                                    style={{ width: "100%" }}
                                    className="dropdownClass"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                    name="carClass"
                                >
                                {
                                    this.props.profileReduser.profile.carClasses.map((element,index)=>
                                        <MenuItem value={element.id} primaryText={element.class_ru} />
                                    )
                                }
                                </DropDownMenu>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Тип топлива:</label>
                                <DropDownMenu
                                    value={this.state.newCarCard.fuelType}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                    //className=""
                                    onChange={(event, index, value)=> this.handleChange(event, index, value,'fuelTypes')}
                                    style={{ width: "100%" }}
                                    className="dropdownClass"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                    name="typeFuel"
                                >
                                {
                                    this.props.profileReduser.profile.fuelTypes.map((element,index)=>
                                        <MenuItem value={element.id} primaryText={element.name_ru} />
                                    )
                                }
                                </DropDownMenu>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="profileCarNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">Количество мест:</label>
                                <input id="profileCarNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.numberOfSeats} onChange={(e) => {
                                    this.setState({
                                        newCarCard: { ...this.state.newCarCard, numberOfSeats: e.currentTarget.value }
                                    })
                                }} type="text" required />
                                <TextField
                                    value={this.state.newCarCard.numberOfSeats}
                                    onChange={(e) => {
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, numberOfSeats: e.currentTarget.value }
                                        })
                                    }}
                                    floatingLabelText="Количество мест"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}

                                />
                            </div>

                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start mt-2 mb-3">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-4 p-0">Удобства:</label>
                                <div className="carAddNewCarComfortCheckBox d-flex flex-column pt-1">
                                    <label htmlFor="comfort1">Климат контроль
                                <input onClick={(e) => { let comfort = this.state.comfort; comfort[0]=!comfort[0]; this.setState({comfort: comfort});}} type="checkbox" id="comfort1" checked={this.state.comfort[0]}/>
                                        <span />
                                    </label>
                                    <label htmlFor="comfort2">Кожаный салон
                                <input  onClick={(e) => { let comfort = this.state.comfort; comfort[1]=!comfort[1]; this.setState({comfort: comfort});}}  type="checkbox" id="comfort2" checked={this.state.comfort[1]}/>
                                        <span />
                                    </label>
                                    <label htmlFor="comfort3">Бесплатный Wi-Fi
                                <input  onClick={(e) => { let comfort = this.state.comfort; comfort[2]=!comfort[2]; this.setState({comfort: comfort});}}  type="checkbox" id="comfort3" checked={this.state.comfort[2]}/>
                                        <span />
                                    </label>
                                    <label htmlFor="comfort4">Курение в салоне разрешено
                                <input onClick={(e) => { let comfort = this.state.comfort; comfort[3]=!comfort[3]; this.setState({comfort: comfort});}} type="checkbox" id="comfort4" checked={this.state.comfort[3]}/>
                                        <span />
                                    </label>
                                    <label htmlFor="comfort5">Курение в салоне запрещено
                                <input onClick={(e) => { let comfort = this.state.comfort; comfort[3]=!comfort[3]; this.setState({comfort: comfort});}} type="checkbox" id="comfort5" checked={!this.state.comfort[3]}/>
                                        <span />
                                    </label>
                                </div>
                            </div>
                            <div className="carAddNewCarButton d-flex align-items-center mb-5">
                                <span className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-4 p-0" />
                                <button htmlFor="newCar" type="submit">Добавить Автомобиль</button>
                                <span className="ml-3" onClick={()=>this.toggle()}>Отмена</span>
                            </div>
                        </form>
                    </div>
                </Collapse>

                <div className="filledCardBody p-0 d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 " >
                    <div style={{ display: this.state.collapse ? "none" : "block" }} onClick={()=>this.toggle()} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" >
                        <div className="filledCardImgAdd">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <span />
                                <p>Добавить автомобиль</p>
                            </div>
                        </div>
                    </div>
                    {cars.map((element, index) =>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                            <div className="filledCard d-flex flex-column p-0">
                                <div className="filledCardInformation d-flex flex-column">
                                    <div className="filledCardInformationNameCar d-flex justify-content-end w-100 align-items-center">
                                        <label className="cardInformationNameCarIcon"></label>
                                        <div className="filledCardInformationMenu">
                                            <p className="filledCardInformationDeleteCar" onClick={()=>this.destroy(element)}>Удалить</p>
                                            <p className="filledCardInformationNameCarEdit" onClick={()=>this.toggle(element)}>Редактировать</p>
                                            <p className="filledCardInformationNameCarEdit" onClick={()=>this.changeActive(element)}>{element.onWork ? "Деактивировать" : "Активировать"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="filledCardImg" onClick={()=>this.toggle(element)}>
                                    <img src={element.image[0] ? config.serverAddress+element.image[0].url : ""} className="img-fluid" alt="imgCar" width="100%" height="100%" />
                                </div>
                                <div className="cardInformationType d-flex flex-column">
                                    <p>{element.carBrand}</p>
                                    <div className="cardInformation d-flex">
                                        <p>{carTypes[index]}</p>
                                        <span>, {element.seats} мест(а)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

const DriverProfileCar = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationtReduser,
        globalReduser: state.GlobalReduser
    }),
)(DriverProfileCarClass);

export default DriverProfileCar;


