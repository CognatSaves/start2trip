import {WHICH_PAGE_RENDER_HISTORY,SET_PROFILE_DATA,SET_URL_ADDRESS,SET_TRANSACTION_DATA} from './ActionGlobal';


const arrru = ['Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','Х','х','Э','э','ъ','Ъ','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Ц','ц','Ы','ы','ь','Ь','-'];

const arren = ['Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','Kh','kh','Je', 'je','__','__','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','C','c','Y','y','_','_','-'];

const convMassISO=["ENG","RUS"];

const convMassFunc=[(value)=> {return value.toLowerCase()}, (value)=>initialState.cyrillLatinConv(value).toLowerCase()];

const reConvMassFunc=[(value)=>{return capitalize(value)}, (value)=>capitalize(initialState.latinCyrillConv(value))];

function capitalize(s) {
    if (typeof s !== 'string') return '';
    
    let stringElems = s.split(' ');
    let result='';
    for(let i=0; i<stringElems.length;i++){
        result +=stringElems[i].charAt(0).toUpperCase()+stringElems[i].slice(1)+" ";
    }
    return result
}



const initialState = {
    history: "",

    readCookie: function(name){
        var name_cook = name+"=";
        var spl = document.cookie.split(";");           
        for(var i=0; i<spl.length; i++) {           
            var c = spl[i];               
            while(c.charAt(0) == " ") {               
                c = c.substring(1, c.length);                   
            }               
            if(c.indexOf(name_cook) == 0) {                   
                return c.substring(name_cook.length, c.length);                    
            }               
        }           
        return null;
    },
    compressConfig: {
        quality: 0.8,
        maxWidth: 1600,
        maxHeight: 1200,
        autoRotate: true,
        debug: true
    },
    profile: {},
    previousUrl: '',
    
    getRoute: function(cities, conv){
        function getCountry(arrayAddress, country) {
            let flag = true;
            let newCountry = arrayAddress[arrayAddress.length - 1].slice(1);
            if (country === newCountry || country === "") {
              country = newCountry;
              // } else {
              //   alert("Error")
              //   flag = false;
            }
            return { flag: flag, country: country }
        }       
        let route = "";
        let canMove;
        let country = "";
        for (let i = 0; i < cities.length; i++) {
          let arrayAddress = cities[i].point.split(',');
    
          let date = getCountry(arrayAddress, country);
          country = date.country;
          canMove = date.flag;
    
          let stringWithoutCountry = "";
          for (let k = 0; k < arrayAddress.length - 1; k++) {
            stringWithoutCountry += arrayAddress[k];

          }
          let stringWithoutSpaces = stringWithoutCountry.replace(/ /g, '-');
          stringWithoutSpaces = stringWithoutSpaces.replace(/[/]/g, '');
          let convId;
          if(conv){
            
            convId = convMassISO.indexOf(conv);
            stringWithoutSpaces=convMassFunc[convId](stringWithoutSpaces);
            country=convMassFunc[convId](country);
          }
          if (i == 0) {
            route = "from-" + stringWithoutSpaces;
          } else {
            route += "-to-" + stringWithoutSpaces;
          }
        }
        return { route: route, canMove: canMove, country: country, langISO: conv ?  conv : 'ENG'}
    },

    convertFromUrlTranslation(value, langISO){
        let index = convMassISO.indexOf(langISO);
        if (index===-1){
            index = convMassISO.indexOf('ENG');
            if(index===-1){
                index=0;
            }
        }
        return reConvMassFunc[index](value);
    },

    createDateTimeString(start, isOnlyDayString){
        
        let date = new Date(start);
        let month = date.getUTCMonth()+1; let day = date.getUTCDate(); let hours = date.getUTCHours(); let minutes = date.getMinutes();
        let res = date.getUTCFullYear()+"-"+(month>=10 ? month : '0'+month)+"-"+(day>=10 ? day : '0'+day)+
        (isOnlyDayString ? '' : +'; '+(hours>=10 ? hours : '0'+hours)+":"+(minutes>=10 ? minutes : '0'+minutes));
        return res;
    },
    findGetParameter(parameterName) {
        
        var result = null,
            tmp = [];
        var items = window.location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        
        console.log(result);
        return result;
    },
    getDateFromDateString(dateString){
        var items = dateString.split('-');
        
        let month = Number.parseInt(items[1])-1;
        let date = new Date(items[0], month, items[2]);
        return date;
    },
    cyrillLatinConv(text){
        for(var i=0; i<arrru.length; i++){
          var reg = new RegExp(arrru[i], "g");
          text = text.replace(reg, arren[i]);
          }
          
        return text;
    },
    latinCyrillConv(text){
        for(var i=0; i<arren.length; i++){
        var reg = new RegExp(arren[i], "g");
        text = text.replace(reg, arrru[i]);
        }
        return text;
    }
};


export const GlobalReduser = (state = initialState, action) => {
    switch (action.type){
        case WHICH_PAGE_RENDER_HISTORY:{
            let newState = { ...state };
            newState.history = action.history;
            return newState;
        }
        case SET_PROFILE_DATA:{
            let newStatePD = { ...state };
            newStatePD.profile = action.profile;
            return newStatePD;
        }
        case SET_URL_ADDRESS:{
            
            let newStateUA = { ...state };
            newStateUA.previousUrl = action.previousUrl;
            return newStateUA;
        }
        case SET_TRANSACTION_DATA:{
            let newState = {...state};
            if(state.profile.email){
                let profile = newState.profile;
                profile.filteredTransactions=action.filteredTransactions;
                profile.billing={
                    ...profile.billing,
                    transactionCardPeriod:action.transactionCardPeriod,
                    transactionCashPeriod:action.transactionCashPeriod,
                    transactionPartnerPeriod:action.transactionPartnerPeriod
                }
                newState.profile=profile;
            }
            return newState;
        }  
    default: return state;
    }
}