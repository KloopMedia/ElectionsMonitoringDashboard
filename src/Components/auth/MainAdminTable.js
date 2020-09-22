import React, {Component, useState} from 'react'
import firebase from "../../utils/firebaseA";

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
				dataRows[i] = columnsName
			})

			this.setState({data: dataRows})
		})

		/*let rootRefCol = firebase.database().ref()

		rootRefCol.on('value', snap=>{
			const columns = Object.values(snap.val())
			this.setState({columns: columns})

		})*/

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
