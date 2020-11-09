import React from 'react';
import axios from 'axios';

export class Create extends React.Component {

    constructor() {
        // invoke react.component class
        super();

        // binds the events to this instance of the class
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
    // methods that takes argument and updates the state when the value changes
    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            Year: e.target.value
        });
    }

    onChangePoster(e) {
        this.setState({
            Poster: e.target.value
        });
    }



    onSubmit(e) {
        // method that stops the button calling multiple times
        e.preventDefault();
        // displays to the screen
        alert("Movie: " + this.state.Title + " "
            + this.state.Year + " "
            + this.state.Poster);

        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        }
        // Post request made to the url and passing object up
        axios.post('http://localhost:4000/api/movies', newMovie)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        // onSubmit form to invoke onSubmit method
        // input control to add text
        // set the values
        // onChange is to detect when the value of an input element changes
        // button added
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <lable>Add Movie Title: </lable>
                        <input type='text'
                            className='form-control'
                            value={this.state.Title}
                            onChange={this.onChangeTitle}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Year}
                            onChange={this.onChangeYear}></input>
                    </div>
                    <div className='form-group'>
                        <label>Movies Poster: </label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.Poster}
                            onChange={this.onChangePoster}>

                        </textarea>
                    </div>
                    <div className='form-group'>
                        <input type='submit'
                            value='Add Movie'
                            className='btn btn-primary'></input>
                    </div>
                </form>



            </div>
        );
    }
}