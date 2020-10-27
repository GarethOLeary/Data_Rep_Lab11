import React from 'react';
import { MovieItem } from './movieItem'

export class Movies extends React.Component {

    render() {
        // map function splits collections into each section - individual movies
        return this.props.movies.map((movie) => {
            return <MovieItem movie={movie}></MovieItem>
        })
    }
}