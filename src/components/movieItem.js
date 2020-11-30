import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export class MovieItem extends React.Component {

    constructor() {
        super();
        // binds method to on click event 
        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie(e) {
        // stops multiple deletes from happening
        e.preventDefault();
        console.log("Delete: " + this.props.movie._id);

        // calls the delete and url and passes up the id
        axios.delete("http://localhost:4000/api/movies/" + this.props.movie._id)
            // arrow function invokes method
            .then(() => {
                this.props.ReloadData(); // calls reload data on movies.js
            })
            .catch();
    }

    render() {
        return (
            // displays data from movies
            // Link added for the url of application with edit button
            // button with on click event that invokes delete movie method 
            <div>
                <Card>
                    <Card.Header>{this.props.movie.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.poster} width="200" height="200"></img>
                            <footer className="blockquote-footer">
                                {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                </Card>
            </div>
        );
    }
}