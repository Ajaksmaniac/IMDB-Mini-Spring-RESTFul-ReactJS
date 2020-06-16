
import React, { Component } from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {Redirect} from 'react-router-dom';

import axios from 'axios';


 export default class SignupForm extends Component{
    constructor(props) {
        super(props);
        this.state = this.initalState;
        this.userChange = this.userChange.bind(this);
        this.signup = this.signup.bind(this);

    }
    initalState = {
        username:'', password:'',email:'',confirmPassword:'',
        redirect:false
    }
 
    signup = event =>{
        event.preventDefault();
        const body = {
            email:this.state.email,
            username:this.state.username,
            password:this.state.password,
            group_id:3


        };
        console.log(body + "Body")
        axios.post("http://localhost:8082/users/add", body)
            .then(response => {
                console.log(response.data);
                if(response.data != null) {
                    this.setState(this.initalState);
                    //alert("Registered succesfully, please login");
                    return(<Redirect to={'/login'}/>)
                }
            });
        
       /* event.preventDefault();

       

        
        axios.post("http://localhost:8082/users/username",  this.state.username)
            .then(response => {
                //console.log(response.data);
                if(response.data == null || response.data == "") {
                   // this.setState(this.initalState);
                    //alert("Movie saved succesfully");
                    console.log("User with this Username does not exist");
                   return;
                }
                if(response.data.password == this.state.password){
                     
                        localStorage.username = this.state.username;
                        localStorage.logged = true;
                            

                        
                        this.props.history.push('/');
                        //console.log("Logged");
                 }else{
                        console.log("Invalid Password");
                }
                
               
            });*/
    }
    userChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        const {username,password,email,confirmPassword}  = this.state;
        if(sessionStorage.getItem("userData")){
            return(<Redirect to={'/'}/>)
        }
        if(this.state.redirect){
            return(<Redirect to={'/'}/>)
        }
       
        return (
            <Card className="border border-dark bg-dark text-white" style={{height:"100%"}}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Login</Card.Header>

                <Form id="signupFormId" onSubmit={this.signup}>
                    <Card.Body>


                    <Form.Group as={Col} controlId="formGridUsername" method="post">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="email"
                                            type="text"
                                            value={email} onChange={this.userChange}
                                            placeholder="Enter Email"
                                            className={"bg-dark text-white"}/>

                            </Form.Group> 

                            <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="username"
                                            type="text"
                                            value={username} onChange={this.userChange}
                                            placeholder="Enter Username"
                                            className={"bg-dark text-white"}/>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="password"
                                            type="password" 
                                            value={password}  onChange={this.userChange}
                                            placeholder="Enter Password"
                                            className={"bg-dark text-white"}/>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control required autoComplete="off"
                                            name="confirmPassword"
                                            type="password" 
                                            value={confirmPassword}  onChange={this.userChange}
                                            placeholder="Enter Password"
                                            className={"bg-dark text-white"}/>

                            </Form.Group>


                    </Card.Body>
                    <Card.Footer style={{"textAlign" : "right"}}>
                        <Button size="sm" variant="success"  type="submit"   >
                            <FontAwesomeIcon icon={faSave} />     Submit
                        </Button>{' '}
                        
                    </Card.Footer>

                </Form>

            </Card>
        );
    }


}


