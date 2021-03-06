import 'babel-polyfill';
import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            email: "",
            password: ""

        };
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    handleSubmit = event => {
        this.props.onUserChange(this.state.email, this.state.password);
        this.props.history.push('/view/');
    }


    render() {



        return (
            <div className="login container">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        className="login-btn btn btn-primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
                    </Button>
                </form>
            </div>
        )
    }
}