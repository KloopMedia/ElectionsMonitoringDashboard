import React, {Component, useState} from 'react'
import firebase from "../../utils/firebaseA";

import MaterialTable from "../Component/MaterialTable";

const queryString = require('query-string');

class App extends Component {
	state = {
		questions:[],
		columns: []
	}

	downloadData = () => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (true) {
			fetch('https://raw.githubusercontent.com/Kabirov7/kloop-forms-test/master/kloop-table/config.json')
				// if (urlString.url) {
				// 	fetch(urlString.url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					this.setState({
						columns: data.fields.userAnswer
					})
				});
		} else {
			console.log("ERROR: no url detected")
		}
	}


	componentDidMount() {
		this.downloadData()
	}


	render() {
		return (
			<div>
				<MaterialTable data={this.state.data} columns={this.state.columns}/>
			</div>
		);
	}
}
export default App;
