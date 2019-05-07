import React, { Component } from 'react'
import { Container, Form, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import config from '../configs/index';
import {withRouter } from 'react-router-dom';

class LoginPage extends Component {

    state = {
        email: "",
        password: "",
        message: "",
    }

    handleSumit = (e) => {

        e.preventDefault();

        let message = "";

        /* check email is valid */
        if (!/^[A-Za-z]\w+@\w+(\.[a-zA-Z0-9]{1,})+$/.test(this.state.email))
            message = "email not is valid";

        /* check passsword have least 8 character */
        if (this.state.password.length < 8)
            message = "password have least 8 character";

        /* check message */
        if (message) {
            this.setState({
                message
            })
            return;
        }


        /* Login */
        axios({

            url: `${config.hostProces}/api/auth/login`,
            method: 'post',
            data: {
                loginInfo: {
                    email: this.state.email,
                    password: this.state.password
                }
            }

        })
            .then((response) => {

                console.log(response.data)

                if(response.data){

                    if(!response.data.success){
                        this.setState({
                            message: response.data.message,
                        })
                    }else{
                        /* forward to home */
                        this.props.history.push('/home');
                    }

                }

            })
            .catch((error) => {
                console.log(error);
            })

    }


    handleChange = (name, value) => {

        /* update state */
        this.setState({
            [name]: value,
            message: "",
        })

    }

    render() {
        return (
            <div className='login'>
                <Container style={{ width: '40%' }}>

                    <h2>LOGIN</h2>

                    <Form onSubmit={this.handleSumit}>

                        <Input
                            type='email'
                            placeholder='enter email'
                            value={this.state.email}
                            onChange={(e) => {
                                this.handleChange("email", e.target.value.trim())
                            }}
                            style={{ marginBottom: '10px' }}
                        />

                        <Input
                            type='password'
                            placeholder='enter password'
                            value={this.state.password}
                            onChange={(e) => {
                                this.handleChange("password", e.target.value.trim())
                            }}
                            style={{ marginBottom: '10px' }}
                        />

                        {
                            this.state.message
                                ?
                                <Alert>{this.state.message}</Alert>
                                :
                                null
                        }

                        <Button>Login</Button>

                    </Form>
                </Container>
            </div>
        )
    }
}

export default withRouter(LoginPage);