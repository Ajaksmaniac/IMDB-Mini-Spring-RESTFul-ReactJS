
import React, { Component } from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';



 export default class LoginForm extends Component{
    constructor(props) {
        super(props);
        this.state = this.initalState;
        this.userChange = this.userChange.bind(this);
        this.login = this.login.bind(this);

    }
    initalState = {
        username:'', password:'',
        redirect:false
    }
 
    login(){
        if(this.state.username && this.state.password){
            PostData('/login',this.state).then((result)=>{
                let responseJSON = result;
              
                if(responseJSON){
                    console.log(responseJSON);
                    sessionStorage.setItem('userData',responseJSON);
                    sessionStorage.setItem('user_id',responseJSON.id);
                    sessionStorage.setItem('email',responseJSON.email);
                    sessionStorage.setItem('username',responseJSON.username);
                    sessionStorage.setItem('password',responseJSON.password);
                    sessionStorage.setItem('token',responseJSON.token);
                    sessionStorage.setItem('group_id',responseJSON.group_id);
                    if(responseJSON.group_id == 1){
                        sessionStorage.setItem('isAdmin',true);
                    }else{
                        sessionStorage.setItem('isAdmin',false);
                    } 
                    


                    this.setState({redirect:true});
                    window.location.reload(false);
                }else{
                    console.log("Login error");
                }
                //console.log(responseJson)
            });
        }
        
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
        const {username,password}  = this.state;
        if(sessionStorage.getItem("userData")){
            return(<Redirect to={'/'}/>)
        }
        if(this.state.redirect){
            return(<Redirect to={'/'}/>)
        }
       
        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} />Login</Card.Header>

                <Form id="loginFormId" >
                    <Card.Body>

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


                    </Card.Body>
                    <Card.Footer style={{"textAlign" : "right"}}>
                        <Button size="sm" variant="success" onClick={this.login}  >
                            <FontAwesomeIcon icon={faSave} />     Submit
                        </Button>{' '}
                        
                    </Card.Footer>

                </Form>

            </Card>
        );
    }


}


