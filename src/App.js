import React from 'react';
import './App.css';
import NavigationBar from "./components/NavgationBar";
import {Container, Row,Col} from "react-bootstrap";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Movie from "./components/Movie";
import MovieList from "./components/MovieList";
import MovieSearchList from "./components/MovieSearchList";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/signup/SignupForm";
import MoviePage from './components/MoviePage';
 export default  class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            logginInStatus: "NOT_LOGGED_IN",
            user: {}
        };
        
      
    }


    render() {
        console.log(localStorage.isLoggedIn + localStorage.username);
        const marginTop = {
            marginTop:"20px"
        }

        return (
            <Router>

                <NavigationBar/>
                <Container>
                    <Row>
                        <Col lg={12} style={marginTop}>
                            <Switch>
                                <Route path="/" exact component={Welcome}/>
                                <Route path="/add" exact component={Movie}/>
                                <Route path="/list" exact component={MovieList}/>
                                <Route path="/login" exact component={LoginForm}/>
                                <Route path="/search" exact component={MovieSearchList}/>
                                <Route path="/register" exact component={SignupForm}/>
                                <Route path="/page" exact component={MoviePage}/>
                               
                            </Switch>

                        </Col>
                    </Row>

                </Container>
                <Footer/>
            </Router>
        );
    }
}
 


