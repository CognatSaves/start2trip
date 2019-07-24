// import React, { lazy } from 'react';
// // import { connect } from 'react-redux';
// import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
// import Home from './components/home/Home.jsx';
// import Places from './components/Places/Places.jsx';
// import Tours from './components/Tours/Tours.jsx';
// import TourDescription from './components/TourDescription/TourDescription.jsx';
// import AccountRedirector from './components/registration/AccountRedirector';
// import TripConfirmation from './components/driverProfile/TripConfirmation';
// import DriverConfirmation from './components/driverProfile/DriverConfirmation';


// const DriverProfile = lazy(() => import('./components/driverProfile/DriverProfile'));
// const PlaceDescription = lazy(() => import('./components/PlaceDescription/PlaceDescription'));
// const RouteDescription = lazy(() => import('./components/RouteDescription/RouteDescription'));
// const ForgotPassword = lazy(() => import('./components/registration/ForgotPassword'));
// const ResetPassword = lazy(() => import('./components/registration/ResetPassword'));
// const PartnerRegister = lazy(() => import('./components/registration/PartnerRegister'));
// const Registration = lazy(() => import('./components/registration/Registration'));
// const AuthRedirect = lazy(() => import('./components/registration/AuthRedirect'));

// const ISOMap = ["blr", "rus", "geo", "arm", "aze", "tur", "isr"];

// export default class App extends React.Component {
//     render() {
//         return (
//             <Switch>
//             {ISOMap.map((element, index) => {
//                 return (
//                     <React.Fragment>
//                         <Route path={'/' + element + "/home/:direction"} component={Home} />
//                         <Route path={'/' + element + "/home"} component={Home} />
//                         <Route path={'/' + element + "/drivers"} component={Home} />
//                         <Route path={'/' + element + "/driverProfile/:id-:carId-:country-:cities"} component={DriverProfile} />
//                         <Route path={'/' + element + "/tripConfirmation/:id-:userId"} component={TripConfirmation} />
//                         <Route path={'/' + element + "/driverConfirmation/:id-:carrierId-:confirmation"} component={DriverConfirmation} />
//                         <Route path={'/' + element + "/places/:direction"} component={Places} />
//                         <Route path={'/' + element + "/places"} component={Places} />
//                         <Route path={'/' + element + "/place/:slug"} component={PlaceDescription} />
//                         <Route path={'/' + element + "/route/:slug"} component={RouteDescription} />

//                         <Route path={'/' + element + "/tours"} component={Tours} />
//                         <Route path={'/' + element + "/tour/:country,:id"} component={TourDescription} />

//                         <Route path={'/' + element + "/account"} component={AccountRedirector} />

//                     </React.Fragment>
//                 )
//             })}
//             <Route path="/forgot-password" component={ForgotPassword} />
//             <Route path="/reset-password/:code" component={ResetPassword} />

//             <Route path="/(register|start)/" component={PartnerRegister} />
//             <Route path="/registration" component={Registration} />
//             <Route path="/login" component={AuthRedirect} />
//             <Redirect from="/" to="/forgot-password" /> 
//             </Switch>
//         )
//     }
// }
