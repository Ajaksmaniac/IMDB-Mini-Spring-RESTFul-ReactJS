import React, {Component} from "react";
import {Navbar,Nav, FormControl,Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            logged : false,
            isAdmin: false
        }
        
        //this.doLogout = this.doLogout.bind(this);
    }

     doLogout(){
       
          
                /*this.state.isLoggedIn = false;
                UserStore.isLoggedIn = false;
                UserStore.username = '';*/
                
                sessionStorage.setItem("userData",'')
                sessionStorage.clear();
                this.setState({logged:false});
                //this.setState({ redirect: "/login" });
                window.location.reload(false);
          
      
    }
    componentDidMount(){
        if(sessionStorage.getItem("userData")){
           
            this.setState({logged:true});
            if(sessionStorage.getItem("isAdmin") == "true"){
                this.setState({isAdmin:true});
            }
        }

    }
  
    
  
    
    submitForm (e) {
        e.preventDefault()
        this.props.history.push('/search'); // <--- The page you want to redirect your user to.
    }
    
    render() {
        console.log(sessionStorage.getItem("isAdmin"));
        if(sessionStorage.getItem("username")){
           if(this.state.isAdmin == true) {
           
                return (

                    <Navbar bg="dark" variant="dark">
                        <Link to={""} className="navbar-brand">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png" width="45" height="30" alt="brand"/>Mini
                        </Link>
    
                        <Nav className="mr-auto">
    
                            <Link to={"add"} className="nav-link" >Add Movie</Link>
                            <Link to={"list"} className="nav-link" >MovieList</Link>
    
    
                           
    
                        </Nav>
                      
                        <Link to={"profile"} className="nav-link" >ADMIN</Link>
                                <Link to={"profile"} className="nav-link" >{sessionStorage.getItem("username")}</Link>
                                <Button  className="mr-sm-2" onClick={ () => this.doLogout() } >Logout</Button>
                      
                        
                      
                       
                        <Form inline action="/search">
                            <FormControl type="text" placeholder="Search Movie" className="mr-sm-2" name="name"/>
                            <Button variant="outline-info" type="submit">Search</Button>
                        </Form>
                    </Navbar>
                );
            }else{
                return (

                    <Navbar bg="dark" variant="dark">
                        <Link to={""} className="navbar-brand">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png" width="45" height="30" alt="brand"/>Mini
                        </Link>
    
                        <Nav className="mr-auto">
    
                            <Link to={"list"} className="nav-link" >MovieList</Link>
    
    
                           
    
                        </Nav>
                      
                             
                                <Link to={"profile"} className="nav-link" >{sessionStorage.getItem("username")}</Link>
                                <Button  className="mr-sm-2" onClick={ () => this.doLogout() } >Logout</Button>
                      
                        
                      
                       
                        <Form inline action="/search">
                            <FormControl type="text" placeholder="Search Movie" className="mr-sm-2" name="name"/>
                            <Button variant="outline-info" type="submit">Search</Button>
                        </Form>
                    </Navbar>
                );
                }
            
        }else{
            return (

                <Navbar bg="dark" variant="dark">
                    <Link to={""} className="navbar-brand">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png" width="45" height="30" alt="brand"/>Mini
                    </Link>
    
                    <Nav className="mr-auto">
    
                        
                        <Link to={"list"} className="nav-link" >MovieList</Link>
    
                            <Link to={"login"} className="nav-link" >Login</Link>
                            <Link to={"register"} className="nav-link" >Register</Link>
    
                         
    
    
                    </Nav>
                    <Form inline action="/search">
                        <FormControl type="text" placeholder="Search Movie" className="mr-sm-2" name="name"/>
                        <Button variant="outline-info" type="submit">Search</Button>
                    </Form>
                </Navbar>
            );
        }
        
    }





}

