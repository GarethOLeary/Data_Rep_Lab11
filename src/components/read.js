import React from 'react';
import { Movies } from './movies';
import axios from 'axios';

export class Read extends React.Component {

    // object called state
    // stores data we want to use in class Read
    state = {
        movies: []
    };

    // axios package
    componentDidMount() {
        // retrieves information from json file
        axios.get('https://jsonblob.com/api/jsonblob/520c3b5e-0312-11eb-a6af-cbf00d776032')
            .then(
                // setting data to movies array
                (response) => {
                    this.setState({ movies: response.data.Search })
                }

            )
            // logging error to console if any problems
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        // passes data from this component to our movies component
        return (
            <div>
                <h1>This is the read component.</h1>
                <Movies movies={this.state.movies}></Movies>
            </div>
        );
    }
}