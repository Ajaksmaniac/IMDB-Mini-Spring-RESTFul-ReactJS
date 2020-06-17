import React, {Component}from "react";
import {Card,Table, ButtonGroup, Button,Image,Col,ListGroup,ListGroupItem,Form,FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import queryString from 'query-string';
import {Redirect} from 'react-router-dom';
export default class MoviePage extends Component{
    constructor(props) {
        super(props);
        this.state={
            image_url:'',
            name: '',
            date_of_release: '',
            rating: '',
            comments:[],
            height: '',
            comment:'',
            isAdmin: false

        };
        let params = queryString.parse(this.props.location.search)
        console.log(params);
    }

    componentDidMount() {
        this.findMovieById();
        this.findCommentsByMovieId()
        if(sessionStorage.getItem("isAdmin") == "true"){
            this.setState({isAdmin:true});
        }
    }
    


    findMovieById(){

        let params = queryString.parse(this.props.location.search).id


        //console.log(params)

        axios.get("http://localhost:8082/movies/id/"+params)
            .then(response => response.data)
            .then((data) => {
                //console.log(data);
                this.setState({image_url:data.image_url})
                this.setState({name:data.name})
                this.setState({date_of_release:data.dateOfRelease})
                this.setState({rating:data.rating})
             
            });
    }
    findCommentsByMovieId(){
        let params = queryString.parse(this.props.location.search).id


        console.log("http://localhost:8082/comments/id/"+Number(params))
     
       axios.get("http://localhost:8082/comments/id/"+Number(params))
            .then(response => response.data)
            .then((data) => { 
                 console.log(data)
                this.setState({comments:data})
              
              
             
            });
    }


    submitComment= event =>{
        event.preventDefault();
        let params = queryString.parse(this.props.location.search).id

        const comment = {
            "user_id" : ""+sessionStorage.getItem("user_id"),
            "movie_id" : ""+params,
            "text" : ""+this.state.comment,
            "date_posted": new Date()
        }
        axios.post("http://localhost:8082/comments/add",comment)
        .then(response => response.data)
        .then((data) => {
            //this.setState({comments:data})
            window.location.reload(false);
          
         
        });
        
    }
    deleteComment(id){
        let params = queryString.parse(this.props.location.search).id
        axios.delete("http://localhost:8082/comments/delete/"+id)
        .then(response => response.data)
        .then((data) => {
            this.setState({movies:data})
            window.location.reload(false);
        });
    }
    CommentChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {comment}  = this.state;
        if(sessionStorage.getItem("userData")){
            if(this.state.isAdmin == true) {
            return(
                <Card className="border border-dark bg-dark text-white text-center" style={{ height: "100%" }} >
                               <Card.Header><h1>{this.state.name}</h1> </Card.Header>
                               
                               <Card.Body>
                               <Col xs={6} md={4}>
                               <Image src={this.state.image_url} rounded style={{ height: '18rem' }}/>
                               </Col>
                               <Col xs={5} md={4}>
                               
                                   
                                   <h3>Rating {this.state.rating}</h3>
                               </Col>
                               <Col xs={5} md={4}>
                               <h3>Year of Release {this.state.date_of_release}</h3>
                             
                                           
                               </Col>
                                  
                               </Card.Body>
                               <ListGroup style={{ height: "200px" }}>
                                   <p>comments</p>
                               {this.state.comments.length === 0 ?
                                          
                                          <p colSpan="6">No comments available for this mvoie</p>
               
                                       :
                                      this.state.comments.map((comment) =>(
                                      <ListGroupItem key={comment.comment_id} className="border border-grey bg-dark text-white text-center" style={{ height: "50px" }}>{comment.date_posted.substring(0,10)} -  {comment.commentedBy} :           {comment.text}   <Button size="sm" variant="outline-danger" onClick={() => this.deleteComment(comment.comment_id)}><FontAwesomeIcon icon={faTrash} /></Button></ListGroupItem>
                                   
                                       
                                          
                                      ))
                                  }
                                 </ListGroup>
               
                                 <Form id="commentFormId" onSubmit={this.submitComment} style={{ height: "200px" }} method="POST">
                                     <Form.Row>
                                            <FormControl  autoComplete="off" required
                                             type="text" 
                                              placeholder="Add Comment"
                                               className="mr-sm-2"
                                               value={comment} onChange={this.CommentChange}
                                                name="comment"/>
                                       <Button variant="outline-info" type="submit">Add</Button>
                                       </Form.Row>
                                    
                                 </Form>
                               </Card>
                          
               
                                
                                    );
                                }else{
                                    return(
                                        <Card className="border border-dark bg-dark text-white text-center" style={{ height: "100%" }} >
                                                       <Card.Header><h1>{this.state.name}</h1> </Card.Header>
                                                       
                                                       <Card.Body>
                                                       <Col xs={6} md={4}>
                                                       <Image src={this.state.image_url} rounded style={{ height: '18rem' }}/>
                                                       </Col>
                                                       <Col xs={5} md={4}>
                                                       
                                                           
                                                           <h3>Rating {this.state.rating}</h3>
                                                       </Col>
                                                       <Col xs={5} md={4}>
                                                       <h3>Year of Release {this.state.date_of_release}</h3>
                                                     
                                                                   
                                                       </Col>
                                                          
                                                       </Card.Body>
                                                       <ListGroup style={{ height: "200px" }}>
                                                           <p>comments</p>
                                                       {this.state.comments.length === 0 ?
                                                                  
                                                                  <p colSpan="6">No comments available for this mvoie</p>
                                       
                                                               :
                                                              this.state.comments.map((comment) =>(
                                                              <ListGroupItem className="border border-grey bg-dark text-white text-center" style={{ height: "50px" }}>{comment.commentedBy} :           {comment.text}
                                                            
                                                              </ListGroupItem>
                                       
                                                               
                                                                  
                                                              ))
                                                          }
                                                         </ListGroup>
                                       
                                                         <Form id="commentFormId" onSubmit={this.submitComment} style={{ height: "200px" }} method="POST">
                                                             <Form.Row>
                                                                    <FormControl  autoComplete="off" required
                                                                     type="text" 
                                                                      placeholder="Add Comment"
                                                                       className="mr-sm-2"
                                                                       value={comment} onChange={this.CommentChange}
                                                                        name="comment"/>
                                                               <Button variant="outline-info" type="submit">Add</Button>
                                                               </Form.Row>
                                                            
                                                         </Form>
                                                       </Card>
                                                  
                                       
                                                        
                                                            ); 
                                }
        }else{
            return(
                
                    <Card className="border border-dark bg-dark text-white text-center" style={{ height: "100%" }} >
                                   <Card.Header><h1>{this.state.name}</h1> </Card.Header>
                                   
                                   <Card.Body>
                                   <Col xs={6} md={4}>
                                   <Image src={this.state.image_url} rounded style={{ height: '18rem' }}/>
                                   </Col>
                                   <Col xs={5} md={4}>
                                   
                                       
                                       <h3>Rating {this.state.rating}</h3>
                                   </Col>
                                   <Col xs={5} md={4}>
                                   <h3>Year of Release {this.state.date_of_release}</h3>
                                 
                                               
                                   </Col>
                                      
                                   </Card.Body>
                                   <ListGroup style={{ height: "200px" }}>
                                       <p>comments</p>
                                   {this.state.comments.length === 0 ?
                                              
                                              <p colSpan="6">No comments available for this mvoie</p>
                   
                                           :
                                          this.state.comments.map((comment) =>(
                                          <ListGroupItem className="border border-grey bg-dark text-white text-center" style={{ height: "50px" }}>{comment.commentedBy} :           {comment.text}</ListGroupItem>
                   
                                           
                                              
                                          ))
                                      }
                                     </ListGroup>
                   
                                     
                                   </Card>
                              
                   
                           );
         
        }

        

       
        
    }
}
