import React from 'react';
import axios from 'axios'
export default class Autocomplete extends React.Component {

    constructor(props) {
        super(props);
        //Setting state
        this.state = {
            data: [],
            working: ''
        }
    }
    componentWillMount() {
        //calling an API
        axios.get('http://localhost:3000/getAutocomplete')
            .then(json => {
                this.newData = json.data;
                this.nameData = this.newData.map(nw => nw.name);
                this.setState({ data: this.nameData })
                console.log(this.state.data);
            })
    }
    onTextChange = (e) => {
        const data = {
            name: e
        }
        if (e.length > 3) {
            console.log("Name is", data)
            axios.post('http://localhost:3000/getdetails', data)
                .then(json => {
                    this.newData = json.data;
                    this.nameData = this.newData.map(nw => nw.name);
                    this.setState({ data: this.nameData })
                    console.log(this.state.data);
                    this.setState({ working: '' })

                })
        } if (e.length < 4) {
            this.setState({ working: 'We are working on it...' })

        } if (e.length === 0) {
            this.setState({ data: [] })
            this.setState({ working: 'Please write something to test autocomplete...' })
            console.log("No Name Given!")
        }
    }
    render() {
        return (
            <div className="text-left">
                <input type="text" id="auto" placeholder="autocomplete"
                    onChange={(e) => this.onTextChange(e.target.value)} />
                <p>{this.state.working}</p>
                <ul>
                    {this.state.data.map((name) => <li>{name}</li>)}
                </ul>

            </div>
        )

    }
}