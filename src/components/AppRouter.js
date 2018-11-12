import 'babel-polyfill';
import React from "react";
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';
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
                    <header className="app-header">
                        <h1 className="app-logo"> <NavLink to="/view/"><img src={logo} alt="elmenus logo" /></NavLink></h1>
                        {this.state.email !== "" ? (
                            <nav>
                                <ul>
                                    <li>
                                        <NavLink activeClassName="selected" to="/view/">View Menu</NavLink>
                                    </li>
                                    {this.state.email === "admin@admin.admin" ? (
                                        <li>
                                            <NavLink className="pull-right" to="/addEdit/">Edit Menu</NavLink>
                                        </li>
                                    ) : null}
                                </ul>
                            </nav>
                        ) : null}
                        {this.state.email !== "" ? (<NavLink className="pull-right user-data" to="/login/">Logout as {this.state.email}</NavLink>
                        ) : null}
                    </header>
                    <div className="body-container">
                        <Route path="/" exact render={(routeProp) => <Login onUserChange={this.onUserChange}  {...routeProp} />} />
                        <Route path="/login/" render={(routeProp) => <Login onUserChange={this.onUserChange}  {...routeProp} />} />
                        <Route path="/view/" component={Menu} />
                        <Route path="/addEdit/" component={AddEditItems} />
                    </div>
                </div>
            </BrowserRouter>
        )
    }

}
