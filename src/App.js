import React, {Component} from "react";
import "./styles.css"

class App extends React.Component {
    state = {
        country: "",
        queryData: [],
        enableButton: false,
    };

    handleOnChange = event => {
        this.setState ({
            country: event.target.value,
            enableButton: event.target.value !== ""
        });
    }

    handleSearch = () => {
        this.makeApiCall()
    };

    makeApiCall = () => {
        let apiUrl = `https://api.covid19api.com/live/country/${this.state.country}`;
        fetch(apiUrl)
            .then(response => {
                return response.json()
            })
            .then(jsonData => {
                console.log(jsonData)
                this.setState({queryData: jsonData})
            })
    }

    render(){
        return (
            <div>
                <h1>COVID-19 TRACKER APP</h1>
                <input
                    name="text"
                    placeholder="Enter Country Name"
                    onChange={event=>this.handleOnChange(event)}
                />
                <br/><br/>
                <button onClick={this.handleSearch} disabled={!this.state.enableButton}>Load</button>
                <br/><br/>
                {
                    <table>
                        <thead>
                            <tr>
                                <th>Confirmed</th>
                                <th>Deaths</th>
                                <th>Recovered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.queryData.map((day) => (
                                <tr>
                                    <td>{day.Confirmed}</td>
                                    <td>{day.Deaths}</td>
                                    <td>{day.Recovered}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default App;