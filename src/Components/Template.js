import React, {Component, useState} from 'react'
import MaterialTable from "./Component/MaterialTable";
import firebase from "../utils/firebase";

const queryString = require('query-string');

class App extends Component {
	state = {
		main_title: '',
		questions: [],
		columns: [],
		users: [],
		users_data: [],
		users_row: []
	}

	downloadData = (url) => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (true) {
			fetch(url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					this.setState({
						questions: data.questions,
						main_title: data.main_title
					})
					this.columns()
					let usersRef = firebase.firestore().collection('users')
					usersRef.get().then(docs => {
						docs.forEach(doc => this.state.users.push(doc.id))
					}).then(() => {
						let rootRef = firebase.firestore().collection('responses')
						this.state.users.forEach(user => {
							let userRef = rootRef.doc(user)
							let answersRef = userRef.collection("answers")
							answersRef.where("form_name", "==", this.state.main_title).get().then(querySnapshot => {
								querySnapshot.forEach(snap => {
									this.state.users_data.push(snap.data())
								})
							})
						})
					})
				});
		} else {
			console.log("ERROR: no url detected")
		}

	}

	columns() {
		let cols = this.state.questions.map((el, i) => {
			return {title: el.title, field: i, editable: "never"}
		})
		cols.push({title: 'Date', field: 'date', editable: "never"})
		cols.push({title: 'Timestamp', field: 'timestamp', editable: "never"})
		this.setState({columns: cols})
	}

	componentDidMount() {
		this.downloadData(this.props.url)

	}

	rowField() {
		const dataRows = []
		this.state.users_data.map((element, index) => {
			let row = {}
			this.state.columns.forEach((el, i) => {
				row[el.field] = '-'
			})
			Object.keys(row).forEach(key => {

				if (element.answers[key] != undefined) {
					row[key] = element.answers[key]
				} else {
					row[key] = '-'
				}
			})
			// row.date = element.date
			// row.timestamp = element.timestamp
			console.log(row)

			dataRows[index] = row
		})


		this.setState({users_row: dataRows})

	}

	render() {

		return (
			<div className="App">
				<button onClick={() => console.log(this.state)}>show state</button>
				<button onClick={() => this.rowField()}>show rowField</button>
				<h2>Заполнило форму {this.state.users_data.length}</h2>
				{/*<MaterialTable columns={this.state.columns} title={this.state.main_title} data={this.state.users_row}/>*/}
			</div>
		);
	};
}

export default App;
