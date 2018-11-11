import React from "react";
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import logo from '../images/logo-landing.svg';
import Menu from './Menu';
import Login from './Login';
import AddEditItems from './AddEditItems';
export default class AppRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            email: "",
            password: ""

        };
    }

    onUserChange = (email, password) => {
        this.setState({
            email: email,
            password: password
        });
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <nav>
                            <ul>
                                <li>
                                    <NavLink activeClassName="selected" to="/">Login</NavLink>
                                </li>

                                <li>
                                    <NavLink activeClassName="selected" to="/view/">View Menu</NavLink>
                                </li>

                                {this.state.email == "admin@admin.admin" ? (
                                    <li>
                                        <NavLink activeClassName="selected" to="/addEdit/">Edit Menu</NavLink>
                                    </li>
                                ) : null}
                            </ul>
                        </nav>
                    </header>
                    <div className="Body-container">
                        <Route path="/" exact render={(routeProp) => <Login onUserChange={this.onUserChange}  {...routeProp} />} />
                        <Route path="/view/" component={Menu} />
                        <Route path="/addEdit/" component={AddEditItems} />
                    </div>
                </div>
            </BrowserRouter>
        )
    }

}
