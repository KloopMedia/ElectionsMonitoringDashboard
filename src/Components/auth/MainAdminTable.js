import React, {Component, useState} from 'react'
import firebase from "../../utils/firebase";

import MaterialTable from "../Component/MaterialTable";

const queryString = require('query-string');

class App extends Component {
	state = {
		data: [],
		columns: [],
	}

	downloadData = () => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (urlString.url) {
				fetch(urlString.url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					this.setState({
						columns: data.fields.mainAdminTable
					})
				});
		} else {
			console.log("ERROR: no url detected")
		}
	}


	componentDidMount() {
		this.downloadData()
		let rootRef = firebase.firestore().collection('users')

		rootRef.onSnapshot(snap => {
			let data = [];
			let dataKeys = [];
			snap.docs.map((el, i) => {
				data.push(el.data())
				dataKeys.push(el.id)
			})
			const dataRows = []

			data.forEach((el, i) => {

				let columnsName = {}

				Object.keys(el).forEach(key => {
					columnsName[key] = el[key]
				})
				columnsName['id'] = dataKeys[i]
				if (columnsName['district']) {
					// pass
				}
				else {
					columnsName['district'] = 'none'
				}
				dataRows[i] = columnsName
			})
			this.setState({data: dataRows})
		})

	}

	save_role(id, key, newRole) {
		let rootRef = firebase.firestore().collection('users').doc(`${id}`)
			.update({
				[key]: newRole
			})
	}

	render() {

		return (
			<div className="App">
				<MaterialTable columns={this.state.columns}
				               data={this.state.data} save_role={this.save_role}/>
			</div>
		);
	};
}

export default App;
