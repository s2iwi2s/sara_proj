import React from 'react';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import MenuComponent from './MenuComponent'
import faker from 'faker'

class HeaderComponent extends React.Component {
    render = () => {
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
}

export default withRouter(HeaderComponent);

