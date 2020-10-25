import React from 'react';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
// import AuthenticationService from '../../security/AuthenticationService'
import MenuComponent from './MenuComponent'
import faker from 'faker'

class HeaderComponent extends React.Component {
    gotoHome = () => {
        this.props.history.push(`/home`);
    }
    render = () => {
        // let userName = AuthenticationService.getLoginUserName();
        // const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header className="bg-dark">
                <nav className="container navbar navbar-expand-md navbar-dark bg-dark">
                    <MenuComponent />
                    <Link className="nav-link" to="/"><img alt="" className="rounded-circle" src={faker.image.business(60, 60)} /></Link>
                    <Link className="nav-link text-light" to="/"><b>{faker.company.companyName()}</b></Link>

                    <ul className="navbar-nav navbar-collapse justify-content-end fg-light">
                        {/* {isUserLoggedIn && <li key="welcomeId"><Link className="text-light pr-5" to="/">Welcome <b>{faker.name.firstName() + " " + faker.name.lastName()} </b></Link></li>}
                        {!isUserLoggedIn && <li key="loginId"><Link className="nav-link text-light" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li key="logoutId"><Link className="nav-link text-light" to="/logout" onClick={AuthenticationService.logout} >Logout</Link></li>} */}
                    </ul>


                </nav>
            </header>
        );
    }

    // <header className="bg-dark">
    //     <nav class="container navbar navbar-expand-lg navbar-dark bg-dark">
    //         <a class="navbar-brand" href="#"><img src="http://placeimg.com/60/60/business" /></a>
    //         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //             <span class="navbar-toggler-icon"></span>
    //         </button>

    //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //             <ul class="navbar-nav mr-auto">
    //                 <li class="nav-item active">
    //                     <a class="nav-link" href="#" onClick={() => this.gotoHome()}>Home <span class="sr-only">(current)</span></a>
    //                 </li>
    //             </ul>
    //             <ul className="navbar-nav navbar-collapse justify-content-end">
    //                 {!isUserLoggedIn && <li key="loginId"><Link className="nav-link" to="/login">Login</Link></li>}
    //                 {isUserLoggedIn && <li key="logoutId"><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout} >Logout</Link></li>}
    //             </ul>
    //             <ul class="navbar-nav mr-auto justify-content-end">
    //                 <li class="nav-item dropdown ">
    //                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                         <Icon>view_list</Icon>
    //                     </a>
    //                     <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    //                         <Link className="dropdown-item" to="/end-user-list">Users</Link>
    //                         <Link className="dropdown-item" to="/address-list">Address</Link>
    //                         <Link className="dropdown-item" to="/code-groups-list">Code Groups</Link>
    //                         <a class="dropdown-item" href="#">Action</a>
    //                         <a class="dropdown-item" href="#">Another action</a>
    //                         <div class="dropdown-divider"></div>
    //                         <a class="dropdown-item" href="#">Something else here</a>
    //                     </div>
    //                 </li>
    //             </ul>
    //         </div>
    //     </nav>
    // </header>
}

export default withRouter(HeaderComponent);
