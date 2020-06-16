import React, {Component} from "react";

import {Card,Form,Button,Col} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSave,faPlusSquare,faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class Movie extends Component{
    constructor(props) {
        super(props);
        this.state = this.initalState;
        this.movieChange = this.movieChange.bind(this);
        this.submitMovie = this.submitMovie.bind(this);

    }

    initalState = {
        name:'', dateOfRelease:'',rating:'',image_url:''
    }

    resetMovie = () =>{
        this.setState(() => this.initalState);
    }
    submitMovie = event =>{

        event.preventDefault();

            const movie = {
                name: this.state.name,
                dateOfRelease: this.state.dateOfRelease,
                rating: this.state.rating,
                image_url: this.state.image_url


            };

        axios.post("http://localhost:8082/movies/add", movie)
            .then(response => {
                console.log(response.data);
                if(response.data != null) {
                    this.setState(this.initalState);
                    alert("Movie saved succesfully");
                }
            });
    }
   movieChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {name,dateOfRelease,rating,image_url}  = this.state;
        return(

            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} />Add Movie</Card.Header>

                    <Form id="movieFormId" onSubmit={this.submitMovie} onReset={this.resetMovie}>
                        <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required autoComplete="off"
                                    name="name"
                                    type="text"
                                    value={name} onChange={this.movieChange}
                                    placeholder="Enter Movie Title"
                                    className={"bg-dark text-white"}/>

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDateOfRelease">
                                <Form.Label>Year of Release</Form.Label>
                                <Form.Control required autoComplete="off"
                                    name="dateOfRelease"
                                    type="text"
                                    value={dateOfRelease} onChange={this.movieChange}
                                    placeholder="Enter Movie Date of Release"
                                    className={"bg-dark text-white"}/>

                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridrating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control required autoComplete="off"
                                              name="rating"
                                              type="text"
                                              value={rating} onChange={this.movieChange}
                                              placeholder="Enter Movie Rating"
                                              className={"bg-dark text-white"}/>

                            </Form.Group>
                    </Form.Row>
                    <Form.Row>
                            <Form.Group as={Col} controlId="formGridrImageUrl">
                                <Form.Label>Movie Image Url</Form.Label>
                                <Form.Control required autoComplete="off"
                                              name="image_url"
                                              type="text"
                                              value={image_url} onChange={this.movieChange}
                                              placeholder="Enter Movie Image Url"
                                              className={"bg-dark text-white"}/>

                            </Form.Group>
                    </Form.Row>
                    </Card.Body>
                        <Card.Footer style={{"textAlign" : "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} />     Submit
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} />     Reset
                            </Button>
                        </Card.Footer>

                    </Form>

            </Card>
        );
    }
}
