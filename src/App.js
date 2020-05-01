import React, {Component} from "react";
import "./styles.css"

class App extends React.Component {
    state = {
        country: "india",
        data: null
    };

    handleOnChange = event => {
        this.setState ({
            country: "india"
        });
    }

    handleSearch = () => {
        this.makeApiCall()
    };

    render(){
        return (
            <h1>COVID-TRACKER {new Date().getFullYear()} </h1>
        )
    }
}

export default App;