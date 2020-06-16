import React, {Component}from "react";
import {Card,Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import queryString from 'query-string';
import {Redirect} from 'react-router-dom';
export default class MovieSearchList extends Component{
    constructor(props) {
        super(props);
        this.state={
            movies:[]
        };
        let params = queryString.parse(this.props.location.search)
        //console.log(params);
        this.fetchDetails = this.fetchDetails.bind(this);
    }

    componentWillMount() {
        this.findAllMovies();
    }
    
    fetchDetails(a) {
        console.log(a.id)
        this.props.history.push('page?id='+a.id)
    }

    findAllMovies(){

        let params = queryString.parse(this.props.location.search).name


        console.log(params)

        axios.post("http://localhost:8082/movies/name",params)
            .then(response => response.data)
            .then((data) => {
                this.setState({movies:data})
            });
    }

    render() {
        
        return(

            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faList} />Book List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark" >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Release</th>
                            <th>Rating</th>

                        </tr>
                        </thead>
                       
                        <tbody>
                           
                            {this.state.movies.length === 0 ?
                            <tr align="center">
                                <td colSpan="6">{this.state.movies.length} Movies Available</td>

                            </tr> :
                            this.state.movies.map((movie) =>(
                                
                                <tr key={movie.id } onClick={() => this.fetchDetails(movie)}> 

                                    <td>

                                        {movie.name}
                                    </td>
                                    <td>{movie.dateOfRelease}</td>
                                    <td>{movie.rating}</td>

                                  


                                </tr>
                                
                            ))
                        }
                          
                        
                        </tbody>
                        
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
