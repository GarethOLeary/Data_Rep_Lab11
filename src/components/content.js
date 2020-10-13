import React from 'react';

export class Content extends React.Component {

    render() {
        return (
            // Displays text and time
            <div>
                <h1>Hello World!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
    }
}