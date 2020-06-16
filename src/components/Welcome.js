import React, {Component} from "react";
import {Jumbotron} from "react-bootstrap";

export default class Welcome extends Component{
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to IMDBMini</h1>
               <blockquote className="blockquote mb-0">
                   <p>
                   “You have controlled your fear. Now, release your anger. Only your hatred can destroy me.”
                   </p>
                   <footer className="blockquote-footer">
                       Darth Vader
                   </footer>
               </blockquote>


            </Jumbotron>
        );
}
}

