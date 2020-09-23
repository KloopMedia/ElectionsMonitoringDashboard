import React, {Component, useState} from 'react'
import firebase from "../../utils/firebase";
import Template from "../Template"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	withRouter,
	Link
} from "react-router-dom";

const queryString = require('query-string');

class App extends Component {
	state = {
		tablets: [],
		data: [],
		columns: [],
		users: [],
		users_by_column: {}
	}

	downloadData = () => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (true) {
			fetch('https://raw.githubusercontent.com/KloopMedia/ElectionsMonitoringFormsConfig/master/config_v2.json')
				// if (urlString.url) {
				// 	fetch(urlString.url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					this.setState({
						tablets: data
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
			<div className="App">
				<Router>
					{this.state.tablets.map((el, i) => {
						return (
							<li key={i}>
								<Link to={'/kloop-table/tablets' + el.path + window.location.search}>{el.label}</Link>
							</li>)
					})
					}
					<Switch>
						{this.state.tablets.map((el, i) => (
							<Route key={i} path={"/kloop-table/tablets" + el.path}>
								{() => <Template url={el.url} label={el.label}/>}
							</Route>
						))}
					</Switch>
				</Router>

			</div>
		);
	};
}

export default App;