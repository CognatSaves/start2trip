import React from 'react';
import './DriverProfileTripSettingsTour.css'
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import Stars from '../stars/Stars'
import LocationSearchInput from '../home/HomeBody/Search'
import { isMobile } from 'react-device-detect';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import requests from '../../config';





class DriverProfileTripSettingsTourClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.profileReduser.profile;
        let local = [];
        for(let i=0;i<profile.allLanguages.length;i++){
            local[i] = {
                name: "name",
                departurePoint:"departurePoint",
                points: ["A","B"],
                info: "lol",
                language: profile.allLanguages[i].ISO
            }
        }
        let categoriesUnselected = [];
        for(let i=0; i<profile.categories.length; i++){
            categoriesUnselected[i]={
                key: profile.categories[i].id,
                value: profile.categories[i].local.name
            }
        }
        let tagsUnselected = [];
        for(let i=0; i<profile.tags.length; i++){
            tagsUnselected[i]={
                key: profile.tags[i].id,
                value: profile.tags[i].local.name
            }
        }
        this.state = {
            tourSave:{
                local: local,
                calendary: [],
                categoriesSelected: [],
                categoriesUnselected: categoriesUnselected,
                currency: "",
                daily: true,
                directionId: "",
                image:[],
                imageFiles:[],
                price: "",
                seats: "",
                time:"",
                tagsSelected: [],
                tagsUnselected:tagsUnselected,
            },
            collapse: false,
            calendarModal: false,
            currencies: [...profile.currencies],
            savedTours:profile.tours,

            directions: [...profile.directions],
            directionsValue: "Все направления", 
            categories: [...profile.categories],
            categoriesValue: "Все категории", // not change
            tags: [...profile.tags],
            tagsValue: "Все теги", // not change
            languageTour: [...profile.allLanguages],
            languageTourOpen: 0,
            newTourEverydayTime: "Выберите время",
            newTourDatepickerTime: "Выберите время",
            time: [
                "00:00", "00:15", "00:30", "00:45",
                "01:00", "01:15", "01:30", "01:45",
                "02:00", "02:15", "02:30", "02:45",
                "03:00", "03:15", "03:30", "03:45",
                "04:00", "04:15", "04:30", "04:45",
                "05:00", "05:15", "05:30", "05:45",
                "06:00", "06:15", "06:30", "06:45",
                "07:00", "07:15", "07:30", "07:45",
                "08:00", "08:15", "08:30", "08:45",
                "09:00", "09:15", "09:30", "09:45",
                "10:00", "10:15", "10:30", "10:45",
                "11:00", "11:15", "11:30", "11:45",
                "12:00", "12:15", "12:30", "12:45",
                "13:00", "13:15", "13:30", "13:45",
                "14:00", "14:15", "14:30", "14:45",
                "15:00", "15:15", "15:30", "15:45",
                "16:00", "16:15", "16:30", "16:45",
                "17:00", "17:15", "17:30", "17:45",
                "18:00", "18:15", "18:30", "18:45",
                "19:00", "19:15", "19:30", "19:45",
                "20:00", "20:15", "20:30", "20:45",
                "21:00", "21:15", "21:30", "21:45",
                "22:00", "22:15", "22:30", "22:45",
                "23:00", "23:15", "23:30", "23:45",
            ],
            file: '',
            imagePreviewUrl: '',
            tempValue: 100,
            tour:{},
            tourId: "" 
        }

        this.toggle = this.toggle.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.addDate = this.addDate.bind(this);
        this.calendarModalShow = this.calendarModalShow.bind(this);
        this.fillForm=this.fillForm.bind(this);
        this.applyChanges=this.applyChanges.bind(this);
        this.destroy = this.destroy.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.selectTourName = this.selectTourName.bind(this);
    }
    fillForm(element){
        let profile = this.props.profileReduser.profile;
        if(!element){           
            let local = [];
            for(let i=0;i<profile.allLanguages.length;i++){
                local[i] = {
                    name: "",
                    departurePoint:"",
                    points: [],
                    info: "",
                    language: profile.allLanguages[i].ISO
                }
            }
            let categoriesUnselected = [];
            for(let i=0; i<profile.categories.length; i++){
                categoriesUnselected[i]={
                    key: profile.categories[i].id,
                    value: profile.categories[i].local.name
                }
            }
            let tagsUnselected = [];
            for(let i=0; i<profile.tags.length; i++){
                tagsUnselected[i]={
                    key: profile.tags[i].id,
                    value: profile.tags[i].local.name
                }
            }
            let tourSave={
                local: [...local],
                calendary: [],
                categoriesSelected:[],
                categoriesUnselected: categoriesUnselected,
                currency:"",
                daily: true,
                directionId: "",
                image:[],
                imageFiles:[],
                price:"",
                seats:"",
                time:"",
                tagsSelected: [],
                tagsUnselected:tagsUnselected,
            };
            this.setState({
                tourSave: tourSave,
                languageTourOpen: 0,
                file: '',
                imagePreviewUrl: '',
                tourId: ""              
            });
        }
        else{
            let local = [];
            for(let i=0; i<element.local.length; i++){
                local[i]={...element.local[i]}
            }
            let categoriesUnselected=[];
            let categoriesSelected = [];
            for(let i=0; i<profile.categories.length; i++){
                for(let k=0; k<element.categoryIds.length; k++){
                    if(profile.categories[i].id===element.categoryIds[k]){
                        categoriesSelected.push({
                            key: profile.categories[i].id,
                            value: profile.categories[i].local.name
                        });
                        k=element.categoryIds.length;
                    }
                    if(k===element.categoryIds.length-1){
                        categoriesUnselected.push({
                            key: profile.categories[i].id,
                            value: profile.categories[i].local.name
                        });
                    }
                }
            }
            let tagsSelected=[];
            let tagsUnselected=[];
            for(let i=0; i<profile.tags.length; i++){
                for(let k=0; k<element.tags.length; k++){
                    if(profile.tags[i].id===element.tags[k]){
                        tagsSelected.push({
                            key: profile.tags[i].id,
                            value: profile.tags[i].local.name
                        });
                        k=element.tags.length;
                    }
                    if(k===element.tags.length-1){
                        tagsUnselected.push({
                            key: profile.tags[i].id,
                            value: profile.tags[i].local.name
                        });
                    }
                }
            }
            let image = [];
            let imageFiles = [];
            for(let i=0; i<element.image.length; i++){
                image[i]=requests.serverAddress+element.image[i].url;
                imageFiles[i]=new File([""],'old');
            }
            let calendary = [];
            for(let i = 0; i<element.calendary.length; i++){
                calendary[i] = new Date(element.calendary[i]);
            }
            let tourSave={
                local: [...local],
                calendary: calendary,
                categoriesSelected: categoriesSelected,
                categoriesUnselected: categoriesUnselected,
                currency: element.currency,
                daily: element.daily,
                directionId: element.directionId,
                image:image,
                imageFiles:imageFiles,
                price: element.price,
                seats: element.seats,
                time: element.time,
                tagsSelected: tagsSelected,
                tagsUnselected: tagsUnselected
            };
            this.setState({
                tourSave: tourSave,
                languageTourOpen: 0,
                file: '',
                imagePreviewUrl: '',
                tourId: element.id
            });
        }
    }
    changeActive(element){
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt!=="-"){
            var tourForm = new FormData();
            tourForm.append('onWork',!element.onWork);
            const request = new XMLHttpRequest();
            request.open('PUT',requests.userTourActivateRequest+'/'+element.id);
            request.setRequestHeader('Authorization',`Bearer ${jwt}`);
            request.send(tourForm);
        }
    }
    destroy(element){
        let jwt = this.props.globalReduser.readCookie('jwt');      
        if(jwt && jwt!=="-"){
            const request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                console.log(request.status);
                console.log(request.statusText);
                console.log(request.responseText);
            }
            request.open('DELETE', requests.userTourDestroyRequest+"/"+element.id);
            request.setRequestHeader('Authorization',`Bearer ${jwt}`);
            request.send();
        }
    }
    applyChanges(type){
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt!=="-"){
            var tourForm = new FormData();
            let tourSave = this.state.tourSave;
            for(let i=0; i<tourSave.local.length; i++){
                tourForm.append('local', JSON.stringify(tourSave.local[i]));
            }
            for(let i=0; i<tourSave.calendary.length; i++){
                tourForm.append('calendary', tourSave.calendary[i]);
            }
            for(let i=0; i<tourSave.categoriesSelected.length; i++){
                tourForm.append('categories', tourSave.categoriesSelected[i].key);
            }
            for(let i=0; i<tourSave.tagsSelected.length; i++){
                tourForm.append('tags', tourSave.tagsSelected[i].key);
            }
            tourForm.append('currency',tourSave.currency);
            tourForm.append('daily', tourSave.daily);
            tourForm.append('directionId', tourSave.directionId);
            tourForm.append('price',tourSave.price);
            tourForm.append('seats',tourSave.seats);
            tourForm.append('time', tourSave.time);           
            for(let i=0; i<tourSave.imageFiles.length; i++){
                tourForm.append('image', tourSave.imageFiles[i]);
            }
            const request = new XMLHttpRequest();
            if(this.state.tourId.length===0){
                request.open('PUT', requests.userTourCreateRequest);
                request.setRequestHeader('Authorization',`Bearer ${jwt}`);
                request.send(tourForm);
            }
            else{
                for(let i=0; i<tourSave.imageFiles.length; i++){
                    if(tourSave.imageFiles[i].name==='old'){
                        tourForm.append('imageUrl', tourSave.image[i]);
                    }
                    else{
                        tourForm.append('imageUrl', 'check file');
                    }
                    
                }
                request.open('PUT', requests.userTourUpdateRequest+"/"+this.state.tourId);
                request.setRequestHeader('Authorization',`Bearer ${jwt}`);
                request.send(tourForm);
            }         
        }
    }
    formSubmit(event) {
        if(!this.state.tour.id){
            this.applyChanges(true);//если новый, то true
        }
        else{
            this.applyChanges(false);
        }  
        event.preventDefault();
    }

    toggle(element) { 
        this.setState(state => ({ collapse: !state.collapse, tour: {} }));
        if(!element){
            this.fillForm();
        }
        else{
            this.fillForm(element);
        }
        if (isMobile) {
            window.scroll(0, 300);
        } else {
            window.scroll(0, 322);
        }
    }

    calendarModalShow = () => {       
        this.setState({ calendarModal: !this.state.calendarModal });
    };

    addDate = (dates) => {
        
        let newDate = this.state.tourSave.calendary;
        let needAddDate = true;
        if (newDate.length) {
            for (let i = 0; i < newDate.length; i++) {
                if (dates.getDate() == newDate[i].getDate() && dates.getMonth() == newDate[i].getMonth() && dates.getFullYear() == newDate[i].getFullYear()) {
                    newDate.splice(i, 1);
                    needAddDate = false;
                    break;
                }
            };
            if (needAddDate) {
                newDate.push(dates);
            }
        } else {
            newDate.push(dates);
        }
    }

    handleChange = (value, name, params) => {
        let tourSave = this.state.tourSave;
        switch (name) {
            case "name":{
                if(params && params.number!==undefined){
                    tourSave.local[params.number].name=value;
                    this.setState({
                        tourSave: tourSave
                    });
                }
                break;
            }
            case "info":{
                if(params && params.number!==undefined){
                    tourSave.local[params.number].info=value;
                    this.setState({
                        tourSave: tourSave
                    })
                }
                break;
            }
            case "categories": {
                this.categoriesSelected = tourSave.categoriesSelected;
                this.categoriesUnselected = tourSave.categoriesUnselected;

                let objId = this.categoriesUnselected.findIndex(el => el.key===value);
                this.categoriesSelected.push(this.categoriesUnselected[objId]);
                this.categoriesUnselected.splice(objId, 1);
                this.setState({ tourSave: {...tourSave, categoriesUnselected: this.categoriesUnselected, categoriesSelected:this.categoriesSelected}});
                break;
            }
            case "tags": {
                this.tagsSelected = tourSave.tagsSelected;
                this.tagsUnselected = tourSave.tagsUnselected;

                let objId = this.tagsUnselected.findIndex(el => el.key===value);
                this.tagsSelected.push(this.tagsUnselected[objId]);
                this.tagsUnselected.splice(objId, 1);
                this.setState({ tourSave: {...tourSave, tagsUnselected: this.tagsUnselected, tagsSelected:this.tagsSelected}});
                break;
            }
            case "typeCar": {
                this.setState({ typeCar: value })
                break;
            }
            case "attractionsAlongTheRoute": {
                tourSave.local[params.number].points.push(value);
                this.setState({tourSave: tourSave});
                break;
            }        
            default:
        }
    };

    handleRequestDelete = (element, name, params) => {
        
        let tourSave = this.state.tourSave;
        switch (name) {
            case "categories": {
                this.categoriesSelected = tourSave.categoriesSelected;
                this.categoriesUnselected = tourSave.categoriesUnselected;

                let objId = this.categoriesSelected.findIndex(el => el.key===element);
                this.categoriesUnselected.push(this.categoriesSelected[objId]);
                this.categoriesSelected.splice(objId, 1);
                this.setState({ tourSave: {...tourSave, categoriesUnselected: this.categoriesUnselected, categoriesSelected:this.categoriesSelected}});
                break;
            }
            case "tags": {
                this.tagsSelected = tourSave.tagsSelected;
                this.tagsUnselected = tourSave.tagsUnselected;

                let objId = this.tagsSelected.findIndex(el => el.key===element);
                this.tagsUnselected.push(this.tagsSelected[objId]);
                this.tagsSelected.splice(objId, 1);
                this.setState({ tourSave: {...tourSave, tagsUnselected: this.tagsUnselected, tagsSelected:this.tagsSelected}});
                break;
            }
            
            case "calendary": {
                this.calendary = this.state.tourSave.calendary;
                const calendaryToDelete = this.calendary.map((chip) => chip.key).indexOf(element.key);
                this.calendary.splice(calendaryToDelete, 1);
                this.setState({ tourSave:{...tourSave, calendary: this.calendary}});
                break;
            }
            case "attractionsAlongTheRoute": {
                let objId = tourSave.local[params.number].points.findIndex(el => el===element);
                tourSave.local[params.number].points.splice(objId,1);
                this.setState({ tourSave: {...tourSave} });
                break;
            }
            default:
        }
    };
    _handleImageChange = (e) => {
        e.preventDefault();

        let fullfile = e.target.files;

        for (let i = 0; i < fullfile.length; i++) {
            let file = fullfile[i]

            if (!file.type.match('image')) continue;

            let reader = new FileReader();
            reader.onloadend = () => {
                var img = reader.result;
                let tourSave = this.state.tourSave;
                tourSave.image.push(img);
                tourSave.imageFiles.push(file);
                this.setState({
                    tourSave: tourSave,
                    file: file,
                    imagePreviewUrl: img,
                });
            }
            reader.readAsDataURL(file)
        }

    }

    selectTourName(element)
    {
        let name = '';
        if(element.local && Array.isArray(element.local)){
            for(let i=0; i<element.local.length; i++){
                if(element.local[i].name && element.local[i].name.length>0){
                    name=element.local[i].name;
                    i=element.local.length;
                }
            }
        }
        return name;
    }

    render() {
        console.log('Trip Tour render');
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="carAddNewCarPhotoCarImg" alt="add_car" />);
        }

        const MultipleDatesCalendar = withMultipleDates(Calendar);
        var today = new Date();
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.calendarModalShow}
            />,
        ];
        const themeCalendar = {
            accentColor: '#f60',
            floatingNav: {
                background: 'rgba(56, 87, 138, 0.94)',
                chevron: '#304269',
                color: '#FFF',
            },
            headerColor: '#304269',
            selectionColor: '#304269',
            textColor: {
                active: '#FFF',
                default: '#333',
            },
            todayColor: '#f60',
            weekdayColor: '#304269',
        }
        const customContentStyle = {
            width: '100%',
            maxWidth: 'none',
        };
        const locale = {
            blank: 'Select a date...',
            headerFormat: 'ddd, MMM Do',
            todayLabel: {
                long: 'Today',
            },
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            weekStartsOn: 0,
        };
        return (
            <React.Fragment>

                <Dialog
                    actions={actions}
                    modal={false}
                    bodyStyle={{ padding: 0 }}
                    contentStyle={isMobile ? customContentStyle : ""}
                    open={this.state.calendarModal}
                    onRequestClose={this.calendarModalShow}
                >
                    <InfiniteCalendar
                        Component={MultipleDatesCalendar}
                        width={100 + "%"}
                        minDate={today}
                        theme={themeCalendar}
                        locale={locale}
                        className="newTourCalendarStyle"
                        interpolateSelection={defaultMultipleDateInterpolation}
                        selected={this.state.tourSave.calendary}
                        onSelect={this.addDate}
                    />
                </Dialog>
                <Collapse isOpen={this.state.collapse}>
                    <div className="tourSettingsBody">
                        <form name='myForm' onSubmit={this.formSubmit} id="newTourForm" className="tourContent col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                            <div className="languageTourTop d-flex flex-wrap col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                {this.state.languageTour.map((element, index) =>
                                    <div className={{ [index]: "languageTourTitleActive", }[this.state.languageTourOpen] + " languageTourTitle"} onClick={() => { this.setState({ languageTourOpen: index }) }}>
                                        <span style={{ backgroundImage: "url(" + requests.serverAddress+element.icon.url + ")" }}>{element.ISO}</span>
                                    </div>
                                )}
                            </div>
                            {this.state.tourSave.local.map((element, index) =>

                                <div className={{ [index]: "languageTourItemActive", }[this.state.languageTourOpen] + " languageTourItem"}>
                                    <div className=" tourContentTitle d-flex align-items-center mb-0">
                                        <p>Добавление тура</p>
                                    </div>
                                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0">
                                        <label htmlFor="nameNewTour" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Название тура:</label>
                                        <TextField
                                            floatingLabelText="Название тура"
                                            className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                            fullWidth="100%"
                                            floatingLabelFocusStyle={{ color: "#304269" }}
                                            underlineFocusStyle={{ borderColor: "#304269" }}
                                            value={element.name}
                                            onChange={(e) => {this.handleChange(e.currentTarget.value, 'name', {number: index})}}
                                        />
                                        <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " id="nameNewTour" type="text"
                                        value={element.name} onChange={(e) => {this.handleChange(e.currentTarget.value, 'name', {number: index})}}/>
                                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                    </div>
                                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                        <label htmlFor="newTourAttractions" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Место отправления:</label>
                                        <div className="d-flex col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0" key={element.departurePoint}>
                                            <LocationSearchInput address={element.departurePoint} changeCity={(id, value)=>{let tourSave = this.state.tourSave; tourSave.local[index].departurePoint=value; this.setState({tourSave: tourSave})}} classDropdown="searchDropdownDriverTour" id="newTourAttractions" />
                                        </div>
                                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                    </div>
                                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                        <label htmlFor="newTourAttractions" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Достопримечательности по маршруту:</label>
                                        <div className="d-flex col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0" key={element.points.length}>
                                            <LocationSearchInput changeCity={(id, value) => { this.handleChange(value, "attractionsAlongTheRoute", {number: index}) }} classDropdown="searchDropdownDriverTour" id="newTourAttractions" />
                                        </div>
                                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                    </div>
                                    <div className="d-flex justify-content-end col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                        <div className="d-flex flex-wrap col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 p-0 mb-2">
                                            {element.points.map((element, num) =>
                                                <Chip
                                                    key={element}
                                                    onRequestDelete={() => this.handleRequestDelete(element, "attractionsAlongTheRoute", {number: index})}
                                                    labelStyle={{ color: "#000" }}
                                                    labelColor="#f60"
                                                    textColor="#304269"
                                                    className="chipClass"
                                                >
                                                    {element}
                                                </Chip>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start mb-2">
                                        <label htmlFor="newTourDescription" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Описание:</label>
                                        <textarea id="newTourDescription" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " name="" cols="30" rows="3"
                                        onChange={(e) => {this.handleChange(e.currentTarget.value, 'info', {number: index})}} value={element.info}/>
                                        <TextField
                                            floatingLabelText="Описание"
                                            className="d-xl-none d-lg-none d-md-none d-sm-block d-block multiLineInputClass"
                                            fullWidth="100%"
                                            floatingLabelFocusStyle={{ color: "#304269" }}
                                            underlineFocusStyle={{ borderColor: "#304269" }}
                                            multiLine={true}
                                            rows={1}
                                            value={element.info}
                                            onChange={(e) => {this.handleChange(e.currentTarget.value, 'info', {number: index})}}
                                        />
                                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                    </div>
                                </div>
                            )}

                            <div className="paddingL10 d-flex border-top flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start mt-3">
                                <div className="tourContentTitle d-flex align-items-center col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 p-0">
                                    <p className="mb-0">Расписание</p>
                                </div>
                                <div className="d-flex flex-column col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 p-0">
                                    <div className="d-flex p-0">
                                        <div className="tourContentCheckbox">
                                            <label htmlFor="tourContentEveryday">
                                                <input id="tourContentEveryday" checked={this.state.tourSave.daily} onChange={() => { this.state.tourSave.daily=!this.state.tourSave.daily; this.setState({tourSave: this.state.tourSave});}} type="checkbox" />
                                                <span />
                                            </label>
                                        </div>
                                        <div className="tourContentEveryday d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column  align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start col-xl-4 col-lg-4 col-md-4 col-sm-10 col-10 p-0 mb-0">
                                            <label htmlFor="newTourEveryday" onClick={() => { this.state.tourSave.daily=true; this.setState({tourSave: this.state.tourSave});}} className="mt-xl-0 mt-lg-0 mt-md-0 mt-3 pr-2">Ежедневно</label>
                                            <DropDownMenu
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                                onChange={(event, index, value) => {this.state.tourSave.time=value;this.setState({tourSave: this.state.tourSave});}}
                                                style={{ width: "100%", display: this.state.tourSave.daily ? "" : "none" }}
                                                menuStyle={{ maxHeight: "150px" }}
                                                className="dropdownClass"
                                                autoWidth={false}
                                                selectedMenuItemStyle={{ color: "#f60" }}
                                                value={this.state.tourSave.time}
                                            >
                                                <MenuItem value="Выберите время" disabled={true} primaryText="Выберите время" />
                                                {this.state.time.map((element, index) =>
                                                    <MenuItem value={element} primaryText={element} />
                                                )}
                                            </DropDownMenu>
                                        </div>
                                    </div>
                                    <div className="d-flex col-xl-8 col-lg-8 col-md-8 col-sm-10 col-10 p-0">
                                        <div className="tourContentCheckbox">
                                            <label htmlFor="tourContentOther">
                                                <input id="tourContentOther" checked={!this.state.tourSave.daily} onChange={() => { this.state.tourSave.daily=!this.state.tourSave.daily; this.setState({tourSave: this.state.tourSave});}} type="checkbox" />
                                                <span className="tourContentOtherSpan" />
                                            </label>
                                        </div>
                                        <div className="openMultipleDatepicker d-xl-flex d-lg-flex d-md-flex d-sm-block d-block flex-column justify-content-center ml-1 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mb-0 p-0">
                                            <label htmlFor="newTourDatepicker" onClick={() => { this.state.tourSave.daily=false; this.setState({tourSave: this.state.tourSave});}} className="mb-0 mr-2">По определенным дням</label>
                                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column  align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                                <span style={{ display: !this.state.tourSave.daily ? "block" : "none" }} className="newTourDatepickerSpan col-xl-6 col-lg-7 col-md-9 col-sm-12 col-12 p-0" onClick={this.calendarModalShow}>Выбрать даты</span>
                                                <DropDownMenu
                                                    value={/*this.state.newTourDatepickerTime*/this.state.tourSave.time}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                                    onChange={(event, index, value) => { this.state.tourSave.time=value;this.setState({tourSave: this.state.tourSave});}}
                                                    style={{ width: "100%", display:!this.state.tourSave.daily ? "" : "none" }}
                                                    menuStyle={{ maxHeight: "150px" }}
                                                    className="dropdownClass"
                                                    autoWidth={false}
                                                    selectedMenuItemStyle={{ color: "#f60" }}
                                                >
                                                    <MenuItem value="Выберите время" disabled={true} primaryText="Выберите время" />
                                                    {this.state.time.map((element, index) =>
                                                        <MenuItem value={element} primaryText={element} />
                                                    )}
                                                </DropDownMenu>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={!this.state.tourSave.daily ? "paddingL10 d-flex justify-content-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" : " d-none"}>
                                <div className="d-flex flex-wrap flex-row align-items-start col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 p-0 mb-2">

                                    {this.state.tourSave.calendary.map((element, index) => {
                                        let temp = element;
                                        let day = temp.getDate();
                                        let month = temp.getMonth();
                                        let year = temp.getFullYear();
                                        let newDate = day + "." + month + "." + year;
                                        return (
                                            <Chip
                                                key={index}
                                                onRequestDelete={() => this.handleRequestDelete(element, "calendary")}
                                                labelStyle={{ color: "#000" }}
                                                labelColor="#f60"
                                                textColor="#304269"
                                                className="chipClass"
                                            >
                                                {newDate}
                                            </Chip>)
                                    })}

                                </div>
                            </div>
                            <div className="paddingL10 tourContentTitle border-top d-flex align-items-center mt-3 mb-0">
                                <p>Дополнительная информация</p>
                            </div>
                            <div className="paddingL10 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="newTourPrice" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Стоимость тура:</label>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                    <TextField
                                        floatingLabelText="Стоимость тура"
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}
                                        value={this.state.tourSave.price}
                                        onChange={(e) => {this.setState({tourSave: {...this.state.tourSave, price: e.currentTarget.value}});}}
                                    />
                                    <input id="newTourPrice" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mr-1" type="text"
                                    value={this.state.tourSave.price} onChange={(e) => {this.setState({tourSave: {...this.state.tourSave, price: e.currentTarget.value}});}}/>
                                    <DropDownMenu
                                        value={this.state.tourSave.currency}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                        onChange={(event, index, value) => { this.setState({ tourSave: {...this.state.tourSave, currency: value} }) }}
                                        style={{ width: "100%" }}
                                        className="dropdownClass"
                                        autoWidth={false}
                                        selectedMenuItemStyle={{ color: "#f60" }}
                                    >
                                        {this.state.currencies.map((element, index) =>
                                            <MenuItem value={element.id} primaryText={element.ISO} />
                                        )}
                                    </DropDownMenu>
                                </div>
                            </div>   
                            <div className="paddingL10 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 ">Направления:</label>
                                <DropDownMenu
                                        value={this.state.tourSave.directionId}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                        onChange={(event, index, value) => { this.setState({ tourSave: {...this.state.tourSave, directionId: value} }) }}
                                        style={{ width: "100%" }}
                                        className="dropdownClass col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0"
                                        autoWidth={false}
                                        selectedMenuItemStyle={{ color: "#f60" }}
                                    >
                                        {this.state.directions.map((element, index) =>
                                            <MenuItem value={element.id} primaryText={element.local.name} />
                                        )}
                                </DropDownMenu>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>

                            <div className="paddingL10 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 ">Категории:</label>
                                <DropDownMenu
                                    value={this.state.categoriesValue}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                    onChange={(event, index, value) => { this.handleChange(value, "categories") }}
                                    style={{ width: "100%" }}
                                    className="dropdownClass col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                >
                                    <MenuItem value={"Все категори"} disabled primaryText={"Все категори"} />
                                    {this.state.tourSave.categoriesUnselected.map((element, index) =>
                                        <MenuItem value={element.key} primaryText={element.value} />
                                    )}

                                </DropDownMenu>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="paddingL10 d-flex justify-content-end col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <div className="d-flex flex-wrap col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 p-0 mb-2">
                                    {this.state.tourSave.categoriesSelected.map((element, index) =>
                                        <Chip
                                            key={element.key}
                                            onRequestDelete={() => {this.handleRequestDelete(element.key, "categories")}}
                                            labelStyle={{ color: "#000" }}
                                            labelColor="#f60"
                                            textColor="#304269"
                                            className="chipClass"
                                        >
                                            {element.value}
                                        </Chip>
                                    )}
                                </div>
                            </div>

                            <div className="paddingL10 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 ">Теги:</label>
                                <DropDownMenu
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                    onChange={(event, index, value) => { this.handleChange(value, "tags") }}
                                    style={{ width: "100%" }}
                                    className="dropdownClass col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                >
                                    <MenuItem value={"Все тег"} disabled primaryText={"Все тег"} />
                                    {this.state.tourSave.tagsUnselected.map((element, index) =>
                                        <MenuItem value={element.key} primaryText={element.value} />
                                    )}

                                </DropDownMenu>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="paddingL10 d-flex justify-content-end col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <div className="d-flex flex-wrap col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 p-0 mb-2">
                                    {this.state.tourSave.tagsSelected.map((element, index) =>
                                        <Chip
                                            key={element}
                                            onRequestDelete={() => this.handleRequestDelete(element.key, "tags")}
                                            labelStyle={{ color: "#000" }}
                                            labelColor="#f60"
                                            textColor="#304269"
                                            className="chipClass"
                                        >
                                            {element.value}
                                        </Chip>
                                    )}
                                </div>
                            </div>


                            <div className="paddingL10 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="newTourPeople" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Количество мест:</label>
                                <input id="newTourPeople" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" 
                                value={this.state.tourSave.seats} onChange={(e)=>this.setState({tourSave: {...this.state.tourSave, seats: e.currentTarget.value}})}/>
                            </div>
                            <div className="paddingL10 addPhotoTour d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start mt-3">
                                <label className=" col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">Загрузить фото:</label>

                                <div className="tourPhotoMiniContainer d-flex flex-wrap">
                                    <div className="addPhotoTourLabel">
                                        <label htmlFor="addCarFile" ></label>
                                        <input type="file" id="addCarFile" style={{ display: "none" }} multiple onChange={this._handleImageChange} />
                                    </div>
                                    {this.state.tourSave.image.map((element, index) =>
                                        <div className="position-relative">
                                            <img src={element} className="tourPhotoMini" alt="add_car" onClick={() => { this.setState({ imagePreviewUrl: this.state.tourSave.image[index] }) }} />
                                            <span onClick={() => { this.state.tourSave.image.splice(index, 1); this.state.tourSave.imageFiles.splice(index,1); this.setState({ tourSave:{...this.state.tourSave}, imagePreviewUrl: this.state.tourSave.image[0] })}}></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="paddingL10 tourContentAddButton pb-4 d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center mt-3">
                                <span className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 d-xl-block d-lg-block d-md-block d-sm-none d-none" />
                                <button htmlFor="newTourForm" type="submit" className="col-8">ДОБАВИТЬ ТУР</button>
                                <span className="ml-3" onClick={()=>this.toggle()}>Отмена</span>
                            </div>
                        </form>
                    </div>
                </Collapse>
                <div className="tourBodyElement">
                    <div className="p-0 d-flex  justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div style={{ display: this.state.collapse ? "none" : "block" }} onClick={()=>this.toggle()} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" >
                            <div className="filledTourImgAddBg">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <span />
                                    <p>Добавить тур</p>
                                </div>
                            </div>
                        </div>
                        {this.state.savedTours.map((element, index) =>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                                <div className="filledCard d-flex flex-column p-0">
                                    <div className="filledCardInformation d-flex flex-column">
                                        <div className="filledCardInformationNameCar d-flex d-flex justify-content-end w-100 align-items-center">

                                            <label className="cardInformationNameCarIcon"></label>
                                            <div className="filledCardInformationMenu">
                                                <p className="filledCardInformationDeleteCar" onClick={()=>this.destroy(element)}>Удалить</p>
                                                <p className="filledCardInformationNameCarEdit" onClick={()=>this.toggle(element)}>Редактировать</p>
                                                <p className="filledCardInformationNameCarEdit" onClick={()=>this.changeActive(element)}>{element.onWork ? 'Деактивировать' : 'Активировать'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="filledCardImg">
                                        <img src={requests.serverAddress+element.image[0].url} className="img-fluid" alt="imgCar" width="100%" height="100%" />
                                    </div>
                                    <div className="cardInformationType d-flex flex-column">
                                        <p> {this.selectTourName(element)}</p>
                                        <Stars value={Math.ceil(element.rating*10)/10} commentNumber={element.commentNumber+" отзывов"} valueDisplay={true} commentNumberDisplay={true} />
                                        <div className="settingsTourHeader d-flex pr-1">
                                            <p>Свободных мест:</p>
                                            <p>{element.seats}</p>
                                        </div>
                                        <div className="settingsTourPlace d-flex">
                                            <p>{element.local && element.local[0] && element.local[0].points ? element.local[0].points.points : '' }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

const DriverProfileTripSettingsTour = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationtReduser,
        globalReduser: state.GlobalReduser,
    }),
)(DriverProfileTripSettingsTourClass);

export default DriverProfileTripSettingsTour;


