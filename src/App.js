import React from "react";
import {XAxis, Bar, BarChart, Tooltip, YAxis} from "recharts";
import "./styles.css"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.makeApiCall = this.makeApiCall.bind(this);
     }
    
    componentDidMount() {
        window.addEventListener('load', this.makeApiCall);
    }
    
    componentWillUnmount() { 
       window.removeEventListener('load', this.makeApiCall)  
    }

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
        //let apiUrl = `https://api.covid19api.com/live/country/${this.state.country}`;
        let apiUrl = `https://api.covid19api.com/live/country/india`;
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
                <h1>COVID-19 TRACKER - INDIA</h1>
                {/* <input
                    name="text"
                    placeholder="Enter Country Name"
                    onChange={event=>this.handleOnChange(event)}
                />
                <br/><br/>
                <button onClick={this.handleSearch} disabled={!this.state.enableButton}>Load</button> */}
                <br/><br/>
                {
                    // Displaying data in Tabular Format
                    // <table>
                    //     <thead>
                    //         <tr>
                    //             <th>Confirmed</th>
                    //             <th>Deaths</th>
                    //             <th>Recovered</th>
                    //         </tr>
                    //     </thead>
                    //     <tbody>
                    //         {this.state.queryData.map((day) => (
                    //             <tr>
                    //                 <td>{day.Confirmed}</td>
                    //                 <td>{day.Deaths}</td>
                    //                 <td>{day.Recovered}</td>
                    //             </tr>
                    //         ))}
                    //     </tbody>
                    // </table>
                    // Displaying in Graphs
                    <BarChart
                        width={1200}
                        height={400}
                        data={this.state.queryData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <XAxis dataKey="Date" />
                        <YAxis dataKey="Active" />
                        <Tooltip />
                        <Bar dataKey="Confirmed" fill="#ffbd14" yAxisId={0} />
                        <Bar dataKey="Deaths" fill="#ff0000" yAxisId={0} />
                        <Bar dataKey="Recovered" fill="#00ff00" yAxisId={0} />
                    </BarChart>
                }
            </div>
        )
    }
}

export default App;